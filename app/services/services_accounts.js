import Account from '../config/models/account'
let accountServices = {}

accountServices.create = (accountDetails, accountOwner, callback) => {
  // setup account to create before passing it to mongo.
  var accountToCreate = new Account({ account_name: accountDetails.account_name })
  accountToCreate.users.push(accountOwner)
  accountToCreate.api_key = (generateApiKey())

  // pass account to create to mongo
  Account.create(accountToCreate, (err, newAccount) => {
    if (err) {
      console.log(err)
      callback(err, null)
    } else {
      console.log(newAccount)
      callback(null, newAccount)
    }
  })
}

accountServices.delete = (accountId, callback) => {
  Account.findByIdAndRemove(accountId, (err) => {
    if (err) {
      callback(err, null)
    } else {
      callback(null, 'success')
    }
  })
}

accountServices.edit = (accountId, toUpdate, callback) => {
  Account.findByIdAndUpdate(accountId, toUpdate, function (err, updatedAccount) {
    if (err) {
      callback(err, null)
    } else {
      callback(null, updatedAccount)
      console.log(updatedAccount)
    }
  })
}

function generateApiKey () {
  var chars = '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ'
  var result = ''
  for (var i = 32; i > 0; --i) result += chars[Math.floor(Math.random() * chars.length)]
  return result
}

module.exports = accountServices
