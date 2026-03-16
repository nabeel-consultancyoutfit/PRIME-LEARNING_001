/**
 * Login form field configurations and validation messages
 */

export const LOGIN_VALIDATION_MESSAGES = {
  email: {
    required: 'Email is required',
    invalid: 'Please enter a valid email address',
  },
  password: {
    required: 'Password is required',
    minLength: 'Password must be at least 8 characters',
  },
};

export const LOGIN_FORM_LABELS = {
  email: 'Email Address',
  password: 'Password',
  rememberMe: 'Remember me',
  submit: 'Sign In',
  forgotPassword: 'Forgot password?',
  noAccount: "Don't have an account? ",
  register: 'Register',
};
