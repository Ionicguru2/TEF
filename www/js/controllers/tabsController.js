angular.module('app')
  
.controller('tabsController', function ($scope, $ionicTabsDelegate, $stateParams, $state, $ionicSideMenuDelegate, $firebaseObject, $firebaseArray, $timeout) {

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


    $scope.setBadgeNum = function()
    {
        refreshBadge();
    }

    $scope.$on('pushNotificationReceived', function(event, notification) {
        refreshBadge();
    });

    $scope.$on('refreshNotification', function(event, notification) {

        if ($ionicTabsDelegate.selectedIndex() != 3)
            return;

        Promise.all(promises).then(function(res) {
            var confDays = [];
            for (var i = 0; i < res.length / 2; i ++)
            {
                var confDay = {
                    dayObj: res[i],
                    messages: res[i + res.length/2],
                };
                confDays.push(confDay);
            }

            if (confDays == null || confDays.length == 0)
            return;
    
            var nodeNames = [];
            confDays.forEach(function(group){
                
                for (var i = 0; i < group.messages.length; i ++)
                {
                    if (group.messages[i].$id != 'day' && group.messages[i].isSeen == false)
                    {
                        nodeNames.push('/' + group.dayObj.$id + '/' + group.messages[i].$id);
                    }
                }
            })
    
            $timeout(function() {
                for (var i = 0; i < nodeNames.length; i ++)
                {
                    firebase.database().ref(nodeNames[i]).child('isSeen').set(true);
                }
                refreshBadge();
            }, 5000)
        });
    });
})