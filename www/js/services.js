angular.module('app.services', [])

.factory('BlankFactory', [function(){

}])

.service('Survey', ['$http', function($http){
    
    var api_url = 'https://www.trusteducationfoundation.com/api/get_page/?id=13';
    var currentID = 1;
    
    function filterBlankRows(l){
        return l.filter(function(obj){
            return obj.id != '';
        });
    }
    
    var ret = {
        all: function(){
            
            return $http.get(api_url).then(function(resp){
                var results = resp.data;//filterBlankRows(resp.data);
              //  console.log(results);
              //  if (results.length > 0) currentID = parseInt(results[results.length-1].id);
                return results;
            });
            
        }, 
        add: function(data){
            currentID++;
            data.id = currentID;
            
            return $http.post(api_url, data).then(function(resp){
                return resp.data;
            });

        },
        delete: function(id){
            return $http.delete(api_url+'/id/'+id);
        },
        query: function(params){
            
            var actual_params = [];
            for (var k in params){
                if (params[k]){
                    actual_params.push(k + '=' + params[k]);
                }
            }
            actual_params = '?'+actual_params.join('&');
            
            return $http.get(api_url+'/search'+actual_params).then(function(resp){
                return filterBlankRows(resp.data);
            })
            
        }
    }
    
    ret.all();
    
    return ret;

}])

.service('Sponsor', ['$http', function($http){
    
    var api_url = 'https://www.trusteducationfoundation.com/api/get_posts/?post_type=sponsors&meta_key=level&count=-1';
    var currentID = 1;
    
    function filterBlankRows(l){
        return l.filter(function(obj){
            return obj.id !== '';
        });
    }
    
    var ret = {
        all: function(type){
            
            return $http.get(api_url + '&meta_value=' + type).then(function(resp){
                var results = resp.data;//filterBlankRows(resp.data);
              //  if (results.length > 0) currentID = parseInt(results[results.length-1].id);
                return results;
            });
            
        }, 
        add: function(data){
            currentID++;
            data.id = currentID;
            
            return $http.post(api_url, data).then(function(resp){
                return resp.data;
            });

        },
        delete: function(id){
            return $http.delete(api_url+'/id/'+id);
        },
        query: function(params){
            
            var actual_params = [];
            for (var k in params){
                if (params[k]){
                    actual_params.push(k + '=' + params[k]);
                }
            }
            actual_params = '?'+actual_params.join('&');
            
            return $http.get(api_url+'/search'+actual_params).then(function(resp){
                return filterBlankRows(resp.data);
            })
            
        }
    }
    
    ret.all();
    
    return ret;

}])

.service('Speaker', ['$http', function($http){
    
    var api_url = 'https://www.trusteducationfoundation.com/api/get_posts/?post_type=speakers&count=-1';
    var currentID = 1;
    
    function filterBlankRows(l){
        return l.filter(function(obj){
            return obj.id !== '';
        });
    }
    
    var ret = {
        all: function(){
           
            return $http.get(api_url).then(function(resp){
                var results = resp.data;//filterBlankRows(resp.data);
              //  if (results.length > 0) currentID = parseInt(results[results.length-1].id);
                return results;
                
            });
            
        }, 
        getSpeaker: function(id){
           var speakerurl =  "https://www.trusteducationfoundation.com/api/get_post/?post_type=speakers&id=" + id;
           //console.log("https://www.trusteducationfoundation.com/api/get_post/?post_type=speakers&id=" + id);
            return $http.get(speakerurl).then(function(resp){
                var results = resp.data;//filterBlankRows(resp.data);
              //  if (results.length > 0) currentID = parseInt(results[results.length-1].id);
                return results;
            });
        },
        getIds: function(){
            var speakerurl =  "https://www.trusteducationfoundation.com/api/get_posts/?post_type=speakers&count=-1";
           
            return $http.get(speakerurl).then(function(resp){
                var results = resp.data.posts;//filterBlankRows(resp.data);
                //console.log(results);
                var ids = [];
                for (var i = 0, len = results.length; i < len; i++) {
                  ids.push(results[i].id);
                }
               // console.log(ids);
              //  if (results.length > 0) currentID = parseInt(results[results.length-1].id);
                return ids;
            });
        },
        add: function(data){
            currentID++;
            data.id = currentID;
            
            return $http.post(api_url, data).then(function(resp){
                return resp.data;
            });

        },
        delete: function(id){
            return $http.delete(api_url+'/id/'+id);
        },
        query: function(params){
            
            var actual_params = [];
            for (var k in params){
                if (params[k]){
                    actual_params.push(k + '=' + params[k]);
                }
            }
            actual_params = '?'+actual_params.join('&');
            
            return $http.get(api_url+'/search'+actual_params).then(function(resp){
                return filterBlankRows(resp.data);
            })
            
        }
    }
    
    ret.all();
    
    return ret;

}])

