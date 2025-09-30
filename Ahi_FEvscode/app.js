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
        templateUrl: 'views/forgotPassword.html', // make sure filename matches
        controller: 'ForgotPasswordController'
      })
      .otherwise({
        redirectTo: '/login'
      });

    // Optional: remove '!' from URLs for cleaner hash
    $locationProvider.hashPrefix('');
}]);
