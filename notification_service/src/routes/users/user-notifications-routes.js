const express = require('express');
const { validateUserNotificationsQuery } = require('./user-validators.js');
const notificationRepo = require('../../database/repositories/notification-repository.js');

const router = express.Router();

/**
 * GET /users/:userId/notifications
 * Get a user's notifications.
 */
router.get('/:userId/notifications', validateUserNotificationsQuery, async (req, res, next) => {
  try {
    const { userId } = req.params;
    const { limit, skip } = req.validatedQuery;
    const notifications = await notificationRepo.getUserNotifications(userId, { limit, skip });
    res.json(notifications);
  } catch (err) {
    next(err);
  }
});

module.exports = router;
