// This is where we create firebase.ref, we inject the firebase dependency as well as the configs
angular.module('firebase.ref', ['firebase', 'firebase.config'])
  .factory('Ref', ['$window', 'FBURL', '$firebaseObject', function($window, FBURL) {
    'use strict';
      return new $window.Firebase(FBURL);
  }]);
