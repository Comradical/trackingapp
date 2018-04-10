import React, { Component, PropTypes } from 'react';
import  {Field, reduxForm } from 'redux-form';
import { createExpense } from '../../actions/index';
import { connect } from 'react-redux';


const renderField = ({ input, label, type, meta: { touched, error, warning } }) => (
  <div className="form-group">
    <label>{label}</label>
      <input {...input} className="form-control" type={type}/>
      {touched && (error && <div className="text-help">{error}</div>)}
  </div>
)

class ExpenseForm extends Component {
    render() {
        const { fields: {title, date, cost }, handleSubmit } = this.props;
        return(
            <div className="">
                <form onSubmit={handleSubmit(this.props.createExpense)}>
                    <h6>Add an expense</h6>
                    <div className="form-group">
                        <Field label="Title" type="text" className="form-control" name="title" component={renderField}/>
                    </div>
                    <div className="form-group">
                        <Field label="Date" type="date" className="form-control" name="date" component={renderField}/>
                    </div>
                    <div className="form-group">
                        <Field label="Cost" type="number" steps="0.01" min="0.01" className="form-control" name="cost" component={renderField}/>
                    </div>
                    <button type="submit" className="btn btn-primary">
                        Submit
                    </button>
                </form>
            </div>
        );
    }
}

export default connect(null, {createExpense})(reduxForm({
    form: 'NewExpense',
    fields: ['title', 'date', 'cost']
})(ExpenseForm));