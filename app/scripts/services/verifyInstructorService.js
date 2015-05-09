angular.module('thumbsCheckApp')
  .service('verifyInstructorService', function($location, $rootScope) {
    var setInstructorInLocalStorage = function(uid, role) {
      localStorage.setItem(uid, role);
      $location.path('/instructor-main');
      emitUserRole('instructor');
    };

    var verifyIfInstructor = function(uid) {
      if (localStorage.getItem(uid) !== 'instructor') {
        var student = {}; 
        student.role = true;
        $location.path('/student-main');
      } 
    };

    var emitUserRole = function(val) {
      $rootScope.$emit(val);
    };

    var listenOnUserEmit = function(callback){
      $rootScope.$on("instructor", callback);
    }

    return {
      setInLocalStorage: function(uid, role) {
        return setInstructorInLocalStorage(uid, role);
      },

      verifyIfInstructor: function(uid) {
        return verifyIfInstructor(uid);
      },

      redirectHome: function(){
        return $location.path('/');
      },

      emitUserRole: function(val){
        emitUserRole(val);
      },

      listenOnUserEmit: function(callback){
        listenOnUserEmit(callback);
      }

    };


  });
