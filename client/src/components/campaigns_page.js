import React, { Component } from 'react';
import { connect } from 'react-redux';
import { fetchCampaigns } from '../actions';
import _ from 'lodash';
import { Link } from 'react-router-dom';
import CampaignList from './partials/campaign_list';
import NavBar from './partials/navbar';

class CampaignsPage extends Component {
  componentDidMount() {
    this.props.fetchCampaigns();
  }
  renderCampaigns(){
    _.map(this.props.campaigns, Campaign);
  }
  
  render() {
    return (
      <div>
      <div>
        <NavBar/>
        <h3>Your Campaigns:</h3>
        <CampaignList/>
      </div>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return { campaigns: state.campaigns };
}

export default connect(mapStateToProps, { fetchCampaigns })(CampaignsPage);