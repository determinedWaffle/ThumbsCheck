angular.module('thumbsCheckApp')
  .controller('PickCtrl', function($scope, $firebaseObject, Ref){
    var data = {
     up: ["github:8604205", "github:391394"],
     down: ["github:643322", "github:23454", "github:23423455", "github:101054"],
     middle: ["github:098765"]
    };

    var responsesObj = $firebaseObject(Ref.child('responses/'));
    var studentObj = $firebaseObject(Ref.child('students/'));

    $scope.data = data;
    $scope.picked = null;

    $scope.pickRandom = function(array) {
      var path = "https://avatars0.githubusercontent.com/u/";
      var index = Math.floor(Math.random() * array.length);
      console.log(array[index]);
      path += array[index].split(":")[1];
      console.log("path is " + path);
      path += "?size=150";
      $scope.path = path;
      console.log($scope.path);
    };

  });

/* Aggregate instructor view data: 
 * data: {
 *  up: ["github:123456", "github:345678"],
 *  down: ["github:123456", "github:345678"],
 *  middle: ["github:123456", "github:345678"]
 * }
 */