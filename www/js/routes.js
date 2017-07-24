angular.module('app.routes', [])

.config(function($stateProvider, $urlRouterProvider) {

  // Ionic uses AngularUI Router which uses the concept of states
  // Learn more here: https://github.com/angular-ui/ui-router
  // Set up the various states which the app can be in.
  // Each state's controller can be found in controllers.js
  $stateProvider
    
  

      .state('eVENTOVERVIEW', {
    url: '/page3',
    templateUrl: 'templates/eVENTOVERVIEW.html',
    controller: 'eVENTOVERVIEWCtrl'
  })

  .state('eVALUATIONS', {
    url: '/page14',
    templateUrl: 'templates/eVALUATIONS.html',
    controller: 'eVALUATIONSCtrl'
  })

  .state('cONFERENCEFEED', {
    url: '/page13',
    templateUrl: 'templates/cONFERENCEFEED.html',
    controller: 'cONFERENCEFEEDCtrl'
  })

  .state('aTTENDEES', {
    url: '/page16',
    templateUrl: 'templates/aTTENDEES.html',
    controller: 'aTTENDEESCtrl'
  })

  .state('aTTENDEES2', {
    url: '/page10',
    templateUrl: 'templates/aTTENDEES2.html',
    controller: 'aTTENDEES2Ctrl'
  })

  .state('pRESENTATIONS', {
    url: '/page11',
    templateUrl: 'templates/pRESENTATIONS.html',
    controller: 'pRESENTATIONSCtrl'
  })

  .state('sPEAKERS', {
    url: '/page18',
	params: {
		id: ""		
},
    templateUrl: 'templates/sPEAKERS.html',
    controller: 'sPEAKERSCtrl'
  })

  .state('sPEAKERS2', {
    url: '/page15',
	params: {
		id: ""		
},
    templateUrl: 'templates/sPEAKERS2.html',
    controller: 'sPEAKERS2Ctrl'
  })

  .state('tabsController', {
    url: '/page1',
    templateUrl: 'templates/tabsController.html',
    abstract:true
  })

  .state('aGENDA', {
    url: '/page19',
    templateUrl: 'templates/aGENDA.html',
    controller: 'aGENDACtrl'
  })

  .state('nETWORKINGEVENTS', {
    url: '/page17',
    templateUrl: 'templates/nETWORKINGEVENTS.html',
    controller: 'nETWORKINGEVENTSCtrl'
  })

  .state('sPONSORS', {
    url: '/page7',
    templateUrl: 'templates/sPONSORS.html',
    controller: 'sPONSORSCtrl'
  })

  .state('home', {
    url: '/page9',
    templateUrl: 'templates/home.html',
    controller: 'homeCtrl'
  })

  .state('fAQ', {
    url: '/page12',
    templateUrl: 'templates/fAQ.html',
    controller: 'fAQCtrl'
  })

$urlRouterProvider.otherwise('/page9')

  

});