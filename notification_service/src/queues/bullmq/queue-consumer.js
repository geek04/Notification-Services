const { Worker } = require('bullmq');
const config = require('../../config/env.js');
const notificationService = require('../../core/notifications/services/notification-service.js');

// Create BullMQ worker to process jobs using full Redis URL
const worker = new Worker(
  'notifications',
  async job => {
    try {
      await notificationService.sendNotification(job.data);
    } catch (err) {
      console.error(`Error processing job ${job.id}:`, err);
      throw err; // Let BullMQ handle retries, etc.
    }
  },
  {
    connection: { url: config.REDIS_URL }, // Use the full URL from your .env/config
    concurrency: 5, // Number of concurrent jobs
  }
);

// Optional: Log events
worker.on('completed', job => {
  console.log(`BullMQ: Job ${job.id} completed`);
});

worker.on('failed', (job, err) => {
  console.error(`BullMQ: Job ${job?.id} failed:`, err);
});

module.exports = worker;
