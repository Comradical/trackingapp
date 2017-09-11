export function selectCampaign(campaign){
  // console.log("A campaign has been selected", campaign.title);
  // Select campaign is an action creator. It needs to return an action,
  // an object with a type property.
  return {
    type: 'CAMPAIGN_SELECTED',
    payload: campaign
  };
}
