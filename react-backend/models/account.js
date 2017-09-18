var mongoose = require("mongoose");

var AccountSchema = new mongoose.Schema({
   name: String,
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
   created: {type: Date, default: Date.now}
});


module.exports = mongoose.model("Account", AccountSchema);