/**
 * Central error handler for Express.
 * Logs the error and sends a clean response to the client.
 */
const logger = require('./advanced-logger.js');

function errorHandler(err, req, res, next) {
  logger.error(err.stack || err.message);
  const status = err.status || 500;
  res.status(status).json({
    error: err.message || 'Internal Server Error',
    ...(process.env.NODE_ENV === 'development' && { stack: err.stack }),
  });
}

module.exports = errorHandler;
