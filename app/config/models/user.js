import mongoose from 'mongoose'
import passportLocalMongoose from 'passport-local-mongoose'

var UserSchema = new mongoose.Schema({
  firstname: String,
  lastname: String,
  email: String,
  phone: String,
  username: String,
  password: String,
  account: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  },
  created: {type: Date, default: Date.now},
  permissions: String
})

UserSchema.plugin(passportLocalMongoose)

module.exports = mongoose.model('User', UserSchema)
