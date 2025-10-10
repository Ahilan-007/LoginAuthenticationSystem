angular.module('ibmLoginApp', ['ngRoute'])
  .constant('API_URL', 'https://loginauthenticationsystem.onrender.com') // API URL
  .config(['$routeProvider', '$locationProvider', function($routeProvider, $locationProvider) {
    $routeProvider
      .when('/login', {
        templateUrl: 'views/login.html',
        controller: 'LoginController'
      })
      .when('/register', {   // Register route
        templateUrl: 'views/register.html',
        controller: 'RegisterController'
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

    // Ensure AngularJS routing works without hashbang conflicts
    $locationProvider.hashPrefix('');
  }]);
