const Joi = require('joi');

/**
 * Joi schema for user notification query.
 */
const userNotificationsQuerySchema = Joi.object({
  limit: Joi.number().integer().min(1).max(100).default(20),
  skip: Joi.number().integer().min(0).default(0),
});

/**
 * Middleware to validate query params for user notifications.
 */
function validateUserNotificationsQuery(req, res, next) {
  const { error, value } = userNotificationsQuerySchema.validate(req.query, { abortEarly: false, stripUnknown: true });
  if (error) {
    return res.status(400).json({ error: error.details.map(d => d.message).join(', ') });
  }
  req.validatedQuery = value;
  next();
}

module.exports = { validateUserNotificationsQuery };
