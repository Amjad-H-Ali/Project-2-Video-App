//Require mongoose to connect schema with our DB
const mongoose = require('mongoose');
//Defining variable to connect mongoose with MongoDB and naming DB
connectionString = 'mongodb://localhost/videoApp';
//Connected mongoose to our DB
mongoose.connect(connectionString);


//Call Backs

mongoose.connection.on('connected', ()=>{
	console.log('Connected to MongoDB...');
});

mongoose.connection.on('disconnected', ()=>{
	console.log('Disconnected from MongoDB');
});

mongoose.connection.on('error', (err)=>{
	console.log(`Error connecting to MongoDB: ------${err}------`);
})