angular.module('thumbsCheckApp', [
  'ngRoute',
  'firebase', //this comes from the firebase module, it allows us to connect with firebase
  'firebase.ref', //this a factor we created which we need to inject now
  'firebase.auth', // same as above
  'ui.bootstrap'
]);
