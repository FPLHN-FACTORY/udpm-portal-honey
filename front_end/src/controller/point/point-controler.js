var id = "";
window.addPointController = function($scope,$http,$location,$route){
    $scope.students = []
    $scope.missions = []
    $scope.currentPage = 1;
    $scope.pageSize = 5;
    $http.get("http://localhost:8080/api/admin/student").then(
        function(responce){
            $scope.students = responce.data.data;
        }
    )

    $http.get("http://localhost:8080/api/admin/mission").then(
        function(responce){
            console.log(responce)
            $scope.missions = responce.data.data;
        }
    )

    $scope.add = function(){
        if($scope.score == undefined){
            alert("Bạn phải chọn 1 nhiệm vụ ")
        } else{
        $http.post("http://localhost:8080/api/admin/point/add",{
            score:$scope.score,
            note:$scope.note,
            studentId:id
        }).then(
           function(responce){
            if(responce.status == 200){
              alert("Thêm thành công")
              window.location.reload();
            }
           }
        )
    }

    }

    $scope.getId = function(idInTable){
        id = idInTable;
    }

   

}