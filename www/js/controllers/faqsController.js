angular.module('app')
  
.controller('faqsController', function ($scope, $stateParams, $state, $sce, Faq, $timeout, $ionicLoading, $ionicScrollDelegate) {

    $scope.to_trusted = function(html_code) {
        return $sce.trustAsHtml(html_code);
    }

    $scope.gotoLink = function(link){
        window.open(link,"_system");
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
            $ionicLoading.hide();
        });
    }

    $ionicLoading.show();
    $scope.loadData();
})