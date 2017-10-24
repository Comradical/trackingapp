import React, { Component } from 'react';
import { connect } from 'react-redux';
import _ from 'lodash';
import { fetchCampaigns } from '../actions';

class CampaignList extends Component {
    componentDidMount() {
        this.props.fetchCampaigns();
    }
    renderCampaigns(){
        _.map(this.props.campaigns, Campaign);
    }
    
    render() {
        return(
            <li>
                Hello!
            </li>
        );
    }
}

function mapStateToProps(state) {
  return { campaigns: state.campaigns };
}

export default connect(mapStateToProps, { fetchCampaigns })(CampaignList);