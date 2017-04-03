//Middleware: Middleware is the core concept behind Express.js request processing and routing
//app.use(...) Using middleware, allows you interact with a request before a response is given
//app.js is responsible for starting the server of the ETES Website, will be using command node app.js or nodemon to make the website work
require('./api/data/db.js') //db connection
var express = require('express');
var app = express();
var morgan = require('morgan'); //logging request details like 404, 304, 200 etc.
var path = require('path');
var bodyParser = require('body-parser');
//var mongoose = require('mongoose'); //MongoDB object modeling tool designed to work in an asynchronous environment.

var routes = require('./api/routes');

app.set('port', 3000);
app.use(morgan('dev'));

//Defining paths static files such as html, css, etc. (Front-End)
app.use(express.static(path.join(__dirname, 'public')));
//Defining node_modules to help run Angular.js
app.use('/node_modules', express.static(__dirname + '/node_modules'));
//http://stackoverflow.com/questions/39870867/what-does-app-usebodyparser-json-do
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended : false }));
app.use('/api', routes); //all the controller routes that are define are in the api/routes/index.js directory

/**
	Req = Request
	Res = Response
	When running node app.js or nodemon, server starts and is located at port 3000
**/
var server = app.listen(app.get('port'), function() {
	var port = server.address().port; //gets the port number
	console.log("Magic happens on port " + port);
}); //port 3000 of Mean Stack server
console.log("Me first!") 




//mean stack notes
/* 
Middleware is any number of functions that are invoked by the Express.js routing layer before your final request handler is, and thus sits in the middle between a raw request and the final intended route.

app.get('/home'...) -> re-routes to www.link.com/home

HTTP Status to know: http://www.restapitutorial.com/httpstatuscodes.html

Introduction to REST APIs Notes:
-----------------------------------------------
Method 		URL 			Action
-----------------------------------------------
GET		/api/events		Get all/multiple events
POST	/api/events 	Create a new event
GET 	/api/events/123 Get a specific event
PUT		/api/events/123	Update a specific event
DELETE	/api/events/123	Delete a specific event

GET 	/api/events/123/sellTickets Get all events for a specific event
POST	/api/events/123/sellTickets	Add a seller ticket for a specific event
GET 	/api/events/123/sellTickets/321	Get a specific ticket for a specific event
PUT		/api/events/123/sellTickets/321 Update a specific ticket for a specific event
DELETE  /api/events/123/sellTickets/321 Delete a specific ticket

*/