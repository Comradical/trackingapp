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
    });
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
                {this.renderCampaigns()}
              </ul>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return { campaigns: state.campaigns };
}

export default connect(mapStateToProps, { fetchCampaigns })(CampaignsPage);