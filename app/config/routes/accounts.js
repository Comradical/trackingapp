import express from 'express'
import accountServices from '../../services/services_accounts'
import api from '../../middleware/auth'
// Hardcoded details
import currentUser from '../currentUser'

let router = express.Router()

router.post('/', (req, res) => {
  accountServices.create(req.body, currentUser, (err, success) => {
    if (err) {
      res.send(err)
    } else {
      res.send(success)
    }
  })
})

router.delete('/:id', (req, res) => {
  accountServices.delete(req.params.id, (err, success) => {
    if (err) {
      res.send(err)
    } else {
      res.send(success)
    }
  })
})

router.put('/:id', api.keyCheck, (req, res) => {
  var detailsToUpdate = {
    account_name: req.body.account_name
  }

  accountServices.edit(req.params.id, detailsToUpdate, (err, updatedAccount) => {
    if (err) {
      res.send(err)
    } else {
      res.send(updatedAccount)
    }
  })
})

module.exports = router
