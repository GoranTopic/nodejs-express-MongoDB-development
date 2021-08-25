const BlogPost = require('../models/BlogPost.js');

module.exports = async(req, res) => {
		/* get all the posts from the db and render them in index page */ 
		const blogposts = await BlogPost.find({}).populate('userid');
		// return index view witht he blogpost passed
		console.log(req.session);
		res.render('index', { blogposts });
}
