window.MissionController = function ($http, $scope) {
  $scope.mission = [];
  $scope.currentPage = 1;
  $scope.pageSize = 5;
  $http
    .get("http://localhost:8080/api/admin/mission")
    .then(function (response) {
      $scope.mission = response.data.data;
    });
  $scope.viTri = -1;
  $scope.form_mission = {
    code: "",
    name: "",
    pointMission: "",
    describeMission: "",
  };

  $scope.detail = function (event, index) {
    event.preventDefault();
    $scope.viTri = index;
    $scope.form_mission.name = $scope.mission[index].name;
    $scope.form_mission.pointMission = $scope.mission[index].pointMission;
    $scope.form_mission.describeMission = $scope.mission[index].describeMission;
  };

  $scope.clearData = function () {
    $scope.form_mission.name = "";
    $scope.form_mission.pointMission = "";
    $scope.form_mission.describeMission = "";
  };

  $scope.add = function () {
    $http
      .post(
        "http://localhost:8080/api/admin/mission/create",
        $scope.form_mission
      )
      .then(function (response) {
        $scope.mission.push(response.data.data);
        alert("Thêm thành công");
      });
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
    let pro = $scope.mission[$scope.viTri];
    $http
      .put(
        `${"http://localhost:8080/api/admin/mission/update"}/${pro.id}`,
        $scope.form_mission
      )
      .then(function (response) {
        $scope.mission[$scope.viTri] = response.data.data;
        console.log(response.data.data);
        alert("Update thành công");
      });
  };
};
