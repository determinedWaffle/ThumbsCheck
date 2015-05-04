angular.module('thumbsCheckApp')
  .controller('StudentCtrl', function($scope, $firebaseObject, $firebase, Auth) {
    var ref = new Firebase('https://waffleup.firebaseio.com/');
    // var responsesRef = ref.child('responses'); // collection within the database.
    var triggerRef = ref.child('trigger');
    $scope.trigger = $firebaseObject(triggerRef);


    // $firebaseObject(responsesRef).$bindTo($scope, 'students');
    // $scope.students = {};
    // $scope.sid = 'github123';
    // $scope.student = { 'sid': $scope.sid , 'response': $scope.response};
    // // $firebaseObject(responsesRef).$bindTo($scope, 'student2');


    // $scope.logout = function() {
    //   Auth.$unauth();
    // };
    // $firebaseObject(responsesRef).$bindTo($scope, 'student');

  });
