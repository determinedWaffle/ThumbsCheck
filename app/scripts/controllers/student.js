angular.module('thumbsCheckApp')
  .controller('StudentCtrl', function($scope, $firebaseObject, Ref, user) {
    var triggerRef = Ref.child('trigger');
    $scope.uid = user.uid;


    $scope.userThumbsChoices = generateUserThumbsChoices(); 

    var trigObj = $firebaseObject(triggerRef);
    trigObj.$loaded().then(function(data) {
      trigObj.$watch(function() {
        $scope.thumbsTrigger = true;
        $scope.userThumbsChoices = generateUserThumbsChoices(); 
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

    function generateUserThumbsChoices(){
      var userThumbsChoices = [
      {
        choice: 'up',
        icon: 'glyphicon glyphicon-thumbs-up'
      },
      {
        choice: 'middle',
        icon: 'glyphicon glyphicon-resize-horizontal'
      },
      {
        choice: 'down',
        icon: 'glyphicon glyphicon-thumbs-down'
      }];
      return userThumbsChoices;
    }

    $scope.clicked = function(thumbsChoice) {
      // Hide thumbs choice after student made a choice
      $scope.thumbsTrigger = false;
      // To fix button active
      // $scope.thumbsChoice = undefined;
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

    $scope.test = function(thumbs){
      console.log('thumbs:',thumbs);
    };


    var quizResponsesRef = Ref.child('quizResponses').child(user.uid);
    var quizResponsesObj = $firebaseObject(quizResponsesRef);
    $scope.submitQuizChoice = function(choice) {
      // Hide quiz after student made a choice
      $scope.quizTrigger = false;
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

