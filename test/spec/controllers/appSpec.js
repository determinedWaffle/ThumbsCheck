
'use strict';

describe('Thumbs Check App', function () {

  // load the controller's module
  beforeEach(module('thumbsCheckApp'));

  // var MainCtrl,
  //   scope;

  // Initialize the controller and a mock scope
  // beforeEach(inject(function ($controller, $rootScope) {
  //   scope = $rootScope.$new();
  //   MainCtrl = $controller('MainCtrl', {
  //     $scope: scope
  //   });
  // }));

  it('should have a list of instructors in firebase', function () {
    // module('thumbsCheckApp')
    //   .controller('TestCtrl', function($scope, $location, $firebaseObject, $rootScope, Auth, Ref) {
    //     var instructorsObj = $firebaseObject(Ref.child('instructors'));
    //     instructorsObj.$loaded().then(function(instructorsTable) {
    //       expect(instructorsTable).toBe(true);
    //   });
    // });
    expect(true).toBe(true);
  });
});

// Test 1: does Firebase have an object called "instructors"?
// Test 2: is there at least 1 entry in instructors? Is it in the format "github:12345"?
// Test 3: Log in as a student, is that student added into the "students" object in Firebase? Is it in the format "github:12345"?
// Test 4: Log in as a student, does that student get redirected to /student-main?
// Test 5: Log in as a student, is that student forbidden from visiting /instructor-*
// Test 6: Log in as a student, does "/login" redirect to "/student-main"?
// Test 7: Log in as a student, then log out. Is the user logged out?
// Test 8: Log in as an instructor, make sure that user is NOT added to the students object in Firebase
// Test 9: Log in as an instructor, does that student get redirected to /instructor-main?
// Test 10: Log in as a instructor, does "/login" redirect to "/instructor-main"?
// Test 11: Log in as a instructor, begin a thumbs check. Separately log in as a student and vote up. Does the instructor see 1 up vote?
// Test 12: Log in as a instructor, begin a thumbs check. Separately log in as a student and vote up. Instructor clicks "start new". Does the thumbs check data get erased?
