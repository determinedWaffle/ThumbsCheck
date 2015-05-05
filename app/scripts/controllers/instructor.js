angular.module('thumbsCheckApp')
  .controller('InstructorCtrl', function($scope, $firebaseObject, $firebase){
    var ref = new Firebase('https://waffleup.firebaseio.com/');    
    var responsesRef = ref.child('responses'); // collection within the database.
    var triggerRef = ref.child('trigger');
    $scope.trigger = $firebaseObject(triggerRef);

    $scope.responses = $firebaseObject(responsesRef);

    // $scope.reset = function(){
    //   // $scope.student1.response = '';
      
    //   $scope.instructor.$remove().then(function(ref) {
    //   // data has been deleted locally and in Firebase
    //   }, 
    //   function(error) {
    //     console.log("Error:", error);
    // });

  });
