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
        },
        statistics: {
            lead_count: 0,
            customer_count: 0,
            revenue: 0,
        },
        source: newCampaign.source,
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

campaignServices.fetchCampaigns = function(currentUser){
    let id = currentUser.account;
    return new Promise((resolve, reject) => {
        Account.findById(id).populate("campaigns").exec(function(err, foundAccount){
            if(err){
                reject(err);
            } else {
                let response = foundAccount.campaigns;
                resolve(response);
            }
        });
    });
};

module.exports = campaignServices;