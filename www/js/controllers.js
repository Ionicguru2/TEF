angular.module('app.controllers', [])
  
.controller('menuCtrl', ['$scope', '$stateParams', '$state', '$ionicSideMenuDelegate', // The following is the constructor function for this page's controller. See https://docs.angularjs.org/guide/controller
// You can include any angular dependencies as parameters for this function
// TIP: Access Route Parameters for your page via $stateParams.parameterName
function ($scope, $stateParams, $state,$ionicSideMenuDelegate) {
  $scope.toggleLeftSideMenu = function() {
    $ionicSideMenuDelegate.toggleLeft();
  };
   $scope.toggleRightSideMenu = function() {
    $ionicSideMenuDelegate.toggleRight();
  };
$scope.goHome=function(){
   
  
        $state.go('home');
    }, function(){
}

}])
   
.controller('eVENTOVERVIEWCtrl', ['$scope', '$state', '$stateParams', '$sce', 'Overview', function ($scope, $state, $stateParams, $sce, Overview) {
// $scope.params = $stateParams;

// $scope.header = $scope.params.id;
$scope.to_trusted = function(html_code) {
    return $sce.trustAsHtml(html_code);
}

$scope.gotoLink = function(link){
   // console.log("LINK" + link);
    window.open(link,"_system");
}
$scope.loadData = function(){
        Overview.all().then(function(res){
       // console.log(res.page);
       $scope.overview = res.page;
        $scope.overview.content = $scope.to_trusted($scope.overview.content.replace(/href="([^"]+)/g, 'ng-click="gotoLink(\'$1\')'));;
        $scope.loading=false;
           
        });
    }
    $scope.loading=true;
    $scope.loadData();
  

}])
   
.controller('eVALUATIONSCtrl', ['$scope', '$stateParams', '$sce', // The following is the constructor function for this page's controller. See https://docs.angularjs.org/guide/controller
// You can include any angular dependencies as parameters for this function
// TIP: Access Route Parameters for your page via $stateParams.parameterName
function ($scope, $stateParams, $sce) {
 $scope.params = $stateParams;
 
$scope.to_trusted = function(html_code) {
    return $sce.trustAsHtml(html_code);
}

$scope.gotoLink = function(link){
   // console.log("LINK" + link);
    window.open(link,"_system");
}
    
    $scope.loadData = function(){
        
        $scope.loading=false;
        
    }

    $scope.loadData();
   

}])
   
.controller('cONFERENCEFEEDCtrl', ['$scope', '$stateParams', '$firebaseArray', '$firebaseObject', // The following is the constructor function for this page's controller. See https://docs.angularjs.org/guide/controller
// You can include any angular dependencies as parameters for this function
// TIP: Access Route Parameters for your page via $stateParams.parameterName
function ($scope, $stateParams,$firebaseArray,$firebaseObject) {
    $scope.loading=true;
 $scope.params = $stateParams;

      var ref = firebase.database().ref();
      // create a synchronized array
      $scope.messages1 =$firebaseObject(ref.child("message1"));
      $scope.messages1a = $firebaseArray(ref.child("message1").orderByChild("order"));
      
        $scope.messages2 =$firebaseObject(ref.child("message2"));
      $scope.messages2a = $firebaseArray(ref.child("message2").orderByChild("order"));
      
       $scope.messages3 =$firebaseObject(ref.child("message3"));
      $scope.messages3a = $firebaseArray(ref.child("message3").orderByChild("order"));
      
       $scope.messages4 =$firebaseObject(ref.child("message4"));
      $scope.messages4a = $firebaseArray(ref.child("message4").orderByChild("order"));
      
       $scope.messages5 =$firebaseObject(ref.child("message5"));
      $scope.messages5a = $firebaseArray(ref.child("message5").orderByChild("order"));
      
 
       $scope.loading=false;
        
    

    //$scope.loadData();
   //console.log($scope.messages);

}])
   
