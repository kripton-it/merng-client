import { useMutation } from '@apollo/client';
import React, { useContext, useState } from 'react';
import { Button, Form } from 'semantic-ui-react';

import FormField from '../consts/form-field';
import { loginInitialState } from '../consts/initial-state';
import { AuthContext } from '../context/auth';
import Route from '../consts/route';
import { LOGIN_USER_MUTATION } from '../graphql/user';
import { useForm } from '../util/hooks';

const Login = (props) => {
  const context = useContext(AuthContext);
  const { values, onChange, onSubmit } = useForm(loginInitialState, submitCallback);
  const [errors, setErrors] = useState({});
  const [loginUser, { loading }] = useMutation(LOGIN_USER_MUTATION, {
    update: (_proxy, { data: { login: userData } }) => {
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
    loginUser();
  }

  const hasErrors = Object.keys(errors).length > 0;

  return (
    <div className='form-container'>
      <Form onSubmit={onSubmit} noValidate className={loading ? 'loading' : ''}>
        <h1 className='page-title'>Login</h1>
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
          error={Boolean(errors[FormField.PASSWORD])}
          label='Password'
          name={FormField.PASSWORD}
          onChange={onChange}
          placeholder='Password...'
          type='password'
          value={values[FormField.PASSWORD]}
        />
        <Button type='submit' primary>Login</Button>
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

export default Login;