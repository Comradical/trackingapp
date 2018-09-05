import express from 'express'
import Map from '../models/event_map'
import Err from '../../services/errors'
import currentUser from '../currentUser.js'
import Account from '../models/account'

let router = express.Router()

// TODO add Middleware for verifying API key and account
router.post('/', (req, res) => {
  new Promise((resolve, reject) => {
    let mapToCreate = {
      title: req.body.title,
      mapping: {}
    }
    for (var key in req.body) {
      if (key !== 'title') {
        mapToCreate.mapping[key] = req.body[key]
      }
    }
    resolve(mapToCreate)
  }).then((mapToCreate) => {
    Map.create(mapToCreate, (err, createdMap) => {
      if (err) {
        mapToCreate.reject(err)
      } else {
        Account.findById(currentUser.account, (err, account) => {
          if (err) {
            return err
          } else {
            account.maps.push(createdMap)
            account.save()
          }
          res.send(createdMap)
        })
      }
    })
  })
  .catch((err) => {
    console.log(err)
    Err.create(err)
  })
})

router.post('/test', (req, res) => {
  console.log(req.body)
  res.send(req)
})

module.exports = router
