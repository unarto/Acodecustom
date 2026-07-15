const http = require('node:http');
const fs = require('node:fs');
const path = require('node:path');

const PORT = 3000;
const HOST = '0.0.0.0';
const WWW_DIR = path.join(__dirname, 'www');

const MIME_TYPES = {
  '.html': 'text/html',
  '.css': 'text/css',
  '.js': 'application/javascript',
  '.mjs': 'application/javascript',
  '.json': 'application/json',
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.jpeg': 'image/jpeg',
  '.gif': 'image/gif',
  '.svg': 'image/svg+xml',
  '.ico': 'image/x-icon',
  '.woff': 'font/woff',
  '.woff2': 'font/woff2',
  '.ttf': 'font/ttf',
  '.map': 'application/json'
};

const server = http.createServer((req, res) => {
  // Ambil path request dan hilangkan query string
  let safeUrl = req.url.split('?')[0];
  if (safeUrl === '/') {
    safeUrl = '/index.html';
  }

  // Normalisasi path agar aman dari directory traversal
  const relativePath = path.normalize(safeUrl).replace(/^(\.\.[\/\\])+/, '');
  const filePath = path.join(WWW_DIR, relativePath);

  // Pastikan file berada di dalam folder WWW_DIR
  if (!filePath.startsWith(WWW_DIR)) {
    res.writeHead(403, { 'Content-Type': 'text/plain' });
    res.end('403 Forbidden');
    return;
  }

  fs.stat(filePath, (err, stats) => {
    if (err || !stats.isFile()) {
      // Jika file tidak ditemukan, fallback ke index.html untuk SPA
      const fallbackPath = path.join(WWW_DIR, 'index.html');
      fs.readFile(fallbackPath, (fallbackErr, content) => {
        if (fallbackErr) {
          res.writeHead(404, { 'Content-Type': 'text/plain' });
          res.end('404 Not Found');
          return;
        }
        res.writeHead(200, {
          'Content-Type': 'text/html',
          'Cache-Control': 'no-cache, no-store, must-revalidate'
        });
        res.end(content);
      });
      return;
    }

    // Ambil content-type yang tepat
    const ext = path.extname(filePath).toLowerCase();
    const contentType = MIME_TYPES[ext] || 'application/octet-stream';

    // Baca file dan kirimkan respons
    fs.readFile(filePath, (readErr, content) => {
      if (readErr) {
        res.writeHead(500, { 'Content-Type': 'text/plain' });
        res.end('500 Internal Server Error');
        return;
      }

      res.writeHead(200, {
        'Content-Type': contentType,
        'Access-Control-Allow-Origin': '*',
        'Cache-Control': 'public, max-age=31536000'
      });
      res.end(content);
    });
  });
});

server.listen(PORT, HOST, () => {
  console.log(`[AI Studio Server] Running on http://${HOST}:${PORT}`);
  console.log(`[AI Studio Server] Serving static files from: ${WWW_DIR}`);
});
