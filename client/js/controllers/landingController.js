hri
.controller('landingController', ['$scope', '$location', '$http','$routeParams','$timeout',
	function landingController($scope, $location, $http, $routeParams, $timeout) {
		if($routeParams.token == "added"){
			$scope.added = true;
			$scope.msg = "Employee added successfully";
			$scope.class = "success";
			$timeout(function(){
				$scope.added = false;
			},3000)
		}else if($routeParams.token == "error"){
			$scope.msg = "Error occured! Please try again";
			$scope.added = true;
			$scope.class = "error";
			$timeout(function(){
				$scope.added = false;
			},3000)
		}
		$scope.btnText = "Train";
 $scope.trainModel = function() {
 	$scope.loader = true;
 	$scope.btnText = "Processing";
   $http.get('/intelligence/train').then(function() {
   	$scope.loader = false;
   	$scope.btnText = "Train";
     console.log("Model Trained");
   }, function() {
   	$scope.btnText = "Train";
   	$scope.loader = false;
     console.log("Model Training Failed");
   })
 }
 $scope.evaluateModel = function() {
  $location.url('/list/' +$routeParams.token);
 }
 $scope.addEmployee = function() {
 	$location.url('/addEmployee');
 }
		$scope.userDetails = {
			name: {
				firstName: '',
				lastName: ''
			},
			email: '',
			sapID: '',
			currentProject: '',
			salary: ''
		}
		$scope.addEmp = function() {
			console.log($scope);
			$http.post('/employee', JSON.stringify($scope.userDetails)).then(function(data) {
				$scope.firstName ='';
				$scope.lastName='';
				$scope.email='';
				$scope.sapID='';
				$scope.currentProject='';
				$scope.salary='';
				$scope.added = true;
				$location.url('/landing/added');
				
				//setTimeout(function(){}, 3000);
			}, function() {
				$location.url('/landing/error');
				console.log("Login failed");
			});
		}
}]);
