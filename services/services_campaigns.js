var Campaign = require('../models/campaign');
var Account = require('../models/account');
var campaignServices = {};

campaignServices.create = function(newCampaign, currentUser, callback){
    
    var fullname = currentUser.firstname + " " + currentUser.lastname;
    var campaignToCreate = {
        name: newCampaign.campaign_name,
        account: currentUser.account,
        creator: {
            id: currentUser._id,
            fullname: fullname
        }
    };
    Account.findById(currentUser.account, function(err, account){
       if(err){
           callback("Wow, we couldn't find your account.. This is awkward", null);
        } else {
            Campaign.create(campaignToCreate, function(err, createdCampaign){
                if(err){
                    callback(err, null);
                } else {
                    account.campaigns.push(createdCampaign);
                    account.save();
                    callback(null, createdCampaign);
                }
            });
        }
    });
};

campaignServices.addLead = function(campaignId, callback){
    Campaign.findById(campaignId, function(err, campaign){
       if(err){
           callback(err, null);
       } else {
           console.log(campaign);
       }
    });
};

module.exports = campaignServices;