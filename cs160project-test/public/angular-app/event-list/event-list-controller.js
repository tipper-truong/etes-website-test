angular.module('etes').controller('EventsController', EventsController);
//Note: Testing angular.js data display will be located under 'Console' when you go to Developer Tools (Use Google Chrome)
//https://docs.angularjs.org/api/ng/service/$http
function EventsController($http) {
	var vm = this;
	vm.title = "ETES - Home";
	$http.get('/api/events').then(function(response) {
		//Retrieve all the events from the MongoDB -> 'etes'
		vm.events = response.data; 
	});
}