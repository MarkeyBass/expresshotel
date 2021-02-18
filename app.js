const http = require("http");
const https = require("https");
const path = require("path");
const fs = require("fs");
const url = require('url');


const express = require('express');
const app = express();

// REDIRECTION TO HTTPS

const cert = fs.readFileSync('/etc/letsencrypt/archive/markeybass.com/cert1.pem', 'utf8');
const ca = fs.readFileSync('/etc/letsencrypt/archive/markeybass.com/chain1.pem', 'utf-8');
const fullchain = fs.readFileSync('/etc/letsencrypt/archive/markeybass.com/fullchain1.pem', 'utf-8');
const key = fs.readFileSync('/etc/letsencrypt/archive/markeybass.com/privkey1.pem', 'utf-8');

const credentials = {
  key,
  cert,
  ca
} 

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use(express.static(path.join(__dirname,'public')));

// const httpServer = http.createServer(app);

httpPORT = 5004;
httpSecurePORT = 8004;



const httpServer = http.createServer(httpPORT, (req, res) => {
  const myUrl = url.parse();
  res.writeHead(301, { location: `https://markeybass.com:${httpSecurePORT}${myUrl.pathname}` })
  res.end();
});

const httpSecureServer = https.createServer(credentials ,app);

httpServer.listen(httpPORT, () => console.log(`server is running on port ${httpPORT}`));
httpSecureServer.listen(httpSecurePORT, () => console.log(`server is running on port ${httpSecurePORT}`));