const twilio = require('./twilio-provider.js');
const vonage = require('./vonage-provider.js');

const send = async ({ recipient, message }) => {
  const phone = recipient; // map to expected name

  if (!phone || !message) {
    console.error('❌ Missing phone or message:', { phone, message });
    return;
  }

  console.log(`📤 Sending SMS to ${phone}: ${message}`);

  try {
    await twilio.send({ recipient: phone, message });
  } catch (err) {
    console.warn('⚠️ Twilio failed, falling back to Vonage:', err.message);
    try {
      await vonage.send({ recipient: phone, message });
    } catch (err2) {
      console.error('❌ Vonage also failed:', err2.message);
    }
  }
};

module.exports = { send };
