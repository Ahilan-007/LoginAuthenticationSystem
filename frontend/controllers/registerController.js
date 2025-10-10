angular.module("ibmLoginApp")
  .controller("RegisterController", ["$scope", "$http", "$location", function($scope, $http, $location) {

    $scope.user = {};
    $scope.error = null;
    $scope.success = null;

    $scope.register = function() {
      $scope.error = null;
      $scope.success = null;

      // Basic validation
      if (!$scope.user.name || !$scope.user.email || !$scope.user.password) {
        $scope.error = "All fields are required";
        return;
      }

      $http.post(API_URL + "/register", $scope.user)
        .then(function(response) {
          $scope.success = response.data.message;

          // Clear form
          $scope.user = {};

          // Redirect to login after 2 seconds
          setTimeout(function() {
            $scope.$apply(function() {
              $location.path("/login");
            });
          }, 2000);

        })
        .catch(function(err) {
          console.error(err);
          $scope.error = err.data?.message || "Registration failed";
        });
    };

  }]);
