import React, { Component } from 'react';
import { connect } from 'react-redux';
import { selectCampaign } from '../actions/index';
import { bindActionCreators } from 'redux';

class CampaignList extends Component {
  renderList() {
    return this.props.campaigns.map((campaign) => {
      return (
        <li
          key={campaign.title}
          onClick={() => this.props.selectCampaign(campaign)}
          className="list-group-item">
          {campaign.title}
        </li>
      );
    });
  }
  render() {
    return (
      <ul className="">
        {this.renderList()}
      </ul>
    )
  }
}

function mapStateToProps(state) {
  //whatever is returned will show up as props
  //inside of CampaignList
  return {
    campaigns: state.campaigns
  };
}

// anything returned from this function will end up as props
// on the campaign list container

function mapDispatchToProps(dispatch){
  //whenever selectCampaign is called, the result should be passed
  //to all of the reducers
  return bindActionCreators({ selectCampaign: selectCampaign }, dispatch)
}


/* //promote campaign list from a component to a caontainer - it needs to know
// about this new dispatch method, selectCampaign. Make it available
//as a prop. */
export default connect(mapStateToProps, mapDispatchToProps)(CampaignList);
