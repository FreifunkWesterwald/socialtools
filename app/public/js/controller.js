
twitterwall.controller('tweetCtrl', function($scope,socket){
	$scope.tweets = [];
	
	socket.on("newTweet",  function(msg){

	 
	  $scope.tweets.unshift(msg);

	  $scope.tweets = $scope.tweets.slice(0,6);		

	  console.log("Länge der Tweetwall:", $scope.tweets.length);	  
	  console.log("after push: ",$scope.tweets);
	});
	

});
