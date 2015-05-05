angular.module('thumbsCheckApp')
  .controller('StudentCtrl', function($scope, $firebaseObject, $firebase, Auth, user) {
    var ref = new Firebase('https://waffleup.firebaseio.com/');
    var triggerRef = ref.child('trigger');
    // $scope.uid = user.uid;
    $scope.uid = ~~(Math.random()*100).toString();
    var responsesRef = ref.child('responses'); // collection within the database.

    var unwatch = $firebaseObject(triggerRef).$watch(function() {
      $scope.studentTrigger = false;
      $scope.thumbsChoice = 'middle';
    });

    $scope.clicked = function(){
      console.log('clicked');
      // $scope.studentTrigger = !$scope.studentTrigger;
      var obj = $firebaseObject(responsesRef);
      obj.$loaded().then(function(data){
        obj[$scope.uid] = $scope.thumbsChoice;
        obj.$save().then(function(ref) {
            console.log("Success");
            // ref.key() === obj.$id; // true
          }, function(error) {
            console.log("Error:", error);
          });
      });
    };
  });
