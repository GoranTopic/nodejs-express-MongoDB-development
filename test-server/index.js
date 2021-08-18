const http = require('http');

const server = http.createServer( (req, res) => {
		//console.log("request: ");
		//console.log(req);
		if(req.url === '/about') res.end('about page');
		else if(req.url === '/'){ 
				console.log("response: ");
				console.log(res);
				res.end('home page'); 
		} else {  
				res.writeHead(404);
				res.end('page not found ');
		}
})

server.listen(3000, () => console.log('listeing on port 3000') );
