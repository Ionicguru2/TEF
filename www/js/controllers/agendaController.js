angular.module('app')
  
.controller('agendaController', function ($scope, $stateParams, $state, $sce, Survey) {

    $scope.params = $stateParams;
    $scope.surveys = [];
    
    $scope.to_trusted = function(html_code) {
        return $sce.trustAsHtml(html_code);
    }
    
    $scope.toggleShow = function(d){
        //  console.log(d);
    }
    $scope.toggleGroup = function(d) {
        //  console.log(d);
        if ($scope.isGroupShown(d)) {
        $scope.shownGroup = null;
        } else {
        $scope.shownGroup = d;
        }
    };
    $scope.isGroupShown = function(d) {
        return $scope.shownGroup === d;
    };
    
    $scope.loadData = function(){
        
        Survey.all().then(function(res){
            $scope.surveys = res;
            var custom_fields = res.page.custom_fields;
            //  console.log(res.page.custom_fields);
            $scope.date_range = custom_fields.date[0];
            $scope.days = custom_fields.day[0];
            $scope.desc=[];
            
            var fullstring,timestring,times,app_description;
            
            for (n=0; n<$scope.days;n++){
                //   console.log(n);
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
                    // console.log($scope.to_trusted(fullstring[0]));
                    fullstring[0] = $scope.to_trusted(fullstring[0].replace(/(?:\r\n|\r|\n)/g, '<br />'));
                    
                    events.push({
                        description: fullstring,
                        time: timestring,
                        app_description: app_description
                    })
                }
                
                $scope.desc.push({
                    day: "DAY " + parseInt(n+1) + " -   " + daystring,
                    events: events
                });
            }
            
            $scope.loading=false;
        })
    }

    $scope.loading=true;
    $scope.loadData();
})

// .controller('aGENDACtrl', ['$scope', '$stateParams', '$sce', 'Survey', //for HTML version
// function ($scope, $stateParams, $sce, Survey) {
//  $scope.params = $stateParams;
    
//     $scope.surveys = [];
    
    
//     $scope.to_trusted = function(html_code) {
//         return $sce.trustAsHtml(html_code);
//     }
    
//     $scope.toggleShow = function(d){
//       //  console.log(d);
        
//     }
//     $scope.toggleGroup = function(d) {
//       //  console.log(d);
//     if ($scope.isGroupShown(d)) {
//       $scope.shownGroup = null;
//     } else {
//       $scope.shownGroup = d;
//     }
//   };
//   $scope.isGroupShown = function(d) {
//     return $scope.shownGroup === d;
//   };
    
//     $scope.loadData = function(){
        
        
//             Survey.all().then(function(res){
//                 $scope.surveys = res;
//                 var custom_fields = res.page.custom_fields;
//               //  console.log(res.page.custom_fields);
//                 $scope.date_range = custom_fields.date[0];
//                 $scope.days = custom_fields.day[0];
//                 $scope.desc=[];
                
//                 var fullstring,timestring,times,app_description;
                
//                 for (n=0; n<$scope.days;n++){
//                  //   console.log(n);
//                     var events = [];
//                     /**
//                      * loop through times for each day
//                      * */
//                      times = eval("custom_fields.day_" + n + "_times");
//                      daystring = eval("custom_fields.day_" + n + "_date");
//                      for (t=0; t<times;t++){
//                         fullstring =  eval("custom_fields.day_" + n + "_times_" + t + "_description");
//                         app_description = eval("custom_fields.day_" + n + "_times_" + t + "_event_description_for_app");
//                         timestring =  eval("custom_fields.day_" + n + "_times_" + t + "_time");
//                        // console.log($scope.to_trusted(fullstring[0]));
//                        fullstring[0] = $scope.to_trusted(fullstring[0].replace(/(?:\r\n|\r|\n)/g, '<br />'));
                       
//                         events.push({
//                             description: fullstring,
//                             time: timestring,
//                             app_description: app_description
//                         })
//                      }
                   
//                 //   fullstring = fullstring.replace(/<\/?[^>]+>/gi, '');
//                    $scope.desc.push({ 
//                         day: "DAY " + parseInt(n+1) + " -   " + daystring,
//                         events: events
//                    });
//                 }
               
//                 //how many days to show = day[0]
//                 //$scope.$broadcast('scroll.refreshComplete');
//                  $scope.loading=false;
//             })
       
        
//     }
//  $scope.loading=true;
//     $scope.loadData();
   

// }])