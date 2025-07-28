import fs from "fs";
import http2 from "http2";

// const server = http.createServer((req, res) => {
//     res.statusCode = 200;
//     res.setHeader("Content-Type", "text/plain");
//     res.end("Hello World\n");
// });

const server = http2.createSecureServer({
    key: fs.readFileSync('./key.pem'),
    cert: fs.readFileSync('./cert.pem')
}, (req, res) => {
  if (req.url === '/') {
    const htmlFile = fs.readFileSync('./public/index.html', 'utf-8');
    res.writeHead(200, { 'Content-Type': 'text/html' });
    res.end(htmlFile);
  } 

  if (req.url?.endsWith('.js')) {
    const jsFile = fs.readFileSync('./public/js/app.js', 'utf-8');
    res.writeHead(200, { 'Content-Type': 'application/javascript' });
    res.end(jsFile);
  }

  if (req.url?.endsWith('.css')) {
    const cssFile = fs.readFileSync('./public/css/styles.css', 'utf-8');
    res.writeHead(200, { 'Content-Type': 'text/css' });
    res.end(cssFile);
  }
});

server.listen(8080, 'localhost', () => {
    console.log("Server running at http://localhost:8080/");
});
