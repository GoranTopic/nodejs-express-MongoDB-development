const express = require('express'); // import express 
const mongoose = require('mongoose'); // import mongoose library


// import middleware
const ejs = require('ejs'); // import embede javascript module 
const fileUpload = require('express-fileupload'); // import file upload module 
const validationMiddleware = require('./middleware/validationMiddleware');
const expressSession = require('express-session');
const authMiddleware = require('./middleware/authMiddleware');
const redirectIfAuthenticatedMiddleware = require('./middleware/redirectIfAuthenticatedMiddleware');


// import controllers
const newPostController = require('./controllers/newPost');
const renderPageController = require('./controllers/renderPageController');
const HomeController = require('./controllers/home');
const getPostController = require('./controllers/getPost');
const storePostController = require('./controllers/storePost');
const storeUserController = require('./controllers/storeUser');
const loginUserController = require('./controllers/loginUser');
const logoutController = require('./controllers/logout');


// connecting to the mongod server, pass flags so that it does not compline
let url = 'mongodb://127.0.0.1/my_database'; 
mongoose.connect( url, { useNewUrlParser: true, useUnifiedTopology: true }); 

// make a new express serve instant 
const server = new express(); 



// define middleware for express to use
server.use(express.static('public')); // server static file in the public directory
server.use(express.json()); // 
server.use(express.urlencoded());
server.use(fileUpload()); // use file upload 
server.use('/posts/store', validationMiddleware); // validate middleware
server.use(expressSession({ secret: 'keyboard cat' }));

// make global fuction so that every page render can know if user is login in
global.loggedIn = null;

// make middleware so that the request write to the global valiable
server.use("*", (req, res, next) => {
		loggedIn = req.session.userId;
		next();
});

// tell express to use view engine on any file ending with ejs
server.set('view engine', 'ejs');

// define view
server.get('/', HomeController);

// do the same for the rest of the pages
server.get('/about', renderPageController('about'));
server.get('/contact', renderPageController('contact'));
server.get('/post', renderPageController('post'));
server.get('/index', renderPageController('index'));
server.get('/posts/new', authMiddleware, renderPageController('create'));
server.get('/auth/register', redirectIfAuthenticatedMiddleware, renderPageController('register'));
server.get('/auth/login', redirectIfAuthenticatedMiddleware, renderPageController('login'));
server.get('/auth/logout', authMiddleware, logoutController);


// define controller for the post request
server.post('/posts/store', authMiddleware, storePostController);
server.post('/users/register', redirectIfAuthenticatedMiddleware, storeUserController);
server.post('/users/login', redirectIfAuthenticatedMiddleware, loginUserController);

// process an individual post 
server.get('/posts/:id', getPostController)

// 404 page not found route
server.use(renderPageController('notfound'));

// run server
server.listen(4000, () => console.log('listeing on port 40000'));
