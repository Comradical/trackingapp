var express = require('express');
var router = express.Router();
var User = require('../models/user');
var Catch = require('../models/catch');
var Err = require('../../services/errors');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});


router.post("/register", function(req, res){
    var newUser = new User({username: req.body.username});
    
    User.register(newUser, req.body.password, function(err, user){
        if(err){
            req.flash("error", err.message);
            return res.redirect("/register");
        } else {
            res.send(user);
        }
    });
});


router.post("/catch", function(req, res){
    new Promise((resolve, reject) => {
        let catchToCreate = {
            data: {}
        };
        for(var key in req.body){
            catchToCreate.data[key] = req.body[key];
        }
        console.log(catchToCreate);
        resolve(catchToCreate);
    }).then((catchToCreate) => {
        Catch.create(catchToCreate, function(err, createdCatch){
            if(err){
               catchToCreate.reject(err);
            } else {
                res.send(createdCatch);
            }
        });
    })
    .catch((err) => {
        console.log(err);
        Err.create(err);
    });
});

module.exports = router;
