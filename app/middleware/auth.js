import Account from '../config/models/account'
let api = {}

api.keyCheck = (req, res, next) => {
  let apiKey = req.query.apiKey

  // This line will need to be changed to allow proper access to req.user._id. I don't believe it's working currently.
  var currentUserId = require('../currentUser').account || req.user._id
  Account.findById(currentUserId, (err, foundAccount) => {
    if (err) {
      res.send(err)
    } else {
      if (foundAccount.apiKey === apiKey) {
        console.log('api key matched')
        next()
      } else {
        console.log('Api key mismatch!')
        console.log(apiKey, foundAccount.apiKey)
        res.send('Unable to Authenticate. Please check our credentials.')
      }
    }
  })
}

api.checkAccount = (req, res, next) => {
  let apiKey = req.query.apiKey

  Account.findById(req.body.account, (err, foundAccount) => {
    if (err) {
      res.send(err)
    } else {
      if (foundAccount.apiKey === apiKey) {
        console.log('api key matched')
        next()
      } else {
        console.log('Api key mismatch!')
        console.log(apiKey, foundAccount.apiKey)
        res.send('Unable to Authenticate. Please check our credentials.')
      }
    }
  })
}

module.exports = api
