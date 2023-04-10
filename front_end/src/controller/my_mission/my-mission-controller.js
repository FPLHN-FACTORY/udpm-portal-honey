window.MyMissionController = function($scope,$http){
    $scope.mission = [];
    $scope.currentPage = 1;
    $scope.pageSize = 5;
    $scope.size = 0;
    var studentCode = 'SV1'; 
    $http
    .get(
      `${"http://localhost:2508/api/admin/mission/my-mission"}/${studentCode}`
    )
    .then(function (response) {
      $scope.mission = response.data.data;
      $scope.size = response.data.data.length
      
    });


    

}