
var express = require('express');
var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);
require('../../cred.js');
app.use('/', express.static('../app/public'));
app.get('/', function(req, res){
   dir = req.params.dir,  
   res.sendFile('app/index.html', {'root': '../'});
});

io.on('connection', function(socket){
    console.log('a user connected');
});

var Twitter = require('twitter');
var client = new Twitter({
   consumer_key: ckey,
   consumer_secret: csecret,
   access_token_key: akey,
   access_token_secret: asecret
});

client.stream('statuses/filter', {track: 'bindercon'}, function(stream) {
   stream.on('data', function(tweet) {
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

