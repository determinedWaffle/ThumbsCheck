// This is where we create firebase.ref, we inject the firebase dependency as well as the configs
angular.module('firebase.ref', ['firebase', 'firebase.config'])
  .factory('Ref', ['$window', 'FBURL', '$firebaseObject', function($window, FBURL, $firebaseObject) {
    'use strict';
    var ref = function() {
      return new $window.Firebase(FBURL);
    };


    var createFirebaseRef = function(table) {
      var Ref = ref().child(table);
      return $firebaseObject(Ref);
    };

    var getFireBaseRef = function(table) {
      console.log('hello', table);
      return ref().child(table);
    };

    return {
      Ref: function() {
        return ref();
      },
      createFirebaseRef: function(table) {
        return createFirebaseRef(table);
      },
      getFireBaseRef: function(table) {
        return getFireBaseRef(table);
      }
    };
  }]);
