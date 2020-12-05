import { createServer } from 'http';
import app from './app.js';

// Constants
const PORT = process.env.PORT || 8080;
const HOST = 'localhost';

const server = createServer(app);

server.listen(PORT);
console.log(`Running on http://${HOST}:${PORT}`);
