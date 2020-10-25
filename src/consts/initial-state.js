import FormField from './form-field';

export const loginInitialState = {
  [FormField.USERNAME]: '',
  [FormField.PASSWORD]: ''
};

export const registerInitialState = {
  ...loginInitialState,
  [FormField.EMAIL]: '',
  [FormField.CONFIRM_PASSWORD]: ''
};

export const postInitialState = {
  [FormField.BODY]: ''
};

export const commentInitialState = {
  [FormField.BODY]: ''
};