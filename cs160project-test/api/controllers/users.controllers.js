var mongoose = require('mongoose');
var User = mongoose.model('User');
var bcrypt = require('bcrypt-nodejs'); //helps encrypt the password
var jwt = require('jsonwebtoken');

//Registers the user information to the database
module.exports.register = function(req, res) {
	console.log("Registering users...");
	//Accessing the requests bodies
	var username = req.body.username;
	var firstname = req.body.firstname;
	var lastname = req.body.lastname;
	var password = req.body.password;
	var email = req.body.email;
	var address = req.body.address;

	//Creating the User Object Model
	User.create({
		username : username,
		firstname : firstname,
		lastname : lastname,
		email : email, 
		password : bcrypt.hashSync(password, bcrypt.genSaltSync(10)),
		address : address
	}, function(err, user) {
		if(err) {
			//Error, could not create user
			console.log(err);
			res.status(400).status(err);
		} else {
			//Created user successfully
			console.log("User registered successfully: " , user);
			res.status(201).json(user);
		}
	});
}

//If user exists, they get to login to the website
module.exports.login = function(req, res) {
	console.log("Logging in user...");
	//Accessing the requests bodies
	var username = req.body.username;
	var password = req.body.password;
	User.findOne({
		username : username }).exec(function(err, user) {
			var hash = bcrypt.hashSync(password) //convert the req.body.password to hash values
			if(err) {
				//Login unsuccessfully
				console.log(err);
				res.status(400).json(err);
			} else {
				//Login successfully
				if(bcrypt.compareSync(password, hash)) {
					console.log("Login successfully", user);
					var token = jwt.sign({username : user.username}, 's3cr3t', {expiresIn : 3600}) //sign a token
					res.status(200).json({success : true, token: token});
				} else {
					console.log(user.password + " USER.PASSWORD");
					res.status(404).json("Unauthorized");
				}
			}
		});
};

//Authenticate user once they login, basically they can see all the event information etc. when they login successfully
//Otherwise, they won't see any information at all and they're denied access to the website
module.exports.authenticate = function(req, res, next) {
	var headerExists = req.headers.authorization;
	if(headerExists) {
		//Retrieve the token from the request bodies
		var token = req.headers.authorization.split(' ')[1];
		jwt.verify(token, 's3cr3t', function(error, decoded) {
			if(error) {
				console.log(error);
				res.status(401).json('Unauthorized');
			} else {
				req.user = decoded.username;
				next();
			}
		});
	} else {
		res.status(403).json('No token provided');
	}
};