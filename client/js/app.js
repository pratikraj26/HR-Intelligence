var hri = angular.module('hri', [
  'ngRoute',
  'data-table'
]);

hri.config(function ($routeProvider, $compileProvider) {
  $compileProvider.preAssignBindingsEnabled(true);
  $routeProvider.
  when('/landing/:token', {
    templateUrl: 'views/landing.html',
    controller: 'landingController'
  }).
  when('/list/:token', {
    templateUrl: 'views/list.html',
    controller: 'listController'
  }).
  when('/login', {
    templateUrl: 'views/login.html',
    controller: 'loginController'
  }).
  when('/addEmployee', {
    templateUrl: 'views/addEmp.html',
    controller: 'landingController'
  }).
  otherwise({redirectTo:'/login'});
})
