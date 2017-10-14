var mongoose = require("mongoose");

var CampaignSchema = new mongoose.Schema({
   created: {type: Date, default: Date.now},
   name: String,
   account: {
         type: mongoose.Schema.Types.ObjectId,
         ref: "Account"
      },
   creator: {
      id: {
         type: mongoose.Schema.Types.ObjectId,
         ref: "User"
      },
      fullname: String,
   },
    events: [
      {
         type: mongoose.Schema.Types.ObjectId,
         ref: "Event"
      }
   ],
   expenses: [
      {
         type: mongoose.Schema.Types.ObjectId,
         ref: "Expenses"
      }
   ],
   leads: [
      {
         type: mongoose.Schema.Types.ObjectId,
         ref: "Leads"
      }
   ],
   statistics: {
      leadCount: Number,
      customerCount: Number,
      Revenue: Number
   }
   
});


module.exports = mongoose.model("Campaign", CampaignSchema);