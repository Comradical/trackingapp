var mongoose = require("mongoose");

var EventSchema = new mongoose.Schema({
    type: String,
    value: Number,
    created: {type: Date, default: Date.now},
    source: String,
    campaign: {
        name: String,
        id: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Campaign"
        }
      }, 
    lead: {
         type: mongoose.Schema.Types.ObjectId,
         ref: "Lead"
      },
});

module.exports = mongoose.model("Event", EventSchema);