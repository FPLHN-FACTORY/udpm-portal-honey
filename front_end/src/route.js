var app = angular.module("myModule", ["ngRoute"]);
app.config(function ($routeProvider, $locationProvider) {
  $locationProvider.hashPrefix("");
  $routeProvider
    .when("/trang-chu", {
      templateUrl:"pages/home.html"
    }).when("/mission",{
      templateUrl:"pages/mission.html",
      controller: MissionController,
    }).when("/diem-thuong",{
      templateUrl:"pages/point.html"
    }).when("/them-diem-thuong",{
      templateUrl:"pages/addPoint.html",
      controller: addPointController,
    })
    .when("/gift",{
      templateUrl:"pages/gift.html",
      controller: GiftController,
    })
    .otherwise({
      redirectTo: "/trang-chu",
    });
});
