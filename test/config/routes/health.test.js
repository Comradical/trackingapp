/* eslint-disable no-undef */
import route from '../../../app/config/routes/health'
var supertest = require('supertest')
var expect = require('chai').expect

var express = require('express')
describe('GET /health', () => {
  var app, request
  beforeEach(() => {
    // Create an express application object
    app = express()
    // Bind a route to our application
    app.use('/health', route)
    // Get a supertest instance so we can make requests
    request = supertest(app)
  })

  it('should respond with 200', function (done) {
    request
      .get('/health')
      .expect('Content-Type', 'text/html; charset=utf-8')
      .expect(200, function (err, res) {
        expect(err).to.deep.equals(null)
        expect(res.body, 'ok')
        done()
      })
  })
})
