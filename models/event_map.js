var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var MapSchema = new Schema({
    account: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Campaign"
    },
    mapping: Schema.Types.Mixed,
    created: {type: Date, default: Date.now}
});

module.exports = mongoose.model("Map", MapSchema);