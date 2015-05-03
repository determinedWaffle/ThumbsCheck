angular.module('thumbsCheckApp')

  .controller('StudentCtrl', function($scope, user, Auth, Ref, $firebaseObject, $firebase) {
    var studentObj = $firebaseObject(new Firebase('https://waffleup.firebaseio.com/users'));
    $scope.user = user;
    $scope.logout = function() {
      Auth.$unauth();
    };
    $scope.messages = [];
    // var profile = $firebaseObject(Ref.child('users/' + user.uid));
    // profile.$bindTo($scope, 'profile');

    
    studentObj[user.uid] = user.uid;
    studentObj.$save();


    // var profile = $firebaseObject(Ref.child('users/'+user.uid));
    // profile.$bindTo($scope, 'profile');
    // $scope.student1ID= '1';
    // $scope.student2ID = '2';

    // $firebaseobject(responsesref.child($scope.student1id)).$bindto($scope, 'student1');

    // $firebaseObject(responsesRef.child($scope.student2ID)).$bindTo($scope, 'student2');


    // $scope.students = $firebaseObject(responsesRef);

    // var count = 100;
    // while(count--){
    //   // var sid = 'student'+ count + 'ID';
    //   // $scope[sid] = count.toString();
    //   $firebaseObject(responsesRef.child(count.toString())).$bindTo($scope, 'student'+ count.toString());
    // }

  });
