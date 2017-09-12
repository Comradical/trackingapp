import React from 'react';
import { Component } from 'react';

import SearchBar from '../containers/search_bar';

export default class App extends Component {
  render() {
    return (
      <div>
        <h1>From tracking app</h1>
        <SearchBar />
      </div>
    );
  }
}
