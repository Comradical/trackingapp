import express from 'express'
let route = express.Router()

route.get('/', function (req, res) {
  res.status(200).send('ok')
})

export default route