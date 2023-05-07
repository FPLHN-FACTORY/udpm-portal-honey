window.MyMissionController = function ($scope, $http) {
  $scope.mission = [];
  $scope.currentPage = 1;
  $scope.pageSize = 5;
  $scope.size = true;
  var studentCode = 'SV1';
  $scope.flag = false;
  // $http
  //   .get(
  //     `${"http://localhost:2508/api/admin/mission/my-mission"}/${studentCode}`
  //   )
  //   .then(function (response) {
  //     $scope.mission = response.data.data;
  //     $scope.flag = response.data.data.length > 0 ? true : false;
  //     console.log($scope.mission)
  //   });

    setInterval(function(){
      $http
      .get(
        `${"http://localhost:2508/api/admin/mission/my-mission"}/${studentCode}`
      )
      .then(function (response) {
        $scope.mission = response.data.data;
        $scope.flag = response.data.data.length > 0 ? true : false;
      });
    },1000)
    
    
}