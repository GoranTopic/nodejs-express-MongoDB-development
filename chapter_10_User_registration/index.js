const express = require('express'); // import express 
const ejs = require('ejs'); // import embede javascript module 
const mongoose = require('mongoose'); // import mongoose library
const fileUpload = require('express-fileupload'); // import file upload module 

// import controllers
const newPostController = require('./controllers/newPost');
const renderPageController = require('./controllers/renderPageController');
const HomeController = require('./controllers/home');
const getPostController = require('./controllers/getPost');
const storePostController = require('./controllers/storePost');

// import middleware
const validationMiddleware = require('./middleware/validationMiddleware');

//  url for the mongod server
let url = 'mongodb://127.0.0.1/my_database'; 
// connecting to the mongod server, pass flags so that it does not compline
mongoose.connect( url, { useNewUrlParser: true, useUnifiedTopology: true }); 

// make a new express serve instant 
const server = new express(); 

// define middle ware for express to use
server.use(express.static('public')); // server static file in the public directory
server.use(express.json()); // 
server.use(express.urlencoded());
server.use(fileUpload()); // use file upload 

// validate middleware
server.use('/posts/store', validationMiddleware);

// tell express to use view engine on any file ending with ejs
server.set('view engine', 'ejs');

// define view
server.get('/', HomeController);

// do the same for the rest of the pages
server.get('/about.html', renderPageController('about'));
server.get('/contact.html', renderPageController('contact'));
server.get('/post.html', renderPageController('post'));
server.get('/index.html', renderPageController('index'));
server.get('/posts/new', renderPageController('create'));

// define controller for the post request
server.post('/posts/store', storePostController);

// process an individual post 
server.get('/posts/:id', getPostController)

// run server
server.listen(4000, () => console.log('listeing on port 40000'));
