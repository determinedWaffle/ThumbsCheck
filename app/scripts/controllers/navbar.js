angular.module('thumbsCheckApp')
  .controller('NavBarCtrl', function($scope, $rootScope, Auth, broadcastInstructorRole) {
    $scope.logout = function() {
      Auth.$unauth();
    };
    $scope.role = 'student';
    broadcastInstructorRole.listen(function(val) {$scope.role = 'instructor'; })
  })
