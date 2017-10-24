import React, { Component } from 'react';
import { connect } from 'react-redux';
import { fetchPosts } from '../actions';
import _ from 'lodash';
import { Link } from 'react-router-dom';
import NavBar from './partials/navbar';

class PostsIndex extends Component {
  render() {
    return (
      <div>
        <NavBar/>
        <h3>Simple Campaign Tracker</h3>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return { posts: state.posts };
}

export default connect(mapStateToProps, { fetchPosts })(PostsIndex);