let campaignHandler = {};


campaignHandler.addPurchase = function(purchase, campaignToUpdate){
    campaignToUpdate.statistics.revenue += Number(purchase.value);
    campaignToUpdate.statistics.customerCount++;
    campaignToUpdate.save();
};

campaignHandler.updateLeadCount = function(event, campaignToUpdate){
    campaignToUpdate.statistics.leadCount++;
    campaignToUpdate.save();
};

module.exports = campaignHandler;