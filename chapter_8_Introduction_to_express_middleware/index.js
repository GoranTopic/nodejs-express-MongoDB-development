const express = require('express'); // import express 
const path = require('path'); // import path module
const ejs = require('ejs'); // import embede javascript module 
const mongoose = require('mongoose'); // import mongoose library
const fileUpload = require('express-fileupload'); // import file upload module 


//  url for the mongod server
let url = 'mongodb://127.0.0.1/my_database'; 
// connecting to the mongod server, pass flags so that it does not compline
mongoose.connect( url, { useNewUrlParser: true, useUnifiedTopology: true }); 

// ge tht blog post model from the model file
const BlogPost = require('./models/BlogPost.js');

// make a new express serve instant 
const server = new express(); 

// define middle ware for express to use
server.use(express.static('public')); // server static file in the public directory
server.use(express.json()); // 
server.use(express.urlencoded());
server.use(fileUpload()); // use file upload 

// tell express to use view engine on any file ending with ejs
server.set('view engine', 'ejs');

server.get('/', async (req, res) => {
		/* use the render method, which wil look in the view folder for a index.ejs file */
		// get all the posts from the database
		const blogposts = await BlogPost.find({}); 
		//console.log(blogposts);
		// pass all the blog value to the render function
		res.render('index', { blogposts });
});


// do the same for the rest of the pages
server.get('/about.html', (req, res) => { res.render('about') })
server.get('/contact.html', (req, res) => { res.render('contact') })
server.get('/post.html', (req, res) => { res.render('post') })
server.get('/index.html', (req, res) => { res.render('index') })
server.get('/posts/new', (req, res) => { res.render('create') })

server.post('/posts/store', async (req, res) => {
		/* method for handeling post request */
		let image = req.files.image;
		image.mv(path.resolve(__dirname, 'public/img', image.name), async (error) => {
				// create a blog post in the database
				await BlogPost.create({ ...req.body, image:'/img/' + image.name });
				res.redirect('/');
		});
});

server.get('/posts/:id', async (req, res) => {
		/* get server an individual post page */
		// query the database for a post iwth the passed id
		const blogpost = await BlogPost.findById(req.params.id); 
		// pass te blogpost found tot he render page
		res.render('post', { blogpost });
});

// run server
server.listen(4000, () => console.log('listeing on port 40000'));
