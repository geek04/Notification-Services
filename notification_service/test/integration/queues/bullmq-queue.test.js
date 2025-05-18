const { enqueueNotification } = require('../../../src/queues/bullmq/queue-producer');

describe('BullMQ Queue', () => {
  it('should enqueue a job without error', async () => {
    const jobData = {
      userId: 'user123',
      channel: 'sms',
      message: 'Hello from queue!',
    };
    await expect(enqueueNotification(jobData)).resolves.not.toThrow();
  });
});
