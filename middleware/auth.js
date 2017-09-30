var Account = require('../models/account');
var api = {};

api.keyCheck =function(req, res, next){
    var api_key = req.query.api_key;
    Account.findById(req.params.id, function(err, foundAccount){
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
}

module.exports = api;