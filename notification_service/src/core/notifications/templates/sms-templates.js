/**
 * SMS templates with dynamic variables.
 */
module.exports = {
  OTP: ({ otp }) => `Your OTP is ${otp}. Do not share it with anyone.`,
  ALERT: ({ message }) => `Alert: ${message}`,
  // Add more templates as needed
};
