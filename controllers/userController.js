// require express to use router
const express = require('express');
// instantiate router with router constructor
const router = express.Router();
//Require models to use schema and db
const User = require('../models/user');
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
router.get('/index', (req, res)=>{
	res.render('user/index.ejs');
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

		console.log(user);

		res.redirect('/');
	}

	catch(err){
		next(err);
	}	

});






// //POST route to login current user
// router.post('/login', async(req, res)=>{

// 	try{
		

// 	}
// 	catch(err){
// 		next(err);
// 	}



// 	res.render('user/index.ejs', {
// 		user:
// 	});
// });






















module.exports = router;

