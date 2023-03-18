window.GiftController = function($http,$scope){
    $scope.gift = [];
    $scope.currentPage = 1;
    $scope.pageSize = 5;
    $http.get("http://localhost:8080/api/admin/gift").then(function (response) {
        $scope.gift = response.data.data;
    });
    $scope.viTri = -1;
    $scope.form_gift = {
      code: "",
      name: "",
      pointGift: "",
      note: "",
    };
  
    $scope.detail = function (event, index) {
      event.preventDefault();
      $scope.viTri = index;
      $scope.form_gift.name = $scope.gift[index].name;
      $scope.form_gift.pointGift = $scope.gift[index].pointGift;
      $scope.form_gift.note = $scope.gift[index].note;
    };

    $scope.clearData = function () {
      $scope.form_gift.name = "";
      $scope.form_gift.pointGift = "";
      $scope.form_gift.note = "";
    }
  
    $scope.add = function (event) {
      event.preventDefault();
      console.log($scope.form_gift);
      $http.post("http://localhost:8080/api/admin/gift/create", $scope.form_gift).then(function (response) {
        $scope.gift.push(response.data);
        alert("Thêm thành công");
        window.location.reload();
      });
    };
  
    $scope.delete = function (event, index) {
      event.preventDefault();
      let pro = $scope.gift[index];
      $http.delete(`${"http://localhost:8080/api/admin/gift/delete"}/${pro.id}`).then(function (response) {
        alert("Xóa thành công");
        window.location.reload();
      });
    };
  
    $scope.update = function (event) {
      event.preventDefault();
      let pro = $scope.gift[$scope.viTri];
      $http.put(`${"http://localhost:8080/api/admin/gift/update"}/${pro.id}`, $scope.form_gift).then(function (response) {
        alert("Update thành công");
        window.location.reload();
      });
    };
};