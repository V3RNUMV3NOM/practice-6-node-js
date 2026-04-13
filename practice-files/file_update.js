const http = require('http');
const fs = require('fs');

const port = process.argv[2] || 3000;

const server = http.createServer((req, res) => {
  if (req.method === 'PATCH' && req.url === '/update') {
    let body = '';
    req.on('data', chunk => body += chunk.toString());
    req.on('end', () => {
      fs.appendFile('log.txt', body + '\n', (err) => {
        if (err) {
          res.writeHead(500);
          return res.end('Error');
        }
        res.writeHead(200);
        res.end('Updated');
      });
    });
  }
});
server.listen(port);