//Require express for server
const express = require('express');
// Instantiate app with express constructor
const app = express();
//Set port on 3000
const PORT = 3000;
//Require our middleware that we installed
const bodyParser = require('body-parser');
const methodOverride = require('method-override');
const session = require('express-session');
//Require controllers to use route
const userController = require('./controllers/userController');
const videoController = require('./controllers/videoController');


//Requiring our DB
require('./db/db');

//MiddleWare
	//For static assets
app.use(express.static('public'));
	//To parse data from POST requests
app.use(bodyParser.urlencoded({extended: false}));
	// To rerout POST routes to our PUT and DELETE routes
app.use(methodOverride('_method'));	 	







// Controllers
app.use('/', userController);
app.use('/video', videoController);




//Set up server to listen on PORT 3000
app.listen(PORT, ()=>{
	console.log(`Server is listening on ${PORT}...`);
})