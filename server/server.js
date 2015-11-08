
var express = require('express');
var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);
var tweetcache = [];
var tweettrack = '#Freifunk, #ORR, #ORR2015, #OpenRheinRuhr';
require('../../cred.js')
app.use('/', express.static('../app/public'));
app.use('/public/css', express.static('../app/public/css'));
app.use('/public/js', express.static('../app/public/js'));


app.get('/', function(req, res){
   dir = req.params.dir,
   res.sendFile('app/index.html', {'root': '../'});
});

io.on('connection', function(socket){
    console.log('a user connected');
    for (i = 0; i < tweetcache.length; i++) {
    	io.emit('newTweet', (tweetcache[i]));
    }
    io.emit('changedSearchstring', (tweettrack));
    
});

var Twitter = require('twitter');
var client = new Twitter({
   consumer_key: ckey,
   consumer_secret: csecret,
   access_token_key: akey,
   access_token_secret: asecret
});


client.get('search/tweets', {q: 'orr'}, function(error, tweets, response){
   if(error) throw error;
      for (i = 0; i < 10 ; i++) {
     	tweetcache.unshift(tweets.statuses[i]);        
      }

});

client.stream('statuses/filter', {track: '@Freifunk, #Freifunk, @FreifunkWW, #FreifunkWW, #ORR, #ORR15, #ORR2015, #OpenRheinRuhr'}, function(stream) {


 stream.on('data', function(tweet) {
      tweetcache.unshift(tweet);
      tweetcache = tweetcache.slice(0,6);
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
