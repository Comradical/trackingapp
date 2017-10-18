import React, { Component } from 'react';
import { Field, reduxForm } from 'redux-form';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { createPost } from '../actions';

class PostsNew extends Component {
  renderField(field){
    const { meta: {touched, error} } = field;
    const className = `form-group ${touched && error ? 'has-danger' : ''}`;
    
    return(
      <div className = {className}>
        <label>{field.label}</label>
        <input
          className="form-control"
          type="text"
          {...field.input}
        />
        <div className="text-help">
        {touched ? error : ''}
        </div>
      </div>
    );
  }
  
  onSubmit(values){
    //this === component because of .bind(this)
    this.props.createPost(values, () =>{
      this.props.history.push('/');
    });
  }
  
  render() {
    const {handleSubmit} = this.props;
    return (
      <div>
        <h3>Posts New</h3>
        <form onSubmit={handleSubmit(this.onSubmit.bind(this))}>
          <Field
            label="Title"
            name="title"
            component={this.renderField}
          />
          <Field  
            label="Categories"
            name="categories"
            component={this.renderField}
          />
          <Field
            label="Post Content"
            name="content"
            component={this.renderField}
          />
          <button type="submit" className="btn btn-primary">Submit</button>
          <Link to="/" className="btn btn-danger">Cancel</Link>
        </form>
      </div>
    );
  }
}

function validate(values){
  //Always start with Errors
  const errors = {};
  
  //Validate inputs from 'values'
  if(!values.title){
    errors.title = "enter a title!";
  }
  
  if(!values.categories){
    errors.categories = "Enter some categories";
  }
  
  if(!values.content){
    errors.content = "please enter some content";
  }
  
  //if errors is empty, reduxForm will knoiw the form is fine to submit
  //if errors have ANY properties, reduxForm will assume the form is invalid
  return errors;
}

export default reduxForm({
  validate,
  form: 'PostsNewForm'
})(
  connect(null, { createPost })(PostsNew)
  );