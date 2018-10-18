import mongoose from 'mongoose'

var EventSchema = new mongoose.Schema({
  type: String,
  value: Number,
  created: {type: Date, default: Date.now},
  source: String,
  action: String,
  medium: String,
  lead: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Lead'
  }
})

module.exports = mongoose.model('Event', EventSchema)
