import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import ExpenseForm from './expense_form';

const Campaign = (props) => {
  let campaign = props.campaignToRender;
    let stats = campaign.statistics;
    let costPerLead = Math.round( campaign.statistics.total_expense / stats.lead_count );
    let lifetimeValue = (stats.revenue/stats.customer_count).toFixed(2);
    return(
        <li className="list-group-item" key={campaign._id}>
            <div className="">
                <div className="row">
                    <div className="fl w-50 pa2">
                        <h3>
                            <Link className="f3 lh-title dim blue mv3" to={`/Campaigns/${campaign._id}`}>
                              {campaign.name}
                            </Link>
                        </h3>
                        <p>
                        Cost: ${stats.total_expense}
                      </p>
                    </div>
                    <div className="fl w-50 pa2">
                      <h4 className="f3 lh-title mv3">
                        CPL: ${costPerLead}
                      </h4>
                      <p>
                        Lead Count: {stats.lead_count}
                      </p>
                      <p>
                        Customer Count: {stats.customer_count}
                      </p>
                      <p>
                        Revenue: {stats.revenue}
                      </p>
                      <p>
                        Lifetime Value: ${lifetimeValue}
                      </p>
                    </div>
                    <ExpenseForm campaignToExpense={campaign._id}/>
                </div>
            </div>
      </li>
    ) ;
};

export default Campaign;