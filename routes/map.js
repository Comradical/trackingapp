var express = require('express');
var router = express.Router();
var Map = require('../models/event_map');
var Err = require('../services/errors');
var currentUser = require('../currentUser.js');
var Account = require('../models/account');

//TODO add Middleware for verifying API key and account
router.post('/', function(req, res){
    let toReturn = {};
    new Promise((resolve, reject) => {
        let mapToCreate = {
            title: req.body.title,
            mapping: {}
        };
        
        for(var key in req.body){
            if(key != 'title'){
                mapToCreate.mapping[key] = req.body[key];
            }
        }
        resolve(mapToCreate);
    }).then((mapToCreate) => {
        Map.create(mapToCreate, function(err, createdMap){
            if(err){
                mapToCreate.reject(err);
            } else {
                Account.findById(currentUser.account, (err, account) => {
                    if(err){
                        return err;
                    } else {
                        account.maps.push(createdMap);
                        account.save();
                    }
                    res.send(createdMap);
                });
                
            }
        });
    })
    .catch((err) => {
        console.log(err);
        Err.create(err);
    });
});

router.post('/test', (req, res) => {
   console.log(req.body);
   res.send(req);
});

module.exports = router;