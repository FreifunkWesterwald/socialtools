
twitterwall.controller('tweetCtrl', function($scope,socket){
	$scope.tweets = [];

	socket.on("newTweet",  function(msg){

	  $scope.tweets.unshift(stringToTwitter(msg));

	  $scope.tweets = $scope.tweets.slice(0,5);

	  console.log("Länge der Tweetwall:", $scope.tweets.length);
	  console.log("after push: ",$scope.tweets);

	  function stringToTwitter (string){
		    string.replace(/(#|@)\w*/gi,
		    function (t){
		        var href = "https://twitter.com/" + t;
		        return "<a href='" + href + "'>" + t + "</a>";
		    })
		};
	});


});
