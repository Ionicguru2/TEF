angular.module('app')
  
.controller('eventOverviewController', function ($scope, $stateParams, $state, $sce, Overview, $timeout, $ionicLoading) {

    $scope.to_trusted = function(html_code) {
        return $sce.trustAsHtml(html_code);
    }

    $scope.gotoLink = function(link){
        window.open(link,"_system");
    }
    $scope.loadData = function(){
        Overview.all().then(function(res){
            $scope.overview = res.page;
            $scope.overview.content = $scope.to_trusted($scope.overview.content.replace(/href="([^"]+)/g, 'ng-click="gotoLink(\'$1\')'));;
            $ionicLoading.hide();
        });
    }
    
    $ionicLoading.show();
    $scope.loadData();
})
