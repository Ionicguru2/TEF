angular.module('app.routes', [])

.config(function($stateProvider, $urlRouterProvider) {
  $stateProvider

    .state('app', {
      url: '/app',
      abstract: true,
      templateUrl: 'templates/views/root.html',
      controller: 'rootController'
    })

    .state('app.tab', {
      url: '/tab',
      abstract: true,
      views: {
        'menuContent': {
          templateUrl: 'templates/views/tabs.html',
          controller: 'tabsController'
        }
      }
    })
    //tabs
    .state('app.tab.home', {
      url: '/home',
      views: {
        'tab-home': {
          templateUrl: 'templates/views/tabs/home.html',
          controller: 'homeController'
        }
      }
    })
    .state('app.tab.conferenceFeed', {
      url: '/conferenceFeed',
      views: {
        'tab-conferenceFeed': {
          templateUrl: 'templates/views/tabs/conferenceFeed.html',
          controller: 'conferenceFeedController'
        }
      }
    })
    .state('app.tab.presentations', {
      url: '/presentations',
      views: {
        'tab-presentations': {
          templateUrl: 'templates/views/tabs/presentations.html',
          controller: 'presentationsController'
        }
      }
    })
    .state('app.tab.evaluations', {
      url: '/evaluations',
      views: {
        'tab-evaluations': {
          templateUrl: 'templates/views/tabs/evaluations.html',
          controller: 'evaluationsController'
        }
      }
    })
    //menus
    .state('app.tab.eventOverview', {
      url: '/eventOverview',
      views: {
        'tab-home': {
          templateUrl: 'templates/views/menus/eventOverview.html',
          controller: 'eventOverviewController'
        }
      }
    })
    .state('app.tab.agenda', {
      url: '/agenda',
      views: {
        'tab-home': {
          templateUrl: 'templates/views/menus/agenda.html',
          controller: 'agendaController'
        }
      }
    })
    .state('app.tab.speakers', {
      url: '/speakers',
      views: {
        'tab-home': {
          templateUrl: 'templates/views/menus/speakers.html',
          controller: 'speakersController'
        }
      }
    })
    .state('app.tab.speakerDetail', {
      url: '/speakerDetail/:id',
      views: {
        'tab-home': {
          templateUrl: 'templates/views/menus/speakerDetail.html',
          controller: 'speakerDetailController'
        }
      }
    })
    .state('app.tab.attendees', {
      url: '/attendees',
      views: {
        'tab-home': {
          templateUrl: 'templates/views/menus/attendees.html',
          controller: 'attendeesController'
        }
      }
    })
    .state('app.tab.sponsors', {
      url: '/sponsors',
      views: {
        'tab-home': {
          templateUrl: 'templates/views/menus/sponsors.html',
          controller: 'sponsorsController'
        }
      }
    })
    .state('app.tab.faqs', {
      url: '/faqs',
      views: {
        'tab-home': {
          templateUrl: 'templates/views/menus/faqs.html',
          controller: 'faqsController'
        }
      }
    })

//       .state('eVENTOVERVIEW', {
//     url: '/page3',
//     templateUrl: 'templates/eVENTOVERVIEW.html',
//     controller: 'eVENTOVERVIEWCtrl'
//   })

//   .state('eVALUATIONS', {
//     url: '/page14',
//     templateUrl: 'templates/eVALUATIONS.html',
//     controller: 'eVALUATIONSCtrl'
//   })

//   .state('cONFERENCEFEED', {
//     url: '/page13',
//     templateUrl: 'templates/cONFERENCEFEED.html',
//     controller: 'cONFERENCEFEEDCtrl'
//   })

//   .state('aTTENDEES', {
//     url: '/page16',
//     templateUrl: 'templates/aTTENDEES.html',
//     controller: 'aTTENDEESCtrl'
//   })

//   .state('aTTENDEES2', {
//     url: '/page10',
//     templateUrl: 'templates/aTTENDEES2.html',
//     controller: 'aTTENDEES2Ctrl'
//   })

//   .state('pRESENTATIONS', {
//     url: '/page11',
//     templateUrl: 'templates/pRESENTATIONS.html',
//     controller: 'pRESENTATIONSCtrl'
//   })

//   .state('sPEAKERS', {
//     url: '/page18',
// 	params: {
// 		id: ""		
// },
//     templateUrl: 'templates/sPEAKERS.html',
//     controller: 'sPEAKERSCtrl'
//   })

//   .state('sPEAKERS2', {
//     url: '/page15',
// 	params: {
// 		id: ""		
// },
//     templateUrl: 'templates/sPEAKERS2.html',
//     controller: 'sPEAKERS2Ctrl'
//   })

//   .state('tabsController', {
//     url: '/page1',
//     templateUrl: 'templates/tabsController.html',
//     abstract:true
//   })

//   .state('aGENDA', {
//     url: '/page19',
//     templateUrl: 'templates/aGENDA.html',
//     controller: 'aGENDACtrl'
//   })

//   .state('nETWORKINGEVENTS', {
//     url: '/page17',
//     templateUrl: 'templates/nETWORKINGEVENTS.html',
//     controller: 'nETWORKINGEVENTSCtrl'
//   })

//   .state('sPONSORS', {
//     url: '/page7',
//     templateUrl: 'templates/sPONSORS.html',
//     controller: 'sPONSORSCtrl'
//   })

//   .state('home', {
//     url: '/page9',
//     templateUrl: 'templates/home.html',
//     controller: 'homeCtrl'
//   })

//   .state('fAQ', {
//     url: '/page12',
//     templateUrl: 'templates/fAQ.html',
//     controller: 'fAQCtrl'
//   })

  $urlRouterProvider.otherwise('/app/tab/home')

});