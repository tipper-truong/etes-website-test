/* Adding Angular Front-end to the UI */
angular.module('etes', ['ngRoute']).config(config);


function config($httpProvider, $routeProvider) {
//  $httpProvider.interceptors.push('AuthInterceptor');

	$routeProvider
		
		.when('/', {
			templateUrl  : 'angular-app/event-list/events.html',
			controller   : 'EventsController',
			controllerAs : 'vm',
			access: {
	       	 restricted: true
     	  }
		})

		.otherwise({
			redirectTo: '/'
		});
	}

/*function run($rootScope, $location, $window, AuthFactory) {
  $rootScope.$on('$routeChangeStart', function(event, nextRoute, currentRoute) {
    if (nextRoute.access !== undefined && nextRoute.access.restricted && !$window.sessionStorage.token && !AuthFactory.isLoggedIn) {
      event.preventDefault();
      $location.path('/');
    }
  }); */
//}

