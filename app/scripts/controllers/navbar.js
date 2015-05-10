angular.module('thumbsCheckApp')
  .controller('NavBarCtrl', function($scope, Auth, verifyInstructorService) {
    $scope.logout = function() {
      Auth.$unauth();
    };

    $scope.role = 'student';

    verifyInstructorService.listenOnUserEmit(function() {
      $scope.role = 'instructor';
    });
  });
