/**
 * @typedef {Object} Notification
 * @property {string} userId
 * @property {string} channel   // 'email', 'sms', 'in-app'
 * @property {string} status    // 'pending', 'sent', 'failed'
 * @property {Object} payload
 * @property {number} [retries]
 * @property {Date} [createdAt]
 */

/**
 * @typedef {Object} UserPreferences
 * @property {string} userId
 * @property {boolean} emailOptIn
 * @property {boolean} smsOptIn
 * @property {boolean} inAppOptIn
 */
