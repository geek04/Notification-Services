const cron = require('node-cron');
const notificationRepo = require('../src/database/repositories/notification-repository.js');
const logger = require('../src/utils/advanced-logger.js');

// Run every day at midnight
cron.schedule('0 0 * * *', async () => {
  try {
    const cutoff = new Date(Date.now() - 30 * 24 * 60 * 60 * 1000); // 30 days ago
    const result = await notificationRepo.deleteOldNotifications(cutoff);
    logger.info(`Cleaned up ${result.deletedCount} old notifications`);
  } catch (err) {
    logger.error('Error cleaning up notifications:', err);
  }
});

// If you want this script to run standalone:
if (require.main === module) {
  console.log('Notification cleanup job started (cron mode)...');
}
