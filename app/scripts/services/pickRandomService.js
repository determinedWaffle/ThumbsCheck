angular.module('thumbsCheckApp')
  .service('pickRandomService', function($firebaseObject, Ref) {
    var pickRandom = function(array) {
      // If this category empty, don't proceed pick a student
      if (array.length === 0) {
        return;
      }
      
      // Generate a url path to github avatar 
      var path = 'https://avatars0.githubusercontent.com/u/';
      var index = Math.floor(Math.random() * array.length);
      path += array[index].split(':')[1];
      path += '?size=1028';

      var uid = array[index];
      var randomPick = {};

      randomPick.uid = uid;
      randomPick.path = path;
      return randomPick;
    };

    return {
      pickRandomStudent: function(studentList) {
        return pickRandom(studentList);
      }
    };

  });
