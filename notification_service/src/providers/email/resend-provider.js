const { Resend } = require('resend');
const config = require('../../config/env.js');

const resend = new Resend(config.RESEND_API_KEY);

/**
 * Send an email using Resend.
 * @param {Object} params
 * @param {string} params.recipient
 * @param {string} params.subject
 * @param {string} params.html
 */
async function send({ recipient, subject, html }) {
  try {
    console.log('Resend API sending email:', { recipient, subject });
    await resend.emails.send({
      from: config.RESEND_FROM_EMAIL,
      to: recipient,
      subject,
      html,
    });
    console.log('✅ Resend API email sent successfully');
  } catch (err) {
    console.error('❌ Resend API error sending email:', err);
    throw err; // propagate error to upper layers
  }
}

module.exports = { send };
