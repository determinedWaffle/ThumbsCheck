angular.module('thumbsCheckApp')
  .controller('LoginCtrl', function($scope, $firebaseObject, Auth, Ref, verifyInstructorService) {
    if (Auth.$getAuth()) {
      verifyInstructorService.redirectHome();
    }

    $scope.oauthLogin = function(provider) {
      $scope.err = null;
      Auth.$authWithOAuthPopup(provider, {
        rememberMe: true
      }).then(addUser, showError);
    };

    function addUser() {
      Ref.onAuth(function(user) {
        var instructorsObj = $firebaseObject(Ref.child('instructors'));
        var studentObj = $firebaseObject(Ref.child('students'));
        var userName;
        if (user) {
          instructorsObj.$loaded().then(function(instructorsTable) {
            if (instructorsTable[user.uid]) {
              user.role = 'instructor';
              verifyInstructorService.setInLocalStorage(user.uid, user.role);
            } else {
              studentObj.$loaded().then(function(usersTable) {
                userName = user.github.displayName || 'Please fill in your name, ' + user.github.username;
                studentObj[user.uid] = userName;
                studentObj.$save();
                verifyInstructorService.verifyIfInstructor(user.uid);
              });
            }
          });
        }
      });
    }

    function showError(err) {
      $scope.err = err;
    }
  });
