var express = require('express');
var router = express.Router({mergeParams: true});
var currentUser = require('../currentUser');
var Expense = require('../models/expense');
var Campaign = require('../models/campaign');
var Err = require('../services/errors');
var cors = require('cors');

//TODO add Middleware for verifying API key and account
router.post('/', cors(), function(req, res){
    //prepare to create event
    let expenseToCreate = {
        amount: Number(req.body.amount),
    };
    console.log(req.params);
    //find corresponding campaign
    Campaign.findById(req.params.id, (err, foundCampaign) => {
        if(err){
            //fix error handling
            console.log(err);
            res.send(err);
            Err.create(err);
        } else {
            //create expense
            Expense.create(expenseToCreate, (err, newExpense) => {
                if(err){
                    Err.create(err);
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