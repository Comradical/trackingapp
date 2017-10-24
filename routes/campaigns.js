var express = require('express');
var router = express.Router();
var campaignServices = require('../services/services_campaigns');
var errorHandler = require('../services/errors');

// Hardcoded details

var currentUser = require("../currentUser");

//  /campaigns routes

// Get Campaigns
router.get('/', (req, res) => {
    campaignServices.fetchCampaigns(currentUser)
    .then((response) => {
        res.send(response);
    })
    .catch(errorHandler);
    
});

//Create Campaign
router.post('/', function(req, res){
    campaignServices.create(req.body, currentUser, function(err, success){
        if(err){
            res.send(err);
        } else {
            res.send(success);
            console.log(success);
        }
    });
});

router.get('/:id', function(req, res){
   res.send("sorry, not way to view a campaign yet."); 
   //TODO Create Show Route
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