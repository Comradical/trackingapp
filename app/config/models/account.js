var mongoose = require("mongoose");

var AccountSchema = new mongoose.Schema({
   account_name: String,
   campaigns: [
      {
         type: mongoose.Schema.Types.ObjectId,
         ref : "Campaign"
      }
      ],
   users: [
      {
         type: mongoose.Schema.Types.ObjectId,
         ref : "User"
      }
   ],
   maps: [
      {
         type: mongoose.Schema.Types.ObjectId,
         ref : "Map"
      }
   ],
   api_key: String,
   created: {type: Date, default: Date.now}
});


module.exports = mongoose.model("Account", AccountSchema);