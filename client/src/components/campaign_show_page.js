import React, { Component } from 'react';
import { connect } from 'react-redux';
import { fetchCampaign } from '../actions';
import _ from 'lodash';
import { Link } from 'react-router-dom';
import NavBar from './partials/navbar';

class CampaignShowPage extends Component {
  componentDidMount() {
    let campaignId = this.props.match.params.id;
    this.props.fetchCampaign(campaignId);
  }
  renderCampaign(){
    let campaign = this.props.campaign;
    console.log(this.props.campaign);
    if(campaign.statistics){
      let stats = campaign.statistics;
      let lifetimeValue = (stats.revenue/stats.customer_count).toFixed(2);
      return(
      <li className="list-group-item" key={campaign._id}>
        <div>
          <div className="row">
            <div className="col-12 col-md-8">
              <h6>{campaign.name}</h6>
            </div>
            <div className="col-6 col-md-4">
              <p>
                Lead Count: {stats.lead_count}
              </p>
              <p>
                Customer Count: {stats.customer_count}
              </p>
              <p>
                Revenue: {stats.revenue}
              </p>
              <p>
                Lifetime Value: ${lifetimeValue}
              </p>
            </div>
          </div>
        </div>
      </li>
      );
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