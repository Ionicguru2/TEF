
angular.module('app')
  
.controller('homeController', function ($scope, $stateParams, $state, $firebaseObject, $timeout) {

    var keyOfSession = 'currentSession5';
    var ref = firebase.database().ref();

    function getFormatedDate(session)
    {
        var strFBEventDateTime = session.date + ' ' + session.startTime;

        var d = new Date(session.replace(/-/g,"/"));
        var weekdays = new Array(7);
        weekdays[0] =  "SUNDAY";
        weekdays[1] = "MONDAY";
        weekdays[2] = "TUESDAY";
        weekdays[3] = "WEDNESDAY";
        weekdays[4] = "THURSDAY";
        weekdays[5] = "FRIDAY";
        weekdays[6] = "SATURDAY";
        
        var n = weekdays[d.getDay()];

        var months = [];
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

    

    function refreshSessionData() {
        ref.child("sessions").on('value', function(snapshot) {

            $timeout(function() {
                
                snapshot.forEach(function(daySessionsSnapshot) {
                    var daySessions = daySessionsSnapshot.val();
                    var current = daySessionsSnapshot.val();
                    var currentSession = window.localStorage[keyOfSession];
                    
                    var date = getFormatedDate(daySessions.date);
    
                    if (typeof currentSession === 'undefined') {
                        daySessionsSnapshot.forEach(function(daySesisonSnapshot) {
                            var daySession = daySesisonSnapshot.val();
                            if (typeof daySession.startTime !== 'undefined') {
                                $scope.current = {
                                    date: getFormatedDate(daySessions.date),
                                    time: getFormatedTime(daySession),
                                    sessionTitle: daySession.sessionTitle,
                                    roomLocation: daySession.roomLocation,
                                    speakerNameAndTitle: daySession.speakerNameAndTitle
                                };
                                window.localStorage[keyOfSession]=JSON.stringify($scope.current);

                                return;
                            }
                        });
                    }
                    else
                    {
                        $scope.current = JSON.parse(currentSession);
                        daySessionsSnapshot.forEach(function(daySesisonSnapshot) {
                            var daySession = daySesisonSnapshot.val();
                            if (typeof daySession.startTime !== 'undefined') {
    
                                var strFBEventDateTime = daySessions.date + ' ' + daySession.startTime;
                                var fbEventTime = new Date(strFBEventDateTime.replace(/-/g,"/")).getTime();
    
                                var thedate = new Date(Date.parse(strFBEventDateTime));
                                
                                var todayDate = new Date();
                                var today = new Date().getTime();
                                var hourDiff = fbEventTime - today;
                                var minDiff = hourDiff / 60 / 1000;
    
                                if (0 < minDiff && minDiff < 10) {
                                    $scope.current = {
                                        date: getFormatedDate(daySessions.date),
                                        time: getFormatedTime(daySession),
                                        sessionTitle: daySession.sessionTitle,
                                        roomLocation: daySession.roomLocation,
                                        speakerNameAndTitle: daySession.speakerNameAndTitle
                                    };
                                    window.localStorage[keyOfSession]=JSON.stringify($scope.current);
                                }
                            }
                        });
                    }
                });
            });
        });
    }

    refreshSessionData();

    setInterval(()=>{
        refreshSessionData();
    }, 5000);
});