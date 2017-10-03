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
    .state('app.tab.empty', {
      url: '/empty',
      views: {
        'tab-empty': {
          templateUrl: null,
          controller: null
        }
      }
    })
    .state('app.tab.home', {
      url: '/home',
      views: {
        'tab-home': {
          templateUrl: 'templates/views/tabs/home.html',
          controller: 'homeController'
        }
      }
    })
    .state('app.tab.networkingEvents', {
      url: '/networkingEvents',
      views: {
        'tab-networkingEvents': {
          templateUrl: 'templates/views/tabs/networkingEvents.html',
          controller: 'networkingEventsController'
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
        'tab-empty': {
          templateUrl: 'templates/views/menus/eventOverview.html',
          controller: 'eventOverviewController'
        }
      }
    })
    .state('app.tab.agenda', {
      url: '/agenda',
      views: {
        'tab-empty': {
          templateUrl: 'templates/views/menus/agenda.html',
          controller: 'agendaController'
        }
      }
    })
    .state('app.tab.speakers', {
      url: '/speakers',
      views: {
        'tab-empty': {
          templateUrl: 'templates/views/menus/speakers.html',
          controller: 'speakersController'
        }
      }
    })
    .state('app.tab.speakerDetail', {
      url: '/speakerDetail/:id',
      views: {
        'tab-empty': {
          templateUrl: 'templates/views/menus/speakerDetail.html',
          controller: 'speakerDetailController'
        }
      }
    })
    .state('app.tab.attendees', {
      url: '/attendees',
      views: {
        'tab-empty': {
          templateUrl: 'templates/views/menus/attendees.html',
          controller: 'attendeesController'
        }
      }
    })
    .state('app.tab.sponsors', {
      url: '/sponsors',
      views: {
        'tab-empty': {
          templateUrl: 'templates/views/menus/sponsors.html',
          controller: 'sponsorsController'
        }
      }
    })
    .state('app.tab.faqs', {
      url: '/faqs',
      views: {
        'tab-empty': {
          templateUrl: 'templates/views/menus/faqs.html',
          controller: 'faqsController'
        }
      }
    })

  $urlRouterProvider.otherwise('/app/tab/home')

});