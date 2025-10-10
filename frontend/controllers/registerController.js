angular.module("ibmLoginApp")
  .controller("registerController", function($scope, $http, $location) {

    $scope.user = {};
    $scope.error = null;
    $scope.success = null;

    $scope.register = function() {
      $scope.error = null;
      $scope.success = null;

      $http.post(API_URL + "/register", $scope.user)
        .then(function(response) {
          $scope.success = response.data.message;
          // Optionally redirect to login after 2 seconds
          setTimeout(() => {
            $location.path("/login");
            $scope.$apply();
          }, 2000);
        })
        .catch(function(err) {
          $scope.error = err.data?.message || "Registration failed";
        });
    };

  });
