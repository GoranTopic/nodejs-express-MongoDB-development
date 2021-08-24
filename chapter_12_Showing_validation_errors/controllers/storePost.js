// import the blogpost model
const BlogPost = require('../models/BlogPost.js');
const path = require('path'); // import path module

/* get the post method to create a new post, process it, 
 * and store it in the db */
module.exports = async (req, res) => {
		// get the image file from the request
		let image = req.files.image;
		// move the image to the public folder
		image.mv(path.resolve(__dirname, '..', 'public/img', image.name),  
				// afterthe moving is done
				async (error) => {
						await BlogPost.create({ // create new post in db
								...req.body,
								image: '/img/' + image.name // save where it is stored
						});
						res.redirect('/');
				}
		);
}
