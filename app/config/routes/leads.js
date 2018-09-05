import express from 'express'
import api from '../middleware/auth'

let router = express.Router()
// Hardcoded details

router.post('/', api.keyCheck, (req, res) => {
  res.send('hello there')
})

module.exports = router
