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
	res.render('user/login-signup.ejs');
});





//Get route to render index page
router.get('/index', async(req, res)=>{

	// Find all videos in DB so we can see them on index page
	const videos = await Video.find();



	// Send over current user properties to index page
	res.render('user/index.ejs', {
		userName: req.session.userName,
		firstName: req.session.firstName,
		lastName: req.session.lastName,
		videos: videos

	});
});






//Get route to render show page
router.get('/show', (req, res)=>{
	res.render('user/show.ejs');
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



		}
		//If either the username or password are false
		else{
			res.redirect('/');

		}
		

	}
	catch(err){
		next(err);
	}



});
























module.exports = router;

