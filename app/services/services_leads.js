import Lead from '../config/models/lead'
import Campaign from '../config/models/campaign'
var leadServices = {}
let error = {
  data: null,
  message: 'There was an error'
}

leadServices.createLead = function (lead, callback) {
  var leadToCreate = {
    firstname: lead.firstname,
    lastname: lead.lastname,
    email: lead.email,
    phone: lead.phone,
    campaigns: [lead.campaign],
    events: [lead.event]
  }

  Campaign.findById(lead.campaign, function (err, campaign) {
    if (err) {
      error.data = err
      callback(error, null)
    } else {
      Lead.create(leadToCreate, function (err, createdLead) {
        if (err) {
          callback(err, null)
        } else {
          campaign.leads.push(createdLead)
          campaign.save()
          callback(null, createdLead)
        }
      })
    }
  })
}

module.exports = leadServices
