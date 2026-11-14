const fs = require('fs');
let s = fs.readFileSync(require('path').join(__dirname,'app.part.html'),'utf8');
const title = s.match(/<title>([^<]*)<\/title>/)[1];
const headEnd = s.indexOf('</style>');
if(headEnd < 0) throw new Error('no style');
const stylePart = s.slice(s.indexOf('<style>'), headEnd + '</style>'.length);
const bodyPart = s.slice(headEnd + '</style>'.length).replace(/<meta name="claude:viewport-fit-sides"[^>]*>\n?/, '').trim();
const html = `<!doctype html>
<html lang="zh-CN">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover">
<meta name="apple-mobile-web-app-capable" content="yes">
<meta name="mobile-web-app-capable" content="yes">
<meta name="apple-mobile-web-app-status-bar-style" content="default">
<meta name="apple-mobile-web-app-title" content="${title}">
<meta name="theme-color" content="#EEF0E9">
<link rel="apple-touch-icon" href="apple-touch-icon.png">
<title>${title}</title>
${stylePart}
</head>
<body>
${bodyPart}
</body>
</html>
`;
fs.writeFileSync(require('path').join(__dirname,'..','index.html'), html);
console.log('index.html', (html.length/1024).toFixed(1)+'KB');
