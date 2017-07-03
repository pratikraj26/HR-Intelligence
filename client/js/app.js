var hri = angular.module('hri', [
  'ngRoute'
]);

hri.config(function ($routeProvider) {
  $routeProvider.
  when('/landing', {
    templateUrl: 'views/landing.html',
    controller: 'landingController'
  }).
  when('/list', {
    templateUrl: 'views/list.html',
    controller: 'listController'
  }).
  when('/login', {
    templateUrl: 'views/login.html',
    controller: 'loginController'
  }).
  when('/evaluate', {
    templateUrl: 'views/evaluate.html',
    controller: 'evaluateController'
  }).
  otherwise({redirectTo:'/login'});
})