.controller('aTTENDEESCtrl', ['$scope', '$stateParams', '$ionicScrollDelegate', '$location', '$anchorScroll', 'Attendee', // The following is the constructor function for this page's controller. See https://docs.angularjs.org/guide/controller
// You can include any angular dependencies as parameters for this function
// TIP: Access Route Parameters for your page via $stateParams.parameterName
function ($scope, $stateParams,$ionicScrollDelegate,$location,$anchorScroll,Attendee) {

    $scope.sortLast=true;
    
  
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
    
 $scope.params = $stateParams;
  $scope.listFirst = new Array();
  $scope.listLast = new Array();
             $scope.alphabet = "ABCDEFGHIJKLMNOPQRSTUVWXYZ".split("");
             angular.forEach($scope.alphabet, function(val){
             $scope.listFirst[val]=new Array();
             $scope.listLast[val]=new Array();    
             });
    // device APIs are available
    //
    $scope.onDeviceReady = function() {
      //  console.log("ready");
        window.localStorage['items'] = JSON.stringify([{ 
  title: 'You Owe Me Now',
  fullName: 'Cameron Bourke',
  dollarAmount: '2',
  description: 'You owe me $2 for downloading this app. Only kidding!! This is just an example of a "Theyo". Delete me now by swiping to the left and enjoy.'
}]);
$scope.contacts = JSON.parse(localStorage.getItem('items')) || [];
//console.log(window.localStorage['items']);
        // value is now equal to "value"
        //window.localStorage.removeItem("key");
       // window.localStorage.setItem("key2", "value2");
        //window.localStorage.clear();
        // localStorage is now empty
    }
     $scope.loadData = function(){
         
        Attendee.all().then(function(res){
            
             $scope.attendees = res.posts;
           // console.log(res.posts);
            
angular.forEach( $scope.attendees , function(value, key) {
    angular.forEach($scope.alphabet, function(val){
        if(val==value.title_plain.substring(0,1)){
            //console.log(val + ":" + value.title_plain);
            if(value.title_plain){
                $scope.listFirst[val].push({"name":value.title_plain});
                //console.log($scope.listFirst[val]);
            }
        }
        if(val==value.title_plain.split(' ')[1].substring(0,1)){
            //console.log(val + ":" + value.title_plain);
            if(value.title_plain){
                $scope.listLast[val].push({"name":value.title_plain});
                //console.log($scope.listFirst[val]);
            }
        }
    });
   
 
  
 // this.push(key + ': ' + value);
});
$scope.loading=false;

        });
        
        //end function
    }
  $scope.loading=true;
  $scope.loadData()
  //setTimeout( $scope.loadData(), 100);
   
  //  console.log($scope.listFirst);
     $scope.storage =  window.localStorage
   //  console.log($scope.storage);
     //document.addEventListener("deviceready", $scope.onDeviceReady, false);

  //  $scope.onDeviceReady();
   

}])
   
.controller('aTTENDEES2Ctrl', ['$scope', '$stateParams', '$ionicScrollDelegate', '$location', '$anchorScroll', 'Attendee', // The following is the constructor function for this page's controller. See https://docs.angularjs.org/guide/controller
// You can include any angular dependencies as parameters for this function
// TIP: Access Route Parameters for your page via $stateParams.parameterName
function ($scope, $stateParams,$ionicScrollDelegate,$location,$anchorScroll,Attendee) {

    $scope.sortLast=true;
    
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
    
 $scope.params = $stateParams;
  $scope.listFirst = new Array();
  $scope.listLast = new Array();
             $scope.alphabet = "ABCDEFGHIJKLMNOPQRSTUVWXYZ".split("");
             angular.forEach($scope.alphabet, function(val){
             $scope.listFirst[val]=new Array();
             $scope.listLast[val]=new Array();    
             });
    // device APIs are available
    //
    
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

$scope.loading=false;

        });
        
        //end function
    }
  $scope.loading=true;
  $scope.loadData()
  //setTimeout( $scope.loadData(), 100);
   
  //  console.log($scope.listFirst);
     $scope.storage =  window.localStorage
   //  console.log($scope.storage);
     //document.addEventListener("deviceready", $scope.onDeviceReady, false);

  //  $scope.onDeviceReady();
   

}])
   
