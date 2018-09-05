import express from 'express'
import User from '../models/user'
import Catch from '../models/catch'
import Err from '../../services/errors'
let router = express.Router()

/* GET home page. */
router.get('/', (req, res, next) => {
  res.render('index', { title: 'Express' })
})

router.post('/register', (req, res) => {
  var newUser = new User({username: req.body.username})

  User.register(newUser, req.body.password, (err, user) => {
    if (err) {
      req.flash('error', err.message)
      return res.redirect('/register')
    } else {
      res.send(user)
    }
  })
})

router.post('/catch', (req, res) => {
  new Promise((resolve, reject) => {
    let catchToCreate = {
      data: {}
    }
    for (var key in req.body) {
      catchToCreate.data[key] = req.body[key]
    }
    console.log(catchToCreate)
    resolve(catchToCreate)
  }).then((catchToCreate) => {
    Catch.create(catchToCreate, (err, createdCatch) => {
      if (err) {
        catchToCreate.reject(err)
      } else {
        res.send(createdCatch)
      }
    })
  })
  .catch((err) => {
    console.log(err)
    Err.create(err)
  })
})

module.exports = router
