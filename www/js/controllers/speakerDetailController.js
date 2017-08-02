angular.module('app')
  
.controller('speakerDetailController', function ($scope, $rootScope, $stateParams, $state, $ionicHistory, Speaker) {

    $scope.params = $stateParams;
    //console.log($scope.params.id);
    $scope.header = $scope.params.id;
    $scope.id = $scope.params.id;
    var oldSoftBack = $rootScope.$ionicGoBack;
    $rootScope.$ionicGoBack = function() {
        $ionicHistory.nextViewOptions({
            disableBack: true
        });
        $state.go('app.tap.speakers');
    
        $rootScope.$ionicGoBack = oldSoftBack;
        // implement custom behaviour here
    };

    //console.log("ID IS "+ $scope.id);
    $scope.gotoLink = function(link){
        window.open(link,"_system");
    }

    $scope.goForward = function(){
    
        $scope.speaker = {
            id:$scope.b
        }        
      
        $state.go('app.tap.speakerDetail',$scope.speaker);
    }
    
    $scope.goBack = function(){
        $scope.speaker = {
            id:$scope.c
        }
    
       $state.go('app.tap.speakerDetail',$scope.speaker);
    }

    $scope.loadData = function(id){
        
        Speaker.getSpeaker(id).then(function(res){
            $scope.speaker = res.post;
            $scope.loading=false;
            $scope.count = $scope.speaker.custom_fields.presentations[0];
        });
    }
    $scope.loading=true;
  
    Speaker.getIds().then(function(res){
        //  console.log("res is " + res);
        $scope.a = res.indexOf($scope.id);
        if($scope.a!==res.length-1){
            $scope.b = res[eval(parseInt($scope.a)+"+1")];
            //  console.log("Forward = " + $scope.b);
        } else {
            $scope.b =  0; 
            //   console.log("Forward = " + $scope.b);
        }
        if($scope.a!==0){
            $scope.c = res[eval(parseInt($scope.a)+"-1")];
            //  console.log("Back = " + $scope.c);
        } else {
            $scope.c = 0;  
            //   console.log("Back = " + $scope.c);
        }
        $scope.loadData($scope.params.id);
    });
})


// .controller('sPEAKERS2Ctrl', ['$scope', '$rootScope', '$state', '$stateParams', '$ionicHistory', 'Speaker', // The following is the constructor function for this page's controller. See https://docs.angularjs.org/guide/controller
// // You can include any angular dependencies as parameters for this function
// // TIP: Access Route Parameters for your page via $stateParams.parameterName
// function ($scope, $rootScope, $state, $stateParams, $ionicHistory, Speaker) {
// $scope.params = $stateParams;
// //console.log($scope.params.id);
// $scope.header = $scope.params.id;
// $scope.id = $scope.params.id;
// var oldSoftBack = $rootScope.$ionicGoBack;
// $rootScope.$ionicGoBack = function() {
//     $ionicHistory.nextViewOptions({
//     disableBack: true
//   });
//     $state.go('sPEAKERS');
   
//     $rootScope.$ionicGoBack = oldSoftBack;
//     // implement custom behaviour here
// };

// //console.log("ID IS "+ $scope.id);
// $scope.gotoLink = function(link){
//     window.open(link,"_system");
// }

//  $scope.goForward = function(){
    
//         $scope.speaker = {
//             id:$scope.b
//         }
        
      
//         $state.go('sPEAKERS2',$scope.speaker);
//     }
    
//     $scope.goBack = function(){
//         $scope.speaker = {
//             id:$scope.c
//         }
    
//        $state.go('sPEAKERS2',$scope.speaker);
//     }

// $scope.loadData = function(id){
        
//         Speaker.getSpeaker(id).then(function(res){
//         $scope.speaker = res.post;
//         $scope.loading=false;
//         $scope.count = $scope.speaker.custom_fields.presentations[0];
        
        
        
//       //  console.log($scope.count);
//         // var presentations = [];
//         // for(n=0;n<count;n++){
//         //      presentations.push({
//         //                     // title: pTitle,
//         //                     // file: pFile,
//         //                     // link:"https://www.trusteducationfoundation.com/api/taf/get_link/?att="+pFile
//         //     });
//         // }
//            // console.log(res.post);
//         });
//     }
//     $scope.loading=true;
    
  
//     Speaker.getIds().then(function(res){
//         //  console.log("res is " + res);
//          $scope.a = res.indexOf($scope.id);
//          if($scope.a!==res.length-1){
//          $scope.b = res[eval(parseInt($scope.a)+"+1")];
//         //  console.log("Forward = " + $scope.b);
//          } else {
//            $scope.b =  0; 
//         //   console.log("Forward = " + $scope.b);
//          }
//          if($scope.a!==0){
//          $scope.c = res[eval(parseInt($scope.a)+"-1")];
//         //  console.log("Back = " + $scope.c);
//          } else {
//            $scope.c = 0;  
//         //   console.log("Back = " + $scope.c);
//          }
//           $scope.loadData($scope.params.id);
//      });
  

// }])