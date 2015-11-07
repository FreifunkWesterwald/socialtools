twitterwall.factory('tweetFactory',function(){
	var tweets = [];
	var socket = io();

	socket.on("newTweets",  function(msg){
	  console.log("new Tweets");
	  tweets = angular.fromJSON(msg);
	});

	return {
		getTweets = function(){
			return tweets;
		}
	}

});
