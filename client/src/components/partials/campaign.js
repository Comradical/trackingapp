import React, { Component } from 'react';
import { Link } from 'react-router-dom';

const Campaign = (props) => {
  let campaign = props.campaignToRender;
    let stats = campaign.statistics;
    let lifetimeValue = (stats.revenue/stats.customer_count).toFixed(2);
    return(
        <li className="list-group-item" key={campaign._id}>
            <div>
                <div className="row">
                    <div className="col-12 col-md-8">
                        <h6>
                            <Link className="nav-item nav-link" to={`/Campaigns/${campaign._id}`}>
                              {campaign.name}
                            </Link>
                        </h6>
                    </div>
                    <div className="col-6 col-md-4">
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
                </div>
            </div>
      </li>
    ) ;
};

export default Campaign;