angular.module('app')
  
.controller('evaluationsController', function ($scope, $stateParams, $state, $firebaseObject) {

     $scope.params = $stateParams;
 
    $scope.to_trusted = function(html_code) {
        return $sce.trustAsHtml(html_code);
    }

    $scope.gotoLink = function(link){
    // console.log("LINK" + link);
        window.open(link,"_system");
    }
    
    $scope.loadData = function(){
        
        $scope.loading=false;
        
    }

    $scope.loadData();
})

// .controller('eVALUATIONSCtrl', ['$scope', '$stateParams', '$sce', // The following is the constructor function for this page's controller. See https://docs.angularjs.org/guide/controller
// // You can include any angular dependencies as parameters for this function
// // TIP: Access Route Parameters for your page via $stateParams.parameterName
// function ($scope, $stateParams, $sce) {
//  $scope.params = $stateParams;
 
// $scope.to_trusted = function(html_code) {
//     return $sce.trustAsHtml(html_code);
// }

// $scope.gotoLink = function(link){
//    // console.log("LINK" + link);
//     window.open(link,"_system");
// }
    
//     $scope.loadData = function(){
        
//         $scope.loading=false;
        
//     }

//     $scope.loadData();
   

// }])