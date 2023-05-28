const fs = require('fs');

console.log('Hello from Node.js')

// write 'Hello from Node.js' to the file hello.txt
fs.writeFileSync('hello.txt', 'Hello from Node.js');