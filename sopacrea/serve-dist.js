// Servidor estático sin dependencias para servir sopacrea/dist.
// Se usa en el arranque portable para no depender de los enlaces de node_modules.
const http = require('http');
const fs = require('fs');
const path = require('path');

const root = path.join(__dirname, 'dist');
const port = Number(process.env.PORT || 3000);

const mime = {
  '.html': 'text/html; charset=utf-8',
  '.js': 'text/javascript; charset=utf-8',
  '.css': 'text/css; charset=utf-8',
  '.json': 'application/json; charset=utf-8',
  '.svg': 'image/svg+xml',
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.ico': 'image/x-icon',
  '.woff': 'font/woff',
  '.woff2': 'font/woff2',
  '.map': 'application/json; charset=utf-8',
};

function send(res, status, data, type) {
  res.writeHead(status, {
    'Content-Type': type || 'application/octet-stream',
    'Cache-Control': 'no-store',
  });
  res.end(data);
}

http
  .createServer((req, res) => {
    let urlPath = '/';
    try {
      urlPath = decodeURIComponent((req.url || '/').split('?')[0]);
    } catch (_) {
      urlPath = '/';
    }
    const relative = urlPath === '/' ? 'index.html' : urlPath.replace(/^\/+/, '');
    let file = path.resolve(root, relative);
    if (file !== root && !file.startsWith(root + path.sep)) {
      send(res, 403, 'Forbidden', 'text/plain; charset=utf-8');
      return;
    }
    fs.stat(file, (err, stat) => {
      if (err || stat.isDirectory()) file = path.join(root, 'index.html');
      fs.readFile(file, (readErr, data) => {
        if (readErr) {
          send(res, 404, 'Not found', 'text/plain; charset=utf-8');
          return;
        }
        send(res, 200, data, mime[path.extname(file).toLowerCase()]);
      });
    });
  })
  .listen(port, '0.0.0.0', () => {
    console.log(`SopaCrea servido desde ${root} en http://localhost:${port}`);
  });
