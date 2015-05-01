angular.module('thumbsCheckApp')
  // inject $firebaseObject
  .controller('MainCtrl', function($scope, $firebaseObject) {
    // https://www.firebase.com/docs/web/libraries/angular/quickstart.html 
    // create a new firebase connection as below;
    var ref = new Firebase('https://waffleup.firebaseio.com');
    $scope.input = '';
  });
