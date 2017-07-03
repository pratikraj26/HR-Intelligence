hri
.controller('landingController', ['$scope', '$location', '$http','$routeParams',
  function landingController($scope, $location, $http, $routeParams) {
 $scope.trainModel = function() {
   $http.get('/intelligence/train').then(function() {
     console.log("Model Trained");
   }, function() {
     console.log("Model Training Failed");
   })
 }
 $scope.evaluateModel = function() {
  $location.url('/list/' +$routeParams.token);
 }
 $scope.addEmployee = function() {
 	$location.url('/addEmployee');
 }
}]);
