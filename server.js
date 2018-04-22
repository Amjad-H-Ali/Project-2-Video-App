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
	// To reroute POST requests to our PUT and DELETE routes
app.use(methodOverride('_method'));	 	
	//Session
app.use(session({
	secret: 'Random String',
	resave: false,
	saveUninitialized: false,//The session is initialized once we add a property to it, then it will save
	cookie:{secure:false} // When true, only sending cookies that are https 'secure'.
}))	
	//Middleware to prevent access to pages without being logged in
app.use((req, res, next)=>{
	//If user is not on the login-signup page while not logged in we will redirect them to the login-signup page
	if(req.path !== '/' && !req.session.logged && req.method === 'GET'){
		res.redirect('/');
	}
	else{
		next();
	}
});	







// Controllers
app.use('/', userController);
app.use('/video', videoController);


//Set up server to listen on PORT 3000
app.listen(PORT, ()=>{
	console.log(`Server is listening on ${PORT}...`);
})