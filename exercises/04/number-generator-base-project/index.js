const http = require('http');
const express = require('express');
const path = require('path');
const { createProxyMiddleware } = require("http-proxy-middleware");

const app = express();

app.use(express.json());
app.use(express.static("express"));


app.use("/js", express.static(__dirname + "/js"));
app.use("/css", express.static(__dirname + "/css"));

app.use(
    "/oauth2/token",
    createProxyMiddleware({
        target: "https://oauth2.kyma.local",
        changeOrigin: true,
        cookieDomainRewrite: "localhost",
        secure: false,
        rejectUnauthorized: false,
        headers: {
            host: "oauth2.kyma.local",
            origin: null
        },
        "onProxyReq": function(proxyReq, req, res) {
            proxyReq.setHeader('accept-encoding', 'identity');
        }
    })
);

// default URL for website
app.use('/',  function(req, res) {
    res.sendFile(path.join(__dirname + '/index.html'));
    //__dirname : It will resolve to your project folder.
});
const server = http.createServer(app);
const port = 8017;
server.listen(port);
console.debug('Server listening on port ' + port);