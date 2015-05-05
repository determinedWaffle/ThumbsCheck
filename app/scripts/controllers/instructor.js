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
      // console.log('inside total:',result);
      return result;
    };

    $scope.generateStudentList = function(responses){
      var result = {up:[], down:[],middle:[]};
      for (var key in responses){
        var response = responses[key];
        if (response === 'up'){
          result.up.push(key);
        } else if (response === 'middle'){
          result.middle.push(key);
        } else if (response === 'down'){
          result.down.push(key);
        } 
      }
      // console.log('studentList:',result);
      return result;
    };

    responesObj.$watch(function(){
      // console.log('watch');
      $scope.result = $scope.total($scope.responses);
      $scope.studentList = $scope.generateStudentList($scope.responses);
    });

    // $scope.imageUrl = "https://avatars3.githubusercontent.com/u/7408826?v=3&s=140";

    // var data = {
    //  up: ["github:8604205", "github:391394"],
    //  down: ["github:643322", "github:23454", "github:23423455", "github:101054"],
    //  middle: ["github:098765"]
    // };

    // $scope.data = data;

    $scope.pickRandom = function(array) {
      // console.log('pickRandom', array);
      var path = "https://avatars0.githubusercontent.com/u/";
      var index = Math.floor(Math.random() * array.length);
      path += array[index].split(":")[1];
      path += "?size=1028";
      var uid = array[index];
      // console.log('uid',uid);
      var studentRef = Ref.child('students');
      $firebaseObject(studentRef).$loaded().then(function(students){
        // console.log('studentsTable', students);
        $scope.studentName = students[uid];
        // console.log('studentName', $scope.studentName);
        $scope.pickedStudent = {
          name: students[uid],
          imageUrl: path
        };
      });
    };

  });
