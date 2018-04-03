var cors = require('cors');
var express = require('express');
var router = express.Router();
var campaignServices = require('../services/services_campaigns');
var errorHandler = require('../services/errors');
var app = express();

// Hardcoded details
var currentUser = require("../currentUser");

//Allow cross domain acceess:
//  /campaigns routes

// Get Campaigns
router.get('/', cors(), (req, res, next) => {
    campaignServices.fetchCampaigns(currentUser)
    .then((response) => {
        res.json(response);
    })
    .catch(errorHandler);
});

//Create Campaign
router.post('/', function(req, res){
    campaignServices.create(req.body, currentUser, function(err, success){
        if(err){
            errorHandler(err);
        } else {
            res.send(success);
            console.log(success);
        }
    });
});

router.get('/:id', function(req, res){
   campaignServices.fetchCampaign(req.params.id)
    .then((response) => {
        res.json(response);
    })
    .catch(errorHandler);
});

router.put('/:id', function(req, res){
    //TODO Update Campaign
    res.send("Sorry, no way to update a campaign has been implemented yet");
});

router.delete('/:id', function(req, res){
    //TODO Delete a campaign
   res.send("Sorry, a way to delete campaigns hsa not been implemented yet"); 
});




module.exports = router;