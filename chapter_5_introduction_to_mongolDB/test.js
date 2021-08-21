const mongoose = require('mongoose'); // import mongoose module
const BlogPost = require('./models/BlogPost'); // import blog post schema

let url = 'mongodb://127.0.0.1/my_database';


mongoose.connect( url, { userNewUrlParser: true }); 

BlogPost.create({
		title:  'The Mythbuster guide to Saving more Money on Energy Bills', 
		body: "And once the storm is over, you won't remember how you made it through, how you managed to survive. You won't even be sure whether the storm is really over. But one thing is certain. When you come out of the storm, you won't be the same person who walked in. That's what this storm's all about.", 
}, (error, blogpot) => { console.log(error, blogpot) })


