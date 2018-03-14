//setup Environment varibles
require('dotenv').config();

//use packages
var express = require('express'),
    path = require('path'),
    favicon = require('serve-favicon'),
    logger = require('morgan'),
    cookieParser = require('cookie-parser'),
    bodyParser = require('body-parser'),
    passport   = require("passport"),
    LocalStrategy = require("passport-local"),
    mongoose   = require("mongoose"),
    User = require("./models/user");



//Route Variables
var index       = require('./routes/index'),
    events      = require('./routes/events'),
    accounts    = require('./routes/accounts'),
    campaigns   = require('./routes/campaigns'),
    users       = require('./routes/users'),
    expenses    = require('./routes/expenses'),
    event_map   = require('./routes/map');
//End Route Variables

//setup the database we are using
var mLabUrl = "mongodb://" + process.env.DB_USER + ":" + process.env.DB_PASS + "@" + process.env.DB_HOST;

mongoose.connect(mLabUrl, {
});

//initialize express
var app = express();

// setup view engine
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// uncomment after placing your favicon in /public
// app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

//Routes
app.use('/', index);
app.use('/users', users);
app.use('/events', events);
app.use('/accounts', accounts);
app.use('/campaigns', campaigns);
app.use("/campaigns/:id/expenses", expenses);
app.use("/maps", event_map);
//End Routes


// Authentication    vvvvvvvvvvvvvvvvvvvvv
app.use(require("express-session")({
    secret: "Once again Rusy wins cutest dog!",
    resave: false,
    saveUninitialized: false
}));

app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());
//End authentication  ^^^^^^^^^^^^^^^


// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
