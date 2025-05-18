const Joi = require('joi');

/**
 * Joi schema for notification requests.
 */
const notificationSchema = Joi.object({
  userId: Joi.string().required(),
  channel: Joi.string().valid('email', 'sms', 'in-app').required(),
  message: Joi.string().min(1).required(),
  subject: Joi.string().when('channel', {
    is: 'email',
    then: Joi.required(),
    otherwise: Joi.optional(),
  }),
  html: Joi.string().when('channel', {
    is: 'email',
    then: Joi.optional(),
    otherwise: Joi.forbidden(),
  }),
});

/**
 * Express middleware for validating notification requests.
 */
function validateNotification(req, res, next) {
  const { error, value } = notificationSchema.validate(req.body, { abortEarly: false, stripUnknown: true });
  if (error) {
    return res.status(400).json({ error: error.details.map(d => d.message).join(', ') });
  }
  req.validatedData = value;
  next();
}

module.exports = { validateNotification };
