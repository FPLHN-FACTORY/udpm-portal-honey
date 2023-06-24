var id = "";
var point = "";
window.addPointController = function ($scope, $http) {
  $scope.students = [];
  $scope.missions = [];
  $scope.history = [];
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

  $scope.history = function (event, id) {
    event.preventDefault();
    $http
      .get(`${"http://localhost:2508/api/admin/gift-history"}/${id}`)
      .then(function (response) {
        $scope.history = response.data.data;
      });
  };

  // $scope.gift = [];
  // $http.get("http://localhost:2508/api/admin/gift").then(function (response) {
  //   $scope.gift = response.data.data;
  // });

  // $scope.clearSelection = function () {
  //   angular.forEach($scope.gift, function (g) {
  //     g.selected = false;
  //   });
  // };

  // $scope.selectAll = false;
  // $scope.toggleAll = function () {
  //   if ($scope.selectAll) {
  //     angular.forEach($scope.gift, function (g) {
  //       g.selected = false;
  //       $scope.selectedRows = [];
  //     });
  //   } else {
  //     angular.forEach($scope.gift, function (g) {
  //       g.selected = true;
  //       $scope.toggleSelection(g);
  //     });
  //   }
  //   console.log($scope.selectedRows);
  // };

  // $scope.selectedRows = [];
  // $scope.toggleSelection = function (g) {
  //   let index = $scope.selectedRows.indexOf(g.id);
  //   if (index > -1) {
  //     $scope.selectedRows.splice(index, 1);
  //   } else {
  //     $scope.selectedRows.push({
  //       giftId: g.id,
  //       studentId: id,
  //     });
  //   }
  // };

  // $scope.addHistory = function (event) {
  //   event.preventDefault();
  //   var sum = 0;
  //   if (point != undefined) {
  //     sum = Number($scope.score);
  //   }

  //   if (point != undefined) {
  //     sum += Number($scope.score2);
  //   }
  //   $http
  //     .post(
  //       "http://localhost:2508/api/admin/gift-history/create",
  //       $scope.selectedRows
  //     )
  //     .then(function (responce) {
  //       $scope.selectedRows = [];
  //       $scope.clearSelection();
  //     });
  // };
};
