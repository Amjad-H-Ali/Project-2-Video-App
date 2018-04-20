//Require mongoose to use Schema constructor to model our data in the DB
const mongoose = require('mongoose');
//Instantiate userSchema with the Schema constructor in mongoose
const userSchema = new mongoose.Schema({

	firstName: String,

	lastName: String,

	userName: String,

	password: String
});

//Export for controllers to use
module.exports = mongoose.model('user', userSchema);
