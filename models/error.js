var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var ErrorSchema = new Schema({
    code: String,
    message: String,
    name: String,
    created: {type: Date, default: Date.now}
});

module.exports = mongoose.model("Error", ErrorSchema);