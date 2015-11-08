
twitterwall.controller('tweetCtrl', function($scope,socket){
	$scope.tweets = [];

	socket.on("newTweet",  function(msg){

	  msg.text = msg.text.replace(
		  /(https?:\/\/)[^\s]*/gi,
	  	  function (link){
			  return "<a href='" + link + "'>" + link + "</a>";
	      }
  	  );
	  msg.text = msg.text.replace(
		  /(#|@)[^\s,.]*/gi,
	  	  function (t){
			  var href = "https://twitter.com/" + t;
			  return "<a href='" + href + "'>" + t + "</a>";
	      }
  	  );


	  $scope.tweets.unshift(msg);
	  $scope.tweets = $scope.tweets.slice(0,6);

	  console.log("Länge der Tweetwall:", $scope.tweets.length);
	  console.log("after push: ",$scope.tweets);
	});


});
