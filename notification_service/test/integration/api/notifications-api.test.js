const request = require('supertest');
const app = require('../../../src/app');

describe('Notifications API', () => {
  it('POST /notifications should queue a notification', async () => {
    const response = await request(app)
      .post('/notifications')
      .send({
        userId: 'user123',
        channel: 'email',
        subject: 'Hello',
        message: 'Test',
      });
    expect(response.status).toBe(202);
    expect(response.body.trackingId).toBeDefined();
  });
});
