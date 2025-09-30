angular.module('ibmLoginApp')
.factory('AuthService', function($http, $window) {

  const API_URL = 'http://localhost:5000'; // Backend URL

  return {
    login: function(credentials) {
      return $http.post(API_URL + '/login', credentials)
        .then(res => {
          if(res.data.token){
            $window.localStorage.setItem('token', res.data.token);
            return res.data;
          } else {
            return Promise.reject({ message: 'No token received' });
          }
        });
    },
    logout: function() {
      $window.localStorage.removeItem('token');
    },
    isAuthenticated: function() {
      return !!$window.localStorage.getItem('token');
    },
    forgotPassword: function(email) {
      return $http.post(API_URL + '/forgot-password', { email });
    }
  };
});
