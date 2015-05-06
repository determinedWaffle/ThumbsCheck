angular.module('thumbsCheckApp')
  .controller('InstructorCtrl', function($scope, $firebaseObject, Ref, $rootScope, $location, user, broadcastInstructorRole){
    if (localStorage.getItem(user.uid) !== 'instructor') {
        $location.path('/student-main');
    }
    broadcastInstructorRole.broadcast("instructor");
    var responsesRef = Ref.child('responses'); // collection within the database.
    var triggerRef = Ref.child('trigger');

    $scope.trigger = $firebaseObject(triggerRef);
    var responsesObj = $firebaseObject(responsesRef);
    $scope.responses = responsesObj;
    $scope.result = [];
    
    // calculate total votes for each category
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

    // Populate list of students githubID for each catergory
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


    responsesObj.$watch(function(){
      // console.log('watch');
      $scope.result = $scope.total($scope.responses);
      $scope.studentList = $scope.generateStudentList($scope.responses);
    });

    $scope.pickRandom = function(array) {
      // If this category empty, don't proceed pick a student
      // console.log('pickRandom', array);
      if (array.length === 0){return;}
      // Generate a url path to github avatar 
      var path = "https://avatars0.githubusercontent.com/u/";
      var index = Math.floor(Math.random() * array.length);
      path += array[index].split(":")[1];
      path += "?size=1028";
      var uid = array[index];
      // console.log('uid',uid);
      // Retrieve studentName from firebase "students", then generate the pickedStudent object
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
