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


//EDIT route
router.get('/edit/:id', async (req, res)=>{
	const video = await Video.findOne({'videoId': req.params.id});

	res.render('video/edit.ejs', {
		videoId: video.videoId
	});
});



//PUT route
router.put('/:id', async (req, res) => {
	try {

		const video = Video.findOne({'videoId': req.params.id});
		const findUser = User.findOne({'userName': req.session.userName});

		const [foundVideo, foundUser] = await Promise.all([video, findUser]);

			//updates video title and description in videos collection
			foundVideo.title = req.body.title;
			foundVideo.description = req.body.description;
			
			//updates video title and description in user's videos array
			foundUser.videos.id(foundVideo.id).title = req.body.title
			foundUser.videos.id(foundVideo.id).description = req.body.description	
			
			console.log(foundUser.videos.id)

			foundUser.save()
			foundVideo.save();
			res.redirect('/index')


	} catch (err) {
		console.log(err)
		res.send(err)
	}
})










module.exports = router;

