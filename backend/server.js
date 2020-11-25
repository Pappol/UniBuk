'use strict';
const http = require('http');
const app = require('./app');

// Constants
const PORT = process.env.PORT || 8080;
const HOST = 'localhost';

const server = http.createServer(app);

server.listen(PORT);
console.log(`Running on http://${HOST}:${PORT}`);
