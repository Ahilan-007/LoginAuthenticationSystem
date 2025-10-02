angular.module('ibmLoginApp')
.factory('DashboardService', function($http, $window) {
  const API_URL = 'http://localhost:5000';

  return {
    getDashboardData: function() {
      const token = $window.localStorage.getItem('token');
      return $http.get(API_URL + '/dashboard', {
        headers: { 'x-access-token': token }
      });
    }
  };
});
