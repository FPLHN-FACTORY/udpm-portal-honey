var app = angular.module("myApp", [
  "ngRoute",
  "angularUtils.directives.dirPagination",
]);
app.config(function ($routeProvider, $locationProvider) {
  $locationProvider.hashPrefix("");
  $routeProvider
    .when("/sv-home", {
      templateUrl: "pages/sv-home.html",
      controller: addPointController,
    })
    .when("/sv-gift", {
      templateUrl: "pages/sv-gift.html",
      controller: MyGiftController,
    })
    .when("/sv-mission", {
      templateUrl: "pages/sv-mission.html",
      controller: MissionStudentController,
    })
    .when("/sv-my-mission", {
      templateUrl: "pages/my_mission.html",
      controller: MyMissionController,
    })
    .when("/sv-mission-detail/:missionCode", {
      templateUrl: "pages/mission_detail.html",
      controller: MissionDetailController,
    })
    .when("/sv-my-mission/delete/:id", {
      templateUrl: "pages/mission_detail.html",
      controller: MissionDetailController,
    })
    .otherwise({
      redirectTo: "/sv-home",
    });
});
