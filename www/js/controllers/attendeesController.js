angular.module('app')
  
.controller('attendeesController', function ($scope, $stateParams, $state, $firebaseObject, $location, $anchorScroll, Attendee, $timeout, $ionicLoading) {

    $scope.sortLast=true;
    $scope.filterText = "";
    
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

    $scope.cancelSearch = function()
    {
        $scope.filterText = "";
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
