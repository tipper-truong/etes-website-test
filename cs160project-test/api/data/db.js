/* Mongoose is an Object Modeling Tool for MongoDB 
   Read more on mongoose database connection best practices: http://theholmesoffice.com/mongoose-connection-best-practice/
*/
var mongoose = require('mongoose');
var dburl = 'mongodb://localhost:27017/etes';
mongoose.connect(dburl);

//Checking for the Mongoose Connection
mongoose.connection.on('connected', function() {
	console.log('Mongoose connected to ' + dburl);
});

//Checking when Mongoose disconnects
mongoose.connection.on('disconnected', function() {
	console.log('Mongoose disconnected');
});

//Error connection
mongoose.connection.on('error', function(err) {
	console.log('Mongoose connection error ' + err);
});

//Building a re-usable database connection
//Killing the process after the web application is terminated
process.on('SIGINT', function() {
	mongoose.connection.close(function() {
		console.log("Mongoose disconnected through app termination (SIGINT)");
		process.exit(0);
	});
});

//SIGTERM is a termination signal, which is sent to a process to request its termination, but it can be caught and interpreted or ignored by the process.
process.on('SIGTERM', function() {
	mongoose.connection.close(function() {
		console.log("Mongoose disconnected through app termination (SIGTERM)");
		process.exit(0);
	});
});

//Kill the process, then restarting mongoose database again, type 'rs' to restart the applcation
process.once('SIGUSR2', function() {
	mongoose.connection.close(function() {
		console.log("Mongoose disconnected through app termination (SIGUSR2)");
		process.kill(process.pid, 'SIGUSR2');
	});
});

//Bring in Schemas and Models
require('./events.model.js');