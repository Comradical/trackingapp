/* eslint-disable no-undef */
import route from '../../../app/config/routes/events'
import bodyParser from 'body-parser'
var supertest = require('supertest')
var expect = require('chai').expect

var express = require('express')

describe('POST /events', () => {
  var app, request
  beforeEach(() => {
    // Create an express application object
    app = express()
    // setup bodyparser for post requests
    app.use(bodyParser.json())
    app.use(bodyParser.urlencoded({ extended: true }))
    // Bind a route to our application
    app.use('/events', route)
    // Get a supertest instance so we can make requests
    request = supertest(app)
  })

  it('should respond with 201', function (done) {
    request
      .post('/events')
      .type('form')
      .send({ name: 'Mocha' })
      .expect('Content-Type', 'text/html; charset=utf-8')
      .expect(201, function (err, res) {
        expect(err).to.deep.equals(null)
        expect(res.body, 'Created')
        done()
      })
  })
})

describe('POST /events and error', () => {
  var app, request
  beforeEach(() => {
    // Create an express application object
    app = express()
    // setup bodyparser for post requests
    app.use(bodyParser.json())
    app.use(bodyParser.urlencoded({ extended: true }))
    // Bind a route to our application
    app.use('/events', route)
    // Get a supertest instance so we can make requests
    request = supertest(app)
  })

  it('should respond with 400', function (done) {
    request
      .post('/events')
      .type('form')
      .send({ not_a_real_name: 'Mocha' })
      .expect('Content-Type', 'text/html; charset=utf-8')
      .expect(400, function (err, res) {
        expect(err)
        expect(res.body, 'Error')
        done()
      })
  })
})

describe('GET /events and error', () => {
  var app, request
  beforeEach(() => {
    // Create an express application object
    app = express()
    // Bind a route to our application
    app.use('/events', route)
    // Get a supertest instance so we can make requests
    request = supertest(app)
  })

  it('should respond with 400', function (done) {
    request
      .get('/events/notarealid')
      .expect(400, function (err, res) {
        expect(err)
        expect(res.body, 'error')
        done()
      })
  })
})

// describe('GET /events', () => {
//   var app, request
//   beforeEach(() => {
//     // Create an express application object
//     app = express()
//     // Bind a route to our application
//     app.use('/events', route)
//     // Get a supertest instance so we can make requests
//     request = supertest(app)
//   })

//   it('should respond with 200', function (done) {
//     request
//       .get('/events/5ae3561d578ee416364848b2')
//       .expect(200, function (err, res) {
//         expect(err).to.deep.equals(null)
//         expect(res.body, 'ok')
//         done()
//       })
//   })
// })
