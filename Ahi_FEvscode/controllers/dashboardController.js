angular.module('ibmLoginApp')
.controller('DashboardController', function($scope, $window, $http, AuthService, $location) {

  if (!AuthService.isAuthenticated()) {
    $location.path('/login');
    return;
  }

  $scope.message = '';
  $scope.error = '';

  const token = $window.localStorage.getItem('token');

  $http.get('http://localhost:5000/dashboard', {
    headers: { 'x-access-token': token }
  })
  .then(res => {
    $scope.message = res.data.message;
  })
  .catch(err => {
    $scope.error = err.data.message || 'Error fetching dashboard';
    if (err.status === 401 || err.status === 403) {
      AuthService.logout();
      $location.path('/login');
    }
  });

  $scope.logout = function() {
    AuthService.logout();
    $location.path('/login');
  };
});
