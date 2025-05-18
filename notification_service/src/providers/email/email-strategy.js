const resend = require('./resend-provider.js');
const mailgun = require('./mailgun-provider.js');
const { Resend } = require('resend');

/**
 * Try SendGrid first, fallback to Mailgun if SendGrid fails.
 * @param {Object} notification
 */
async function send(notification) {
  try {
    await resend.send(notification);
  } catch (err) {
    // Log error and fallback
    console.warn('SendGrid failed, falling back to Mailgun:', err.message);
    await mailgun.send(notification);
  }
}

module.exports = { send };
