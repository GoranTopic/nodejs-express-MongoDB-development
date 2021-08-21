const mongoose = require('mongoose'); // import mongoose module
const BlogPost = require('./models/BlogPost'); // import blog post schema

let url = 'mongodb://127.0.0.1/my_database';


mongoose.connect( url, { useNewUrlParser: true, useUnifiedTopology: true }); 

BlogPost.create({
		title:  'The Mythbuster guide to Saving more Money on Energy Bills', 
		body: "And once the storm is over, you won't remember how you made it through, how you managed to survive. You won't even be sure whether the storm is really over. But one thing is certain. When you come out of the storm, you won't be the same person who walked in. That's what this storm's all about.", 
}, (error, blogpot) => { console.log(error, blogpot) })


console.log("getting allt e  post from db ");
BlogPost.find({}, (error, blogspot) => { // finds all the parameters 
		console.log( error, blogspot );
});


console.log("getting the post with title: The Mythbuster guide to Saving more Money on Energy Bills");
BlogPost.find({
		title: "The Mythbuster guide to Saving more Money on Energy Bills",
}, (error, blogspot) => { // finds all the parameters 
		console.log( error, blogspot );
});


console.log("finding all post with title starting with 'the'");
BlogPost.find({
		title: /the/,
}, (error, blogspot) => { // finds all the parameters 
		console.log( error, blogspot );
});


var id = "612049657008f938c4982ae1";
console.log("finding all post with id of", id);
BlogPost.findById(id, (error, blogspot) => { // finds all the parameters 
		console.log( error, blogspot );
});

// find blog post an update it 
BlogPost.findByIdAndUpdate(id, { title: 'Updated title' }, (error, blogspot) => { console.log(error, blogspot) });

// find blog post and delete it 
BlogPost.findByIdAndUpdate(id, (error, blogspot) => { console.log(error, blogspot) });

