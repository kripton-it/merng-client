
import React from 'react';
import { Link, useParams } from 'react-router-dom';
import { Button, Icon, Label } from 'semantic-ui-react';

import Popup from '../util/Popup';

const CommentButton = ({ commentPost, post: { commentsCount, id }, user }) => {
  const { postId } = useParams();

  const icon = (
    <Button basic color='blue'>
      <Icon name='comments' />
    </Button>
  );

  const label = (
    <Label basic color='blue' pointing='left'>
      {commentsCount}
    </Label>
  );

  if (postId) {
    const onClick = () => {
      if (user) {
        commentPost();
      }
    }

    return (
      <Popup content='Comment on post'>
        <Button as='div' labelPosition='right' onClick={onClick}>
          {icon}
          {label}
        </Button>
      </Popup>
    )
  }

  const postPath = `/posts/${id}`;

  return (
    <Popup content='Comment on post'>
      <Button as={Link} labelPosition='right' to={postPath}>
        {icon}
        {label}
      </Button>
    </Popup>
  )
};

export default CommentButton;
