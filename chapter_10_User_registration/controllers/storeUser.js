// import the user model
const User = require('../models/User.js');
const path = require('path'); // import path module

/* get the post method to create a new user, process it, 
 * and store it in the db */
module.exports = async (req, res) => {
		// create a new user
		User.create(req.body, (error, user) => {
				if(error){ 
						console.log(error);
						return res.redirect('/auth/register'); 
				}
				res.redirect('/');
		});
}
