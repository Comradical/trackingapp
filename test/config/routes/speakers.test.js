/* eslint-disable no-undef */
import route from '../../../app/config/routes/speakers'
import bodyParser from 'body-parser'
var supertest = require('supertest')
var expect = require('chai').expect

var express = require('express')

// describe('POST /speakers', () => {
//   var app, request
//   beforeEach(() => {
//     // Create an express application object
//     app = express()
//     // setup bodyparser for post requests
//     app.use(bodyParser.json())
//     app.use(bodyParser.urlencoded({ extended: true }))
//     // Bind a route to our application
//     app.use('/speakers', route)
//     // Get a supertest instance so we can make requests
//     request = supertest(app)
//   })

//   it('should respond with 201', function (done) {
//     request
//       .post('/speakers')
//       .type('form')
//       .send({
//         event_id: '5b0230bd3280fe40fb1191f7',
//         name: 'mocha test',
//         bio: 'mocha test',
//         promotion_description: 'mocha test',
//         promotion_text: 'mocha test',
//         promotion_url: 'http://example.org',
//         youtube_url: 'http://example.org',
//         facebook_url: 'http://example.org',
//         twitter_url: 'http://example.org'
//       })
//       .expect('Content-Type', 'text/html; charset=utf-8')
//       .expect(201, function (err, res) {
//         expect(err).to.deep.equals(null)
//         expect(res.body, 'Created')
//         done()
//       })
//   })
// })

describe('POST /speakers with invalid id', () => {
  var app, request
  beforeEach(() => {
    // Create an express application object
    app = express()
    // setup bodyparser for post requests
    app.use(bodyParser.json())
    app.use(bodyParser.urlencoded({ extended: true }))
    // Bind a route to our application
    app.use('/speakers', route)
    // Get a supertest instance so we can make requests
    request = supertest(app)
  })

  it('should respond with 400', function (done) {
    request
      .post('/speakers')
      .type('form')
      .send({
        event_id: 'notarealid'
      })
      .expect('Content-Type', 'text/html; charset=utf-8')
      .expect(400, function (err, res) {
        expect(err)
        expect(res.body, 'Error')
        done()
      })
  })
})

describe('POST /speakers with missing data', () => {
  var app, request
  beforeEach(() => {
    // Create an express application object
    app = express()
    // setup bodyparser for post requests
    app.use(bodyParser.json())
    app.use(bodyParser.urlencoded({ extended: true }))
    // Bind a route to our application
    app.use('/speakers', route)
    // Get a supertest instance so we can make requests
    request = supertest(app)
  })

  it('should respond with 400', function (done) {
    request
      .post('/speakers')
      .type('form')
      .send({
        event_id: '5aff9d5288c6a51b39b2804b',
        // This example is missing a name
        // name: 'mocha test',
        bio: 'mocha test',
        promotion_description: 'mocha test',
        promotion_text: 'mocha test',
        promotion_url: 'http://example.org',
        youtube_url: 'http://example.org',
        facebook_url: 'http://example.org',
        twitter_url: 'http://example.org'
      })
      .expect('Content-Type', 'text/html; charset=utf-8')
      .expect(400, function (err, res) {
        expect(err)
        expect(res.body, 'Error')
        done()
      })
  })
})

describe('POST /speakers without an event ID', () => {
  var app, request
  beforeEach(() => {
    // Create an express application object
    app = express()
    // setup bodyparser for post requests
    app.use(bodyParser.json())
    app.use(bodyParser.urlencoded({ extended: true }))
    // Bind a route to our application
    app.use('/speakers', route)
    // Get a supertest instance so we can make requests
    request = supertest(app)
  })

  it('should respond with 400', function (done) {
    request
      .post('/speakers')
      .type('form')
      .send({
        // This example is missing an ID
        // event_id: '5aff9d5288c6a51b39b2804b',
        name: 'mocha test',
        bio: 'mocha test',
        promotion_description: 'mocha test',
        promotion_text: 'mocha test',
        promotion_url: 'http://example.org',
        youtube_url: 'http://example.org',
        facebook_url: 'http://example.org',
        twitter_url: 'http://example.org'
      })
      .expect('Content-Type', 'text/html; charset=utf-8')
      .expect(400, function (err, res) {
        expect(err)
        expect(res.body, 'Error')
        done()
      })
  })
})
