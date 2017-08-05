angular.module('app')
  
.controller('sponsorsController', function ($scope, $stateParams, $state, Sponsor, $timeout, $ionicLoading, $ionicScrollDelegate) {

    $scope.groups = ["platinum", "gold", "silver"];
    $scope.sponsors = [];
    
    $scope.gotoLink = function(link){
        window.open(link,"_system");
    }

    $scope.toggleGroup = function(group) {
        if ($scope.isGroupShown(group)) {
            $scope.shownGroup = null;
        } else {
            $scope.shownGroup = group;
            $ionicLoading.show();
        }
        $timeout(function() {
            $ionicScrollDelegate.scrollTop();
            $ionicScrollDelegate.resize();
        }, 100)
    };
    
    $scope.isGroupShown = function(group) {
        return $scope.shownGroup === group;
    };
    
    $scope.loadData = function(type){
        
        Sponsor.all(type).then(function(res){

            $scope.sponsors = res.posts;
            for(n=0;n<$scope.sponsors.length;n++){
                $scope.sponsors[n].title = $scope.sponsors[n].title.replace("&#038;", "&");
                $scope.sponsors[n].title = $scope.sponsors[n].title.replace("&#8217;", "'");
            }

            $ionicLoading.hide();
        });
    }
})