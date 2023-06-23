const http = require('http');


const server = http.createServer((req, res) => {
  console.info(req);
});

server.listen(3000);