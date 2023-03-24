window.GiftController = function ($http, $scope) {
  $scope.gift = [];
  $scope.currentPage = 1;
  $scope.pageSize = 5;
  $http.get("http://localhost:8080/api/admin/gift").then(function (response) {
    $scope.gift = response.data.data;
  });

  $scope.form_gift = {
    code: "",
    name: "",
    pointGift: "",
    note: "",
  };

  $scope.detail = function (event, id) {
    event.preventDefault();
    $http
      .get("http://localhost:8080/api/admin/mission")
      .then(function (response) {
        $scope.giftDetail = $scope.gift.filter((detail) => {
          return detail.id == id;
        })[0];
        $scope.form_gift.name = $scope.giftDetail.name;
        $scope.form_gift.pointGift = $scope.giftDetail.pointGift;
        $scope.form_gift.note = $scope.giftDetail.note;
        $scope.id = id;
      });
  };

  $scope.clearData = function () {
    $scope.form_gift.name = "";
    $scope.form_gift.pointGift = "";
    $scope.form_gift.note = "";
  };

  $scope.add = function (event) {
    event.preventDefault();
    $http
      .post("http://localhost:8080/api/admin/gift/create", $scope.form_gift)
      .then(function (response) {
        $scope.gift.push(response.data.data);
        alert("Thêm thành công");
      });
  };

  $scope.delete = function (event, index) {
    event.preventDefault();
    let pro = $scope.gift[index];
    $http
      .delete(`${"http://localhost:8080/api/admin/gift/delete"}/${pro.id}`)
      .then(function (response) {
        $scope.gift.splice(index, 1);
        alert("Xóa thành công");
      });
  };

  $scope.update = function (event) {
    event.preventDefault();
    let id = $scope.id;
    let viTri = -1;
    $http
      .put(
        `${"http://localhost:8080/api/admin/gift/update"}/${id}`,
        $scope.form_gift
      )
      .then(function (response) {
        for (let index = 0; index < $scope.gift.length; index++) {
          const element = $scope.gift[index];
          if (element.id === id) {
            viTri = index;
          }
        }
        $scope.gift[viTri] = response.data.data;
        alert("Update thành công");
      });
  };
};
