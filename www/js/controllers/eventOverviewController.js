angular.module('app')
  
.controller('eventOverviewController', function ($scope, $stateParams, $state, $sce, Overview) {

    // $scope.params = $stateParams;

    // $scope.header = $scope.params.id;
    $scope.to_trusted = function(html_code) {
        return $sce.trustAsHtml(html_code);
    }

    $scope.gotoLink = function(link){
    // console.log("LINK" + link);
        window.open(link,"_system");
    }
    $scope.loadData = function(){
        Overview.all().then(function(res){
       // console.log(res.page);
       $scope.overview = res.page;
        $scope.overview.content = $scope.to_trusted($scope.overview.content.replace(/href="([^"]+)/g, 'ng-click="gotoLink(\'$1\')'));;
        $scope.loading=false;
           
        });
    }
    $scope.loading=true;
    $scope.loadData();
})

// .controller('eVENTOVERVIEWCtrl', ['$scope', '$state', '$stateParams', '$sce', 'Overview', function ($scope, $state, $stateParams, $sce, Overview) {
// // $scope.params = $stateParams;

// // $scope.header = $scope.params.id;
// $scope.to_trusted = function(html_code) {
//     return $sce.trustAsHtml(html_code);
// }

// $scope.gotoLink = function(link){
//    // console.log("LINK" + link);
//     window.open(link,"_system");
// }
// $scope.loadData = function(){
//         Overview.all().then(function(res){
//        // console.log(res.page);
//        $scope.overview = res.page;
//         $scope.overview.content = $scope.to_trusted($scope.overview.content.replace(/href="([^"]+)/g, 'ng-click="gotoLink(\'$1\')'));;
//         $scope.loading=false;
           
//         });
//     }
//     $scope.loading=true;
//     $scope.loadData();
  

// }])