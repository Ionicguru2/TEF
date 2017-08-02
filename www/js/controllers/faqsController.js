angular.module('app')
  
.controller('faqsController', function ($scope, $stateParams, $state, $sce, Faq) {

    // $scope.params = $stateParams;
    $scope.to_trusted = function(html_code) {
        return $sce.trustAsHtml(html_code);
    }

    $scope.gotoLink = function(link){
    // console.log("LINK" + link);
        window.open(link,"_system");
    }

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
                answer[0] = $scope.to_trusted(answer[0].replace(/href="([^"]+)/g, 'ng-click="gotoLink(\'$1\')'));
                
                $scope.faqs.push({
                    question: question,
                    answer: answer,
                    
                })
            }
            $scope.loading=false;
        });
    }
    $scope.loading=true;
    $scope.loadData();
})

// .controller('fAQCtrl', ['$scope', '$state', '$sce', '$stateParams', 'Faq', 
// function ($scope, $state, $sce, $stateParams, Faq) {
// // $scope.params = $stateParams;
// $scope.to_trusted = function(html_code) {
//     return $sce.trustAsHtml(html_code);
// }

// $scope.gotoLink = function(link){
//    // console.log("LINK" + link);
//     window.open(link,"_system");
// }
// // ionic.Platform.ready(function(){
// //     angular.forEach(angular.element(document.querySelectorAll('a[href]')), function(v){
        
// //     console.log(v);
// //     });
// // });
        
  
//   // window.location = this.href;


// // $scope.header = $scope.params.id;
// $scope.toggleGroup = function(group) {
//     if ($scope.isGroupShown(group)) {
//       $scope.shownGroup = null;
//     } else {
//       $scope.shownGroup = group;
//     }
//   };
//   $scope.isGroupShown = function(group) {
//     return $scope.shownGroup === group;
//   };

// $scope.loadData = function(){
//         Faq.all().then(function(res){
//         $scope.faq = res.page;  
//         $scope.faqs = [];
//         var question,answer
//         var n = $scope.faq.custom_fields.faq[0];
//          for (t=0; t<n;t++){
//                         question =  eval("$scope.faq.custom_fields.faq_" + t + "_question");
//                         answer =    eval("$scope.faq.custom_fields.faq_" + t + "_answer");
                        
                       
//                        // console.log(answer[0]);
//                         answer[0] = $scope.to_trusted(answer[0].replace(/href="([^"]+)/g, 'ng-click="gotoLink(\'$1\')'));
                        
//                         $scope.faqs.push({
//                             question: question,
//                             answer: answer,
                            
//                         })
//                        // console.log($scope.faqs);
//                      }
//         $scope.loading=false;
//         //console.log($scope.faqs);
//         });
//     }
//     $scope.loading=true;
//     $scope.loadData();
  

// }
// ])