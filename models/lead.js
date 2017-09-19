var mongoose = require("mongoose");

var LeadSchema = new mongoose.Schema({
    firstname: String,
    lastname: String,
    email: String,
    phone: String,
    created: {type: Date, default: Date.now},
    campaigns: [{
         type: mongoose.Schema.Types.ObjectId,
         ref: "Campaign"
      }], 
    events: [{
         type: mongoose.Schema.Types.ObjectId,
         ref: "Lead"
      }]
});

module.exports = mongoose.model("Lead", LeadSchema);