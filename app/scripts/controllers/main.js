angular.module('thumbsCheckApp')
  .controller('MainCtrl', function($scope, exampleService) {
    $scope.input = '';
    $scope.redirect = function() {
      exampleService.redirect();
    };
  });
