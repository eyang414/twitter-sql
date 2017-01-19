'use strict';
var express = require('express');
var router = express.Router();
// var tweetBank = require('../tweetBank');
var client = require('../db/client.js');


module.exports = router;

// a reusable function
function respondWithAllTweets (req, res, next){

  client.query("SELECT * FROM tweets JOIN users ON tweets.user_id = users.id", function(err,result){
    if(err) return next(err);
    var tweets = result.rows;

  //  console.log(tweets);
    res.render('index', {title:'Twitter.js', tweets: tweets, showForm: true});
  });
}

// here we basically treet the root view and tweets view as identical
router.get('/', respondWithAllTweets);
router.get('/tweets', respondWithAllTweets);

// single-user page
router.get('/users/:username', function(req, res, next){
console.log('it works up here');


var nameString = `SELECT * FROM tweets JOIN users ON tweets.user_id = users.id WHERE users.name = '${req.params.username}'`



  client.query(nameString, function(err,result){
    if(err) return next(err);
    var tweets = result.rows;
    console.log('req params users=========',req.params.username, 'tweets======',tweets);
    res.render('index', {title:'Twitter.js', tweets: tweets, showForm: true});
  });




  // var tweetsForName = tweetBank.find({ name: req.params.username });
  // res.render('index', {
  //   title: 'Twitter.js',
  //   tweets: tweetsForName,
  //   showForm: true,
  //   username: req.params.username
  // });
});

// single-tweet page
router.get('/tweets/:id', function(req, res, next){
  console.log(req.params.id);
    client.query(`SELECT tweets.id, content, name, picture_url FROM tweets JOIN users ON tweets.user_id = users.id WHERE tweets.id = '${req.params.id}'`, function(err,result){
      if(err) return next(err);
      var tweets = result.rows;
      console.log(tweets);
      res.render('index', {title:'Twitter.js', tweets: tweets, showForm: true});

    });
});

// create a new tweet
router.post('/tweets', function(req, res, next){
  var newTweet = tweetBank.add(req.body.name, req.body.content);
  res.redirect('/');
});

// // replaced this hard-coded route with general static routing in app.js
// router.get('/stylesheets/style.css', function(req, res, next){
//   res.sendFile('/stylesheets/style.css', { root: __dirname + '/../public/' });
// });
