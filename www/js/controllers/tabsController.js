angular.module('app')
  
.controller('tabsController', function ($scope, $stateParams, $state, $ionicSideMenuDelegate, $firebaseObject, $firebaseArray, $timeout) {

    $scope.numBadge = 0;

    var ref = firebase.database().ref();
    var promises = [
        $firebaseObject(ref.child("message1")).$loaded(),
        $firebaseObject(ref.child("message2")).$loaded(),
        $firebaseObject(ref.child("message3")).$loaded(),
        $firebaseObject(ref.child("message4")).$loaded(),
        $firebaseObject(ref.child("message5")).$loaded(),
        $firebaseArray(ref.child("message1").orderByChild("order")).$loaded(),
        $firebaseArray(ref.child("message2").orderByChild("order")).$loaded(),
        $firebaseArray(ref.child("message3").orderByChild("order")).$loaded(),
        $firebaseArray(ref.child("message4").orderByChild("order")).$loaded(),
        $firebaseArray(ref.child("message5").orderByChild("order")).$loaded()
    ];

    function refreshBadge()
    {
        Promise.all(promises).then(function(res) {
            
            var numBadge = 0;
            for (var i = 0; i < res.length / 2; i ++)
            {
                var messages = res[i + res.length/2];
    
                for (var j = 0; j < messages.length; j ++)
                {
                    if (messages[j].isSeen == false)
                        numBadge ++;
                }
            }

            $timeout(function() {
                $scope.numBadge = numBadge;
            })
        });
    }


    $scope.setBadgeNum = function(number)
    {
        // $scope.numBadge -= number;
        refreshBadge();
    }

    $scope.$on('pushNotificationReceived', function(event, notification) {
        refreshBadge();
    });
})