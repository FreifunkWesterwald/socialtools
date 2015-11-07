
twitterwall.controller('tweetCtrl', function($scope, tweetFactory){
	$scope.tweets = tweetFactory.getTweets();
	console.log($scope.tweets);

});
