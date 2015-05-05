angular.module('thumbsCheckApp')
  .controller('NavBarCtrl', function($scope, Auth) {
    $scope.logout = function() {
      Auth.$unauth();
    };
  });
