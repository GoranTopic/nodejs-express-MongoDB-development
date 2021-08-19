const express = require('express'); // import express 
const path = require('path'); // import path module
const ejs = require('ejs'); // import embede javascript module 
const mongoose = require('mongoose'); // import mongoose library


mongoose.connect('mongodb://localhost/my_database')
const server = new express(); // make a new express serve instant 

// server static file in the public directory
server.use(express.static('public'));

server.set('view engine', 'ejs') // tell express to use view engin on any file ending with ejs

server.get('/', (req, res) => {
		// use the render method, which wil look in the view folder for a index.ejs file 
		res.render('index');
});

// do the same for the rest of the pages
server.get('/about.html', (req, res) => { res.render('about') })
server.get('/contact.html', (req, res) => { res.render('contact') })
server.get('/post.html', (req, res) => { res.render('post') })
server.get('/index.html', (req, res) => { res.render('index') })


// run server
server.listen(4000, () => console.log('listeing on port 40000'));
