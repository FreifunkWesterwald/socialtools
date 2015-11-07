twitterwall.controller('twitterCtrl',function(tweetFactory){
	var $scope.tweets = tweetFactory.getTweets();

	console.log($scope.tweets);
});
