
twitterwall.controller('tweetCtrl', function($scope,socket){
	$scope.tweets = [];

	socket.on("newTweet",  function(msg){

	  msg.text = msg.text.replace(
		  /(https?:\/\/)[^\s]*/gi,
	  	  function (link){
			  return "<a href='" + link + "'>" + link + "</a>";
	      }
  	  );

	  console.log("entities:", msg.entities);

	  msg.text = msg.text.replace(
		  /(#|@)[^\s,.:]*/gi,
	  	  function (t){
			  var href = "https://twitter.com/" + t;
			  return "<a href='" + href + "'>" + t + "</a>";
	      }
  	  );

	  var rowCount = Math.round(screen.width / 400);
	  console.debug(rowCount);

	  $scope.tweets.unshift(msg);
	  $scope.tweets = $scope.tweets.slice(0, rowCount * 2);

	  console.log("Länge der Tweetwall:", $scope.tweets.length);
	  console.log("after push: ",$scope.tweets);
	});


});
