const express = require('express'); // import express 
const path = require('path'); // import path module

const server = new express();

// sever static file in the public directory
server.use(express.static('public'));

function sendFileFunc(filename){
		/* function which return a fuction about the response of a request */
		return (request, response) => { 
				//send file as respoce from the get request
				response.sendFile( path.resolve( __dirname, 'pages' + filename ) ); 
		}
}

["/index.html", "/about.html", "/contact.html", "/post.html"].map( 
		(page) => server.get(page, sendFileFunc(page)) 
)

server.get('/*', sendFileFunc('index.html') ); // serve index file

server.listen(4000, () => console.log('listeing on port 40000'));
