angular.module('thumbsCheckApp')
  .controller('NavBarCtrl', function($scope, Auth, verifyInstructorService) {
    $scope.logout = function() {
      Auth.$unauth();
    };

    $scope.role = 'student';
    console.log('testing', $scope.role)
    verifyInstructorService.listenOnUserEmit(function(){
      $scope.role = 'instructor';
    });
    console.log("testing2", $scope.role);
    //$rootScope.role = 'student';
    //broadcastInstructorRole.listen(function(val) {
    //  $scope.role = 'instructor'; 
    //  $rootScope.role = 'instructor';
    //});
  })
