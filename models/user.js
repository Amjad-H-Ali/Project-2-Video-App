//Require mongoose to use Schema constructor to model our data in the DB
const mongoose = require('mongoose');
//Instantiate userSchema with the Schema constructor in mongoose
const userSchema = new mongoose.Schema({

	firstName:{
		type: String,
		unique: false,
		required: true
	}, 

	lastName: {
		type: String,
		unique: false,
		required: true
	},

	userName: {
		type: String,
		unique: true,
		required: true
	},

	password:{
		type: String,
		unique: false,
		required: true
	}

});

//Export for controllers to use
module.exports = mongoose.model('user', userSchema);
