//TODO Delete this file. As it is no longer used.
let campaignHandler = {};
var Campaign = require('../../models/campaign');

campaignHandler.addPurchase = function(purchase, campaignToUpdate, lead){
    var campaignId = campaignToUpdate._id;
    //Somehow This is working
    return new Promise((resolve, reject) => {
        prepareCampaign(campaignToUpdate)
        .then(updateCampaign)
        .then(resolve());
    });
    function updateCampaign(campaign){
        campaign.save();
        return(campaign);
    }
    function prepareCampaign(campaign, lead){
        return new Promise((resolve, reject) =>{
            campaign.statistics.revenue += Number(purchase.value);
            //TODO Customer count should only increase if the customer hasn't purchased already
            if(!(lead.campaigns[campaignId])){
                //Update campaign's customer count
                campaign.statistics.customer_count++;
                //Update Lead to be a part of the campaign
                lead.campaigns[campaignId] = {
                    name: campaign.name,
                    _id: campaign._id
                };
                //Save Lead
                lead.save();
                //Resolve Campaign
                resolve(campaign);
            } else {
            resolve(campaign);
            }
        });
    }
};

campaignHandler.updateLeadCount = function(event, campaignToUpdate){
    campaignToUpdate.statistics.lead_count++;
    campaignToUpdate.save();
    console.log("made it to Update Lead Count");
    console.log(campaignToUpdate);
};

module.exports = campaignHandler;