angular.module('thumbsCheckApp')
  .controller('StudentCtrl', function($scope, $firebaseObject, $firebase){
    var ref = new Firebase('https://waffleup.firebaseio.com/');    
    var responsesRef = ref.child('responses'); // collection within the database.

    $scope.student1ID= '1';
    $scope.student2ID = '2';

    $firebaseObject(responsesRef.child($scope.student1ID)).$bindTo($scope, 'student1');

    $firebaseObject(responsesRef.child($scope.student2ID)).$bindTo($scope, 'student2');


    // $scope.students = $firebaseObject(responsesRef);

    // var count = 100;
    // while(count--){
    //   // var sid = 'student'+ count + 'ID';
    //   // $scope[sid] = count.toString();
    //   $firebaseObject(responsesRef.child(count.toString())).$bindTo($scope, 'student'+ count.toString());
    // }

  });