/**
 * Simple request logging middleware.
 * For production, use a logger like Winston or Morgan.
 */
function loggingMiddleware(req, res, next) {
  const start = Date.now();
  res.on('finish', () => {
    const duration = Date.now() - start;
    console.log(`[${req.method}] ${req.originalUrl} ${res.statusCode} - ${duration}ms`);
  });
  next();
}

module.exports = loggingMiddleware;
