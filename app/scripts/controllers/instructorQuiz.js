angular.module('thumbsCheckApp')
  .controller('QuizCtrl', function($scope, $firebaseObject, $firebaseArray, Ref, $rootScope, $location, user, broadcastInstructorRole) {
    // To get userID.role from web browser localStorage
    if (localStorage.getItem(user.uid) !== 'instructor') {
      $location.path('/student-main');
    } else {
      // Broadcast role to navbar.js controller
      broadcastInstructorRole.broadcast('instructor');
    }


    /*Quiz*/
    $scope.choices = [];
    var quizesRef = Ref.child('quizes');
    var quizes = $firebaseArray(quizesRef);
    $scope.quizes = quizes;

    $scope.add = function() {
      $scope.choices.push('');
    };

    $scope.remove = function(index) {
      console.log(index);
      $scope.choices.splice(index, 1);
    };

    $scope.addQuiz = function(question, choices) {
      var quiz = {};

      quiz.question = question;
      quiz.choices = choices;
      console.log(quiz);
      quizes.$add(quiz);

      // clear form
      $scope.question = '';
      $scope.choices = [];
    };

    $scope.saveChange = function($index, choice) {
      // saves user input into $scope.choices based on ng-Change
      $scope.choices[$index] = choice;
    };



    /*Accordion*/
    // quiz trigger
    var triggerRef = Ref.child('quizTrigger');
    $scope.quizTrigger = $firebaseObject(triggerRef);

    // Show only one quiz at a time
    $scope.oneAtATime = true;
    $scope.pushQuiz = function(quiz) {
      // console.log('clicked', quiz);
      var newQuizRef = Ref.child('newQuiz');
      var newQuizObj = $firebaseObject(newQuizRef);
      newQuizObj.quiz = quiz;
      newQuizObj.$save();

      // Remove the quizResponses table
      $firebaseObject(Ref.child('quizResponses')).$remove();

      // Initlize variables for $scope.total()
      $scope.numberOfChoice = quiz.choices.length;
      $scope.quizData = quiz;
      $scope.stacked = [];
    };

    // Quiz Response
    var quizResponsesRef = Ref.child('quizResponses');
    var quizResponsesObj = $firebaseObject(quizResponsesRef);
    $scope.quizResponses = quizResponsesObj;
    // watch firebase responses, upon change, update counts and studentList
    quizResponsesObj.$loaded().then(function() {
      quizResponsesObj.$watch(function() {
        // console.log('watch');
        results = $scope.total();
        // $scope.quizResult = results[0];
        // $scope.studentList = results[1];
      });
    });


    // calculate total votes for each category into result
    // Populate list of students githubID for each catergory into studentList
    $scope.total = function() {
      // Initialize quizCounts and studentList
      var quizCounts = [];
      var studentList = {};
      for (var i = 0; i < $scope.numberOfChoice; i++) {
        quizCounts.push(0);
        studentList[i] = [];
      }
      // console.log('result initial',quizCounts);
      // console.log('studentList', studentList);

      // for input of $scope.pickRandom()
      // console.log('studentList',studentList);
      quizResponsesObj.$loaded().then(function(responses) {
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

        for (var key in responses) {
          if (responses.hasOwnProperty(key)) {
            // console.log('key',key);
            var response = responses[key][key];
            // console.log('choice index', response);
            // console.log('type',typeof response);
            quizCounts[response] += 1;
            studentList[response].push(key);
          }
        }

        // debugger;
        $scope.populateProgressBar(quizCounts);
        $scope.studentList = studentList;
        // console.log('quizCounts before return', quizCounts);
        // console.log('studentList', studentList);
      });
    };


    $scope.pickRandom = function(array) {
      var randomStudentInfo;
      randomStudentInfo = pickRandomService.pickRandomStudent(studentList);

      var studentRef = Ref.child('students');
      // Retrieve studentName from firebase "students", then generate the pickedStudent object

      $firebaseObject(studentRef).$loaded().then(function(students) {
        $scope.studentName = students[randomStudentInfo.uid];
        $scope.pickedStudent = {
          name: students[randomStudentInfo.uid],
          imageUrl: randomStudentInfo.path
        };
      });
    };

    $scope.populateProgressBar = function(quizResult) {
      // if($scope.quizCounts){return;}
      $scope.stacked = [];
      var types = ['success', 'info', 'warning', 'danger'];
      // $scope.quizResult = [2,50,50];
      // quizResult
      // console.log('quizResult progress', quizResult);
      var quizCountsTotal = quizResult.reduce(function(memo, x) {
        return memo + x;
      });

      // console.log('counts total',quizCountsTotal);

      quizResult.forEach(function(val, i) {
        var percent = Math.floor((val / quizCountsTotal) * 100);
        var type = types[i];
        $scope.stacked.push({
          value: percent,
          type: type,
          choice: $scope.quizData.choices[i]
        });
      });
    };

  });
