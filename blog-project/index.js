const express = require('express'); // import express 
const path = require('path'); // import path module

const server = new express();

// sever static file in the public directory
server.use(express.static('public'));

function sendFileFunc(filename){
		/* function which return a fuction about the response of a request */
		return (request, response) => { 
				//send file as respoce from the get request
				response.sendFile( path.resolve( __dirname, 'pages/' + filename ) ); 
		}
}


server.get('/index.html', sendFileFunc('index.html') ); // serve index file

server.get('/about.html', sendFileFunc('about.html') ); // serve about file

server.get('/contact.html', sendFileFunc('contact.html') ); // serve contact file

server.get('/post.html', sendFileFunc('post.html') ); // serve post file

server.get('/*', sendFileFunc('index.html') ); // serve index file

server.listen(4000, () => console.log('listeing on port 40000'));
