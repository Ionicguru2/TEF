angular.module('app')
  
.controller('homeController', function ($scope, $stateParams, $state, $firebaseObject) {

    var ref = firebase.database().ref();
    $scope.current =$firebaseObject(ref.child("current"));

    // $scope.toggleLeftSideMenu = function() {
    //     $ionicSideMenuDelegate.toggleLeft();
    // };
})