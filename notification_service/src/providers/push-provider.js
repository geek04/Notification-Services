// src/providers/push-provider.js

async function sendPush({ recipient, message }) {
  console.log(`[Push] Notification sent to ${recipient}: ${message}`);
}

module.exports = sendPush;
