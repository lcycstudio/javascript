const http = require('http');
const routes = require('./routes');

console.info(routes.someText);

const server = http.createServer(routes.handler);

server.listen(3000);