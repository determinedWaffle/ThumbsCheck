angular.module('thumbsCheckApp')
  .controller('InstructorCtrl', function($scope, $firebaseObject, $firebase, $rootScope, $location){
    if ($rootScope.role !== 'instructor') {
        $location.path('/student-main');
    }
    var responsesRef = Ref.child('responses'); // collection within the database.
    var triggerRef = Ref.child('trigger');
    $scope.trigger = $firebaseObject(triggerRef);
    $scope.responses = $firebaseObject(responsesRef);

  });
