import gql from 'graphql-tag';

export const GET_POSTS_QUERY = gql`
  query {
    getPosts {
      id
      body
      createdAt
      username
      comments {
        id
        body
        createdAt
        username
      }
      commentsCount
      likes {
        username
      }
      likesCount
    }
  }
`;

export const GET_POST_QUERY = gql`
  query($postId: ID!) {
    getPost(postId: $postId) {
      id
      body
      createdAt
      username
      comments {
        id
        body
        createdAt
        username
      }
      commentsCount
      likes {
        username
      }
      likesCount
    }
  }
`;

export const CREATE_POST_MUTATION = gql`
  mutation CreatePost($body: String!) {
    createPost(body: $body) {
      id username createdAt body commentsCount likesCount
      likes {
        id username createdAt
      }
      comments {
        id username createdAt body
      }
    }
  }
`;

export const LIKE_POST_MUTATION = gql`
  mutation LikePost($postId: ID!) {
    likePost(postId: $postId) {
      id
      likesCount
      likes {
        id username
      }
    }
  }
`;

export const DELETE_POST_MUTATION = gql`
  mutation DeletePost($postId: ID!) {
    deletePost(postId: $postId)
  }
`;

export const DELETE_COMMENT_MUTATION = gql`
  mutation DeleteComment($postId: ID!, $commentId: ID!) {
    deleteComment(postId: $postId, commentId: $commentId) {
      id
      commentsCount
      comments {
        id username body createdAt
      }
    }
  }
`;

export const CREATE_COMMENT_MUTATION = gql`
  mutation CreateComment($postId: ID!, $body: String!) {
    createComment(postId: $postId, body: $body) {
      id
      commentsCount
      comments {
        id username body createdAt
      }
    }
  }
`;