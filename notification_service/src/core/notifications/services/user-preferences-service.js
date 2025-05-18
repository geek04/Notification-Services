/**
 * User preferences service for notification opt-in/opt-out.
 * (Assumes a userPreferences collection in MongoDB)
 */
const { getDb } = require('../../../database/connection.js');

const COLLECTION = 'userPreferences';

/**
 * Get user preferences.
 */
async function getUserPreferences(userId) {
  const db = getDb();
  return db.collection(COLLECTION).findOne({ userId });
}

/**
 * Set user preferences.
 */
async function setUserPreferences(userId, preferences) {
  const db = getDb();
  await db.collection(COLLECTION).updateOne(
    { userId },
    { $set: { ...preferences } },
    { upsert: true }
  );
}

module.exports = {
  getUserPreferences,
  setUserPreferences,
};
