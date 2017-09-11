import React, { Component } from 'react';
import './App.css';

import CampaignList from '../containers/campaign-list.js';
import CampaignDetail from '../containers/campaign-detail.js';
// class App extends Component {
//   state = {users: []}
//
//   componentDidMount() {
//     fetch('/users')
//       .then(res => res.json())
//       .then(users => this.setState({ users }));
//   }

export default class App extends Component {
  render() {
    return (
      <div className="App">
        <CampaignList />
        <CampaignDetail />
      </div>
    );
  }
}
