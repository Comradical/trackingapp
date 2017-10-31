var customEvent = {};
var Map = require('../../models/event_map');

customEvent.create = function (event, mappingId){
    return new Promise((resolve, reject) => {
        let eventToCreate = {};
        Map.findById(mappingId, (err, map) => {
            if(err){
                reject(err);
            } else {
                for(var key in map){
                    eventToCreate[key] = event[map[key]];
                }
            resolve(eventToCreate);
            }
        });
    });
};

module.exports = customEvent;