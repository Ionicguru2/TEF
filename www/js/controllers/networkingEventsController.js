angular.module('app')
  
.controller('networkingEventsController', function ($scope, $stateParams, $state, $ionicScrollDelegate, $sce, Survey, $timeout, $ionicLoading) {

    $scope.params = $stateParams;
    $scope.surveys = [];

    $scope.to_trusted = function(html_code) {
        return $sce.trustAsHtml(html_code);
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
        
        Survey.all().then(function(res){
            $scope.surveys = res;
            var custom_fields = res.page.custom_fields;
            // console.log(res.page.custom_fields);
            $scope.date_range = custom_fields.date[0];
            $scope.days = custom_fields.day[0];
            $scope.desc=[];
            
            var fullstring,timestring,times,app_description;
            
            for (n=0; n<$scope.days;n++){
                //  console.log(n);
                var events = [];
                /**
                 * loop through times for each day
                 * */
                times = eval("custom_fields.day_" + n + "_times");
                daystring = eval("custom_fields.day_" + n + "_date");
                for (t=0; t<times;t++){
                    fullstring =  eval("custom_fields.day_" + n + "_times_" + t + "_description");
                    app_description = eval("custom_fields.day_" + n + "_times_" + t + "_event_description_for_app");
                    timestring =  eval("custom_fields.day_" + n + "_times_" + t + "_time");
                    networking_event =  eval("custom_fields.day_" + n + "_times_" + t + "_networking_event");
                    fullstring[0] = $scope.to_trusted(fullstring[0].replace(/(?:\r\n|\r|\n)/g, '<br />'));
                    events.push({
                        description: fullstring,
                        time: timestring,
                        app_description: app_description,
                        networking_event: networking_event
                    })
                }
                
                $scope.desc.push({
                    day: "DAY " + parseInt(n+1) + " -   " + daystring,
                    events: events
                });
            }
            $ionicLoading.hide();
        })
    }

    $ionicLoading.show();
    $scope.loadData();
})