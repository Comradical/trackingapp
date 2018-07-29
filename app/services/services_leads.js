var Lead = require('../config/models/lead');
var Campaign = require('../config/models/campaign');
var leadServices = {};


leadServices.createLead = function(lead, callback){
    var leadToCreate = {
        firstname: lead.firstname,
        lastname: lead.lastname,
        email: lead.email,
        phone: lead.phone,
        campaigns: [lead.campaign],
        events: [lead.event]
    };
    
    Campaign.findById(lead.campaign, function(err, campaign){
       if(err){
           callback("Wow, we couldn't find your account.. This is awkward", null);
        } else {
            Lead.create(leadToCreate, function(err, createdLead){
                if(err){
                    callback(err, null);
                } else {
                    campaign.leads.push(createdLead);
                    campaign.save();
                    callback(null, createdLead);
                }
            });
        }
    });
};

module.exports = leadServices;