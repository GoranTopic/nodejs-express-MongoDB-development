const BlogPost = require('../models/BlogPost.js');

module.exports = async(req, res) => {
		/* get all the posts from the db and render them in index page */ 
		const blogposts = await BlogPost.find({});
		// return index view witht he blogpost passed
		res.render('index', { blogposts });
}
