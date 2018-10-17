import Event from '../../config/models/event'
import Lead from '../../config/models/lead'
import Campaign from '../../config/models/campaign'

// IN PROGRESS
// TODO Exchange callbacks for Promises.

var eventHandler = {}

eventHandler.create = (event) => {
  return new Promise((resolve, reject) =>{
    var newEvent = {
      source: event.source
      // TODO Add functionality so people can map whichever fields they like.
    }
    let error = {
      data: null,
      message: 'Oops, something went wrong!'
    }
    doesLeadExist(event, (err, leadFound) => {
      if (err) {
        reject(err)
      } else if (leadFound === true) {
        createEventAndUpdateLead(event)
        .then((updatedLead) => {
          // Mongoose will validate lead data, if there is an error, send the error in the response.
          if (err) {
            reject(err)
          } else {
            addToCampaign(event, updatedLead)
            // TODO: Change newLead to message response for security
            resolve(updatedLead)
          }
        })
      } else {
       // else run createLeadAndEvent
        createLeadAndEvent(event, (err, returnedLead) => {
          // Mongoose will validate lead data, if there is an error, send the error in the response.
          if (err) {
            callback(err, null)
          } else {
            addToCampaign(event, returnedLead)
            // TODO: Change newLead to message response for security
            callback(null, returnedLead)
          }
        })
      }
    })
  
    function createLeadAndEvent (event, callback) {
      var leadToCreate = {email: event.email, account_id: event.account, firstname: event.first_name, lastname: event.last_name}
      Lead.create(leadToCreate, (err, newLead) => {
        if (err) {
          callback(err, null)
        } else {
          Event.create(newEvent, (err, newlyCreatedEvent) => {
            if (err) {
              callback(err, null)
            } else {
              // add the lead to the event
              newlyCreatedEvent.lead = newLead
              newlyCreatedEvent.save()
              // add the event to the lead
              newLead.events.push(newlyCreatedEvent)
              newLead.save((err, returnedLead) => {
                if (err) {
                  console.log(err)
                }
                callback(null, returnedLead)
              })
            }
          })
        }
      })
    }
  
    function createEventAndUpdateLead (event) {
      return new Promise((resolve, reject) => {
        if (event.lead_id) {
          Lead.findById(event.id, (err, leadToUpdate) => {
            eventCreationHelper(err, leadToUpdate)
          })
        } else {
          Lead.findOne({email: event.email, account_id: event.account}).populate('Campaigns').exec((err, leadToUpdate) => {
            eventCreationHelper(err, leadToUpdate)
          })
        }
        function eventCreationHelper (err, leadToUpdate) {
          if (err) {
            reject(err)
          } else {
            Event.create(newEvent, (err, newlyCreatedEvent) => {
              if (err) {
                reject(err)
              } else {
                // add the lead to the event
                newlyCreatedEvent.lead = leadToUpdate
                newlyCreatedEvent.save()
                // add the event to the lead
                leadToUpdate.events.push(newlyCreatedEvent)
                leadToUpdate.save()
                resolve(leadToUpdate)
              }
            })
          }
        }
      })
    }
  
    function doesLeadExist (event, callback) {
      if (event.id) {
        // search by id
        // TODO: Create standardized API documentation for fields like "id"
        Lead.count({_id: event._id, account_id: event.account}, (err, count) => {
          if (err) {
            // TODO add errorhandler here
            console.log(err)
          } else {
            if (count > 0) {
              // document exists
              callback(null, true)
            } else {
              // ID existed, but document did not exist
              error.message = 'ID does not exist'
              callback(error.message, null)
            }
          }
        })
      } else if (event.email) {
        // search by email
        Lead.count({email: event.email, account_id: event.account}, (err, count) => {
          if (err) {
            // TODO add errorhandler here
            console.log(err)
          } else {
            if (count > 0) {
              // document q
              callback(null, true)
            } else {
              callback(null, 'NoLead')
            }
          }
        })
      } else {
        error.message = 'Event was missing a unique identifier. Please make sure to pass an ID or email address'
        callback(error.message, null)
      }
    }
  })
}

function addToCampaign (event, lead) {
  // Get Current Campaign
  getCampaign(event)
    .then(addLeadToCampaign)
    .then(addCampaignToLead)
    .then(addCustomer)
    .then(addRevenue)
    .then(saveCampaign)
    .catch((err) => {
      console.log('there was an error', err)
    })

  function addRevenue (campaign) {
    if (campaign.statistics.hasOwnProperty('revenue') && (event.value)) {
      campaign.statistics.revenue += Number(event.value)
      return campaign
    } else {
      return campaign
    }
  }
  function saveCampaign (campaign) {
    campaign.save()
    return campaign
  }
  function addCustomer (campaignResponse) {
    let campaign = campaignResponse.campaign
    let newCustomer = campaignResponse.newCustomer
    let newLead = campaignResponse.newLead
    if (newCustomer) {
      campaign.statistics.customer_count++
    }
    if (newLead) {
      campaign.statistics.lead_count++
    }
    return campaign
  }

  function addLeadToCampaign (campaign) {
    return new Promise((resolve, reject) => {
      campaign.leads.addToSet(lead)
      campaign.save()
      resolve(campaign)
    })
  }
  function addCampaignToLead (campaign) {
    var campaignId = campaign._id
    var response = {campaign: campaign}

    // If the lead is both new and a customer
    if (lead.campaigns.indexOf(campaignId) === -1 && lead.customer_of.indexOf(campaignId) === -1) {
      // Update Lead to be a part of the campaign & a customer of it
      addCampaign(lead)
      .then(makeCustomer)
      .then(saveLead)
      response.newLead = true
      response.newCustomer = true
    } else {
      // If the lead isn't both new and a customer
      // check to add campaing to lead
      if (lead.campaigns.indexOf(campaignId) === -1) {
        addCampaign(lead)
        .then(saveLead)
        response.newLead = true
      } else { response.newLead = false }
      // check to mark lead as a customer of the campaign
      if (lead.customer_of.indexOf(campaignId) === -1) {
        // Update Lead to be a customer of the campaign
        makeCustomer(lead)
        // Save Lead
            .then(saveLead)
        response.newCustomer = true
      } else {
        response.newCustomer = false
      }
    }
    // Return Campaign
    return response

    function makeCustomer (lead) {
      return new Promise((resolve, reject) => {
        lead.customer_of.addToSet(campaign)
        resolve(lead)
      })
    }

    function addCampaign (lead) {
      return new Promise((resolve, reject) => {
        lead.campaigns.push(campaign)
        resolve(lead)
      })
    }
    function saveLead (lead) {
      lead.save((err, returnedLead) => {
        if (err) {
          console.log(err)
        }
        return returnedLead
      })
    }
  }
}

function getCampaign (event) {
  return new Promise((resolve, reject) => {
    Campaign.findOne({source: event.source, account: event.account}, (err, foundCampaign) => {
      if (err) {
        reject(err)
      } else {
        resolve(foundCampaign)
      }
    })
  })
}

module.exports = eventHandler
