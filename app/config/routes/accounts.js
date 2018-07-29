var express = require('express');
var router = express.Router();
var accountServices = require('../../services/services_accounts');
var api = require('../../middleware/auth');

// Hardcoded details

var currentUser = require('../currentUser');

router.post('/', function(req, res){
    accountServices.create(req.body, currentUser, function(err, success){
       if(err){
           res.send(err);
       } else {
           res.send(success);
       }
    });
});

router.delete("/:id", function(req, res){
   accountServices.delete(req.params.id, function(err, success){
      if(err){
           res.send(err);
       } else {
           res.send(success);
       } 
   });
});

router.put("/:id", api.keyCheck, function(req, res){
    var detailsToUpdate = {
        account_name: req.body.account_name
    };
    
    accountServices.edit(req.params.id, detailsToUpdate, function(err, updatedAccount){
      if(err){
           res.send(err);
       } else {
           res.send(updatedAccount);
       } 
   });
});



module.exports = router;