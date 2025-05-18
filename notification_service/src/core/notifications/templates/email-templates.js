/**
 * Email templates with dynamic variables.
 */
module.exports = {
  PASSWORD_RESET: ({ username, link }) => ({
    subject: 'Reset Your Password',
    html: `<p>Hello ${username},</p>
           <p>Click <a href="${link}">here</a> to reset your password.</p>`,
  }),
  WELCOME: ({ username }) => ({
    subject: 'Welcome!',
    html: `<p>Hi ${username}, welcome to our service!</p>`,
  }),
  // Add more templates as needed
};
