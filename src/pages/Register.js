import { useMutation } from '@apollo/client';
import React, { useContext, useState } from 'react';
import { Button, Form } from 'semantic-ui-react';

import FormField from '../consts/form-field';
import { registerInitialState } from '../consts/initial-state';
import Route from '../consts/route';
import { AuthContext } from '../context/auth';
import { REGISTER_USER_MUTATION } from '../graphql/user';
import { useForm } from '../util/hooks';

const Register = (props) => {
  const context = useContext(AuthContext);
  const { values, onChange, onSubmit } = useForm(registerInitialState, submitCallback);
  const [errors, setErrors] = useState({});
  const [registerUser, { loading }] = useMutation(REGISTER_USER_MUTATION, {
    update: (_proxy, { data: { register: userData } }) => {
      context.login(userData);
      props.history.push(Route.HOME);
    },
    onError: err => {
      setErrors(err.graphQLErrors[0].extensions.exception.errors)
    },
    variables: values
  });

  // very useful hoisting is using
  function submitCallback() {
    registerUser();
  }

  const hasErrors = Object.keys(errors).length > 0;

  return (
    <div className='form-container'>
      <Form onSubmit={onSubmit} noValidate className={loading ? 'loading' : ''}>
        <h1 className='page-title'>Register</h1>
        <Form.Input
          error={Boolean(errors[FormField.USERNAME])}
          label='Username'
          name={FormField.USERNAME}
          onChange={onChange}
          placeholder='Username...'
          type='text'
          value={values[FormField.USERNAME]}
        />
        <Form.Input
          error={Boolean(errors[FormField.EMAIL])}
          label='Email'
          name={FormField.EMAIL}
          onChange={onChange}
          placeholder='Email...'
          type='text'
          value={values[FormField.EMAIL]}
        />
        <Form.Input
          error={Boolean(errors[FormField.PASSWORD])}
          label='Password'
          name={FormField.PASSWORD}
          onChange={onChange}
          placeholder='Password...'
          type='password'
          value={values[FormField.PASSWORD]}
        />
        <Form.Input
          error={Boolean(errors[FormField.CONFIRM_PASSWORD])}
          label='Confirm password'
          name={FormField.CONFIRM_PASSWORD}
          onChange={onChange}
          placeholder='Confirm password...'
          type='password'
          value={values[FormField.CONFIRM_PASSWORD]}
        />
        <Button type='submit' primary>Register</Button>
      </Form>
      {hasErrors && (
        <div className="ui error message">
          <ul className="list">
            {Object.values(errors).map(value => (
              <li key={value}>{value}</li>
            ))}
          </ul>
        </div>
      )}
    </div>
  )
};

export default Register;