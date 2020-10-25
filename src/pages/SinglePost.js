import { useMutation, useQuery } from '@apollo/client';
import React, { useContext, useRef } from 'react';
import { Card, Form, Grid, Image } from 'semantic-ui-react';
import moment from 'moment';

import Route from '../consts/route';
import { commentInitialState } from '../consts/initial-state';
import { AuthContext } from '../context/auth';
import CommentButton from '../components/CommentButton';
import DeleteButton from '../components/DeleteButton';
import LikeButton from '../components/LikeButton';
import { CREATE_COMMENT_MUTATION, GET_POST_QUERY } from '../graphql/post';
import { useForm } from '../util/hooks';

const SinglePost = ({ history, match: { params: { postId } } }) => {
  const commentInputRef = useRef(null);
  const { values, onChange, onReset, onSubmit } = useForm(commentInitialState, createCommentCallback);
  const { user } = useContext(AuthContext);
  const { loading, data, error } = useQuery(GET_POST_QUERY, { variables: { postId } });
  const [createComment, { loading: createCommentLoading }] = useMutation(
    CREATE_COMMENT_MUTATION,
    {
      variables: { postId, ...values },
      update: () => {
        onReset();
        commentInputRef.current.blur();
      }
    }
  );

  // very useful hoisting is using
  function createCommentCallback() {
    createComment();
  }

  const commentPost = () => {
    commentInputRef.current.focus();
  }

  if (loading) return <p>Loading post...</p>;
  if (error) return <p>Something went wrong...</p>;
  const post = data.getPost;

  const { id, body, createdAt, username, comments, likes, commentsCount, likesCount } = post;
  const isUserAuthor = user && (username === user.username);

  const deletePostCallback = () => {
    history.push(Route.HOME);
  }

  return (
    <Grid>
      <Grid.Row>
        <Grid.Column width={2}>
          <Image
            floated='right'
            size='small'
            src='https://react.semantic-ui.com/images/avatar/large/molly.png'
          />
        </Grid.Column>
        <Grid.Column width={10}>
          <Card fluid>
            <Card.Content>
              <Card.Header>{username}</Card.Header>
              <Card.Meta>
                {moment(createdAt).fromNow()}
              </Card.Meta>
              <Card.Description>
                {body}
              </Card.Description>
            </Card.Content>
            <hr />
            <Card.Content extra>
              <LikeButton post={{ id, likes, likesCount, username }} user={user} />
              <CommentButton post={{ id, commentsCount }} user={user} commentPost={commentPost} />
              {isUserAuthor && <DeleteButton postId={id} callback={deletePostCallback} />}
            </Card.Content>
          </Card>
          {user && (
            <Card fluid>
              <Card.Content>
                <p>Post a comment:</p>
                <Form onSubmit={onSubmit}>
                  <div className='ui action input fluid'>
                    <input
                      name='body'
                      onChange={onChange}
                      placeholder='Comment...'
                      ref={commentInputRef}
                      type='text'
                      value={values.body}
                    />
                    <button
                      className='ui button teal'
                      disabled={values.body.trim() === '' || createCommentLoading}
                      type='submit'
                    >Submit</button>
                  </div>
                </Form>
              </Card.Content>
            </Card>
          )}
          {comments.map(comment => (
            <Card fluid key={comment.id}>
              <Card.Content>
                {user && user.username === comment.username && (
                  <DeleteButton postId={id} commentId={comment.id} />
                )}
                <Card.Header>{comment.username}</Card.Header>
                <Card.Meta>{moment(comment.createdAt).fromNow()}</Card.Meta>
                <Card.Description>{comment.body}</Card.Description>
              </Card.Content>
            </Card>
          ))}
        </Grid.Column>
      </Grid.Row>
    </Grid>
  )
};

export default SinglePost;
