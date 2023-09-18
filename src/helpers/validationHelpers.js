// Helper function for email validation using regex
export const validateEmail = email => {
  const emailPattern =
    /^([a-zA-Z0-9]+)([\-\_\.]*)([a-zA-Z0-9]*)([@])([a-zA-Z0-9]{2,})([\.][a-zA-Z]{2,3})$/;
  return emailPattern.test(email);
};
