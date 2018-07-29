    function addCampaignToLead(campaign){
        console.log("addCampaignToLead");
        console.log(lead);
        var campaignId = campaign._id;
        var response = {campaign: campaign};
        
        if(!(lead.campaigns[campaignId])){
            //Update Lead to be a part of the campaign
            UpdateLead(lead)
            //Save Lead
                .then(saveLead)
                .then(() =>{
                    response.new = true;
                    return response;
                });
        } else {
        //Return Campaign
        response.new = false;
        return response;
        }
        
        
        function updateLead(lead){     
            return new Promise((resolve, reject) => {
                lead.campaigns[campaignId] = {
                name: campaign.name,
                _id: campaign._id
                };
                resolve(lead);
            });
        function saveLead(lead){
            lead.save();
        }
    }
}