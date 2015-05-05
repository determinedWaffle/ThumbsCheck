angular.module('thumbsCheckApp')
  .controller('StudentCtrl', function($scope, $firebaseObject, $firebase, Auth) {
    var ref = new Firebase('https://waffleup.firebaseio.com/');
    // var responsesRef = ref.child('responses'); // collection within the database.
    var triggerRef = ref.child('trigger');

    var unwatch = $firebaseObject(triggerRef).$watch(function() {
      $scope.studentTrigger = false;
      $scope.thumbsChoice = 'middle';
    });

    $scope.clicked = function(){
      $scope.studentTrigger = !$scope.studentTrigger;
    };

  });
