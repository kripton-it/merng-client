import gql from 'graphql-tag';

export const REGISTER_USER_MUTATION = gql`
  mutation Register(
    $username: String!,
    $email: String!,
    $password: String!,
    $confirmPassword: String!
  ) {
    register(
      registerInput: {
        username: $username
        email: $email
        password: $password
        confirmPassword: $confirmPassword
      }
    ) {
      id email username createdAt token
    }
  }
`;

export const LOGIN_USER_MUTATION = gql`
  mutation Login(
    $username: String!,
    $password: String!
  ) {
    login(username: $username, password: $password) {
      id email username createdAt token
    }
  }
`;