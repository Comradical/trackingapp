import express from 'express'
import eventHandler from '../../services/events/eventhandler'
import customEvent from '../../services/events/custom_event_handler'

let router = express.Router()

router.post('/', (req, res) => {
  // TODO add Middleware for verifying API key and account
  eventHandler.create(req.body)
  .then((successMessage) => {
    res.send(successMessage)
  })
  .catch((err) => {
    res.send(err)
  })
})

router.post('/:map', (req, res) => {
  // TODO add Middleware for verifying API key and account
  customEvent.map(req.body, req.params.map)
  .then((eventToCreate) => {
    eventHandler.create(eventToCreate, (err, success) => {
      if (err) {
        res.send(err)
      } else {
        res.send(success)
      }
    })
  })
})

module.exports = router
