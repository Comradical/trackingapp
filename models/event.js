var mongoose = require("mongoose");

var EventSchema = new mongoose.Schema({
    type: String,
    value: Number,
    created: {type: Date, default: Date.now},
    source: String,
    medium: String,
    lead: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Lead"
     },
});

module.exports = mongoose.model("Event", EventSchema);