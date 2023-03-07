var app = angular.module("myModule", ["ngRoute"]);
app.config(function ($routeProvider, $locationProvider) {
  $locationProvider.hashPrefix("");
  $routeProvider
    .when("/home", {
      templateUrl: "pages/home.html",
      controller: DongHoController,
    })
    .when("/home/detail/:id", {
      templateUrl: "pages/home.html",
      controller: DongHoController,
    })
    .when("/home/update/:id", {
      templateUrl: "pages/home.html",
      controller: DongHoController,
    })
    .when("/pages", {
      templateUrl: "pages/pages.html",
    })
    .otherwise({
      redirectTo: "/home",
    });
});
