var mongoose = require("mongoose");
var passportLocalMongoose = require("passport-local-mongoose");

var UserSchema = new mongoose.Schema({
   username: String,
   password: String,
   account: {
       id: {
                type: mongoose.Schema.Types.ObjectId,
                ref: "User"
            },
            accountname: String
   }
});

UserSchema.plugin(passportLocalMongoose)

module.exports = mongoose.model("User", UserSchema);