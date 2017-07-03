hri
.controller('listController', ['$scope', '$location', '$http',function listController($scope, $location, $http) {

  $scope.options = {
     rowHeight: 50,
     headerHeight: 50,
     footerHeight: false,
     scrollbarV: false,
     selectable: false,
     columns: [{
      name: "Name",
      prop: "name",
      width: 300
    }, {
      name: "Gender",
      prop: "gender",
      width: 300
    }, {
      name: "Company",
      prop: "company",
      width: 300
    }]
   };

   $scope.data = [
     { name: 'Austin', gender: 'Male', company: "abc" },
     { name: 'Marjan', gender: 'Male', company: "def" }
   ];

}]);
