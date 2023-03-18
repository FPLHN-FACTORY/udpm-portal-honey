var app = angular.module("myModule", ["ngRoute",'angularUtils.directives.dirPagination']);
app.config(function ($routeProvider, $locationProvider) {
  $locationProvider.hashPrefix("");
  $routeProvider
    .when("/trang-chu", {
      templateUrl:"pages/home.html",
      controller: addPointController,
    }).when("/mission",{
      templateUrl:"pages/mission.html",
      controller: MissionController,
    }).when("/diem-thuong",{
      templateUrl:"pages/point.html"
    }).when("/gift",{
      templateUrl:"pages/gift.html",
      controller: GiftController,
    })
    .otherwise({
      redirectTo: "/trang-chu",
    });
});
