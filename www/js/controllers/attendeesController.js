angular.module('app')
  
.controller('attendeesController', function ($scope, $stateParams, $state, $firebaseObject, $location, $anchorScroll, Attendee, $timeout, $ionicLoading) {

    $scope.sortLast=true;
    
    $scope.toArray = function (_Object){
        var _Array = new Array();
        for(var name in _Object){
            _Array[name] = _Object[name];
        }
        return _Array;
    }
  
    $scope.scrollTo = function(target){
        //    console.log('scrolling');
        $location.hash(target);   //set the location hash
        var handle = $ionicScrollDelegate.$getByHandle('content');
        // console.log(handle);
        handle.anchorScroll(true);  // 'true' for animation
    };
    
    $scope.favorite = function(id){
        window.localStorage[id]=1;
        // console.log(window.localStorage);
    }
    $scope.clearFavorite = function(id){
        window.localStorage[id]='';
    }
        
    $scope.params = $stateParams;
    $scope.listFirst = new Array();
    $scope.listLast = new Array();
    $scope.alphabet = "ABCDEFGHIJKLMNOPQRSTUVWXYZ".split("");

    angular.forEach($scope.alphabet, function(val){
        $scope.listFirst[val]=new Array();
        $scope.listLast[val]=new Array();    
    });
       
    $scope.loadData = function(){
        
        Attendee.all().then(function(res){
                    
            $scope.attendees = res.posts;
                // console.log(res.posts);
                    
            angular.forEach( $scope.attendees , function(value, key) {
                // console.log(value);
                $scope.attendees[key]["sort_first"]=value.title_plain;
                $scope.attendees[key]["sort_last"]=value.title_plain.replace('  ',' ').split(' ')[1];
                // this.push(key + ': ' + value);
            });

            // $scope.attendees2 = Object.keys(obj).map(function (key) { return obj[key]; });
            // $scope.attendees2 = $scope.toArray($scope.attendees);
            // console.log($scope.attendees2);

            $ionicLoading.hide();
        });
    }
    $ionicLoading.show();
    $scope.loadData()
    //setTimeout( $scope.loadData(), 100);
    
    //  console.log($scope.listFirst);
    $scope.storage =  window.localStorage
    //  console.log($scope.storage);
        //document.addEventListener("deviceready", $scope.onDeviceReady, false);

    //  $scope.onDeviceReady();
})


// .controller('aTTENDEESCtrl', ['$scope', '$stateParams', '$ionicScrollDelegate', '$location', '$anchorScroll', 'Attendee', // The following is the constructor function for this page's controller. See https://docs.angularjs.org/guide/controller
// // You can include any angular dependencies as parameters for this function
// // TIP: Access Route Parameters for your page via $stateParams.parameterName
// function ($scope, $stateParams,$ionicScrollDelegate,$location,$anchorScroll,Attendee) {

//     $scope.sortLast=true;
    
  
//     $scope.scrollTo = function(target){
//     //    console.log('scrolling');
//     $location.hash(target);   //set the location hash
//     var handle = $ionicScrollDelegate.$getByHandle('content');
//    // console.log(handle);
//     handle.anchorScroll(true);  // 'true' for animation
//   };
    
//    $scope.favorite = function(id){
//       window.localStorage[id]=1;
     
//      // console.log(window.localStorage);
//   }
//    $scope.clearFavorite = function(id){
//       window.localStorage[id]='';
//   }
    
//  $scope.params = $stateParams;
//   $scope.listFirst = new Array();
//   $scope.listLast = new Array();
//              $scope.alphabet = "ABCDEFGHIJKLMNOPQRSTUVWXYZ".split("");
//              angular.forEach($scope.alphabet, function(val){
//              $scope.listFirst[val]=new Array();
//              $scope.listLast[val]=new Array();    
//              });
//     // device APIs are available
//     //
//     $scope.onDeviceReady = function() {
//       //  console.log("ready");
//         window.localStorage['items'] = JSON.stringify([{ 
//   title: 'You Owe Me Now',
//   fullName: 'Cameron Bourke',
//   dollarAmount: '2',
//   description: 'You owe me $2 for downloading this app. Only kidding!! This is just an example of a "Theyo". Delete me now by swiping to the left and enjoy.'
// }]);
// $scope.contacts = JSON.parse(localStorage.getItem('items')) || [];
// //console.log(window.localStorage['items']);
//         // value is now equal to "value"
//         //window.localStorage.removeItem("key");
//        // window.localStorage.setItem("key2", "value2");
//         //window.localStorage.clear();
//         // localStorage is now empty
//     }
//      $scope.loadData = function(){
         
