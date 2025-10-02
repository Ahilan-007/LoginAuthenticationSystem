angular.module('ibmLoginApp')
.controller('LoginController', function($scope, AuthService, $location) {

  $scope.credentials = { email: '', password: '' };
  $scope.error = '';

  $scope.login = function() {
    $scope.error = ''; // reset previous error
    AuthService.login($scope.credentials)
      .then(function(res) {
        console.log('✅ Token saved:', res.token);
        // Redirect to dashboard after successful login
        $location.path('/dashboard');
      })
      .catch(function(err) {
        console.error('❌ Login failed:', err.message || 'Unknown error');
        $scope.error = err.message || 'Login failed. Please try again.';
      });
  };
});
