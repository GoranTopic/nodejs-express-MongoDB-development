const bcrypt = require('bcrypt');
const User = require('../models/User');

module.exports = (req, res) => {
		// ge the username and password from the request
		const { username, password } = req.body; 
		//
		User.findOne({ username: username }, ( error, user ) =>{
				if(user){ // if the user if found in the db
						bcrypt.compare(password, user.password, (error, same) =>{
								if(same){  
										// password is the same, store user session
										console.log(username + " has logged in");
										req.session.userId = user._id
										res.redirect('/');
								} else { // if the password hashs to the same
										console.log(error);
										console.log("passwords does not match")
										res.redirect('/auth/login');
								} 
						});
				}else{ // if the use was not found
						console.log(error);
						console.log("no user: " + user);
						res.redirect('/auth/login');
				}
		});
}
