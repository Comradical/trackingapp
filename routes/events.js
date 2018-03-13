var express = require('express');
var router = express.Router();
var eventHandler = require('../services/events/eventhandler');
var customEvent = require('../services/events/custom_event_handler');


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
    customEvent.map(req.body, req.params.map)
    .then((eventToCreate) => {
      eventHandler.create(eventToCreate, function(err, success){
        if(err){
            res.send(err);
        } else {
            res.send(success);
        }
      });
    });
});



module.exports = router;