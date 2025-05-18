// Ensure MongoDB is connected before starting the worker
const { connect } = require('./database/connection.js');

async function startWorker() {
  await connect(); // Wait for MongoDB connection

  // Now require and start the queue consumer
  require('./queues/bullmq/queue-consumer.js');
  console.log('Notification worker started and listening for jobs...');
}

startWorker();
