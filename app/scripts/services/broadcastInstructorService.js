angular.module('thumbsCheckApp')
  .service("broadcastInstructorRole", function($rootScope) {
    this.broadcast = function(val) { $rootScope.$broadcast(val); }
    this.listen = function(callback) { $rootScope.$on("instructor", callback); }
  });