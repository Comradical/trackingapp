var Err = require('../models/error');

var errorHandler = {};
errorHandler.create = function(err){
    let newError = {
        details: err
    };
    
    Err.create(newError, function(err, createdError){
        if(err){
            console.log(err);
        }
    });
}

module.exports = errorHandler;