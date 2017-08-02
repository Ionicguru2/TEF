angular.module('app')
  
.controller('presentationsController', function ($scope, $stateParams, $state, Presentation) {

    $scope.params = $stateParams;
 
    $scope.gotoLink = function(link){
        var url = "https://www.trusteducationfoundation.com/api/taf/get_link/?att=" + link;
        window.open(url,"_system");
    }
 
    $scope.loadData = function(){
        Presentation.all().then(function(res){
            $scope.presentations = res.posts;
            $scope.loading=false;
            console.log($scope.presentations);
            $scope.desc=[];
            // $scope.presentations.forEach(myFunction);
            
            for (var i = 0, len = $scope.presentations.length; i < len; i++) {
                var events = [];            
                var p =  $scope.presentations[i];
                var mTitle = $scope.presentations[i].title;
                var count = p.custom_fields.presentation[0];
                //console.log("Count is " + count);
                for (var j = 0, jlen = count;j<jlen;j++){
                 
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
    function myFunction(item, index) {
        var events = [];
        console.log(item);   
    }
        
    $scope.loading=true;
    $scope.loadData();
})

// .controller('pRESENTATIONSCtrl', ['$scope', '$stateParams', 'Presentation', 'Link', // The following is the constructor function for this page's controller. See https://docs.angularjs.org/guide/controller
// // You can include any angular dependencies as parameters for this function
// // TIP: Access Route Parameters for your page via $stateParams.parameterName
// function ($scope, $stateParams, Presentation, Link) {
//  $scope.params = $stateParams;
 
//     $scope.gotoLink = function(link){
//         var url = "https://www.trusteducationfoundation.com/api/taf/get_link/?att=" + link;
//         window.open(url,"_system");
//     }

 
//     $scope.loadData = function(){
//         Presentation.all().then(function(res){
//             $scope.presentations = res.posts;
//             $scope.loading=false;
//             console.log($scope.presentations);
//             $scope.desc=[];
//            // $scope.presentations.forEach(myFunction);
            
//             for (var i = 0, len = $scope.presentations.length; i < len; i++) {
//                 var events = [];            
//                 var p =  $scope.presentations[i];
//                 var mTitle = $scope.presentations[i].title;
//                 var count = p.custom_fields.presentation[0];
//                 //console.log("Count is " + count);
//                 for (var j = 0, jlen = count;j<jlen;j++){
                 
//                     if (eval("p.custom_fields.presentation_" + j + "_title[0]")){
//                         pTitle = eval("p.custom_fields.presentation_" + j + "_title[0]");
//                         pFile = eval("p.custom_fields.presentation_" + j + "_file[0]");
                        
//                         //get actual link
//                         // Link.all(pFile).then(function(res2){
//                         //     $scope.pLink = res2.link;
//                         //   // console.log(res2.link);
                          
                            
//                         // });
                        
//                         //console.log(pTitle);
//                           events.push({
//                             title: pTitle,
//                             file: pFile,
//                             link:"https://www.trusteducationfoundation.com/api/taf/get_link/?att="+pFile
//                         });
//                     } //end if
                  
//                }//end inner loop 
//                 $scope.desc.push({ 
//                     mTitle: mTitle,
//                     events: events
//                 });
               
//             }//end main loop
//         console.log($scope.desc);
            
//         });
//     }
//         function myFunction(item, index) {
//             var events = [];
            
//             console.log(item);   
//         }
        
//             //     var custom_fields = res.page.custom_fields;
//             //   //  console.log(res.page.custom_fields);
//             //     $scope.date_range = custom_fields.date[0];
//             //     $scope.days = custom_fields.day[0];
//             //     $scope.desc=[];
                
//             //     var fullstring,timestring,times,app_description;
                
//             //     for (n=0; n<$scope.days;n++){
//             //      //   console.log(n);
//             //         var events = [];
//             //         /**
//             //          * loop through times for each day
//             //          * */
//             //          times = eval("custom_fields.day_" + n + "_times");
//             //          daystring = eval("custom_fields.day_" + n + "_date");
//             //          for (t=0; t<times;t++){
//             //             fullstring =  eval("custom_fields.day_" + n + "_times_" + t + "_description");
//             //             app_description = eval("custom_fields.day_" + n + "_times_" + t + "_event_description_for_app");
//             //             timestring =  eval("custom_fields.day_" + n + "_times_" + t + "_time");
//             //             events.push({
//             //                 description: fullstring,
//             //                 time: timestring,
//             //                 app_description: app_description
//             //             })
//             //          }
                   
//             //     //   fullstring = fullstring.replace(/<\/?[^>]+>/gi, '');
//             //       $scope.desc.push({ 
//             //             day: "DAY " + parseInt(n+1) + " -   " + daystring,
//             //             events: events
//             //       });
//             //     }
        
        
        
//         // });
    
    
//     $scope.loading=true;
//     $scope.loadData();
 
// }])