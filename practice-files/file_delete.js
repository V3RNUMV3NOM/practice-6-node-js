const http = require('http');
const fs = require('fs');

const port = process.argv[2] || 3000;

const server = http.createServer((req, res) => {
  if (req.method === 'DELETE' && req.url === '/remove') {
    fs.unlink('temp.txt', (err) => {
      if (err) {
        res.writeHead(404);
        return res.end('File not found');
      }
      res.writeHead(200);
      res.end('Deleted');
    });
  }
});
server.listen(port);