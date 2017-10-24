import React, { Component } from 'react';
import { connect } from 'react-redux';
import { fetchCampaigns } from '../actions';
import _ from 'lodash';
import { Link } from 'react-router-dom';
import NavBar from './partials/navbar';

class CampaignsPage extends Component {
  componentDidMount() {
    this.props.fetchCampaigns();
  }
  renderCampaigns(){
    return _.map(this.props.campaigns, campaign => {
      return(
      <li className="list-group-item">
        {campaign.name}
      </li>
      );
      
    });
  }
    
  render() {
    return (
      <div>
      <div>
        <NavBar/>
        <h3>Your Campaigns:</h3>
        <ul className="list-group">
          {this.renderCampaigns()}
        </ul>
      </div>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return { campaigns: state.campaigns };
}

export default connect(mapStateToProps, { fetchCampaigns })(CampaignsPage);