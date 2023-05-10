window.MyGiftController = function ($http, $scope) {
    $scope.gift = [];
    $scope.currentPage = 1;
    $scope.pageSize = 5;
    $scope.size = 0 ;
    $http.get("http://localhost:2508/api/admin/gift/my-gift").then(function (response) {
      $scope.gift = response.data.data;
      $scope.size = $scope.gift.length
      console.log($scope.size)
    });
  
   
   
  };
  