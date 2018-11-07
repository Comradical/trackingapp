const mongoose = require('mongoose')
const joinQuery = require('mongo-join-query')
import Campaign from './config/models/campaign'
import Lead from './config/models/lead'


// The below code works and returns two properties. The Account, and aggregates the lead count on each sub account.

let aggregation = () => {
  Campaign.aggregate([
      { $match : {} },
      { $group : {
        _id : '$account',
        lead_total: {
          $sum: '$statistics.lead_count'
        }} 
      },
    ]
  ).exec((err, response) => {
    err ? console.log(err) : console.log(response);
  })
}


module.exports = aggregation
