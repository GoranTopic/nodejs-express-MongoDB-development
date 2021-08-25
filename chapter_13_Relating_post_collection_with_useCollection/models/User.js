const mongoose = require('mongoose'); // import mongodb 
const Schema = mongoose.Schema;
const bcrypt = require('bcrypt'); // import bcrypt to be able to encrypt passwords
var uniqueValidator = require('mongoose-unique-validator');

const UserSchema = new Schema({
		username:{
				type: String, 
				required: [ true, 'Please provide username'],
				unique: true
		},
		password: {
				type: String, 
				required: [ true, 'Please provide password'],
		}
});

// unique validator so thath it return an error message when it is not unique
UserSchema.plugin(uniqueValidator); 

UserSchema.pre('save', function(next){ 
		// tell mongodb that before we 'save', we run the following fuction 
		const user = this; // get the instance of the user being saved
		bcrypt.hash(user.password, 10, (error, hash) => { 
				// hash the username and overwrite the value
				console.log(error);
				user.password = hash;
				next(); // call next function 
		});
});

//export model
const User = mongoose.model('User', UserSchema);
module.exports = User 


