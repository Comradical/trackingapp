import React, { Component } from 'react';
import { connect } from 'react-redux';
import { fetchPosts } from '../actions';
import _ from 'lodash';
import { Field, reduxForm } from 'redux-form';

class PostsNew extends Component {
  
  render() {
    return (
      <div>
        <h3>Posts New</h3>
        <form>
          <Field  
          name="title"
          component={}
          />
        </form>
      </div>
    );
  }
}

export default reduxForm({
  form: 'PostsNewForm'
})(PostsNew);