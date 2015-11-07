twitterwall.factory('tweetFactory',function(){
	var tweets = [];
	var socket = io();

	socket.on("newTweet",  function(msg){
	  console.log("new Tweets");
	  tweets.push(msg);
	  console.log(tweets);
	});

	return {
      getTweets: function () {
        return tweets;
      }
    };

});
