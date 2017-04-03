var express = require('express');
var router = express.Router();

//Gets all the functions from these controllers
var ctrlEvents = require('../controllers/events.controllers.js');
var ctrlUsers = require('../controllers/users.controllers.js');

//Events routes
router 
	.route('/events')
	//.get(ctrlUsers.authenticate, ctrlEvents.eventsGetAll) //user must be authenticated first to retrieve all the events
	.get(ctrlEvents.eventsGetAll) //retrieve all the events
	.post(ctrlEvents.eventsAddOne); //adds a new event into the database
router 
	.route('/events/:eventId')
	.get(ctrlEvents.eventsGetOne) //retrieve an individual event by object ID
	.put(ctrlEvents.eventUpdateOne) //updates the specific event
	.delete(ctrlEvents.eventDeleteOne); //deletes a specific hotel

//Authentication
router
	.route('/users/register')
	.post(ctrlUsers.register); //adds a new user after registration

router
    .route('/users/login')
    .post(ctrlUsers.login) //after user enters info, login to their account

//Purchasing/Selling tickets routes
	
module.exports = router;