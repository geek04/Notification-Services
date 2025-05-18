require('dotenv').config();

module.exports = {
  // Mailgun
  MAILGUN_API_KEY: process.env.MAILGUN_API_KEY,
  MAILGUN_DOMAIN: process.env.MAILGUN_DOMAIN,
  MAILGUN_FROM: process.env.MAILGUN_FROM,

  // Twilio
  TWILIO_SID: process.env.TWILIO_SID,
  TWILIO_AUTH_TOKEN: process.env.TWILIO_AUTH_TOKEN,
  TWILIO_PHONE: process.env.TWILIO_PHONE,

  // Vonage
  VONAGE_API_KEY: process.env.VONAGE_API_KEY,
  VONAGE_API_SECRET: process.env.VONAGE_API_SECRET,
  VONAGE_FROM: process.env.VONAGE_FROM,

  // Redis
  REDIS_URL: process.env.REDIS_URL,

  // Add other env values if needed
};
