angular.module('thumbsCheckApp')
  .controller('StudentCtrl', function($scope, $firebaseObject, Ref, user) {
    // Refactor this firebase url to using Ref
    var triggerRef = Ref.child('trigger');
    // $scope.uid = user.uid;
    $scope.uid = ~~(Math.random()*100).toString();

    var responsesRef = Ref.child('responses'); // collection within the database.
    var trigObj = $firebaseObject(triggerRef);
    trigObj.$loaded().then(function(data){
      console.log('data loaded');
      trigObj.$watch(function() {
        console.log('watch', $scope.thumbsTrigger);
        $scope.thumbsTrigger = true;
        $scope.thumbsChoice = 'middle';
      });
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
