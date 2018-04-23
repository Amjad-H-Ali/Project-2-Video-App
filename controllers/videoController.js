// require express to use router
const express = require('express');
// instantiate router with router constructor
const router = express.Router();
//Require models to use schema and db
const Video = require('../models/video');
//Require models to use schema and db
const User = require('../models/user');









//POST video to db --- this is coming from the add page
router.post('/:id', async(req, res)=>{

	// Create object for our new video
	const newVid = {
		title: req.body.title,

		description: req.body.description,

		// The id of the vid was passed in as a parameter
		videoId: req.params.id
	}

	// create vid in db
	const createVideo = Video.create(newVid);

	//find user who posted this video by userName in session object
	const findUser = User.findOne({'userName': req.session.userName});

	const [createdVideo, foundUser] = await Promise.all([createVideo, findUser]);
	//push video in users videos array in db
	foundUser.videos.push(createdVideo);
	//Save changes in db
	await foundUser.save();



	res.redirect('/index');


})
















module.exports = router;

