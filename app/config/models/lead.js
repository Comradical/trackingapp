import mongoose from 'mongoose'

var LeadSchema = new mongoose.Schema({
  firstname: String,
  lastname: String,
  email: {
    type: String,
    lowercase: true
  },
  phone: {type: String},
  created: {type: Date, default: Date.now},
  campaigns: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Campaign'
  }],
  events: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Event'
  }],
  account_id: {type: String},
  customer_of: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Customer'
  }]
}, { runSettersOnQuery: true })

LeadSchema.path('phone').validate((value) => {
  value.match(/^\d{10}$/)
}, 'Invalid phone number')

module.exports = mongoose.model('Lead', LeadSchema)
