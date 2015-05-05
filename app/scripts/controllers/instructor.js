angular.module('thumbsCheckApp')
  .controller('InstructorCtrl', function($scope, $firebaseObject, Ref, $rootScope, $location){
    // if ($rootScope.role !== 'instructor') {
    //     $location.path('/student-main');
    // }
    var responsesRef = Ref.child('responses'); // collection within the database.
    var triggerRef = Ref.child('trigger');
    $scope.trigger = $firebaseObject(triggerRef);
    var responesObj = $firebaseObject(responsesRef);
    $scope.responses = responesObj;
    $scope.result = [];
    $scope.total = function(responses){
      var result = [0,0,0];
      for (var key in responses){
        var response = responses[key];
        if (response === 'up'){
          result[0]+=1;
        } else if (response === 'middle'){
          result[1]+=1;
        } else if (response === 'down'){
          result[2]+=1;
        } 
      }
      console.log('inside total:',result);
      return result;
    };

    responesObj.$watch(function(){
      console.log('watch');
      $scope.result = $scope.total($scope.responses);
      console.log($scope.result);
    });

  });
