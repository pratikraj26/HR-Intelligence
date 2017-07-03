hri.controller('loginController', ['$scope', '$location', '$http',function loginController($scope, $location, $http) {
  $scope.user = {
    email: "",
    password: ""
  }
  $scope.onLogin = function(user) {
    $http.post('/user/auth', JSON.stringify(user)).then(function(data) {
      var token = data.data.token;
      console.log(data);
      $location.url('/landing/'+token);
    }, function() {
      $location.url('/landing/54');
      console.log("Login failed");
    });
  }
}]);
