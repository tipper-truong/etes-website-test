var MongoClient = require('mongodb').MongoClient;
var dburl = 'mongodb://localhost:27017/etes';
var _connection = null;

//Open connection
var open = function() 
{	//Callback function
	MongoClient.connect(dburl, function(err, db) {
		if(err) {
			console.log("DB Connection failed");
			return;
		} else {
            console.log("DB connected");
        }
		_connection = db;
		console.log("DB Connection open", db);
	});
};

//Retrieve connection
var get = function() {
	return _connection;
}

module.exports = {
	open : open,
	get : get
};
