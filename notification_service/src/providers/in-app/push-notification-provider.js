const admin = require('firebase-admin');
const config = require('../../config/env.js');

if (!admin.apps.length) {
  admin.initializeApp({
    credential: admin.credential.cert({
      projectId: config.FIREBASE_PROJECT_ID,
      privateKeyId: config.FIREBASE_PRIVATE_KEY_ID,
      privateKey: config.FIREBASE_PRIVATE_KEY.replace(/\\n/g, '\n'),
      clientEmail: config.FIREBASE_CLIENT_EMAIL,
      clientId: config.FIREBASE_CLIENT_ID,
      authUri: "https://accounts.google.com/o/oauth2/auth",
      tokenUri: "https://oauth2.googleapis.com/token",
      authProviderX509CertUrl: "https://www.googleapis.com/oauth2/v1/certs",
      clientCertUrl: config.FIREBASE_CLIENT_CERT_URL,
    }),
  });
}

/**
 * Send a push notification via Firebase Cloud Messaging
 * @param {Object} param0
 * @param {string} param0.recipient - FCM device token
 * @param {string} param0.message - Notification message body
 */
async function send({ recipient, message }) {
  const payload = {
    notification: {
      title: 'Notification Service',
      body: message,
    },
    token: recipient,
  };

  try {
    await admin.messaging().send(payload);
    console.log(`[Push] Notification sent to ${recipient}`);
  } catch (err) {
    console.error('[Push] Error sending notification:', err.message);
  }
}

module.exports = { send };
