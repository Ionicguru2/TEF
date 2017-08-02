angular.module('app')
  
.controller('speakersController', function ($scope, $stateParams, $state, Speaker) {

    $scope.params = $stateParams;
    $scope.speakers = [];

    $scope.toggleShow = function(d){
     //   console.log(d);
    }
    
    $scope.getSpeaker = function(speaker){
        $scope.speaker = {
            id:speaker
        }
    //     console.log($scope.speaker);
        $state.go('app.tab.speakerDetail',$scope.speaker);
    }
    $scope.toggleGroup = function(d) {
       $scope.sponsors='';
        if ($scope.isGroupShown(d)) {
          $scope.shownGroup = null;
        } else {
          $scope.shownGroup = d;
        }
    };
  
    $scope.isGroupShown = function(d) {
        return $scope.shownGroup === d;
    };
    
    $scope.loadData = function(){
       
        Speaker.all().then(function(res){
            $scope.speakers = res.posts;
            $scope.loading=false;
       //     console.log(res.posts);
        });
    }
    $scope.loading=true;
    $scope.loadData();
})

// .controller('sPEAKERSCtrl', ['$scope', '$state', '$stateParams', 'Speaker', // HTML VERSION
// function ($scope, $state, $stateParams, Speaker) {
//     $scope.params = $stateParams;
//     $scope.speakers = [];

//     $scope.toggleShow = function(d){
//      //   console.log(d);
//     }
    
//     $scope.getSpeaker = function(speaker){
//         $scope.speaker = {
//             id:speaker
//         }
//     //     console.log($scope.speaker);
//         $state.go('sPEAKERS2',$scope.speaker);
//     }
//     $scope.toggleGroup = function(d) {
//        $scope.sponsors='';
//         if ($scope.isGroupShown(d)) {
//           $scope.shownGroup = null;
//         } else {
//           $scope.shownGroup = d;
//         }
//     };
  
//     $scope.isGroupShown = function(d) {
//         return $scope.shownGroup === d;
//     };
    
//     $scope.loadData = function(){
       
//         Speaker.all().then(function(res){
//                                                                                                                                        $scope.speakers = res.posts;
//                                                                                                                                        $scope.loading=false;
//        //     console.log(res.posts);
//         });
//     }
//     $scope.loading=true;
//     $scope.loadData();

// }])