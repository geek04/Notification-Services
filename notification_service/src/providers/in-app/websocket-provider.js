const { io } = require('socket.io-client');
const config = require('../../config/env.js');

const socket = io(config.WS_SERVER_URL); // From .env

async function send({ recipient, message }) {
  socket.emit('notify', { recipient, message });
  console.log(`[WebSocket] Notification sent to ${recipient}`);
}

module.exports = { send };
