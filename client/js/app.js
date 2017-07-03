var hri = angular.module('hri', [
  'ngRoute',
  'data-table'
]);

hri.config(function ($routeProvider) {
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
  when('/evaluate/:token', {
    templateUrl: 'views/evaluate.html',
    controller: 'evaluateController'
  }).
  otherwise({redirectTo:'/login'});
})
