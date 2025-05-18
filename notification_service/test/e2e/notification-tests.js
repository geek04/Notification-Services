const request = require('supertest');
const app = require('../../src/app');

describe('Notification Service E2E', () => {
  it('should create and retrieve a notification for a user', async () => {
    // Send a notification
    const sendRes = await request(app)
      .post('/notifications')
      .send({
        userId: 'e2e-user',
        channel: 'in-app',
        message: 'E2E Test!',
      });
    expect(sendRes.status).toBe(202);
    expect(sendRes.body.trackingId).toBeDefined();

    // Retrieve notifications for the user
    const getRes = await request(app)
      .get('/users/e2e-user/notifications');
    expect(getRes.status).toBe(200);
    expect(Array.isArray(getRes.body)).toBe(true);
    expect(getRes.body.some(n => n.message === 'E2E Test!')).toBe(true);
  });
});
