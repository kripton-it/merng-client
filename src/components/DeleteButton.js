import { useMutation } from '@apollo/client';
import React, { useState } from 'react';
import { Button, Confirm, Icon } from 'semantic-ui-react';

import { DELETE_COMMENT_MUTATION, DELETE_POST_MUTATION, GET_POSTS_QUERY } from '../graphql/post';
import Popup from '../util/Popup';

const DeleteButton = ({ callback, postId, commentId }) => {
  const [confirmOpen, setConfirmOpen] = useState(false);
  const DELETE_MUTATION = commentId ? DELETE_COMMENT_MUTATION : DELETE_POST_MUTATION;

  const [deletePostOrComment, { loading }] = useMutation(
    DELETE_MUTATION,
    {
      variables: { postId, commentId },
      update: proxy => {
        onConfirmClose();
        if (callback) {
          callback();
        }
        if (commentId) return;
        const data = proxy.readQuery({ query: GET_POSTS_QUERY });
        proxy.writeQuery({
          query: GET_POSTS_QUERY,
          data: {
            ...data,
            getPosts: data.getPosts.filter(post => post.id !== postId)
          }
        });
      }
    }
  );

  const onConfirmOpen = () => {
    setConfirmOpen(true);
  };

  const onConfirmClose = () => {
    setConfirmOpen(false);
  };

  return (
    <>
      <Popup content={`Delete ${commentId ? 'comment' : 'post'}`}>
        <Button as='div' onClick={onConfirmOpen} color='red' floated='right' disabled={loading}>
          <Icon name='trash' style={{ marginRight: 0 }} />
        </Button>
      </Popup>
      <Confirm
        open={confirmOpen}
        onCancel={onConfirmClose}
        onConfirm={deletePostOrComment}
      />
    </>
  );
};

export default DeleteButton;
