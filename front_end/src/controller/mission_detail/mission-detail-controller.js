
window.MissionDetailController = function($scope, $http,$routeParams,$window){

  $scope.myMissions = [];
  $scope.currentPage = 1;
  $scope.pageSize = 5;
  $scope.size = false;
  $scope.missionCode = $routeParams.missionCode;
  $scope.studentCode = 'SV1';

  $http
  .get(
    `${"http://localhost:2508/api/admin/document/find-all-by-ms-detail-id"}?missionCode=${$scope.missionCode}&studentCode=${$scope.studentCode}`)
  .then(function (response) {
    $scope.myMissions = response.data.data;
    $scope.size = $scope.myMissions.length > 0 ?true:false;
  });
  // end find all

  $scope.upload = function(){
     var files = document.getElementById("file").files;

     if(files.length > 1){
        alert("Bạn chỉ được chọn 1 file");
     }else{
      var fd = new FormData();
      fd.append('file',files[0]);
     $http
     .post(
      `${"http://localhost:2508/api/admin/mission-detail/uploadFiles"}?missionCode=${$scope.missionCode}&studentCode=${$scope.studentCode}` ,fd,{
      transformRequest : angular.identity,
      headers : {
          'Content-Type' : undefined
      }})
     .then(function (response) {
      $window.location.reload()
       alert("upload thành công ...")
       $scope.myMissions.push(response.data.data);
       
     });
    }
  
  }
  // end upload
  
  $scope.delete = function(event,index,id){
    event.preventDefault();
    $http
    .delete(
      `${"http://localhost:2508/api/admin/mission-detail/delete-mission-detail"}?documentId=${id}&studentCode=${$scope.studentCode}`
    )
    .then(function (response) {
      $window.location.reload()
      alert("Xóa thành công ...")
      $scope.myMissions.splice(index, 1);
    });
  }

}

