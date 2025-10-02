angular.module('ibmLoginApp', ['ngRoute'])
.config(['$routeProvider', '$locationProvider', function($routeProvider, $locationProvider) {
  $routeProvider
    .when('/login', {
      templateUrl: 'views/login.html',
      controller: 'LoginController'
    })
    .when('/dashboard', {
      templateUrl: 'views/dashboard.html',
      controller: 'DashboardController'
    })
    .when('/forgot-password', {
      templateUrl: 'views/forgotPassword.html',
      controller: 'ForgotPasswordController'
    })
    .otherwise({
      redirectTo: '/login'
    });

  // Remove '!' from URLs for cleaner hash-based routing
  $locationProvider.hashPrefix('');
}]);
