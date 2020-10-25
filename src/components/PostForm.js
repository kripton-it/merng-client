import { useMutation } from '@apollo/client';
import React from 'react';
import { Button, Form } from 'semantic-ui-react';

import FormField from '../consts/form-field';
import { postInitialState } from '../consts/initial-state';
import { CREATE_POST_MUTATION, GET_POSTS_QUERY } from '../graphql/post';
import { useForm } from '../util/hooks';

const PostForm = () => {
  const { values, onChange, onReset, onSubmit } = useForm(postInitialState, submitCallback);
  const [createPost, { error, loading }] = useMutation(CREATE_POST_MUTATION, {
    update: (proxy, { data: { createPost: post } }) => {
      const data = proxy.readQuery({ query: GET_POSTS_QUERY });
      proxy.writeQuery({
        query: GET_POSTS_QUERY,
        data: {
          ...data,
          getPosts: [post, ...data.getPosts]
        }
      });
      onReset();
    },
    variables: values
  });

  // very useful hoisting is using
  function submitCallback() {
    createPost();
  }

  return (
    <div>
      <Form onSubmit={onSubmit}>
        <h2>Create a post:</h2>
        <Form.Field>
          <Form.Input
            error={Boolean(error)}
            name='body'
            onChange={onChange}
            placeholder='Hi World!'
            value={values[FormField.BODY]}
          />
          <Button type='submit' color='teal'>
            Submit
          </Button>
        </Form.Field>
      </Form>
      {error && (
        <div className="ui error message" style={{ marginBottom: '1rem' }}>
          <ul className="list">
            <li>{error.graphQLErrors[0].message}</li>
          </ul>
        </div>
      )}
    </div>
  )
};

export default PostForm;
