var app = angular.module("myModule", ["ngRoute"]);
app.config(function ($routeProvider, $locationProvider) {
  $locationProvider.hashPrefix("");
  $routeProvider
    .when("/trang-chu", {
      templateUrl:"pages/home.html"
    }).when("/nhiem-vu",{
      templateUrl:"pages/mission.html",
      controller: MissionController,
    }).when("/diem-thuong",{
      templateUrl:"pages/point.html"
    }).when("/them-diem-thuong",{
      templateUrl:"pages/addPoint.html",
      controller: addPointController,
    })
    .otherwise({
      redirectTo: "/trang-chu",
    });
});
