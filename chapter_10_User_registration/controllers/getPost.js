// import the blogpost model
const BlogPost = require('../models/BlogPost.js');

module.exports = async (req, res) => {
		/* get a post requested and return with a post view */
		// query blogpost 
		const blogpost = await BlogPost.findById(req.params.id);
		// return the post view with the blogpost passed to it
		res.render('post', { blogpost });
}
