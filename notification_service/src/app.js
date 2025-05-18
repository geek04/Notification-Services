const express = require('express');
const { collectDefaultMetrics, register } = require('prom-client');

// Middlewares
const loggingMiddleware = require('./middleware/logging-middleware.js');
const rateLimitMiddleware = require('./middleware/rate-limit-middleware.js');
const errorMiddleware = require('./middleware/error-middleware.js');
const authMiddleware = require('./middleware/auth-middleware.js');

// Routes
const notificationRoutes = require('./routes/notifications/notification-routes.js');
const userNotificationRoutes = require('./routes/users/user-notifications-routes.js');

const app = express();

// Body parser
app.use(express.json());

// Logging and rate limiting
app.use(loggingMiddleware);
app.use(rateLimitMiddleware);

// (Optional) Authentication
//app.use(authMiddleware); // Uncomment to protect all routes

// API Routes
app.use('/notifications', notificationRoutes);
app.use('/users', userNotificationRoutes);

// Prometheus metrics endpoint
collectDefaultMetrics();
app.get('/metrics', async (req, res) => {
  try {
    res.set('Content-Type', register.contentType);
    res.end(await register.metrics());
  } catch (err) {
    res.status(500).end(err);
  }
});

// Health check endpoint
app.get('/health', (req, res) => {
  res.json({ status: 'ok', uptime: process.uptime() });
});

// Error handling middleware (should be last)
app.use(errorMiddleware);

module.exports = app;
