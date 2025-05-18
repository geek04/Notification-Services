# Notification Service - System Design
## Overview
This service provides a unified API for sending notifications via email, SMS, in-app (WebSocket), and push notifications. It supports queuing, user preferences, and is built for scalability and reliability.
---
## Architecture
**Key Components:**
- **API Layer:** Express.js REST API for sending and retrieving notifications.
- **Core Logic:** Handles notification creation, validation, and personalization.
- **Queue:** BullMQ (Redis-backed) for async processing and retries.
- **Providers:** Pluggable modules for email (SendGrid/Mailgun), SMS (Twilio/Plivo), in-app (WebSocket), and push (FCM).
- **Database:** MongoDB for storing notifications and user preferences.
- **WebSocket Server:** For real-time in-app notifications.
- **Scheduled Jobs:** For cleanup, retries, and maintenance.
- **Monitoring:** Prometheus and Grafana for metrics and dashboards.
---
## Notification Flow
1. **API Request:** Client sends a notification request to `/notifications`.
2. **Validation & Queuing:** Request is validated and queued (BullMQ).
3. **Worker:** Queue worker processes the job, checks user preferences, and sends via the appropriate provider.
4. **Provider:** Email/SMS/Push/WebSocket provider delivers the notification.
5. **Status Tracking:** Notification status is updated in MongoDB.
6. **User Retrieval:** User can fetch notifications via `/users/{userId}/notifications`.
---
## User Preferences
- Stored in MongoDB.
- Each user can opt in/out of channels (email, sms, in-app).
- Notification delivery respects these preferences.
---
## Reliability & Scalability
- **Queue:** Decouples API from providers, enables retries and scaling.
- **Providers:** Pluggable and can be extended.
- **Monitoring:** Metrics exposed at `/metrics` for Prometheus.
- **Health Checks:** `/health` endpoint for liveness/readiness probes.
---
## Security
- JWT-based authentication middleware (optional).
- Rate limiting and input validation to prevent abuse.
---
## Deployment
- Can run locally or in Docker/Kubernetes.
- Uses environment variables for configuration.
- Infrastructure as code provided in `infra/` and `docker/` folders.
---
## Future Improvements
- Add more channels (WhatsApp, Slack, etc.)
- Advanced scheduling and notification templates
- Multi-tenant support
---
