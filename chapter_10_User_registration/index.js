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
const storeUserController = require('./controllers/storeUser');
const loginUserController = require('./controllers/loginUser');

// import middleware
const validationMiddleware = require('./middleware/validationMiddleware');

// connecting to the mongod server, pass flags so that it does not compline
let url = 'mongodb://127.0.0.1/my_database'; 
mongoose.connect( url, { useNewUrlParser: true, useUnifiedTopology: true }); 

// make a new express serve instant 
const server = new express(); 

// define middle ware for express to use
server.use(express.static('public')); // server static file in the public directory
server.use(express.json()); // 
server.use(express.urlencoded());
server.use(fileUpload()); // use file upload 
server.use('/posts/store', validationMiddleware); // validate middleware

// tell express to use view engine on any file ending with ejs
server.set('view engine', 'ejs');

// define view
server.get('/', HomeController);

// do the same for the rest of the pages
server.get('/about', renderPageController('about'));
server.get('/contact', renderPageController('contact'));
server.get('/post', renderPageController('post'));
server.get('/index', renderPageController('index'));
server.get('/posts/new', renderPageController('create'));
server.get('/auth/register', renderPageController('register'));
server.get('/auth/login', renderPageController('login'));

// define controller for the post request
server.post('/posts/store', storePostController);
server.post('/users/register', storeUserController);
server.post('/users/login', loginUserController);

// process an individual post 
server.get('/posts/:id', getPostController)

// run server
server.listen(4000, () => console.log('listeing on port 40000'));
