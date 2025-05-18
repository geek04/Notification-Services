const formData = require('form-data');
const Mailgun = require('mailgun.js');
const config = require('../../config/env.js');

const mailgun = new Mailgun(formData);
const mg = mailgun.client({
  username: 'api',
  key: config.MAILGUN_API_KEY,
});

/**
 * Send an email using Mailgun.
 * @param {Object} params
 * @param {string} params.recipient
 * @param {string} params.subject
 * @param {string} params.html
 */
async function send({ recipient, subject, html }) {
  try {
    await mg.messages.create(config.MAILGUN_DOMAIN, {
      from: config.MAILGUN_FROM,
      to: [recipient],
      subject,
      html,
    });
    console.log('✅ Email sent successfully');
  } catch (err) {
    console.error('❌ Error sending email:', err);
  }
}

module.exports = { send };
