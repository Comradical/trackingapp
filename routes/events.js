var express = require('express');
var router = express.Router();
var accountfields = [];
var event = require('../services/events/eventcreator.js');

router.post('/', function(req, res, next){
    event.create(req.body, accountfields, function(err, success){
        if(err){
            res.send(err);
        } else {
            res.send(success);
        }
    });
});

module.exports = router;