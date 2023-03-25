var id = "";
window.addPointController = function ($scope, $http, $location, $route) {
  $scope.students = [];
  $scope.missions = [];
  $scope.currentPage = 1;
  $scope.pageSize = 5;
  $http
    .get("http://localhost:2508/api/admin/student")
    .then(function (responce) {
      $scope.students = responce.data.data;
    });

  $http
    .get("http://localhost:2508/api/admin/mission")
    .then(function (responce) {
      console.log(responce);
      $scope.missions = responce.data.data;
    });

  $scope.add = function () {
    var sum = 0;
    if ($scope.score1 != undefined) {
      sum = Number($scope.score1);
    }

    if ($scope.score2 != undefined) {
      sum += Number($scope.score2);
    }

    $http
      .post("http://localhost:2508/api/admin/point/add", {
        score: sum,
        note: $scope.note,
        studentId: id,
      })
      .then(function (responce) {
        if (responce.status == 200) {
          alert("Thêm thành công");
          window.location.reload();
        }
      });
  };

  $scope.getId = function (idInTable) {
    id = idInTable;
  };
};
