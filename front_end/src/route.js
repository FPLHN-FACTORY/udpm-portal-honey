var app = angular.module("myModule", ["ngRoute"]);
app.config(function ($routeProvider, $locationProvider) {
  $locationProvider.hashPrefix("");
  $routeProvider
    .when("/trang-chu", {
      templateUrl:"pages/home.html"
    }).when("/nhiem-vu",{
      templateUrl:"pages/mission.html",
      controller:"missionController"
    }).when("/diem-thuong",{
      templateUrl:"pages/point.html"
    })
    .otherwise({
      redirectTo: "/home",
    });
});
