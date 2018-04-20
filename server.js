//Require express for server
const express = require('express');
// Instantiate app with express constructor
const app = express();
//Set port on 3000
const PORT = 3000;
//Require controllers to use route
const userController = require('./controllers/userController');
const videoController = require('./controllers/videoController');


//Requiring our DB
require('./db/db');

//MiddleWare









// Controllers
app.use('/user', userController);
app.use('/video', videoController);




//Set up server to listen on PORT 3000
app.listen(PORT, ()=>{
	console.log(`Server is listening on ${PORT}...`);
})