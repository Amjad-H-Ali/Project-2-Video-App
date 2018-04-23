//Require mongoose to use Schema constructor to model our data in the DB
const mongoose = require('mongoose');
//Instantiate videoSchema with the Schema constructor in mongoose
const videoSchema = new mongoose.Schema({

	title:{
		
		type: String,
		required: true
	},

	description: {
		
		type: String,
		required: true
	},

	videoId: {
		
		type: String,
		required: true
	},

	likes: {
		
		type: Number,
		default: 0
		
	}
});

//Export for controllers to use
module.exports = mongoose.model('video', videoSchema);