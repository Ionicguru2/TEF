angular.module('app')
  
.controller('homeController', function ($scope, $stateParams, $state, $firebaseObject) {

    var ref = firebase.database().ref();
    $scope.current =$firebaseObject(ref.child("current"));

    // $scope.toggleLeftSideMenu = function() {
    //     $ionicSideMenuDelegate.toggleLeft();
    // };
})



// .controller('homeCtrl', ['$scope', '$stateParams', '$ionicSideMenuDelegate', '$firebaseArray', '$firebaseObject', // The following is the constructor function for this page's controller. See https://docs.angularjs.org/guide/controller
// // You can include any angular dependencies as parameters for this function
// // TIP: Access Route Parameters for your page via $stateParams.parameterName
// function ($scope, $stateParams, $ionicSideMenuDelegate,$firebaseArray,$firebaseObject) {
  
//    var ref = firebase.database().ref();
//       // create a synchronized array
//       $scope.current =$firebaseObject(ref.child("current"));
     
//   $scope.toggleLeftSideMenu = function() {
//     $ionicSideMenuDelegate.toggleLeft();
//   };
//    $scope.toggleRightSideMenu = function() {
//     $ionicSideMenuDelegate.toggleRight();
//   };

// }])