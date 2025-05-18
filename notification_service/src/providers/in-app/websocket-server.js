const { Server } = require('socket.io');

function createWebSocketServer(httpServer) {
  const io = new Server(httpServer, {
    cors: {
      origin: '*', // Adjust this in production
      methods: ['GET', 'POST']
    }
  });

  io.on('connection', (socket) => {
    console.log('Client connected:', socket.id);

    socket.on('notify', ({ recipient, message }) => {
      console.log(`Notify ${recipient}: ${message}`);
      // io.to(recipient).emit('notification', message); // Optional advanced usage
    });

    socket.on('disconnect', () => {
      console.log('Client disconnected:', socket.id);
    });
  });

  return io;
}

module.exports = { createWebSocketServer };
