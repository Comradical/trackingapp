var Account = require('../models/account');
var accountServices = {};

accountServices.create = function(accountDetails, accountOwner, callback){
    // setup account to create before passing it to mongo.
    var accountToCreate = new Account ({ account_name: accountDetails.account_name });
    accountToCreate.users.push(accountOwner);
    accountToCreate.api_key = (generateApiKey());
    
    //pass account to create to mongo
    Account.create(accountToCreate, function(err, newAccount){
        if(err){
            console.log(err);
            callback(err, null);
        } else {
            console.log(newAccount);
            callback(null, newAccount);
        }
    });
    
};

accountServices.delete = function(accountId, callback){
    Account.findByIdAndRemove(accountId, function(err){
       if(err){
           callback(err, null);
       } else {
           callback(null, "success");
       }
   });
};

accountServices.edit = function(accountId, toUpdate, callback){
    Account.findByIdAndUpdate(accountId, toUpdate, function(err, updatedAccount){
        if(err){
            callback(err, null);
        } else {
            callback(null, updatedAccount);
            console.log(updatedAccount);
        }
    });
};


function generateApiKey(){
    var chars = '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';
    var result = '';
    for (var i = 32; i > 0; --i) result += chars[Math.floor(Math.random() * chars.length)];
    return result;
}

module.exports = accountServices;