angular.module('ibmLoginApp')
.factory('AuthService', function($http, $window) {

  const API_URL = 'https://loginauthenticationsystem.onrender.com'; // Backend URL

  return {
    // Login user
    login: function(credentials) {
      return $http.post(`${API_URL}/login`, credentials)
        .then(function(res) {
          if (res.data.token) {
            $window.localStorage.setItem('token', res.data.token);
            $window.localStorage.setItem('username', res.data.name);
            return res.data;
          } else {
            return Promise.reject({ message: 'No token received' });
          }
        })
        .catch(function(err) {
          return Promise.reject(err.data || { message: 'Login failed' });
        });
    },

    // Logout user
    logout: function() {
      $window.localStorage.removeItem('token');
      $window.localStorage.removeItem('username');
    },

    // Check if authenticated
    isAuthenticated: function() {
      return !!$window.localStorage.getItem('token');
    },

    // Forgot password
    forgotPassword: function(email) {
      return $http.post(`${API_URL}/forgot-password`, { email })
        .then(res => res.data)
        .catch(err => Promise.reject(err.data || { message: 'Failed to send reset link' }));
    },

    // Get dashboard data
    getDashboard: function() {
      const token = $window.localStorage.getItem('token');
      if (!token) return Promise.reject({ message: 'No token found' });

      return $http.get(`${API_URL}/dashboard`, {
        headers: { 'x-access-token': token }
      })
      .then(res => res.data)
      .catch(err => Promise.reject(err.data || { message: 'Failed to fetch dashboard' }));
    }
  };
});
