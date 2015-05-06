angular.module('thumbsCheckApp')
  .controller('InstructorCtrl', function($scope, $firebaseObject, Ref, $rootScope, $location, user, broadcastInstructorRole){
    // To get userID.role from web browser localStorage
    if (localStorage.getItem(user.uid) !== 'instructor') {
        $location.path('/student-main');
    } else {
      // Broadcast role to navbar.js controller
      broadcastInstructorRole.broadcast("instructor");
    }

    // This is firebase responses table url
    var responsesRef = Ref.child('responses');
    var responsesObj = $firebaseObject(responsesRef);
    $scope.responses = responsesObj;

    // This is the trigger when instructor press startNew, all students 
    // go to thumbs check view. 
    var triggerRef = Ref.child('trigger');
    $scope.trigger = $firebaseObject(triggerRef);
    
    // Counts summary as: [up,middle,down]
    $scope.result = [];
    
    // watch firebase responses, upon change, update counts and studentList
    responsesObj.$watch(function(){
      // console.log('watch');
      results = $scope.total();
      $scope.result = results[0];
      $scope.studentList = results[1];
    });

    
    // calculate total votes for each category into result
    // Populate list of students githubID for each catergory into studentList
    // as studentList = {up:[], down:[],middle:[]};
    $scope.total = function(){
      var result = [0,0,0];
      var studentList = {up:[], down:[],middle:[]};
      responsesObj.$loaded().then(function(responses){
        // Make key: $id and $priority non-enumerable
        Object.defineProperty(responses, '$id', {
          enumerable: false
        });
        Object.defineProperty(responses, '$priority', {
          enumerable: false
        });
        Object.defineProperty(responses, '$$conf', {
          enumerable: false
        });

        for(var key in responses){
          if (responses.hasOwnProperty(key)){
            // console.log('key',key);
            var response = responses[key][key];
            if (response === 'up'){
              result[0]+=1;
              studentList.up.push(key);
            } else if (response === 'middle'){
              result[1]+=1;
              studentList.middle.push(key);
            } else if (response === 'down'){
              result[2]+=1;
              studentList.down.push(key);
            } 
          }

        }
      });

      // console.log('inside total:',result);
      return [result, studentList];
    };


    $scope.pickRandom = function(array) {
      // console.log('pickRandom', array);
      // If this category empty, don't proceed pick a student
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
