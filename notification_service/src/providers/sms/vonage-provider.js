const { Vonage } = require('@vonage/server-sdk');
const config = require('../../config/env.js');

const vonage = new Vonage({
  apiKey: config.VONAGE_API_KEY,
  apiSecret: config.VONAGE_API_SECRET,
});

/**
 * Send an SMS using Vonage.
 * @param {Object} params
 * @param {string} params.recipient - The recipient phone number
 * @param {string} params.message - The text message body
 */
async function send({ recipient, message }) {
  try {
    const response = await vonage.sms.send({
      to: recipient,
      from: config.VONAGE_FROM,
      text: message,
    });

    console.log('✅ SMS sent:', response);
    return response;
  } catch (err) {
    console.error('❌ Vonage SMS failed:', err.message);
    throw err; // <--- This is important!
  }
}

module.exports = { send };
