 var id = "";
window.addPointController = function($scope,$http,$location,$route){
    $scope.students = []
    $http.get("http://localhost:8080/api/admin/student").then(
        function(responce){
            console.log(responce)
            $scope.students = responce.data.data;
        }
    )

    $scope.add = function(){
        
       if($scope.score == undefined || $scope.score == null ){
        alert("Bạn phải nhập đầy đủ các trường tương ứng");
       }else if(Number($scope.score) < 0 ){
        alert("Bạn phải nhập điểm là số dương")
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