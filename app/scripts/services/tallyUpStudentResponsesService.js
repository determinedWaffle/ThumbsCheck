angular.module('thumbsCheckApp')
  .service('tallyUpStudentResponsesService', function() {
    var tallyUpResponses = function(responses, result, studentList) {
      // Make key: $id and $priority non-enumerable
      Object.defineProperty(responses, '$id', {
        enumerable: false
      });

      Object.defineProperty(responses, '$priority', {
        enumerable: false
      });

      Object.defineProperty(responses, '$$conf', {
        enumerable: false
      });
      
      for (var key in responses) {
        if (responses.hasOwnProperty(key)) {
          // console.log('key',key);
          var response = responses[key];
          // After reset(), on responses obj, there is a key value pair ($value:null)
          if (response === null) {
            // Return upon empty responses
            return [result, studentList];
          } else {
            response = response[key];
            if (response === 'up') {
              result[0] += 1;
              studentList.up.push(key);
            } else if (response === 'middle') {
              result[1] += 1;
              studentList.middle.push(key);
            } else if (response === 'down') {
              result[2] += 1;
              studentList.down.push(key);
            }
          }
        }
      }

    };

    return {
      tallyUpResponses: function(responses, result, studentList) {
        tallyUpResponses(responses, result, studentList);
      }
    };

  });
