var express = require('express');
var router = express.Router({mergeParams: true});
var currentUser = require('../currentUser');
var Expense = require('../models/expense');
var Campaign = require('../models/campaign');
var Error = require('../services/errors');

//TODO add Middleware for verifying API key and account
router.post('/', function(req, res){
    //prepare to create event
    let eventToCreate = {
        amount: Number(req.body.amount),
    };
    console.log(req.params);
    //find corresponding campaign
    Campaign.findById(req.params.id, (err, foundCampaign) => {
        if(err){
            //fix error handling
            console.log(err);
            res.send(err);
            Error.create(err);
        } else {
            //create expense
            Expense.create(eventToCreate, (err, newExpense) => {
                if(err){
                    Error.create(err);
                    console.log(err);
                } else {
                    //add expense to corresponding campaign
                    foundCampaign.expenses.push(newExpense);
                    if(foundCampaign.statistics.total_expense){
                        foundCampaign.statistics.total_expense += newExpense.amount;
                    } else {
                        foundCampaign.statistics.total_expense = newExpense.amount;
                    }
                    
                    foundCampaign.save();
                    res.send(foundCampaign);
                }
            });
        }
    });
   
});

module.exports = router;