.controller('pRESENTATIONSCtrl', ['$scope', '$stateParams', 'Presentation', 'Link', // The following is the constructor function for this page's controller. See https://docs.angularjs.org/guide/controller
// You can include any angular dependencies as parameters for this function
// TIP: Access Route Parameters for your page via $stateParams.parameterName
function ($scope, $stateParams, Presentation, Link) {
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
                        
                        //get actual link
                        // Link.all(pFile).then(function(res2){
                        //     $scope.pLink = res2.link;
                        //   // console.log(res2.link);
                          
                            
                        // });
                        
                        //console.log(pTitle);
                          events.push({
                            title: pTitle,
                            file: pFile,
                            link:"https://www.trusteducationfoundation.com/api/taf/get_link/?att="+pFile
                        });
                    } //end if
                  
               }//end inner loop 
                $scope.desc.push({ 
                    mTitle: mTitle,
                    events: events
                });
               
            }//end main loop
        console.log($scope.desc);
            
        });
    }
        function myFunction(item, index) {
            var events = [];
            
            console.log(item);   
        }
        
            //     var custom_fields = res.page.custom_fields;
            //   //  console.log(res.page.custom_fields);
            //     $scope.date_range = custom_fields.date[0];
            //     $scope.days = custom_fields.day[0];
            //     $scope.desc=[];
                
            //     var fullstring,timestring,times,app_description;
                
            //     for (n=0; n<$scope.days;n++){
            //      //   console.log(n);
            //         var events = [];
            //         /**
            //          * loop through times for each day
            //          * */
            //          times = eval("custom_fields.day_" + n + "_times");
            //          daystring = eval("custom_fields.day_" + n + "_date");
            //          for (t=0; t<times;t++){
            //             fullstring =  eval("custom_fields.day_" + n + "_times_" + t + "_description");
            //             app_description = eval("custom_fields.day_" + n + "_times_" + t + "_event_description_for_app");
            //             timestring =  eval("custom_fields.day_" + n + "_times_" + t + "_time");
            //             events.push({
            //                 description: fullstring,
            //                 time: timestring,
            //                 app_description: app_description
            //             })
            //          }
                   
            //     //   fullstring = fullstring.replace(/<\/?[^>]+>/gi, '');
            //       $scope.desc.push({ 
            //             day: "DAY " + parseInt(n+1) + " -   " + daystring,
            //             events: events
            //       });
            //     }
        
        
        
        // });
    
    
    $scope.loading=true;
    $scope.loadData();
 
}])
   
.controller('sPEAKERSCtrl', ['$scope', '$state', '$stateParams', 'Speaker', // HTML VERSION
function ($scope, $state, $stateParams, Speaker) {
    $scope.params = $stateParams;
    $scope.speakers = [];

    $scope.toggleShow = function(d){
     //   console.log(d);
    }
    
    $scope.getSpeaker = function(speaker){
        $scope.speaker = {
            id:speaker
        }
    //     console.log($scope.speaker);
        $state.go('sPEAKERS2',$scope.speaker);
    }
    $scope.toggleGroup = function(d) {
       $scope.sponsors='';
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
       
        Speaker.all().then(function(res){
                                                                                                                                       $scope.speakers = res.posts;
                                                                                                                                       $scope.loading=false;
       //     console.log(res.posts);
        });
    }
    $scope.loading=true;
    $scope.loadData();

}])
   
