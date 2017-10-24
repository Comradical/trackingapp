import React, { Component } from 'react';
import { connect } from 'react-redux';
import { fetchPosts } from '../actions';
import _ from 'lodash';
import { Link } from 'react-router-dom';
import Campaign from './partials/campaign';

class CampaignsPage extends Component {
  componentDidMount() {
    this.props.fetchPosts();
  }
  renderCampaigns(){
    _.map(this.props.campaigns, Campaign);
  }
  
  render() {
    return (
      <div>
      <div>
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
  return { posts: state.posts };
}

export default connect(mapStateToProps, { fetchPosts })(CampaignsPage);