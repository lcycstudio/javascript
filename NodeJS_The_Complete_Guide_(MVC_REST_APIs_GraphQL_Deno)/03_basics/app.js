// Creating a Node Server
// require: import library into 
const http = require('http');

// function rqListener(req, res) {
// }
// http.createServer(rqListener);

// http.createServer(function(req, res) {

// })

const server = http.createServer((req, res) => {
    console.info(req);
});

server.listen(3000);