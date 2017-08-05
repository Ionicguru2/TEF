angular.module('app')
  
.controller('speakerDetailController', function ($scope, $rootScope, $stateParams, $state, $ionicHistory, Speaker, $timeout, $ionicLoading, $ionicScrollDelegate) {

    $scope.currentId = parseInt($stateParams.id);

    $scope.gotoLink = function(link){
        window.open(link,"_system");
    }

    $scope.goForward = function(){
        $scope.currentId = $scope.b;
        $ionicLoading.show();
        $scope.loadData();
    }
    
    $scope.goBack = function(){
        $scope.currentId = $scope.c;
        $ionicLoading.show();
        $scope.loadData();
    }
    
    $scope.getSpeaker = function(){
        Speaker.getSpeaker($scope.currentId).then(function(res){
            $scope.speaker = res.post;
            $scope.count = $scope.speaker.custom_fields.presentations[0];
            $ionicScrollDelegate.scrollTop();
            $ionicScrollDelegate.resize();
            $ionicLoading.hide();
        });
    }

    $scope.loadData = function(){
        
        Speaker.getIds().then(function(res){
            $scope.a = res.indexOf($scope.currentId);
            if($scope.a!==res.length-1){
                $scope.b = res[eval(parseInt($scope.a)+"+1")];
            } else {
                $scope.b =  0; 
            }
            if($scope.a!==0){
                $scope.c = res[eval(parseInt($scope.a)+"-1")];
            } else {
                $scope.c = 0;  
            }
            $scope.getSpeaker();
        });
    }

    $ionicLoading.show();
    $scope.loadData();
})