.controller('sPEAKERS2Ctrl', ['$scope', '$rootScope', '$state', '$stateParams', '$ionicHistory', 'Speaker', // The following is the constructor function for this page's controller. See https://docs.angularjs.org/guide/controller
// You can include any angular dependencies as parameters for this function
// TIP: Access Route Parameters for your page via $stateParams.parameterName
function ($scope, $rootScope, $state, $stateParams, $ionicHistory, Speaker) {
$scope.params = $stateParams;
//console.log($scope.params.id);
$scope.header = $scope.params.id;
$scope.id = $scope.params.id;
var oldSoftBack = $rootScope.$ionicGoBack;
$rootScope.$ionicGoBack = function() {
    $ionicHistory.nextViewOptions({
    disableBack: true
  });
    $state.go('sPEAKERS');
   
    $rootScope.$ionicGoBack = oldSoftBack;
    // implement custom behaviour here
};

//console.log("ID IS "+ $scope.id);
$scope.gotoLink = function(link){
    window.open(link,"_system");
}

 $scope.goForward = function(){
    
        $scope.speaker = {
            id:$scope.b
        }
        
      
        $state.go('sPEAKERS2',$scope.speaker);
    }
    
    $scope.goBack = function(){
        $scope.speaker = {
            id:$scope.c
        }
    
       $state.go('sPEAKERS2',$scope.speaker);
    }

$scope.loadData = function(id){
        
        Speaker.getSpeaker(id).then(function(res){
        $scope.speaker = res.post;
        $scope.loading=false;
        $scope.count = $scope.speaker.custom_fields.presentations[0];
        
        
        
      //  console.log($scope.count);
        // var presentations = [];
        // for(n=0;n<count;n++){
        //      presentations.push({
        //                     // title: pTitle,
        //                     // file: pFile,
        //                     // link:"https://www.trusteducationfoundation.com/api/taf/get_link/?att="+pFile
        //     });
        // }
           // console.log(res.post);
        });
    }
    $scope.loading=true;
    
  
    Speaker.getIds().then(function(res){
        //  console.log("res is " + res);
         $scope.a = res.indexOf($scope.id);
         if($scope.a!==res.length-1){
         $scope.b = res[eval(parseInt($scope.a)+"+1")];
        //  console.log("Forward = " + $scope.b);
         } else {
           $scope.b =  0; 
        //   console.log("Forward = " + $scope.b);
         }
         if($scope.a!==0){
         $scope.c = res[eval(parseInt($scope.a)+"-1")];
        //  console.log("Back = " + $scope.c);
         } else {
           $scope.c = 0;  
        //   console.log("Back = " + $scope.c);
         }
          $scope.loadData($scope.params.id);
     });
  

}])
      
.controller('aGENDACtrl', ['$scope', '$stateParams', '$sce', 'Survey', //for HTML version
function ($scope, $stateParams, $sce, Survey) {
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
                   
                //   fullstring = fullstring.replace(/<\/?[^>]+>/gi, '');
                   $scope.desc.push({ 
                        day: "DAY " + parseInt(n+1) + " -   " + daystring,
                        events: events
                   });
                }
               
                //how many days to show = day[0]
                //$scope.$broadcast('scroll.refreshComplete');
                 $scope.loading=false;
            })
       
        
    }
 $scope.loading=true;
    $scope.loadData();
   

}])
   
.controller('nETWORKINGEVENTSCtrl', ['$scope', '$stateParams', '$sce', 'Survey', function ($scope, $stateParams, $sce, Survey) {
 $scope.params = $stateParams;
 
 $scope.to_trusted = function(html_code) {
    return $sce.trustAsHtml(html_code);
}

$scope.gotoLink = function(link){
   // console.log("LINK" + link);
    window.open(link,"_system");
}
    
    $scope.surveys = [];
    
    $scope.toggleShow = function(d){
    //    console.log(d);
        
    }
    $scope.toggleGroup = function(d) {
    //    console.log(d);
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
                   
                //   fullstring = fullstring.replace(/<\/?[^>]+>/gi, '');
                   $scope.desc.push({ 
                        day: "DAY " + parseInt(n+1) + " -   " + daystring,
                        events: events
                   });
                  
                }
               
                //how many days to show = day[0]
                //$scope.$broadcast('scroll.refreshComplete');
                $scope.loading=false;
            })
       
        
    }
    $scope.loading=true;
    $scope.loadData();
   

}])
   
