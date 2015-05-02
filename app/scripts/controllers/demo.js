angular.module('thumbsCheckApp')
  .controller('DemoCtrl', function($scope, $firebaseObject, $firebase){
    var ref = new Firebase('https://waffleup.firebaseio.com/');    
    var responsesRef = ref.child('responses'); // collection within the database.

    $firebaseObject(responsesRef.child('student1')).$bindTo($scope, 'student1');

    $scope.instructor = $firebaseObject(responsesRef);

    $scope.reset = function(){
      $scope.student1.response = '';
    };
  });
