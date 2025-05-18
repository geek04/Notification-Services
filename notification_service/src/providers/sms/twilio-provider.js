const twilio = require('twilio');
const config = require('../../config/env.js');

const client = twilio(config.TWILIO_SID, config.TWILIO_AUTH_TOKEN);

/**
 * Send an SMS using Twilio.
 * @param {Object} params
 * @param {string} params.recipient - The phone number to send the message to
 * @param {string} params.message - The message body
 */
async function send({ recipient, message }) {
  try {
    const response = await client.messages.create({
      body: message,
      to: recipient,
      from: config.TWILIO_PHONE,
    });

    console.log('✅ SMS sent successfully:', response.sid);
    return response;
  } catch (err) {
    console.error('❌ Failed to send SMS:', err.message);
    throw err; // <--- This is important!
  }
}

module.exports = { send };
