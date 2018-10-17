// setup Environment varibles
import environment from './environment'

// use packages
import express from 'express'
import path from 'path'
import logger from 'morgan'
import cookieParser from 'cookie-parser'
import bodyParser from 'body-parser'
import passport from 'passport'
import LocalStrategy from 'passport-local'
import mongoose from 'mongoose'
import User from './models/user'

// Route Variables
import health from './routes/health'
import index from './routes/index'
import events from './routes/events'
import accounts from './routes/accounts'
import campaigns from './routes/campaigns'
import users from './routes/users'
import expenses from './routes/expenses'
import eventMap from './routes/map'
// End Route Variables

// setup the database we are using
var mLabUrl = 'mongodb://' + process.env.DB_USER + ':' + process.env.DB_PASS + '@' + process.env.DB_HOST

mongoose.connect(mLabUrl, {
})

// initialize express
var app = express()

var cors = require('cors')
// TODO research Cors and see if this is a security risk. Should I proxy?
app.use(cors())

// setup view engine
app.set('views', path.join(__dirname, '../views'))
app.set('view engine', 'ejs')

// uncomment after placing your favicon in /public
// app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')))
app.use(logger('dev'))
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))
app.use(cookieParser())
app.use(express.static(path.join(__dirname, 'public')))

// Routes
app.use('/', index)
app.use('/users', users)
app.use('/health', health)
app.use('/events', events)
app.use('/accounts', accounts)
app.use('/campaigns', campaigns)
app.use('/campaigns/:id/expenses', expenses)
app.use('/maps', eventMap)
// End Routes

// Authentication                               vvvvvvvvvvvvvvvvvv
app.use(require('express-session')({
  secret: environment.SECRET,
  resave: false,
  saveUninitialized: false
}))

app.use(passport.initialize())
app.use(passport.session())
passport.use(new LocalStrategy(User.authenticate()))
passport.serializeUser(User.serializeUser())
passport.deserializeUser(User.deserializeUser())
// End authentication                            ^^^^^^^^^^^^^^^^^^

// catch 404 and forward to error handler
app.use((req, res, next) => {
  var err = new Error('Not Found')
  err.status = 404
  next(err)
})

// error handler
app.use((err, req, res, next) => {
  // set locals, only providing error in development
  res.locals.message = err.message
  res.locals.error = req.app.get('env') === 'development' ? err : {}

  // render the error page
  res.status(err.status || 500)
  res.render('error')
})

module.exports = app
