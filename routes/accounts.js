var express = require('express');
var router = express.Router();
var accountServices = require('../services/services_accounts');
var api = require('../middleware/auth');

// Hardcoded details

var currentUser = {
    "__v": 0,
    "salt": "4ca0ed71b0ecebf5b5bd55eed1632389cee9eafcd2e99512060d634ba00050e8",
    "hash": "08a14a501638472914f77e194d861aca521adb50cf40bbb995d47d0b8d74cc9e0bccf8d725e2cf87295177c6114f4d9d736bd04d2781efbefe4d0368bec74005f2d85b52e5a3a8db9524ed265ea15d43394ac176e160b5bae3d7f8cb139f0bda7bac8a5b9e06629ca2bc7882cc6d841d69d856f7d0bd56cb81962ed107ffe194b86cf889aebd5c3439bd174c2ba31f11a4f684427f10874041ed0b4543435723d91224e7ad725991cbce8661c785c8e441f53eb311bc0f463a6081a5a0b09e879065db5eaf42931b767a1ab0dc8e4ae56131a5ac79f4ba9c19761c0edc96e65c3147ab5ee5ab6be8de32127b298b34806066e4ac9c7a8a6b1dec7b69477f3d98260511e7b5d05fbac79ad108109ac5b067f34b2f460774b6810ec5d24f3ad3179dfe9bfb58380109f2277760c5b4dc03d04023aec1292982e10b498225e495741c9b97317207be8167eadd833e11f3efee26c9e96d25654c5a23b1128983a7596e1731787b6c37d8f5d574565236cc972b1748d04488439b033d3359a748c96be13f27bb9a960104b085f1f9e19555b0e36d856877eda2b97dc59d6e1c587bf59fc56a3a9e69c03c402a757476dec43bf20a6421b5a6a385f0ec77e6dd60b4cdedc60cf5c1eb43d753c247c282e63edb05f181e069d7392c0b4582bcd2960537c87412a7a5c39b53d7a828be6280ba368c346c6fa75f62e51f3139bd916d3712",
    "username": "comradical",
    "_id": "59cd3e555b231a0d02e62b19",
    "created": "2017-09-28T18:24:21.817Z"
};

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