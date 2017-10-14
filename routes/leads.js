var express = require('express');
var router = express.Router();
var api = require('../middleware/auth');
var campaignServices = require('../services/services_campaigns');

// Hardcoded details

var currentUser = require("../currentUser");



router.post('/', api.keyCheck, function(req, res){
    res.send("hello there");
    
});



module.exports = router;