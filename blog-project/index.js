const express = require('express'); // import express 
const path = require('path'); // import path module

const server = new express();

// sever static file in the public directory
server.use(express.static('public'));

server.get('/', (request, response) => {  // if server get a get request
		// sedn the file as a response from pages 
		console.log(__dirname);
		console.log('i ran');
		response.sendFile( path.resolve( __dirname, 'pages/index.html') );
});

server.listen(4000, () => console.log('listeing on port 40000'));
