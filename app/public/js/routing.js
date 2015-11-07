// Routing der Seiten
twitterwall.config(function ($routeProvider){
  $routeProvider.when("/", {
     templateUrl: "pages/tweets.html",
     controller: "tweetCtrl"
   })
   .otherwise({
     redirectTo: "/"
   });
 });
