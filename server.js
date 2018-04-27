// server.js

// BASE SETUP
// =============================================================================

// call the packages we need
var express = require('express'); // call express
var fileUpload = require('express-fileupload');
var app = express(); // define our app using express
var bodyParser = require('body-parser');
var fs = require('fs');
var base64Img = require('base64-img');
//Database connection
var mysql = require('mysql');

var con = mysql.createConnection({
	host: "localhost",
	user: "soyloqueleo",
	password: "GtWxw<m2*k3zg`Re",
	database: "soyloqueleo"
});

// ==============================================================================
// con.connect(function(err){
// 	if(err){
// 		var new_con = mysql.createConnection({
// 			host: "localhost",
// 			user: "soyloqueleo",
// 			password: "GtWxw<m2*k3zg`Re"
// 		});
// 		new_con.connect(function(err){
// 			con.query("CREATE DATABASE soyloqueleo", function(err, result){
// 				if(err) {
// 					console.log(err);
// 					return 0;
// 				}
// 				console.log(result);
// 				con = new_con;
// 			});
// 		});
// 	}
// });

// con.query("CREATE TABLE uploaded_images IF NOT EXIST(id int primary key auto_increment, )")

// ==============================================================================

app.use(fileUpload());

// configure app to use bodyParser()
// this will let us get the data from a POST
app.use(bodyParser.urlencoded({
	limit: '50mb',
	extended: true
}));
app.use(bodyParser.json({limit: '50mb'}));

var port = process.env.PORT || 8080; // set our port

// ROUTES FOR OUR API
// =============================================================================
var router = express.Router(); // get an instance of the express Router
var serverURL = 'https://96a06f2d.ngrok.io/upload/';

// HANDLING INCOMING IMAGE
// =============================================================================
var guid = function() {
	function s4() {
		return Math.floor((1 + Math.random()) * 0x10000)
			.toString(16)
			.substring(1);
	}
	return s4() + s4() + '-' + s4() + '-' + s4() + '-' + s4() + '-' + s4() + s4() + s4();
}

var saveImage = function(imageData) {


}
// ==============================================================================

// middleware to use for all requests
router.use(function(req, res, next) {
	// do logging
	res.header("Access-Control-Allow-Origin", "*");
	res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, cache-control, Cache-Control");
	console.log('Something is happening.');
	next(); // make sure we go to the next routes and don't stop here
});

// test route to make sure everything is working (accessed at GET http://localhost:8080/api)
router.post('/save', function(req, res) {
	// console.log(req.body.img_data);
	var data = new Buffer(req.body.img_data, 'base64');
	var filename = guid();
	var filePath = __dirname + '/uploads';
	base64Img.img(req.body.img_data, filePath, filename, function(err, filePath){
		console.log("Last uploaded: " + filename);
		res.json({url: serverURL + filename + ".png"});
	});
	// fs.writeFile(filePath, data, 'base64', function(err) {
	// 	if (err) return res.json({error: err.message});
	// 	res.json({
	// 		url: data
	// 	});
	// });
});

// more routes for our API will happen here

// REGISTER OUR ROUTES -------------------------------
// all of our routes will be prefixed with /api
app.use('/api', router);

// START THE SERVER
// =============================================================================
app.listen(port);
console.log('Magic happens on port ' + port);