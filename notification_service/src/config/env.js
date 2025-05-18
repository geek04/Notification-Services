require('dotenv').config();

function getEnvVariable(key, fallback) {
  if (process.env[key]) return process.env[key];
  if (fallback !== undefined) return fallback;
  throw new Error(`Missing required env variable: ${key}`);
}

const config = {
  // General
  NODE_ENV: getEnvVariable('NODE_ENV', 'development'),
  PORT: parseInt(getEnvVariable('PORT', 3000), 10),
  DB_URL: getEnvVariable('DB_URL'),
  REDIS_URL: getEnvVariable('REDIS_URL'),
  KAFKA_BROKER: getEnvVariable('KAFKA_BROKER', 'localhost:9092'),
  WS_SERVER_URL: getEnvVariable('WS_SERVER_URL', 'http://localhost:3000'),

  // Email APIs
  MAILGUN_API_KEY: getEnvVariable('MAILGUN_API_KEY'),
  RESEND_API_KEY: getEnvVariable('RESEND_API_KEY'),
  RESEND_FROM_EMAIL: getEnvVariable('RESEND_FROM_EMAIL'),

  // SMS APIs
  TWILIO_SID: getEnvVariable('TWILIO_SID'),
  TWILIO_AUTH_TOKEN: getEnvVariable('TWILIO_AUTH_TOKEN'),
  TWILIO_PHONE: getEnvVariable('TWILIO_PHONE'),
  VONAGE_API_KEY: getEnvVariable('VONAGE_API_KEY'),
  VONAGE_API_SECRET: getEnvVariable('VONAGE_API_SECRET'),
  VONAGE_FROM: getEnvVariable('VONAGE_FROM', 'VonageTest'),

  // Firebase
  FIREBASE_PROJECT_ID: getEnvVariable('FIREBASE_PROJECT_ID'),
  FIREBASE_PRIVATE_KEY_ID: getEnvVariable('FIREBASE_PRIVATE_KEY_ID'),
  FIREBASE_PRIVATE_KEY: getEnvVariable('FIREBASE_PRIVATE_KEY'),
  FIREBASE_CLIENT_EMAIL: getEnvVariable('FIREBASE_CLIENT_EMAIL'),
  FIREBASE_CLIENT_ID: getEnvVariable('FIREBASE_CLIENT_ID'),
  FIREBASE_CLIENT_CERT_URL: getEnvVariable('FIREBASE_CLIENT_CERT_URL'),
};

// Debug print to confirm .env loaded properly
console.log('Loaded DB_URL:', config.DB_URL);

module.exports = config;
