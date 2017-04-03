var mongoose = require('mongoose');
var Event = mongoose.model('Event');

//Helper function to retrieve query by event name -> name?=<EventName>
var runEventNameQuery = function(req, res) {
	var name = req.query.name;
	Event
		.findOne({'name' : new RegExp(name, 'i')})
		.exec(function(err, doc) {
			console.log("Retrieved By Event Name: \n" + doc);
			res
				.status(200)
				.json(doc);
		});

};

//Function that gets the information of all the events
module.exports.eventsGetAll = function(req, res) {
	console.log("Requested by: " + req.user);
	/* Based on what's modified in the weblink, it doesn't display the entire data
	   For example, offset = 0 and count = 2 would only display one data etc. 
	   Web link example: http://localhost:3000/api/events?offset=5&count=1 -> returns Lady Gaga concert*/
	var offset = 0;
	var count = 10;
	var maxCount = 10;
	var name = "";

	if(req.query && req.query.offset) {
		offset = parseInt(req.query.offset, 10);
	}

	if(req.query && req.query.count) {
		count = parseInt(req.query.count, 10);
	}

	//name?=<EventName>
	if(req.query && req.query.name) {
		runEventNameQuery(req, res);
		return;
	}

	//Checking for incorrect queries for offset and count
	if(isNaN(offset) || isNaN(count)) {
		res
			.status(400) //error
			.json({
				"message" : "If supplied in query string count and offset should be numbers"
			});
		return;
	}

	//If trying to find more data and exceeded, display error message
	if(count > maxCount) {
		res
			.status(400)
			.json({
				"message" : "Count limit of " + maxCount + " exceeded"
			});
			return;
	}

	//Mongoose version of querying the MongoDB 'etes' -> Loading all the events or specfic events based on offset and count
	Event
		.find()
		.skip(offset)
		.limit(count)
		.exec(function(err, events) {
			if(err) {
				console.log("Error finding events");
				res
					.status(500)
					.json(err);
			} else {
				console.log("Found events", events.length);
				res
					.json(events);
			}
		});
};

//Gets the information of an individual event, each event will have a unique identifier
module.exports.eventsGetOne = function(req, res) {
	var eventId = req.params.eventId; //unique ID
	console.log("GET eventId", eventId);

	Event
		//Locates the _id of the data from the request parameters
		//For example: http://localhost:3000/api/events/58df01ca12b8392089f4e410 -> Returns Bottle Rock Napa Valley
		.findById(eventId)
		.exec(function(err, doc) {

			var response = {
				status : 200,
				message : doc
			};

			if(err) {
				console.log("Error finding event");
				response.status = 500;
				response.message = err;
			} else if(!doc) {
				response.status = 404;
				response.message = {"message" : "Event ID not found"};
			} 
			//Event ID found
			res
				.status(response.status)
				.json(response.message);
			
		}); 
};

var _splitArray = function(input) {
	var output;
	if(input && input.length > 0) {
		output = input.split(";");
	} else {
		output = [];
	}
	return output;
};

//Adds a new event to the json data file
module.exports.eventsAddOne = function(req, res) {
	Event 
		.create({
			//Creating a new Event Object
			name : req.body.name,
			venue : req.body.venue,
			date : req.body.date,
			location : req.body.location,
			artist : _splitArray(req.body.artist),
			photo : [req.body.photo],
			price : parseInt(req.body.price),
			seats : _splitArray(req.body.seats),
			startTime : req.body.startTime,
			endTime : req.body.endTime,
			genre : req.body.genre

		}, function(err, event) {
			if(err) {
				console.log("Error creating event");
				res
					.status(400)
					.json(err);
			} else {
				res
					.status(201)
					.json(event);

			}	
	});

};

module.exports.eventUpdateOne = function(req, res) {
	var eventId = req.params.eventId; //unique ID
	console.log("GET eventId", eventId);

	Event
		//Locates the _id of the data from the request parameters
		//For example: http://localhost:3000/api/events/58df01ca12b8392089f4e410 -> Returns Bottle Rock Napa Valley
		.findById(eventId)
		.exec(function(err, doc) {

			var response = {
				status : 200,
				message : doc
			};

			if(err) {
				console.log("Error finding event");
				response.status = 500;
				response.message = err;
			} else if(!doc) {
				response.status = 404;
				response.message = {"message" : "Event ID not found"};
			} 

			if(response.status != 200) {
				res
					.status(response.status)
					.json(response.message);
			
			} else {
				//Updating the values
				doc.name = req.body.name;
				doc.venue = req.body.venue;
				doc.date = req.body.date;
				doc.location = req.body.location;
				doc.artist = _splitArray(req.body.artist);
				doc.photo = [req.body.photo];
				doc.price = parseInt(req.body.price);
				doc.seats = _splitArray(req.body.seats);
				doc.startTime = req.body.startTime;
				doc.endTime = req.body.endTime;
				doc.genre = req.body.genre;
			}
			
			doc.save(function(err, eventUpdated) {
				//Save the information after values are updated
				if(err) {
					res
						.status(500)
						.json(err);
				} else {
					res
						.status(204)
						.json();
				}
			});
		
		}); 
};

//Deletes a specific hotel based on ID
module.exports.eventDeleteOne = function(req, res) {
	var eventId = req.params.eventId; 

	Event
		.findByIdAndRemove(eventId)
		.exec(function(err, event) {
			if(err) {
				res.
					status(404)
					.json(err);
			} else {
				console.log("Event has sucessfully deleted: ", eventId);
				res
					.status(204)
					.json();
			}
		});
};

//Create an update function for events when users want to modify their selling ticket

