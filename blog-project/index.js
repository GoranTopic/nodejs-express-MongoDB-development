const express = require('express'); // import express 

const server = new express();

// sever static file in the public directory
server.use(express.static('public'));

server.listen(4000, ()=> console.log('listeing on port 40000'));
