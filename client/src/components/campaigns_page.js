import React, { Component } from 'react';
import { connect } from 'react-redux';
import { fetchCampaigns } from '../actions';
import _ from 'lodash';
import { Link } from 'react-router-dom';
import NavBar from './partials/navbar';
import Campaign from './partials/campaign';

class CampaignsPage extends Component {
  constructor(props) {
    super(props);
  }
  
  componentDidMount() {
    this.props.fetchCampaigns();
  }
  renderCampaigns(){
    return _.map(this.props.campaigns, campaign => {
      console.log(campaign);
    return <Campaign campaignToRender={campaign} key={campaign._id}/>;
    });
    // _.map(this.props.campaigns, campaign => {
    //   return ( 
    //     <Campaign campaignToRender={campaign}/>
    //   );
    // });
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