window.MissionController = function ($http, $scope) {
  $scope.mission = [];
  $scope.currentPage = 1;
  $scope.pageSize = 5;
  $http
    .get("http://localhost:8080/api/admin/mission")
    .then(function (response) {
      $scope.mission = response.data.data;
    });

  $scope.form_mission = {
    code: "",
    name: "",
    pointMission: "",
    describeMission: "",
  };

  $scope.detail = function (event, id) {
    event.preventDefault();
    $http
      .get("http://localhost:8080/api/admin/mission")
      .then(function (response) {
        $scope.missionDetail = $scope.mission.filter((detail) => {
          return detail.id == id;
        })[0];
        $scope.form_mission.name = $scope.missionDetail.name;
        $scope.form_mission.pointMission = $scope.missionDetail.pointMission;
        $scope.form_mission.describeMission =
          $scope.missionDetail.describeMission;
        $scope.id = id;
      });
  };

  $scope.clearData = function () {
    $scope.form_mission.name = "";
    $scope.form_mission.pointMission = "";
    $scope.form_mission.describeMission = "";
  };

  $scope.add = function (event) {
    event.preventDefault();
    if ($scope.form_mission.name == "") {
      alert("Vui lòng nhập tên");
    } else {
      $http
        .post(
          "http://localhost:8080/api/admin/mission/create",
          $scope.form_mission
        )
        .then(function (response) {
          $scope.mission.push(response.data.data);
          alert("Thêm thành công");
        });
    }
  };

  $scope.delete = function (event, index) {
    event.preventDefault();
    let pro = $scope.mission[index];
    $http
      .delete(`${"http://localhost:8080/api/admin/mission/delete"}/${pro.id}`)
      .then(function (response) {
        $scope.mission.splice(index, 1);
        alert("Xóa thành công");
      });
  };

  $scope.update = function (event) {
    event.preventDefault();
    let id = $scope.id;
    let viTri = -1;
    $http
      .put(
        `${"http://localhost:8080/api/admin/mission/update"}/${id}`,
        $scope.form_mission
      )
      .then(function (response) {
        for (let index = 0; index < $scope.mission.length; index++) {
          const element = $scope.mission[index];
          if (element.id === id) {
            viTri = index;
          }
        }
        $scope.mission[viTri] = response.data.data;
        alert("Update thành công");
      });
  };
};
