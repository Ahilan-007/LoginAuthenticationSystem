angular.module('ibmLoginApp')
.controller('ForgotPasswordController', function($scope, AuthService) {

  $scope.email = '';
  $scope.message = '';
  $scope.error = '';

  $scope.resetPassword = function() {
    if (!$scope.email) {
      $scope.error = 'Please enter a valid email.';
      $scope.message = '';
      return;
    }

    AuthService.forgotPassword($scope.email)
      .then(res => {
        console.log('✅ Forgot password response:', res.data);
        $scope.message = res.data?.message || 'Password reset link sent.';
        $scope.error = '';
      })
      .catch(err => {
        console.error('❌ Forgot password error:', err);

        // Robust error extraction
        let errorMessage = 'Error resetting password';
        if (err?.data?.message) {
          errorMessage = err.data.message;
        } else if (err?.message) {
          errorMessage = err.message;
        } else if (typeof err === 'string') {
          errorMessage = err;
        }

        $scope.error = errorMessage;
        $scope.message = '';
      });
  };
});