//         Attendee.all().then(function(res){
            
//              $scope.attendees = res.posts;
//            // console.log(res.posts);
            
// angular.forEach( $scope.attendees , function(value, key) {
//     angular.forEach($scope.alphabet, function(val){
//         if(val==value.title_plain.substring(0,1)){
//             //console.log(val + ":" + value.title_plain);
//             if(value.title_plain){
//                 $scope.listFirst[val].push({"name":value.title_plain});
//                 //console.log($scope.listFirst[val]);
//             }
//         }
//         if(val==value.title_plain.split(' ')[1].substring(0,1)){
//             //console.log(val + ":" + value.title_plain);
//             if(value.title_plain){
//                 $scope.listLast[val].push({"name":value.title_plain});
//                 //console.log($scope.listFirst[val]);
//             }
//         }
//     });
   
 
  
//  // this.push(key + ': ' + value);
// });
// $scope.loading=false;

//         });
        
//         //end function
//     }
//   $scope.loading=true;
//   $scope.loadData()
//   //setTimeout( $scope.loadData(), 100);
   
//   //  console.log($scope.listFirst);
//      $scope.storage =  window.localStorage
//    //  console.log($scope.storage);
//      //document.addEventListener("deviceready", $scope.onDeviceReady, false);

//   //  $scope.onDeviceReady();
   

// }])
   
// .controller('aTTENDEES2Ctrl', ['$scope', '$stateParams', '$ionicScrollDelegate', '$location', '$anchorScroll', 'Attendee', // The following is the constructor function for this page's controller. See https://docs.angularjs.org/guide/controller
// // You can include any angular dependencies as parameters for this function
// // TIP: Access Route Parameters for your page via $stateParams.parameterName
// function ($scope, $stateParams,$ionicScrollDelegate,$location,$anchorScroll,Attendee) {

//     $scope.sortLast=true;
    
//     $scope.toArray = function (_Object){
//       var _Array = new Array();
//       for(var name in _Object){
//               _Array[name] = _Object[name];
//       }
//       return _Array;
//     }
  
//     $scope.scrollTo = function(target){
//     //    console.log('scrolling');
//     $location.hash(target);   //set the location hash
//     var handle = $ionicScrollDelegate.$getByHandle('content');
//    // console.log(handle);
//     handle.anchorScroll(true);  // 'true' for animation
//   };
    
//    $scope.favorite = function(id){
//       window.localStorage[id]=1;
     
//      // console.log(window.localStorage);
//   }
//    $scope.clearFavorite = function(id){
//       window.localStorage[id]='';
//   }
    
//  $scope.params = $stateParams;
//   $scope.listFirst = new Array();
//   $scope.listLast = new Array();
//              $scope.alphabet = "ABCDEFGHIJKLMNOPQRSTUVWXYZ".split("");
//              angular.forEach($scope.alphabet, function(val){
//              $scope.listFirst[val]=new Array();
//              $scope.listLast[val]=new Array();    
//              });
//     // device APIs are available
//     //
    
//      $scope.loadData = function(){
         
//         Attendee.all().then(function(res){
            
//              $scope.attendees = res.posts;
//            // console.log(res.posts);
            
// angular.forEach( $scope.attendees , function(value, key) {
//     // console.log(value);
//     $scope.attendees[key]["sort_first"]=value.title_plain;
//   $scope.attendees[key]["sort_last"]=value.title_plain.replace('  ',' ').split(' ')[1];
 
  
//  // this.push(key + ': ' + value);
// });

// // $scope.attendees2 = Object.keys(obj).map(function (key) { return obj[key]; });
// // $scope.attendees2 = $scope.toArray($scope.attendees);
// // console.log($scope.attendees2);

// $scope.loading=false;

//         });
        
//         //end function
//     }
//   $scope.loading=true;
//   $scope.loadData()
//   //setTimeout( $scope.loadData(), 100);
   
//   //  console.log($scope.listFirst);
//      $scope.storage =  window.localStorage
//    //  console.log($scope.storage);
//      //document.addEventListener("deviceready", $scope.onDeviceReady, false);

//   //  $scope.onDeviceReady();
   

// }])