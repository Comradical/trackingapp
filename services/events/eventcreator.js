var event = {};
var Event = require('../../models/event');

event.create = function(body, accountfields, callback){

    var newEvent = {
        source: body.source
    };
    
    // Create a new campground and save to DB
    Event.create(newEvent, function(err, newlyCreated){
        if(err){
            callback(err, null);
        } else {
            callback(null, "Event has been created!");
        }
    });
};



module.exports = event;