angular.module('thumbsCheckApp')
  .controller('LoginCtrl', function($scope, $location, $firebaseObject, $rootScope, Auth, Ref, broadcastInstructorRole) {
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
              broadcastInstructorRole.broadcast("instructor");
              $location.path('/instructor-main');
            } else {
              studentObj.$loaded().then(function(usersTable) {
                userName = user.github.displayName || 'Please fill in your name, ' + user.github.username;
                studentObj[user.uid] = userName;
                studentObj.$save();
                $location.path('/student-main');
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
