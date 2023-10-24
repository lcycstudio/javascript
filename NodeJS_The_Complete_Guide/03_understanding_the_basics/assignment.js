const http = require('http');
const fs = require('fs');


const server = http.createServer((req, res) => {
  console.info('hi')
  const url = req.url;
  const method = req.method;

  if (url === '/') {
    res.setHeader('Content-Type', 'text/html');
    res.write('<html>');
    res.write('<h1>Hello Lewis, how are you?</h1>');
    res.write('<bar/>')
    res.write(
      '<div>' +
      '<h2>Enter your username here</h2>' +
      '<form action="/create-user" method="POST">' +
      '<input type="text" name="username">' +
      '<button type="submit">Submit</button>' +
      '</input>' +
      '</form>' +
      '</div>'
    );
    res.write('</html>');
    return res.end();
  }

  if (url === '/users') {
    res.setHeader('Content-Type', 'text/html');
    res.write('<html>');
    res.write(
      '<ul>' +
      '<li>User 1</li>' +
      '<li>User 2</li>' +
      '<li>User 3</li>' +
      '<li>User 4</li>' +
      '</ul>'
    );
    res.write('</html>');
    return res.end();
  }

  if (url === '/create-user' && method === 'POST') {
    const body = [];
    req.on('data', (chunk) => {
      console.info(chunk);
      body.push(chunk);
    });

    return req.on('end', () => {
      const parsedBody = Buffer.concat(body).toString();
      const username = parsedBody.split('=')[1];
      // Not Part of the Assignment
      fs.writeFile('username.txt', username, (err) => {
        res.statusCode = 302;
        res.setHeader('Location', '/');
      });
      return res.end();
    });
  }
  res.end();
});

server.listen(3000);