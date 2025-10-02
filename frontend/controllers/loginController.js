angular.module('ibmLoginApp')
.controller('LoginController', function($scope, AuthService, $window, $location) {

  $scope.credentials = { email: '', password: '' };
  $scope.error = '';

  $scope.login = function() {
    AuthService.login($scope.credentials)
      .then(function(res) {
        console.log('Token saved:', res.token);
        $location.path('/dashboard');
      })
      .catch(function(err) {
        console.error('Login failed:', err.message || err.data.message);
        $scope.error = err.message || err.data.message;
      });
  };
});
