var express = require('express');
var router = express.Router();
var eventHandler = require('../services/events/eventcreator.js');

router.post('/', function(req, res){
    eventHandler.create(req.body, function(err, success){
        if(err){
            res.send(err);
        } else {
            res.send(success);
        }
    });
});

module.exports = router;