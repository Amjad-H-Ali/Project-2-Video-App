//Require mongoose to use Schema constructor to model our data in the DB
const mongoose = require('mongoose');
//Instantiate videoSchema with the Schema constructor in mongoose
const videoSchema = new mongoose.Schema({

	title: String,

	description: String,

	link: String,

	like: Boolean
});

//Export for controllers to use
module.exports = mongoose.model('video', userSchema);