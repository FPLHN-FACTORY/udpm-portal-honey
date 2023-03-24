var app = angular.module("myModule", [
  "ngRoute",
  "angularUtils.directives.dirPagination",
]);
app.config(function ($routeProvider, $locationProvider) {
  $locationProvider.hashPrefix("");
  $routeProvider
    .when("/trang-chu", {
      templateUrl: "pages/home.html",
      controller: addPointController,
    })
    .when("/mission", {
      templateUrl: "pages/mission.html",
      controller: MissionController,
    })
    .when("/mission/add", {
      templateUrl: "pages/mission.html",
      controller: MissionController,
    })
    .when("/mission/update/:id", {
      templateUrl: "pages/mission.html",
      controller: MissionController,
    })
    .when("/mission/delete/:id", {
      templateUrl: "pages/mission.html",
      controller: MissionController,
    })
    .when("/diem-thuong", {
      templateUrl: "pages/point.html",
    })
    .when("/gift", {
      templateUrl: "pages/gift.html",
      controller: GiftController,
    })
    .when("/gift/add", {
      templateUrl: "pages/gift.html",
      controller: GiftController,
    })
    .when("/gift/update/:id", {
      templateUrl: "pages/gift.html",
      controller: GiftController,
    })
    .when("/gift/delete/:id", {
      templateUrl: "pages/gift.html",
      controller: GiftController,
    })
    .otherwise({
      redirectTo: "/trang-chu",
    });
});

app.directive("myTooltip", function () {
  return {
    restrict: "A",
    scope: {
      tooltipContent: "@",
    },
    link: function (scope, element, attrs) {
      $(element).attr("data-bs-toggle", "tooltip");
      $(element).attr("title", scope.tooltipContent);
      $(element).attr("data-bs-placement", "top");
      $(element).tooltip();
      $(element).click(function () {
        $(element).tooltip("dispose");
      });
      $(element).mouseenter(function () {
        $(element).tooltip();
      });
      scope.$watch("tooltipContent", function (newVal) {
        $(element).tooltip("dispose");
        $(element).attr("data-bs-toggle", "tooltip");
        $(element).attr("title", newVal);
        $(element).attr("data-bs-placement", "top");
        $(element).tooltip();
      });
    },
  };
});