.controller('sPONSORSCtrl', ['$scope', '$stateParams', 'Sponsor', function ($scope, $stateParams,Sponsor) {
    $scope.params = $stateParams;
    $scope.sponsors = [];
    
    $scope.gotoLink = function(link){
        window.open(link,"_system");
    }
    
    $scope.getPlatinum = function(){
      //  console.log('platinum');
    }
    
    $scope.toggleShow = function(d){
      //  console.log(d);
    }
    $scope.toggleGroup = function(d) {
       $scope.sponsors='';
        if ($scope.isGroupShown(d)) {
          $scope.shownGroup = null;
        } else {
          $scope.shownGroup = d;
          $scope.loading=true;
        }
    };
  
    $scope.isGroupShown = function(d) {
        return $scope.shownGroup === d;
    };
    
    $scope.loadData = function(type){
        
        Sponsor.all(type).then(function(res){
            $scope.sponsors = res.posts;
            for(n=0;n<$scope.sponsors.length;n++){
                $scope.sponsors[n].title = $scope.sponsors[n].title.replace("&#038;", "&");
                $scope.sponsors[n].title = $scope.sponsors[n].title.replace("&#8217;", "'");
            }
            $scope.loading=false;
        //console.log($scope.sponsors);
        });
    }



}])
   
.controller('homeCtrl', ['$scope', '$stateParams', '$ionicSideMenuDelegate', '$firebaseArray', '$firebaseObject', // The following is the constructor function for this page's controller. See https://docs.angularjs.org/guide/controller
// You can include any angular dependencies as parameters for this function
// TIP: Access Route Parameters for your page via $stateParams.parameterName
function ($scope, $stateParams, $ionicSideMenuDelegate,$firebaseArray,$firebaseObject) {
  
   var ref = firebase.database().ref();
      // create a synchronized array
      $scope.current =$firebaseObject(ref.child("current"));
     
  $scope.toggleLeftSideMenu = function() {
    $ionicSideMenuDelegate.toggleLeft();
  };
   $scope.toggleRightSideMenu = function() {
    $ionicSideMenuDelegate.toggleRight();
  };

}])
   
.controller('fAQCtrl', ['$scope', '$state', '$sce', '$stateParams', 'Faq', 
function ($scope, $state, $sce, $stateParams, Faq) {
// $scope.params = $stateParams;
$scope.to_trusted = function(html_code) {
    return $sce.trustAsHtml(html_code);
}

$scope.gotoLink = function(link){
   // console.log("LINK" + link);
    window.open(link,"_system");
}
// ionic.Platform.ready(function(){
//     angular.forEach(angular.element(document.querySelectorAll('a[href]')), function(v){
        
//     console.log(v);
//     });
// });
        
  
  // window.location = this.href;


// $scope.header = $scope.params.id;
$scope.toggleGroup = function(group) {
    if ($scope.isGroupShown(group)) {
      $scope.shownGroup = null;
    } else {
      $scope.shownGroup = group;
    }
  };
  $scope.isGroupShown = function(group) {
    return $scope.shownGroup === group;
  };

$scope.loadData = function(){
        Faq.all().then(function(res){
        $scope.faq = res.page;  
        $scope.faqs = [];
        var question,answer
        var n = $scope.faq.custom_fields.faq[0];
         for (t=0; t<n;t++){
                        question =  eval("$scope.faq.custom_fields.faq_" + t + "_question");
                        answer =    eval("$scope.faq.custom_fields.faq_" + t + "_answer");
                        
                       
                       // console.log(answer[0]);
                        answer[0] = $scope.to_trusted(answer[0].replace(/href="([^"]+)/g, 'ng-click="gotoLink(\'$1\')'));
                        
                        $scope.faqs.push({
                            question: question,
                            answer: answer,
                            
                        })
                       // console.log($scope.faqs);
                     }
        $scope.loading=false;
        //console.log($scope.faqs);
        });
    }
    $scope.loading=true;
    $scope.loadData();
  

}
])
 