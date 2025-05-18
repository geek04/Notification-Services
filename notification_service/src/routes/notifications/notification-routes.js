const express = require('express');
const { enqueueNotification } = require('../../queues/bullmq/queue-producer.js');
const { v4: uuidv4 } = require('uuid');

const router = express.Router();

router.post('/', async (req, res, next) => {
  try {
    const { userId, channel, message, phone, subject, html } = req.body;

    if (!userId || !channel || !message) {
      return res.status(400).json({ error: 'userId, channel, and message are required.' });
    }

    const type = channel.toLowerCase();
    let recipient;

    switch (type) {
      case 'email':
        recipient = userId; // email assumed in userId
        break;
      case 'sms':
        recipient = phone; // SMS uses phone number
        break;
      case 'in_app':
      case 'push':
        recipient = userId; // in-app and push use userId
        break;
      default:
        return res.status(400).json({ error: 'Invalid notification channel' });
    }

    const trackingId = uuidv4();

    await enqueueNotification({
      trackingId,
      userId,
      type,
      recipient,
      subject,
      message,
      html,
    });

    res.status(202).json({
      trackingId,
      statusUrl: `/notifications/status/${trackingId}`,
      message: 'Notification queued',
    });
  } catch (error) {
    next(error);
  }
});

module.exports = router;
