// require express to use router
const express = require('express');
// instantiate router with router constructor
const router = express.Router();
//Require models to use schema and db
const User = require('../models/user');
//Require Video models to use schema and DB
const Video = require('../models/video');
//Require bcrypt to encrypt password
const bcrypt = require('bcrypt');


//Routes




//Get route to render add page
router.get('/add', (req, res)=>{
	res.render('user/add.ejs');
});







//Get route to render login-signup page
router.get('/', (req, res)=>{
	res.render('user/login-signup.ejs', {
		message: req.session.message
	});
});








//Get route to render index page
router.get('/index', async(req, res)=>{

	// Find all videos in DB so we can see them on index page
	const videos = Video.find();


	//Find current user
	const user = User.findOne({'userName': req.session.userName});


	const[foundVideos, foundUser] = await Promise.all([videos, user]);


	// Send over current user and video properties to index page
	res.render('user/index.ejs', {

		userName: foundUser.userName,
		firstName: foundUser.firstName,
		lastName: foundUser.lastName,
		user: foundUser,
		videos: foundVideos,
		currentUser: req.session.userName

	});



});










//Get route to render show page
router.get('/show', async(req, res)=>{
	//Find current user by userName in session object
	const foundUser = await User.findOne({'userName': req.session.userName});

	//Sending property to show page
	res.render('user/show.ejs', {

		user: foundUser
	});


});



//Get route to render other users' show pages from index page
router.get('/show/:id', async(req, res)=>{

	//find user by username
	const userName = req.params.id

	//Find all the videos posted by this user
	const videos = await Video.find({'user': userName});

	//Sending current user to another user's show page
	res.render('user/otherShow.ejs', {
		videos: videos,
		user: userName
	});
});



//Get route to render edit page
router.get('/edit', (req, res)=>{
	res.render('user/edit.ejs');
});






//Get route to render liked-videos page
router.get('/liked-videos', (req, res)=>{
	res.render('user/liked-videos.ejs');
});







//GET Route to Logout User
router.get('/logout', async(req, res)=>{
	//Delete session of current user
	await req.session.destroy();

	//Redirect to login page	
	res.redirect('/');

})










//POST route to add user after they register
router.post('/register', async(req, res, next)=>{

	//encrypt password of user
	const passwordHash = bcrypt.hashSync(req.body.password, bcrypt.genSaltSync(10));

	// Make object for our new user
	const newUser = {
		firstName: req.body.firstName,

		lastName: req.body.lastName,

		userName: req.body.userName,

		password: passwordHash
	};

	try{

		// creates new user based on form field from login-signup ejs and stores in DB using Schema
		const user = await User.create(newUser);

		//Adding data to session object

		req.session.userName = user.userName;

		req.session.firstName = user.firstName;

		req.session.lastName = user.lastName;

		req.session.logged = true;

		//Render index page and send property to ejs file
		res.redirect('/index');
	}

	catch(err){
		next(err);
	}	

});












//POST route to login current user
router.post('/login', async(req, res, next)=>{

	try{
		//Finding user in DB with the given username
		const user = await User.findOne({'userName': req.body.userName});

		const message = req.session.message;
		req.session.message = null;
		//Checking if user exists in our DB and comparing if password is the same as given password
		if(user && bcrypt.compareSync(req.body.password, user.password)){
			//If it does, we'll...
			//Add information to our session object
			req.session.userName = user.userName;

			req.session.firstName = user.firstName;

			req.session.lastName = user.lastName;

			req.session.logged = true;

			//render index page and send property to that file
			res.redirect('/index');
		} else {
		//If either the username or password are false
			req.session.message = "Username or password is incorrect";
			res.redirect('/');
			console.log(req.session.message)
		}
	}
	catch(err){
		next(err);
	}



});










//POST route when user likes a video, we want to store the likes in DB
router.post('/like', async(req, res, next)=>{
	
	try{
		console.log(req.body.vidId);
		console.log(req.body.liked);

		//find current user
		const findUser = User.findOne({'userName':req.session.userName});



		//Find video that was liked
		const findVid = Video.findOne({'videoId': req.body.vidId});


		const[foundUser, foundVid] = await Promise.all([findUser, findVid]);





		// If the vid is liked, add to array in DB
		if(req.body.liked == 'true'){
			//Add to likedVids array in user model
			foundUser.likedVideos.push(req.body.vidId);

			//Also, increment the number of likes in the video model
			foundVid.likes += 1;
		}


		else{

			// Get the index of the unliked video in array
			const index = foundUser.likedVideos.indexOf(req.body.vidId);

			// Remove it from the array in the DB
			foundUser.likedVideos.splice(index, 1);



			//Also, decrement the number of likes in the video model
			foundVid.likes -= 1;

		}


		//Save changes
		await foundUser.save();


		await foundVid.save();

		//This is consoled.logged in browser
		res.send('POSTED!');

	}


	catch(err){

		next(err);
	}




});



router.delete('/:id', async(req, res)=>{

	const findVideo = Video.findOne({'videoId': req.params.id});

	const findUser = User.findOne({'userName': req.session.userName});

	const [foundVideo, foundUser] = await Promise.all([findVideo, findUser]);

	foundVideo.remove();


	foundUser.videos.id(foundVideo._id).remove();

	await foundUser.save();









	// const index = foundUser.videos.indexOf(foundVideo);

	// console.log(`${index}================ this is the index`);

	// foundUser.videos.splice(index, 1);

	// await foundUser.save();




	
	

	res.redirect('/show');
})









module.exports = router;

