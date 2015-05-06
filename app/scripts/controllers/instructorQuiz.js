angular.module('thumbsCheckApp')
  .controller('QuizCtrl', function($scope, $firebaseObject, $firebaseArray ,Ref, $rootScope, $location, user, broadcastInstructorRole){
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
      // console.log('results', results);
      $scope.result = results[0];
      $scope.studentList = results[1];
    });

    
    // calculate total votes for each category into result
    // Populate list of students githubID for each catergory into studentList
    // as studentList = {up:[], down:[],middle:[]};
    $scope.total = function(){
      // Counts summary for [up,middle,down]
      var result = [0,0,0];
      // for input of $scope.pickRandom()
      var studentList = {up:[], down:[],middle:[]};
      responsesObj.$loaded().then(function(responses){
        // console.log('responses:', responses);
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
            var response = responses[key];
            // After reset(), on responses obj, there is a key value pair ($value:null)
            if (response === null){
              // Return upon empty responses
              return [result, studentList];
            } else {
              response = response[key];
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
        }
      });

      // console.log('inside total:',result);
      return [result, studentList];
    };

    // Reset firebase responses table
    $scope.reset = function(){
      responsesObj.$remove().then(function(ref) {
        // data has been deleted locally and in Firebase
        console.log('reset');
      }, function(error) {
        console.log("Error:", error);
      });
    };


/*Quiz*/
    $scope.choices = [];
    var quizesRef = Ref.child('quizes');
    var quizes = $firebaseArray(quizesRef);
    $scope.quizes = quizes;

    $scope.add = function(){
      $scope.choices.push("");
    };

    $scope.remove = function(index) {
      console.log(index);
      $scope.choices.splice(index,1);
    };

    $scope.addQuiz = function(question, choices){
      var quiz = {};

      quiz.question = question;
      quiz.choices = choices;
      console.log(quiz);
      quizes.$add(quiz);

      //clear form
      $scope.question = "";
      $scope.choices = [];
    };

    $scope.saveChange = function($index, choice) {
      // saves user input into $scope.choices based on ng-Change
      $scope.choices[$index] = choice;
    };


    /*Accordion*/
    $scope.pushQuiz = function(quiz){
      console.log('clicked', quiz);
      var newQuizRef = Ref.child('newQuiz');
      var newQuizObj = $firebaseObject(newQuizRef);
      newQuizObj.quiz = quiz;
      newQuizObj.$save();
    };

});
