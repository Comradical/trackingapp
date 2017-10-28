var Error = require('../models/error');

function errorHandler(err){
    let newError = {
        details: err
    };
    
    Error.create(newError, function(err, createdError){
        if(err){
            console.log(err);
        }
    });
}

module.exports = errorHandler;