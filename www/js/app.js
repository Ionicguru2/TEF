// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
// 'starter.services' is found in services.js
// 'starter.controllers' is found in controllers.js
angular.module('app', ['ionic', 'ionicUIRouter', 'app.routes', 'app.directives', 'app.services','app.config','firebase','firebaseConfig',])

.config(function($ionicConfigProvider, $sceDelegateProvider){
  
    $ionicConfigProvider.backButton.text('').previousTitleText(false);
    $sceDelegateProvider.resourceUrlWhitelist([ 'self','*://www.youtube.com/**', '*://player.vimeo.com/video/**']);
})

.run(function($ionicPlatform, $ionicPopup) {
    $ionicPlatform.ready(function() {
        // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
        // for form inputs)
        if (window.cordova && window.cordova.plugins && window.cordova.plugins.Keyboard) {
            cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
            cordova.plugins.Keyboard.disableScroll(true);
        }
        if (window.StatusBar) {
            // org.apache.cordova.statusbar required
            StatusBar.styleDefault();
        }

        if (typeof FCMPlugin != 'undefined') {
            //FCMPlugin.getToken( successCallback(token), errorCallback(err) );
            //Keep in mind the function will return null if the token has not been established yet.
            FCMPlugin.getToken(
                function (token) {
                    // alert('Token: ' + token);
                    // console.log('Token: ' + token);
                },
                function (err) {
                    // alert('error retrieving token: ' + token);
                    // console.log('error retrieving token: ' + err);
                }
            );

            FCMPlugin.onNotification(
                function(data){

                    var elem = angular.element(document.querySelector('[ng-app]'));
                    var rootScope = elem.injector().get('$rootScope');
                    rootScope.$broadcast('pushNotificationReceived', data);

                    if(data.wasTapped){
                        var alertPopup = $ionicPopup.alert({
                            title: 'New conference feed added!',
                            template: data['title'] + '\n' + data['body']
                          });
                          alertPopup.then(function(res) {
                          });
                    }else{
                        var alertPopup = $ionicPopup.alert({
                            title: 'New conference feed added!',
                            template: data['title'] + '\n' + data['body']
                          });
                          alertPopup.then(function(res) {
                          });
                    }
                },
                function(msg){
                    // alert('onNotification callback successfully registered: ' + msg);
                    // console.log('onNotification callback successfully registered: ' + msg);
                },
                function(err){
                    // alert('Error registering onNotification callback: ' + err);
                    // console.log('Error registering onNotification callback: ' + err);
                }
            );
        }
    });
});