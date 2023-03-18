window.MissionController = function($http,$scope){
    $scope.mission = [];
    $scope.currentPage = 1;
    $scope.pageSize = 5;
    $http.get("http://localhost:8080/api/admin/mission").then(function (response) {
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
    }
  
    $scope.add = function (event) {
      event.preventDefault();
      console.log($scope.form_mission);
      $http.post("http://localhost:8080/api/admin/mission/create", $scope.form_mission).then(function (response) {
        $scope.mission.push(response.data);
        alert("Thêm thành công");
        window.location.reload();
      });
    };
  
    $scope.delete = function (event, index) {
      event.preventDefault();
      let pro = $scope.mission[index];
      $http.delete(`${"http://localhost:8080/api/admin/mission/delete"}/${pro.id}`).then(function (response) {
        alert("Xóa thành công");
        window.location.reload();
      });
    };
  
    $scope.update = function (event) {
      event.preventDefault();
      let pro = $scope.mission[$scope.viTri];
      $http.put(`${"http://localhost:8080/api/admin/mission/update"}/${pro.id}`, $scope.form_mission).then(function (response) {
        alert("Update thành công");
        window.location.reload();
      });
    };
};