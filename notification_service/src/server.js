const http = require('http');
const app = require('./app.js');
const config = require('./config/env.js');
const { connect } = require('./database/connection.js'); // your DB connect function

const { createWebSocketServer } = require('./providers/in-app/websocket-server.js');

const PORT = config.PORT || 3000;

async function startServer() {
  try {
    await connect(); // wait for DB connection first
    console.log('MongoDB connected');

    const server = http.createServer(app);

    createWebSocketServer(server);

    server.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });

    server.on('error', (error) => {
      console.error('Server error:', error);
    });

  } catch (error) {
    console.error('Failed to connect to MongoDB:', error);
    process.exit(1);
  }
}

startServer();
