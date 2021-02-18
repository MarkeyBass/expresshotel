const http = require("http");
const https = require("https");
const path = require("path");
const fs = require("fs");
const url = require('url');


const express = require('express');
const app = express();
// httpApp is created only for redirection
const httpApp = express();

// CREDENTIALS

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

// PORTS
httpPORT = 5004;
httpSecurePORT = 8004;

// REDIRECTION
httpApp.all('*', (req, res) => {
  const myUrl = url.parse(req.url);
  res.redirect(301, `https://markeybass.com:${httpSecurePORT}${myUrl.pathname}`)
}); 

// Creating Servers
const httpServer = http.createServer(httpApp);
const httpSecureServer = https.createServer(credentials ,app);

// Servers Listening
httpServer.listen(httpPORT, () => console.log(`server is running on port ${httpPORT}`));
httpSecureServer.listen(httpSecurePORT, () => console.log(`server is running on port ${httpSecurePORT}`));