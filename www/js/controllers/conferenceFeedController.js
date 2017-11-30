
angular.module('app')

.controller('conferenceFeedController', function ($scope, $stateParams, $state, $firebaseObject, $firebaseArray, $timeout, $ionicLoading, $ionicScrollDelegate) {

	$scope.$on('$ionicView.beforeEnter', function() {
		$scope.refreshNotificationBadge();
	});
	
  $scope.confDays = [];
  $scope.isFirstTime = true;

  $scope.numBadge = 0;

  $scope.isToday = function(date) {
	  var arrDates = date.split('-');
	  var tmpDate = arrDates[1];
	  var strDate = tmpDate.substr(1);
	  var eventDate = new Date(strDate).setHours(0, 0, 0, 0);
	  var today = new Date().setHours(0, 0, 0, 0);
	  return today == eventDate;
  }

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
	  $firebaseArray(ref.child("message1").orderByChild("order")).$loaded(),
	  $firebaseArray(ref.child("message2").orderByChild("order")).$loaded(),
	  $firebaseArray(ref.child("message3").orderByChild("order")).$loaded(),
	  $firebaseArray(ref.child("message4").orderByChild("order")).$loaded(),
  ];

  Promise.all(promises).then(function(res) {
	  
	  for (var i = 0; i < res.length / 2; i ++)
	  {
		  var confDay = {
			  dayObj: res[i],
			  messages: res[i + res.length/2],
			  isToday: $scope.isToday(res[i].day)
		  };
		  confDay.dayObj.day = confDay.dayObj.day;
		  $scope.confDays.push(confDay);

		  for (var j = 0; j < confDay.messages.length; j ++)
		  {
			  if (confDay.messages[j].isSeen == false)
				  $scope.numBadge ++;
		  }
	  }

	  $ionicLoading.hide();

	  $scope.refreshNotificationBadge();
  });

  $scope.refreshNotificationBadge = function() {
	  if ($scope.confDays == null || $scope.confDays.length == 0)
		  return;

	  var nodeNames = [];
	  $scope.confDays.forEach(function(group){
		   
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
		  $scope.$parent.setBadgeNum();
	  }, 5000)
  }
})