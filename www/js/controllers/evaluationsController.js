angular.module('app')
  
.controller('evaluationsController', function ($scope) {

    $scope.gotoLink = function(link){
        window.open(link,"_system");
    }
    
})
