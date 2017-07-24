angular.module('app.directives', [])

.directive('blankDirective', [function(){

}])

.directive('initBind', function($compile) {
return {
        restrict: 'A',
        link : function (scope, element, attr) {
            attr.$observe('ngBindHtml',function(){
                if(attr.ngBindHtml){
                     $compile(element[0].children)(scope);
                }
            })
        }
    };
})
.directive('dynamic', function ($compile) {
	  return {
	    restrict: 'A',
	    replace: true,
	    link: function (scope, ele, attrs) {
	      scope.$watch(attrs.dynamic, function(html) {
	        ele.html(html);
	        $compile(ele.contents())(scope);
	      });
	    }
	  };
	})

.filter('htmlToPlaintext', function() {
    return function(text) {
      return  text ? String(text).replace(/<[^>]+>/gm, '') : '';
    };
  }
)
.filter('orderObjectBy', function() {
  return function(items, field, reverse) {
    var filtered = [];
    angular.forEach(items, function(item) {
      filtered.push(item);
    });
    filtered.sort(function (a, b) {
      return (a[field] > b[field] ? 1 : -1);
    });
    if(reverse) filtered.reverse();
    return filtered;
  };
});