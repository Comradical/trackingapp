var eventHandler = {};
var Event = require('../../models/event');
var Lead = require('../../models/lead');
var Campaign = require('../../models/campaign');
var campaignHandler = require('./campaignhandler');

//TODO Exchange callbacks for Promises.

function addToCampaign(event, lead){
    //Get Current Campaign
    getCampaign(event)
        .then((foundCampaign) => {
            var campaignToAdd = {
                name: foundCampaign.name,
                _id: foundCampaign._id
            };
            return campaignToAdd;
        }).then(addCampaignToLead)
        .then(updateCampaign);
    function updateCampaign(campaignResponse){
        let campaign = campaignResponse.campaign;
        let newCustomer = campaignResponse.new;
        if(newCustomer){
            
        } 
    }
        
        
    function addCampaignToLead(campaign){
        var campaignId = campaign._id;
        var response = {campaign: campaign};
        if(!(lead.campaigns[campaignId])){
            //Update Lead to be a part of the campaign
            lead.campaigns[campaignId] = {
                name: campaign.name,
                _id: campaign._id
            };
            //Save Lead
            lead.save();
            response.new = true;
            return response;
        } else {
        //Return Campaign
        response.new = false;
        return response;
        }
    }
}


function getCampaign(event){
    return new Promise((resolve, reject) => {
        Campaign.findOne({source: event.source}, function(err, foundCampaign){
            if(err){
                reject(err);
            } else {
                resolve(foundCampaign);
            }
        });
    });
}

eventHandler.create = function(event, callback){
    var newEvent = {
        source: event.source
        //TODO Add functionality so people can map whichever fields they like.
    };
    // Check if a lead already exists?
    doesLeadExist(event, function(err, leadFound){
       if(err){
           callback(err, null);
       } else if(leadFound === true){
            createEventAndUpdateLead(event, function(err, updatedLead){
                //Mongoose will validate lead data, if there is an error, send the error in the response.
                if(err){
                    callback(err, null);
                } else {
                    addToCampaign(event, updatedLead);
                    //TODO: Change newLead to message response for security
                    callback(null, updatedLead);
                }
            });
       } else {
           //else run createLeadAndEvent
           createLeadAndEvent(event, function(err, newLead){
                //Mongoose will validate lead data, if there is an error, send the error in the response.
                if(err){
                    callback(err, null);
                } else {
                    addToCampaign(event, newLead);
                    //TODO: Change newLead to message response for security
                    callback(null, newLead);
                }
           });
       }
    });
    
    function createLeadAndEvent(event, callback){
        var leadToCreate = {email: event.email, account_id: event.account, firstname: event.first_name, campaigns: { 0: true}};
        Lead.create(leadToCreate, function(err, newLead){
           if(err){
               callback(err, null);
           } else{
               Event.create(newEvent, function(err, newlyCreatedEvent){
                    if(err){
                        callback(err, null);
                    } else {
                        // add the lead to the event
                        newlyCreatedEvent.lead = newLead;
                        newlyCreatedEvent.save();
                        // add the event to the lead
                        newLead.events.push(newlyCreatedEvent);
                        newLead.save();
                        
                        callback(null, newLead);
                        
                    }
                });
           }
        });
    }
    
    function createEventAndUpdateLead(event, callback){
        if(event.id){
            Lead.findById(event.id, function(err, leadToUpdate){
                eventCreationHelper(err, leadToUpdate);
            });
        } else {
            Lead.findOne({email: event.email, account_id: event.account}, function(err, leadToUpdate){
                eventCreationHelper(err, leadToUpdate);
            });
        }
        
        function eventCreationHelper(err, leadToUpdate){
            if(err){
                callback(err, null);
            } else {
                Event.create(newEvent, function(err, newlyCreatedEvent){
                    if(err){
                        callback(err, null);
                    } else {
                        // add the lead to the event
                        newlyCreatedEvent.lead = leadToUpdate;
                        newlyCreatedEvent.save();
                        // add the event to the lead
                        leadToUpdate.events.push(newlyCreatedEvent);
                        leadToUpdate.save();
                        
                        callback(null, leadToUpdate);
                        
                    }
                });
            }
        }
    }
    
    function doesLeadExist(event, callback){
        if(event.id){
            //search by id
            //TODO: Create standardized API documentation for fields like "id"
            Lead.count({_id: event._id, account_id: event.account}, function(err, count){

                if(count>0){
                    //document exists
                    callback(null, true);
                } else {
                    //ID existed, but document did not exist
                    callback("id does not exist", null);
                }
            });
        } else if (event.email){
            //search by email
            Lead.count({email: event.email, account_id: event.account}, function(err, count){
                if(count > 0){
                    //document exists
                    callback(null, true);
                } else {
                    callback(null, "NoLead");
                }
            });
            
        } else {
            callback("Event was missing a unique identifier. Please make sure to pass an ID or email addresses", null);
        }
    }

};

module.exports = eventHandler;