var Account = require('../config/models/account');
var api = {};

api.keyCheck = function(req, res, next){
    var api_key = req.query.api_key;
    
    // This line will need to be changed to allow proper access to req.user._id. I don't believe it's working currently.
    var currentUserId = require('../currentUser').account || req.user._id;
    Account.findById(currentUserId, function(err, foundAccount){
        if(err){
            res.send(err);
        } else {
            if(foundAccount.api_key === api_key){
                console.log("api key matched");
                next();
            } else {
                console.log("Api key mismatch!");
                console.log (api_key, foundAccount.api_key);
                res.send("Unable to Authenticate. Please check our credentials.");
            }
        }
    });
};

api.checkAccount = function(req, res, next){
    var api_key = req.query.api_key;
    
    Account.findById(req.body.account, function(err, foundAccount){
        if(err){
            res.send(err);
        } else {
            if(foundAccount.api_key === api_key){
                console.log("api key matched");
                next();
            } else {
                console.log("Api key mismatch!");
                console.log (api_key, foundAccount.api_key);
                res.send("Unable to Authenticate. Please check our credentials.");
            }
        }
    });
};

module.exports = api;