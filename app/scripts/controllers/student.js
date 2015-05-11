angular.module('thumbsCheckApp')
  .controller('StudentCtrl', function($scope, $firebaseObject, Ref, user) {
    var triggerRef = Ref.child('trigger');
    $scope.uid = user.uid;

    var trigObj = $firebaseObject(triggerRef);
    trigObj.$loaded().then(function(data) {
      trigObj.$watch(function() {
        console.log('watch', $scope.thumbsTrigger);
        $scope.thumbsTrigger = true;
        $scope.thumbsChoice = 'middle';
      });
    });

    var quizTriggerRef = Ref.child('quizTrigger');
    var quizTrigObj = $firebaseObject(quizTriggerRef);
    quizTrigObj.$loaded().then(function(data) {
      quizTrigObj.$watch(function() {
        $scope.quizTrigger = true;
      });
    });

    var newQuizRef = Ref.child('newQuiz').child('quiz');
    var newQuizObj = $firebaseObject(newQuizRef);

    newQuizObj.$loaded().then(function(quiz) {
      $scope.quiz = quiz;
    });

    $scope.clicked = function(thumbsChoice) {
      console.log('clicked');
      $scope.studentTrigger = !$scope.studentTrigger;
      var studentResponseRef = Ref.child('responses').child(user.uid); // collection within the database.
      var obj = $firebaseObject(studentResponseRef);
      obj.$loaded().then(function(data) {
        obj[$scope.uid] = thumbsChoice;
        obj.$save().then(function(ref) {
          console.log('Success');
        }, function(error) {
          console.log('Error:', error);
        });
      });
    };

    var quizResponsesRef = Ref.child('quizResponses').child(user.uid);
    var quizResponsesObj = $firebaseObject(quizResponsesRef);
    $scope.submitQuizChoice = function(choice) {
      quizResponsesObj.$loaded().then(function(data) {
        quizResponsesObj[$scope.uid] = choice;
        quizResponsesObj.$save().then(function(ref) {
          console.log('Success');
        }, function(error) {
          console.log('Error:', error);
        });
      });
    };


  });

