hri
.controller('landingController', ['$scope', '$location', '$http',function landingController($scope, $location, $http) {
 $scope.trainModel = function() {

 }
 $scope.evaluateModel = function() {
   $location.url('/list');
 }
 $scope.addEmployee = function() {

 }
}]);
