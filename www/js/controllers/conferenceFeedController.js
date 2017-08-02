angular.module('app.controllers', [])
  
.controller('conferenceFeedController', function ($scope, $stateParams, $state, $firebaseObject, $firebaseArray) {

    $scope.loading=true;
    $scope.params = $stateParams;

    var ref = firebase.database().ref();
    // create a synchronized array
    $scope.messages1 =$firebaseObject(ref.child("message1"));
    $scope.messages1a = $firebaseArray(ref.child("message1").orderByChild("order"));

    $scope.messages2 =$firebaseObject(ref.child("message2"));
    $scope.messages2a = $firebaseArray(ref.child("message2").orderByChild("order"));

    $scope.messages3 =$firebaseObject(ref.child("message3"));
    $scope.messages3a = $firebaseArray(ref.child("message3").orderByChild("order"));

    $scope.messages4 =$firebaseObject(ref.child("message4"));
    $scope.messages4a = $firebaseArray(ref.child("message4").orderByChild("order"));

    $scope.messages5 =$firebaseObject(ref.child("message5"));
    $scope.messages5a = $firebaseArray(ref.child("message5").orderByChild("order"));

    $scope.loading=false;
})