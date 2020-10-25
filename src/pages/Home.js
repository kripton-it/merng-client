import { useQuery } from '@apollo/client';
import React, { useContext } from 'react';
import { Grid, Transition } from 'semantic-ui-react';

import PostCard from '../components/PostCard';
import PostForm from '../components/PostForm';
import { AuthContext } from '../context/auth';
import { GET_POSTS_QUERY } from '../graphql/post';

const Home = () => {
  const { user } = useContext(AuthContext);
  const { loading, data } = useQuery(GET_POSTS_QUERY);
  const posts = (data && data.getPosts) || [];
  return (
    <Grid columns={3}>
      <Grid.Row>
        <h1 className='page-title'>Recent posts</h1>
      </Grid.Row>
      <Grid.Row>
        {user && (
          <Grid.Column style={{ marginBottom: '1rem'}}>
            <PostForm />
          </Grid.Column>
        )}
        {loading ? (
          <h1>Loading posts...</h1>
        ) : (
          <Transition.Group>
            {posts.map(post => (
              <Grid.Column key={post.id} style={{ marginBottom: '1rem'}}>
                <PostCard post={post} />
              </Grid.Column>
            ))}
          </Transition.Group>
        )}
      </Grid.Row>
    </Grid>
  )
};

export default Home;
