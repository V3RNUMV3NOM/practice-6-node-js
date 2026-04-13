const http = require('http');
const fs = require('fs');

const port = process.argv[2] || 3000;

const server = http.createServer((req, res) => {
  if (req.method === 'POST' && req.url === '/save') {
    let body = '';
    req.on('data', chunk => body += chunk.toString());
    req.on('end', () => {
      try {
        JSON.parse(body); // Перевірка на валідність JSON
        fs.writeFile('data.json', body, (err) => {
          if (err) throw err;
          res.writeHead(201);
          res.end('Saved');
        });
      } catch (e) {
        res.writeHead(400);
        res.end('Invalid JSON');
      }
    });
  }
});
server.listen(port);