.service('Overview', ['$http', function($http){
    
    var api_url = 'https://www.trusteducationfoundation.com/api/get_page/?id=11';
    var currentID = 1;
    
    function filterBlankRows(l){
        return l.filter(function(obj){
            return obj.id !== '';
        });
    }
    
    var ret = {
        all: function(){
            
            return $http.get(api_url).then(function(resp){
                var results = resp.data;//filterBlankRows(resp.data);
              //  if (results.length > 0) currentID = parseInt(results[results.length-1].id);
                return results;
            });
            
        }
    }
    
    ret.all();
    
    return ret;

}])
.service('Faq', ['$http', function($http){
    
    var api_url = 'https://www.trusteducationfoundation.com/api/get_page/?id=19';
    var currentID = 1;
    
    function filterBlankRows(l){
        return l.filter(function(obj){
            return obj.id !== '';
        });
    }
    
    var ret = {
        all: function(){
            
            return $http.get(api_url).then(function(resp){
                var results = resp.data;//filterBlankRows(resp.data);
              //  if (results.length > 0) currentID = parseInt(results[results.length-1].id);
                return results;
            });
            
        }
    }
    
    ret.all();
    
    return ret;

}])
.service('Attendee', ['$http', function($http){
    
    var api_url = 'https://www.trusteducationfoundation.com/api/get_posts/?post_type=attendee&count=-1';
    var currentID = 1;
    
    function filterBlankRows(l){
        return l.filter(function(obj){
            return obj.id !== '';
        });
    }
    
    var ret = {
        all: function(){
            
            return $http.get(api_url).then(function(resp){
                var results = resp.data;//filterBlankRows(resp.data);
              //  if (results.length > 0) currentID = parseInt(results[results.length-1].id);
                return results;
            });
            
        }
    }
    
    ret.all();
    
    return ret;

}])

.service('Presentation', ['$http', function($http){
    
    var api_url = 'https://www.trusteducationfoundation.com/api/get_posts/?post_type=presentation&count=-1f';
    var currentID = 1;
    
    function filterBlankRows(l){
        return l.filter(function(obj){
            return obj.id !== '';
        });
    }
    
    var ret = {
        all: function(){
            
            return $http.get(api_url).then(function(resp){
                var results = resp.data;//filterBlankRows(resp.data);
              //  if (results.length > 0) currentID = parseInt(results[results.length-1].id);
                return results;
            });
            
        }
    }
    
    ret.all();
    
    return ret;
}])
.service('Link', ['$http', function($http){
    
    var api_url = 'https://www.trusteducationfoundation.com/api/taf/get_link/?att=';
    var currentID = 1;
    
    function filterBlankRows(l){
        return l.filter(function(obj){
            return obj.id !== '';
        });
    }
    
    var ret = {
        all: function(linkId){
            
            return $http.get(api_url+linkId).then(function(resp){
                var results = resp.data;//filterBlankRows(resp.data);
              //  if (results.length > 0) currentID = parseInt(results[results.length-1].id);
                return results;
            });
            
        }
    }
    
    ret.all();
    
    return ret;
}]);