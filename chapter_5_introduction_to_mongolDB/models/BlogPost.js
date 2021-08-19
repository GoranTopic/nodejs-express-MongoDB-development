const mongoose = require('mongoose'); // import mongo Db

const Schema = mongoose.Schema; // get the Schema obj from mongoose

const BlogPostSchema = new Schema({ 
	// define a new Schema obj
	title: String,
	body: String,
});

// register that schema with 
const BlogPost = mongoose.model('BlogPost', BlogPostSchema);

module.exports = BlogPost;
