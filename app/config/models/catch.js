var mongoose = require("mongoose");

var CatchSchema = new mongoose.Schema({
   data: mongoose.Schema.Types.Mixed,
   created: {type: Date, default: Date.now}
});


module.exports = mongoose.model("Catch", CatchSchema);