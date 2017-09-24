angular.module('app')
  
.controller('presentationsController', function ($scope, $stateParams, $state, Presentation, $timeout, $ionicLoading, $ionicScrollDelegate) {

    $scope.params = $stateParams;
 
    $scope.gotoLink = function(link){
        var url = "https://www.trusteducationfoundation.com/api/taf/get_link/?att=" + link;
        window.open(url,"_system");
    }

    $scope.toggleGroup = function(group) {
        if ($scope.isGroupShown(group)) {
            $scope.shownGroup = null;
        } else {
            $scope.shownGroup = group;
        }
        $timeout(function() {
            $ionicScrollDelegate.scrollTop();
            $ionicScrollDelegate.resize();
        }, 100)
    };
    $scope.isGroupShown = function(group) {
        return $scope.shownGroup === group;
    };
 
    $scope.loadData = function(){
        Presentation.all().then(function(res){
            $scope.presentations = res.posts;
            $ionicLoading.hide();
            console.log($scope.presentations);
            $scope.desc=[];
            
            for (var i = 0, len = $scope.presentations.length; i < len; i++) {
                var events = [];            
                var p =  $scope.presentations[i];
                var mTitle = "DAY " + (i+1) + " - " + $scope.presentations[i].title;
                var count = p.custom_fields.presentation[0];

                for (var j = 0, jlen = count; j<jlen; j++){
                 
                    if (eval("p.custom_fields.presentation_" + j + "_title[0]")){
                        pTitle = eval("p.custom_fields.presentation_" + j + "_title[0]");
                        pFile = eval("p.custom_fields.presentation_" + j + "_file[0]");
                        
                        events.push({
                            title: pTitle,
                            file: pFile,
                            link:"https://www.trusteducationfoundation.com/api/taf/get_link/?att="+pFile
                        });
                    }
                }
                $scope.desc.push({ 
                    mTitle: mTitle,
                    events: events
                });
            }
            console.log($scope.desc);
        });
    }
        
    $ionicLoading.show();
    $scope.loadData();
})