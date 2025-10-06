angular.module('ibmLoginApp')
.factory('DashboardService', function($http, $window) {
  const API_URL = 'https://loginauthenticationsystem.onrender.com';

  return {
    getDashboardData: function() {
      const token = $window.localStorage.getItem('token');
      return $http.get(API_URL + '/dashboard', {
        headers: { 'x-access-token': token }
      });
    }
  };
});
