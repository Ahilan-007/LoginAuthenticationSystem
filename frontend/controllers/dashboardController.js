angular.module('ibmLoginApp') 
.controller('DashboardController', function($scope, $window, $http, AuthService, $location) {

  // Redirect to login if not authenticated
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
    console.log('✅ Dashboard data received:', res.data);
    $scope.message = res.data.message;
  })
  .catch(err => {
    console.error('❌ Dashboard fetch error:', err.data ? err.data.message : err);
    $scope.error = err.data ? err.data.message : 'Error fetching dashboard';

    // Logout and redirect if unauthorized
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
