
angular.module('app')
  
.controller('homeController', function ($scope, $stateParams, $state, $firebaseObject, $timeout) {

    var keyOfSession = 'currentSession10';
    var ref = firebase.database().ref();
    // $scope.current =$firebaseObject(ref.child("current"));

    function getFormatedDate(session)
    {
        var strFBEventDateTime = session.date + ' ' + session.startTime;
        var fbEventTime = new Date(strFBEventDateTime.replace(/-/g,"/")).getTime();

        var today = new Date().getTime();;
        var hourDiff = fbEventTime - today;
        var minDiff = hourDiff / 60 / 1000;

        // $scope.current = session;

        var d = new Date(strFBEventDateTime.replace(/-/g,"/"));
        var weekdays = new Array(7);
        weekdays[0] =  "SUNDAY";
        weekdays[1] = "MONDAY";
        weekdays[2] = "TUESDAY";
        weekdays[3] = "WEDNESDAY";
        weekdays[4] = "THURSDAY";
        weekdays[5] = "FRIDAY";
        weekdays[6] = "SATURDAY";
        
        var n = weekdays[d.getDay()];

        var months = new Array();
        months[0] = "JANUARY";
        months[1] = "FEBRARY";
        months[2] = "MARCH";
        months[3] = "APRIL";
        months[4] = "MAY";
        months[5] = "JUNE";
        months[6] = "NULY";
        months[7] = "AUGUST";
        months[8] = "SEPTEMBER";
        months[9] = "OCTORBER";
        months[10] = "NOVEMBER";
        months[11] = "DECEMBER";
        var m = months[d.getMonth()];

        var dayOfMonth = d.getDate();
        var s=["TH","ST","ND","RD"];
        var v=dayOfMonth%100;
        dayOfMonth = dayOfMonth+(s[(v-20)%10]||s[v]||s[0]);

        return n + ', ' + m + ' ' + dayOfMonth;
    }

    function getFormatedTime(session)
    {
        var startTime = new Date();
        startTime.setHours(session.startTime.substr(0, session.startTime.indexOf(":")));
        startTime.setMinutes(session.startTime.substr(session.startTime.indexOf(":") + 1));
        startTime.setSeconds(0);

        var endTime = new Date();
        endTime.setHours(session.endTime.substr(0, session.endTime.indexOf(":")));
        endTime.setMinutes(session.endTime.substr(session.endTime.indexOf(":") + 1));
        endTime.setSeconds(0);

        // var startTime = new Date(session.startTime);
        // var endTime = new Date(session.endTime);

        var sHours = startTime.getHours();
        var sAMPM = sHours >= 12 ? ' PM' : ' AM';
        sHours = sHours % 12;
        sHours = sHours ? sHours : 12;
        sHours = sHours < 10 ? ('0' + sHours) : sHours;
        var sMins = startTime.getMinutes();
        sMins = sMins == '0' ? '00' : sMins;

        var strStart = sHours + ':' + sMins + sAMPM;

        var eHours = endTime.getHours();
        var eAMPM = eHours >= 12 ? ' PM' : ' AM';
        eHours = eHours % 12;
        eHours = eHours ? eHours : 12;
        eHours = eHours < 10 ? ('0' + eHours) : eHours;
        var eMins = endTime.getMinutes();
        eMins = eMins == '0' ? '00' : eMins;

        var strEnd = eHours + ':' + eMins + eAMPM;

        return strStart + ' - ' + strEnd;
    }

    setInterval(()=>{

        ref.child("current").on('value', function(snapshot) {
            $timeout(function() {
                
                $scope.current = snapshot.val();
                var session = snapshot.val();
    
                var currentSession = window.localStorage[keyOfSession];
                if (typeof currentSession == 'undefined')
                {
                    $scope.current['date'] = getFormatedDate(session);
                    $scope.current['time'] = getFormatedTime(session);
    
                    window.localStorage[keyOfSession]=JSON.stringify($scope.current);
                }
                else
                {
                    var strFBEventDateTime = session.date + ' ' + session.startTime;
                    var fbEventTime = new Date(strFBEventDateTime.replace(/-/g,"/")).getTime();
    
                    var today = new Date().getTime();;
                    var hourDiff = fbEventTime - today;
                    var minDiff = hourDiff / 60 / 1000;
    
                    if (minDiff < 10)
                    {
                        $scope.current['date'] = getFormatedDate(session);
                        $scope.current['time'] = getFormatedTime(session);
                        window.localStorage[keyOfSession]=JSON.stringify($scope.current);
                    }
                    else
                    {
                        $scope.current = JSON.parse(currentSession);
                    }
                }
            })
        });

    }, 5000);

    ref.child("current").on('value', function(snapshot) {
        $timeout(function() {
            
            $scope.current = snapshot.val();
            var session = snapshot.val();

            var currentSession = window.localStorage[keyOfSession];
            if (typeof currentSession == 'undefined')
            {
                $scope.current['date'] = getFormatedDate(session);
                $scope.current['time'] = getFormatedTime(session);

                window.localStorage[keyOfSession]=JSON.stringify($scope.current);
            }
            else
            {
                var strFBEventDateTime = session.date + ' ' + session.startTime;
                var fbEventTime = new Date(strFBEventDateTime.replace(/-/g,"/")).getTime();

                var thedate = new Date(Date.parse(strFBEventDateTime));

                var today = new Date().getTime();;
                var hourDiff = fbEventTime - today;
                var minDiff = hourDiff / 60 / 1000;

                if (minDiff < 10)
                {
                    $scope.current['date'] = getFormatedDate(session);
                    $scope.current['time'] = getFormatedTime(session);
                    window.localStorage[keyOfSession]=JSON.stringify($scope.current);
                }
                else
                {
                    $scope.current = JSON.parse(currentSession);
                }
            }
        })
    });
})