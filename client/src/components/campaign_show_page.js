import React, { Component } from 'react';
import { connect } from 'react-redux';
import { fetchCampaign } from '../actions';
import _ from 'lodash';
import { Link } from 'react-router-dom';
import NavBar from './partials/navbar';
import Campaign from './partials/campaign';

class CampaignShowPage extends Component {
  componentDidMount() {
    let campaignId = this.props.match.params.id;
    this.props.fetchCampaign(campaignId);
  }
  renderCampaign(){
    let campaign = this.props.campaign;
    if(campaign.statistics){
     return <Campaign campaignToRender={campaign} key={campaign._id}/>;
    } else {
      return;
    }
  }
    
  render() {
    return (
      <div>
        <div>
          <NavBar/>
          <div className="card">
            <div className="card-header">
              Campaigns
            </div>
            <div className="card-body">
              <ul className="list-group list-group-flush">
                {this.renderCampaign()}
              </ul>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return { campaign: state.campaign };
}

export default connect(mapStateToProps, { fetchCampaign })(CampaignShowPage);