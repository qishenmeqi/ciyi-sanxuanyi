const http = require('http');
const fs = require('fs');
const path = require('path');
const os = require('os');

const ROOT = __dirname;
const PORT = Number(process.env.PORT) || 8080;
const TYPES = {
  '.html':'text/html; charset=utf-8',
  '.css':'text/css; charset=utf-8',
  '.js':'application/javascript; charset=utf-8',
  '.png':'image/png',
  '.svg':'image/svg+xml',
  '.ico':'image/x-icon'
};

const server = http.createServer((req, res) => {
  let rel = decodeURIComponent((req.url || '/').split('?')[0]);
  if (rel === '/') rel = '/index.html';
  const file = path.join(ROOT, path.normalize(rel));
  if (!file.startsWith(ROOT)) { res.writeHead(403); res.end('Forbidden'); return; }
  fs.readFile(file, (err, data) => {
    if (err) { res.writeHead(404, {'Content-Type':'text/plain; charset=utf-8'}); res.end('没有找到这个文件'); return; }
    res.writeHead(200, {'Content-Type': TYPES[path.extname(file).toLowerCase()] || 'application/octet-stream', 'Cache-Control':'no-store'});
    res.end(data);
  });
});

server.on('error', (err) => {
  console.log('');
  if(err.code === 'EADDRINUSE'){
    console.log('  端口 ' + PORT + ' 已经被占用，多半是服务已经开着了。');
    console.log('  直接用刚才那个地址就行。');
  } else {
    console.log('  启动失败：' + err.message);
  }
  console.log('');
  console.log('  可以关掉这个窗口。');
  console.log('');
  setInterval(function(){}, 60000);
});

server.listen(PORT, '0.0.0.0', () => {
  const ips = [];
  const nets = os.networkInterfaces();
  for (const name of Object.keys(nets)) {
    for (const n of nets[name] || []) {
      if (n.family === 'IPv4' && !n.internal) ips.push(n.address);
    }
  }
  console.log('');
  console.log('  词义三选一 已启动');
  console.log('  本机打开：http://localhost:' + PORT);
  ips.forEach(ip => console.log('  iPad 打开：http://' + ip + ':' + PORT));
  console.log('');
  console.log('  保持这个窗口开着。关掉窗口，iPad 就打不开了。');
  console.log('');
});
