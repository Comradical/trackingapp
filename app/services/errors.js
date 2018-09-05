import Err from '../config/models/error'

var errorHandler = {}
errorHandler.create = (err) => {
  let newError = {
    details: err
  }

  Err.create(newError, (err, createdError) => {
    if (err) {
      console.log(err)
    }
  })
}

module.exports = errorHandler
