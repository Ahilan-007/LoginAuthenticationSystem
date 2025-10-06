angular.module('ibmLoginApp', ['ngRoute'])
.constant('API_URL', 'https://loginauthenticationsystem.onrender.com') // add this line
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

  $locationProvider.hashPrefix('');
}]);
