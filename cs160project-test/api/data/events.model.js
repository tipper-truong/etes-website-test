var mongoose = require('mongoose');

//Schema definition: Each object key will represent a field in the database and the value specifies the property of that field in the database
//Passing in a JavaScript Object in the .Schema parameters
var eventSchema = new mongoose.Schema({
	name : {
		type: String,
		required : true
	},

	venue: String,
	date : String,
	location: String,
	artist : [String],
	photo: String,

	price : {
		type: Number,
		min: 0,
		default : 0
	},

	seats : [String],
	startTime : String,
	endTime : String,
	genre : String
});

var userSchema = new mongoose.Schema({
	username : {
		type: String,
		required : true
	},

	firstname : {
		type: String,
		required: true
	},

	lastname : {
		type: String,
		required: true
	},

	email : {
		type: String,
		require : true
	},

	password : {
		type: String,
		require : true
	},

	address : { 
		type: String,
		require: true
	},

	sellTickets : [eventSchema],
	buyTickets : [eventSchema]
	
});

mongoose.model('Event', eventSchema, 'tickets');
mongoose.model('User', userSchema, 'users');