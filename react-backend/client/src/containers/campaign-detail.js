import React, { Component } from 'react';
import { connect } from 'react-redux';

class CampaignDetail extends Component {
  render(){
    if(!this.props.campaign){
      return <div>Select a campaign to get started.</div>;
    }

    return (
      <div>
        <h3>Details for:</h3>
        <div>Title: {this.props.campaign.title}</div>
        <div>Leads: {this.props.campaign.leads}</div>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return{
    campaign: state.ActiveCampaign
  }
}

export default connect(mapStateToProps)(CampaignDetail)
