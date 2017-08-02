angular.module('app')
  
.controller('sponsorsController', function ($scope, $stateParams, $state, Sponsor) {

    $scope.params = $stateParams;
    $scope.sponsors = [];
    
    $scope.gotoLink = function(link){
        window.open(link,"_system");
    }
    
    $scope.getPlatinum = function(){
      //  console.log('platinum');
    }
    
    $scope.toggleShow = function(d){
      //  console.log(d);
    }
    $scope.toggleGroup = function(d) {
       $scope.sponsors='';
        if ($scope.isGroupShown(d)) {
          $scope.shownGroup = null;
        } else {
          $scope.shownGroup = d;
          $scope.loading=true;
        }
    };
  
    $scope.isGroupShown = function(d) {
        return $scope.shownGroup === d;
    };
    
    $scope.loadData = function(type){
        
        Sponsor.all(type).then(function(res){
            $scope.sponsors = res.posts;
            for(n=0;n<$scope.sponsors.length;n++){
                $scope.sponsors[n].title = $scope.sponsors[n].title.replace("&#038;", "&");
                $scope.sponsors[n].title = $scope.sponsors[n].title.replace("&#8217;", "'");
            }
            $scope.loading=false;
            //console.log($scope.sponsors);
        });
    }
})

// .controller('sPONSORSCtrl', ['$scope', '$stateParams', 'Sponsor', function ($scope, $stateParams,Sponsor) {
//     $scope.params = $stateParams;
//     $scope.sponsors = [];
    
//     $scope.gotoLink = function(link){
//         window.open(link,"_system");
//     }
    
//     $scope.getPlatinum = function(){
//       //  console.log('platinum');
//     }
    
//     $scope.toggleShow = function(d){
//       //  console.log(d);
//     }
//     $scope.toggleGroup = function(d) {
//        $scope.sponsors='';
//         if ($scope.isGroupShown(d)) {
//           $scope.shownGroup = null;
//         } else {
//           $scope.shownGroup = d;
//           $scope.loading=true;
//         }
//     };
  
//     $scope.isGroupShown = function(d) {
//         return $scope.shownGroup === d;
//     };
    
//     $scope.loadData = function(type){
        
//         Sponsor.all(type).then(function(res){
//             $scope.sponsors = res.posts;
//             for(n=0;n<$scope.sponsors.length;n++){
//                 $scope.sponsors[n].title = $scope.sponsors[n].title.replace("&#038;", "&");
//                 $scope.sponsors[n].title = $scope.sponsors[n].title.replace("&#8217;", "'");
//             }
//             $scope.loading=false;
//         //console.log($scope.sponsors);
//         });
//     }



// }])