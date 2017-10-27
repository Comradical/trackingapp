var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var CampaignSchema = new Schema({
   created: {type: Date, default: Date.now},
   name: String,
   account: {
         type: Schema.Types.ObjectId,
         ref: "Account"
      },
   creator: {
      id: {
         type: Schema.Types.ObjectId,
         ref: "User"
      },
      fullname: String,
   },
   events: [
      {
         type: Schema.Types.ObjectId,
         ref: "Event"
      }
   ],
   expenses: [
      {
         type: Schema.Types.ObjectId,
         ref: "Expenses"
      }
   ],
   leads: [
      {
         type: Schema.Types.ObjectId,
         ref: "Leads"
      }
   ],
   statistics: {
      lead_count: Number,
      customer_count: Number,
      revenue: Number
   },
   source: String
   
});


module.exports = mongoose.model("Campaign", CampaignSchema);