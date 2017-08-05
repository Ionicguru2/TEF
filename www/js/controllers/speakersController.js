angular.module('app')
  
.controller('speakersController', function ($scope, $stateParams, $state, Speaker, $timeout, $ionicLoading) {

    $scope.speakers = [];
    
    $scope.getSpeaker = function(speaker){
        $scope.speaker = {
            id:speaker
        }
        $state.go('app.tab.speakerDetail', $scope.speaker);
    }
    
    $scope.loadData = function(){
       
        Speaker.all().then(function(res){
            $scope.speakers = res.posts;
            $ionicLoading.hide();
        });
    }

    $ionicLoading.show();
    $scope.loadData();
})
