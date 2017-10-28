var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var EventSchema = new Schema({
    details: Schema.Types.mixed,
    code: String,
    message: String,
    name: String,
    created: {type: Date, default: Date.now}
});

module.exports = mongoose.model("Event", EventSchema);