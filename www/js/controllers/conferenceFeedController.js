angular.module('app')
  
.controller('conferenceFeedController', function ($scope, $stateParams, $state, $firebaseObject, $firebaseArray, $timeout, $ionicLoading, $ionicScrollDelegate) {

    $scope.confDays = [];
    $scope.isFirstTime = true;

    $scope.numBadge = 0;

    $scope.isToday = function(date) {
        date = new Date(date).setHours(0, 0, 0, 0);
        var today = new Date().setHours(0, 0, 0, 0);
        return date == today;
    }

    $scope.toggleGroup = function(group) {
        $scope.isFirstTime = false;
        if ($scope.isGroupShown(group)) {
            $scope.shownGroup = null;
        } else {
            $scope.shownGroup = group;

            var nodeNames = [];
            var numBadge = 0;
            for (var i = 0; i < group.messages.length; i ++)
            {
                if (group.messages[i].$id != 'day' && group.messages[i].isSeen == false)
                {
                    nodeNames.push('/' + group.dayObj.$id + '/' + group.messages[i].$id);
                    numBadge ++;
                }
                // tmpGroup[group.messages[i].$id]['isSeen'] = true;
            }

            $timeout(function() {
                for (var i = 0; i < nodeNames.length; i ++)
                {
                    firebase.database().ref(nodeNames[i]).child('isSeen').set(true);
                }
                $scope.$parent.setBadgeNum(numBadge);
            }, 5000)
            
        }
        $timeout(function() {
            $ionicScrollDelegate.scrollTop();
            $ionicScrollDelegate.resize();
        }, 100)
    };
    $scope.isGroupShown = function(group) {
        return $scope.isFirstTime && group.isToday || $scope.shownGroup === group;
    };


    $ionicLoading.show();

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

    Promise.all(promises).then(function(res) {
        
        for (var i = 0; i < res.length / 2; i ++)
        {
            var confDay = {
                dayObj: res[i],
                messages: res[i + res.length/2],
                isToday: $scope.isToday(res[i].day)
            };
            $scope.confDays.push(confDay);

            for (var j = 0; j < confDay.messages.length; j ++)
            {
                if (confDay.messages[j].isSeen == false)
                    $scope.numBadge ++;
            }
        }

        // $scope.$parent.setBadgeNum($scope.numBadge);
        
        $ionicLoading.hide();
    });
})