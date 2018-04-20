//Require express for server
const express = require('express');
// Instantiate app with express constructor
const app = express();
//Set port on 3000
const PORT = 3000;


//Requiring our DB
require('./db/db');








//Set up server to listen on PORT 3000
app.listen(PORT, ()=>{
	console.log(`Server is listening on ${PORT}...`);
})