// require express to use router
const express = require('express');
// instantiate router with router constructor
const router = express.Router();
//Require models to use schema and db
const User = require('../models/user');


router.get('/', (req, res)=>{
	res.render('user/add.ejs');
})


















module.exports = router;

