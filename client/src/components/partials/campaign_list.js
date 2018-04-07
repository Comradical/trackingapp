import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import _ from 'lodash';

export default class CampaignList extends Component {
    render() {
        return _.map(this.props.campaignsToRender, campaign => {
            <Campaign/>
        });
    }
}