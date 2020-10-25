import { useMutation } from '@apollo/client';
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Button, Icon, Label } from 'semantic-ui-react';

import Route from '../consts/route';
import { LIKE_POST_MUTATION } from '../graphql/post';
import Popup from '../util/Popup';

const LikeButton = ({ post: { id, likes, likesCount, username }, user }) => {
  const [liked, setLiked] = useState(false);
  const [likePost, { loading }] = useMutation(
    LIKE_POST_MUTATION,
    { variables: { postId: id } }
  );

  useEffect(() => {
    if (user && likes.find(like => like.username === user.username)) {
      setLiked(true);
    } else {
      setLiked(false);
    }
  }, [user, likes]);

  const likeButton = user ? (
    <Button color='teal' basic={!liked}>
      <Icon name='heart' />
    </Button>
  ) : (
      <Button basic color='teal' as={Link} to={Route.LOGIN}>
        <Icon name='heart' />
      </Button>
    );

  const disabled = loading || (user && user.username === username);

  return (
    <Popup content={liked ? 'Unlike' : 'Like'}>
      <Button as='div' labelPosition='right' onClick={user && likePost} disabled={disabled}>
        {likeButton}
        <Label as='a' basic color='teal' pointing='left'>
          {likesCount}
        </Label>
      </Button>
    </Popup>
  );
};

export default LikeButton;
