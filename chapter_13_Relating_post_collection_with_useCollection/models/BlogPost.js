const mongoose = require('mongoose'); // import mongo Db

const Schema = mongoose.Schema; // get the Schema obj from mongoose

const BlogPostSchema = new Schema({ 
		// define a new Schema obj
		title: String,
		body: String,
		//username: String,
		userid:{
				type: mongoose.Schema.Types.ObjectId,
				ref: 'User',
				required: true,
		},
		datePosted: {
				type: Date,
				default: new Date()
		},
		image: String,
});

// register that schema with 
const BlogPost = mongoose.model('BlogPost', BlogPostSchema);

module.exports = BlogPost;
