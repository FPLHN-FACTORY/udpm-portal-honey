var app = angular.module("myApp", ["ngRoute",'angularUtils.directives.dirPagination']);
app.config(function ($routeProvider, $locationProvider) {
  $locationProvider.hashPrefix("");
  $routeProvider
    .when("/sv-home", {
      templateUrl:"pages/sv-home.html",
      controller: addPointController,
    })
    .when("/sv-gift", {
        templateUrl:"pages/sv-gift.html",
        controller: GiftController,
      })
      .when("/sv-mission", {
        templateUrl:"pages/sv-mission.html",
        controller: MissionController,
      })
    .otherwise({
      redirectTo: "/sv-home",
    });
});
