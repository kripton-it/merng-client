import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { Card, Image } from 'semantic-ui-react';
import moment from 'moment';

import { AuthContext } from '../context/auth';
import CommentButton from './CommentButton';
import DeleteButton from './DeleteButton';
import LikeButton from './LikeButton';

const PostCard = ({ post: { body, createdAt, id, username, comments, likes, commentsCount, likesCount } }) => {
  const postPath = `/posts/${id}`;
  const { user } = useContext(AuthContext);
  const isUserAuthor = user && (username === user.username);

  return (
    <Card fluid>
      <Card.Content>
        <Image
          floated='right'
          size='mini'
          src='https://react.semantic-ui.com/images/avatar/large/molly.png'
        />
        <Card.Header>{username}</Card.Header>
        <Card.Meta as={Link} to={postPath}>
          {moment(createdAt).fromNow(true)}
        </Card.Meta>
        <Card.Description>
          {body}
        </Card.Description>
      </Card.Content>
      <Card.Content extra>
        <LikeButton post={{ id, likes, likesCount, username }} user={user} />
        <CommentButton post={{ id, commentsCount }} user={user} />
        {isUserAuthor && <DeleteButton postId={id} />}
      </Card.Content>
    </Card>
  )
};

export default PostCard;
