
var express = require('express');
var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);
var tweetcache = [];
require('../../cred.js')
app.use('/', express.static('../app/public'));
app.use('/public', express.static('../app/public/css'));
app.get('/', function(req, res){
   dir = req.params.dir,  
   res.sendFile('app/index.html', {'root': '../'});
});

io.on('connection', function(socket){
    console.log('a user connected');
    for (i = 0; i < tweetcache.length; i++) { 
    	io.emit('newTweet', (tweetcache[i]));  
    }
});

var Twitter = require('twitter');
var client = new Twitter({
   consumer_key: ckey,
   consumer_secret: csecret,
   access_token_key: akey,
   access_token_secret: asecret
});

client.stream('statuses/filter', {track: '#HeyMelinaSophie'}, function(stream) {
   stream.on('data', function(tweet) {
      tweetcache.unshift(tweet);
      tweetcache = tweetcache.slice(0,5);
      console.log(tweet);
      io.emit('newTweet', (tweet));
   });
	 
   stream.on('error', function(error) {
      throw error;
   });
});


http.listen(3000, function(){
    console.log('listening on *:3000');
  });

