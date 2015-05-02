angular.module('thumbsCheckApp')
 .controller('LoginCtrl', function ($scope, Auth, $location) {
   $scope.oauthLogin = function(provider) {
     $scope.err = null;
     Auth.$authWithOAuthPopup(provider, {rememberMe: true}).then(redirect, showError);
   };

   $scope.anonymousLogin = function() {
     $scope.err = null;
     Auth.$authAnonymously({rememberMe: true}).then(redirect, showError);
   };

   

   function redirect() {
     $location.path('/');
   }

   function showError(err) {
     $scope.err = err;
   }
 });