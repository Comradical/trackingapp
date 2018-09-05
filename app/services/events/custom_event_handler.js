import Map from '../../config/models/event_map'
let customEvent = {}

customEvent.map = (event, mappingId) => {
  return new Promise((resolve, reject) => {
    let eventToCreate = {}
    Map.findById(mappingId, (err, foundMap) => {
      let map = foundMap.mapping
      if (err) {
        reject(err)
      } else {
        for (var key in map) {
          eventToCreate[key] = event[map[key]]
        }
        resolve(eventToCreate)
      }
    })
  })
}

module.exports = customEvent
