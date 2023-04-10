
window.MissionDetailController = function($scope, $http,$location,$window){

  $scope.myMissions = [];
  $scope.currentPage = 1;
  $scope.pageSize = 5;

  $http
  .get("http://localhost:2508/api/admin/mission-detail")
  .then(function (response) {
    $scope.myMissions = response.data.data;
    console.log($scope.myMissions)
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
     .post("http://localhost:2508/api/admin/mission-detail/uploadFiles",fd,{
      transformRequest : angular.identity,
      headers : {
          'Content-Type' : undefined
      }})
     .then(function (response) {
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
      `${"http://localhost:2508/api/admin/mission-detail/delete-mission-detail"}/${id}`
    )
    .then(function (response) {
      alert("Xóa thành công ...")
      $scope.myMissions.splice(index, 1);
    });
  }

  // $scope.download = function(event,index,id){
  //   event.preventDefault();
  //   window.location.href="google.com";
  // }


}

