const { Queue } = require('bullmq');
const config = require('../../config/env.js');

// Create BullMQ queue instance using full Redis URL
const notificationQueue = new Queue('notifications', {
  connection: { url: config.REDIS_URL },
});

/**
 * Adds a notification job to the queue.
 * @param {Object} notification
 */
async function enqueueNotification(notification) {
  await notificationQueue.add('send-notification', notification, {
    attempts: 3, // Retry up to 3 times
    backoff: { type: 'exponential', delay: 2000 },
    removeOnComplete: true,
    removeOnFail: false,
  });
}

module.exports = { enqueueNotification };
