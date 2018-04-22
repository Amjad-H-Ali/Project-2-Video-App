// require express to use router
const express = require('express');
// instantiate router with router constructor
const router = express.Router();
//Require models to use schema and db
const Video = require('../models/video');

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
	const video = await Video.create(newVid);

	res.redirect('/');


})
















module.exports = router;

