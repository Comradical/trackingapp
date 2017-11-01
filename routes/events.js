var express = require('express');
var router = express.Router();
var eventHandler = require('../services/events/eventhandler.js');


router.post('/', function(req, res){
    //TODO add Middleware for verifying API key and account
    eventHandler.create(req.body, function(err, success){
        if(err){
            res.send(err);
        } else {
            res.send(success);
        }
    });
});

router.post('/:map', function(req, res){
    //TODO add Middleware for verifying API key and account
    console.log("testing AC Request");
    for(var key in req.body){
        console.log(key);
    }
});

module.exports = router;