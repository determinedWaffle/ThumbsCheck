angular.module('thumbsCheckApp')
  .controller('LoginCtrl', function($scope, $location, $firebaseObject, Auth, Ref) {
    $scope.oauthLogin = function(provider) {
      $scope.err = null;
      Auth.$authWithOAuthPopup(provider, {
        rememberMe: true
      }).then(addUser).then(redirect, showError);
    };

    function addUser() {
      Ref.onAuth(function(user) {
        var studentObj = $firebaseObject(Ref.child('users/'));
        var userName;
        if (user) {
          studentObj.$loaded().then(function(usersTable) {
            userName = user.github.displayName || 'Please fill in your name, ' + user.github.username;
            studentObj[user.uid] = userName;
            studentObj.$save();
          });
        }
      });
    }

    function redirect() {
      $location.path('/');
    }

    function showError(err) {
      $scope.err = err;
    }
  });
