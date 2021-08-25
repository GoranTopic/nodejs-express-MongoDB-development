// import the user model
const User = require('../models/User.js');
const path = require('path'); // import path module

/* get the post method to create a new user, process it, 
 * and store it in the db */
module.exports = async (req, res) => {
		// create a new user
		User.create(req.body, (error, user) => {
				if(error){ 
						console.log("printing errors")
						console.log(error);
						const validationErrors = Object.keys(error.errors).map(key => error.errors[key].message);
						req.flash('validationErrors', validationErrors); // getting the validation error from flash
						//req.session.validationErrors = validationErrors; //
						req.flash('data', req.body); // ge the user input from data var in flash
						return res.redirect('/auth/register'); 
				}
				res.redirect('/');
		});
}
