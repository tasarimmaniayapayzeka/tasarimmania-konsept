// TasarımMania — bağımlılıksız statik sunucu
// NOT: HTTP Range desteği ZORUNLU. Olmadan <video> seek edilemez
// (video.seekable boş döner) ve scroll'a bağlı 3D simülasyon yerelde çalışmaz.
const http = require('http');
const fs = require('fs');
const path = require('path');

const PORT = 8020;
const ROOT = __dirname;

const MIME = {
  '.html': 'text/html; charset=utf-8',
  '.css': 'text/css; charset=utf-8',
  '.js': 'application/javascript; charset=utf-8',
  '.json': 'application/json; charset=utf-8',
  '.svg': 'image/svg+xml',
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.jpeg': 'image/jpeg',
  '.webp': 'image/webp',
  '.ico': 'image/x-icon',
  '.woff2': 'font/woff2',
  '.mp4': 'video/mp4',
  '.webm': 'video/webm',
  '.txt': 'text/plain; charset=utf-8'
};

http.createServer((req, res) => {
  let urlPath = decodeURIComponent(req.url.split('?')[0]);
  if (urlPath.endsWith('/')) urlPath += 'index.html';
  if (urlPath === '') urlPath = '/index.html';

  const filePath = path.join(ROOT, urlPath);
  if (!filePath.startsWith(ROOT)) { res.writeHead(403); return res.end('Forbidden'); }

  fs.stat(filePath, (err, st) => {
    if (err || !st.isFile()) {
      res.writeHead(404, { 'Content-Type': 'text/plain; charset=utf-8' });
      return res.end('404 — ' + urlPath);
    }

    const tur = MIME[path.extname(filePath).toLowerCase()] || 'application/octet-stream';
    const aralik = req.headers.range;

    // --- Range isteği: 206 Partial Content ---
    if (aralik) {
      const m = /bytes=(\d*)-(\d*)/.exec(aralik);
      if (m) {
        let bas = m[1] === '' ? null : parseInt(m[1], 10);
        let son = m[2] === '' ? null : parseInt(m[2], 10);
        if (bas === null && son !== null) { bas = st.size - son; son = st.size - 1; }
        if (bas !== null && son === null) son = st.size - 1;
        if (bas === null) bas = 0;
        if (isNaN(bas) || isNaN(son) || bas > son || son >= st.size) {
          res.writeHead(416, { 'Content-Range': `bytes */${st.size}` });
          return res.end();
        }
        res.writeHead(206, {
          'Content-Type': tur,
          'Content-Length': son - bas + 1,
          'Content-Range': `bytes ${bas}-${son}/${st.size}`,
          'Accept-Ranges': 'bytes',
          'Cache-Control': 'no-cache'
        });
        return fs.createReadStream(filePath, { start: bas, end: son }).pipe(res);
      }
    }

    res.writeHead(200, {
      'Content-Type': tur,
      'Content-Length': st.size,
      'Accept-Ranges': 'bytes',
      'Cache-Control': 'no-cache'
    });
    fs.createReadStream(filePath).pipe(res);
  });
}).listen(PORT, () => console.log('TasarimMania -> http://localhost:' + PORT));
