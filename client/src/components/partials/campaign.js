import React, { Component } from 'react';
import { Link } from 'react-router-dom';

const Campaign = (props) => {
  console.log(props.campaignToRender);
  // return (
  //   <li className="list-group-item">
  //     <h6>
  //       <Link className="nav-item nav-link" to={`/Campaigns/adadfasdfasdfasdfasfd}`}>
  //         Facebook Campaign
  //       </Link>
  //     </h6>
  //   </li>
  // )
  //TODO Make the below code work
    let campaign = props.campaignToRender;
    if(campaign.statistics){
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
      )} else{ return;}
};

export default Campaign;