angular.module('ibmLoginApp')
.controller('ForgotPasswordController', function($scope, AuthService) {

  $scope.email = '';
  $scope.message = '';
  $scope.error = '';

  $scope.resetPassword = function() {
    if(!$scope.email){
      $scope.error = 'Please enter a valid email.';
      return;
    }

    AuthService.forgotPassword($scope.email)
      .then(res => {
        $scope.message = res.data.message;
        $scope.error = '';
      })
      .catch(err => {
        $scope.error = err.data.message || 'Error resetting password';
        $scope.message = '';
      });
  };
});
