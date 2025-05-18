const notificationRepo = require('../../../database/repositories/notification-repository.js');
const notificationType = require('../../../core/notifications/enums/notification-type.enum.js');
const { EMAIL, SMS, IN_APP,PUSH } = notificationType;

const emailProvider = require('../../../providers/email/email-strategy.js');
const smsProvider = require('../../../providers/sms/sms-strategy.js');
const inAppProvider = require('../../../providers/in-app/websocket-provider.js');
const statusEnum = require('../enums/notification-status.enum.js');
const sendPush = require('../../../providers/push-provider');
/**
 * Sends a notification and logs it in the database.
 * Uses provider strategies for fallback.
 */
async function sendNotification({ userId, type, recipient, subject, message, html }) {
  console.log('sendNotification called with type:', type);

  // Check enums loaded properly
  if (!EMAIL || !SMS || !IN_APP || !PUSH) {
    console.error('🚨 Enums not loading:', { EMAIL, SMS, IN_APP });
    throw new Error('Enum import failed');
  }

  // Save notification as pending in DB
  const notification = {
    userId,
    type,
    status: statusEnum.PENDING,
    message,
    recipient,
  };
  const saved = await notificationRepo.createNotification(notification);

  try {
    switch (type) {
      case EMAIL:
        // Prepare email notification with wrapped message in <p> if html not provided
        const emailNotification = {
          recipient,
          subject,
          html: html || `<p>${message}</p>`,  // fallback to wrapping message in <p> if html is missing
        };
        console.log('About to send EMAIL notification:', emailNotification);
        await emailProvider.send(emailNotification);
        console.log('EMAIL send function completed');
        break;

      case SMS:
        console.log('About to send SMS notification:', { recipient, message });
        await smsProvider.send({ recipient, message });
        console.log('SMS send function completed');
        break;

      case IN_APP:
        console.log('About to send IN-APP notification:', { recipient, message });
        await inAppProvider.send({ recipient, message });
        console.log('IN-APP send function completed');
        break;
      case PUSH:
        console.log('About to send PUSH notification:', { recipient, message });
        await sendPush({ recipient, message });
        console.log('PUSH send function completed');
        break;

      default:
        throw new Error('Unknown notification type');
    }

    // Optionally update status to SENT after successful send
    // await notificationRepo.updateStatus(saved._id, statusEnum.SENT);

  } catch (err) {
    // Optionally update status to FAILED on error
    // await notificationRepo.updateStatus(saved._id, statusEnum.FAILED);
    console.error('Error processing notification:', err);
    throw err;
  }
}

module.exports = { sendNotification };
