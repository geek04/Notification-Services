/**
 * Notification repository for MongoDB.
 */
const { getDb } = require('../connection.js');

const COLLECTION = 'notifications';

/**
 * Inserts a new notification document.
 * @param {Object} notification
 * @returns {Promise<Object>}
 */
async function createNotification(notification) {
  const db = getDb();
  const result = await db.collection(COLLECTION).insertOne({
    ...notification,
    createdAt: new Date(),
  });
  return { ...notification, _id: result.insertedId, createdAt: new Date() };
}

/**
 * Retrieves notifications for a user, most recent first.
 * @param {string} userId
 * @returns {Promise<Array>}
 */
async function getUserNotifications(userId) {
  const db = getDb();
  return db
    .collection(COLLECTION)
    .find({ userId })
    .sort({ createdAt: -1 })
    .toArray();
}

/**
 * Optionally: Delete notifications older than N days (for cleanup job)
 * @param {number} days
 */
async function deleteOldNotifications(days) {
  const db = getDb();
  const cutoff = new Date(Date.now() - days * 24 * 60 * 60 * 1000);
  await db.collection(COLLECTION).deleteMany({ createdAt: { $lt: cutoff } });
}

module.exports = {
  createNotification,
  getUserNotifications,
  deleteOldNotifications,
};
