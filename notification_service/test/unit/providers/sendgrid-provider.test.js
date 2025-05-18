const sendgridProvider = require('../../../src/providers/email/resend-provider');

describe('SendGrid Provider', () => {
  it('should send an email successfully', async () => {
    // Mock SendGrid's API call if needed
    const result = await sendgridProvider.send({
      recipient: 'test@example.com',
      subject: 'Test',
      html: '<p>Hello</p>',
    });
    expect(result).toBeDefined();
    // Add more assertions based on your provider's implementation
  });
});
