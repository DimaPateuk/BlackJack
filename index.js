var httpProxy = require('http-proxy');
httpProxy.createServer(8080, 'localhost').listen(8080);