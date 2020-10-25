import React from 'react';
import { ApolloClient, ApolloProvider, createHttpLink, InMemoryCache } from '@apollo/client';
import { setContext } from 'apollo-link-context';

import App from './App';

const PORT = process.env.PORT || 5000;

const httpLink = createHttpLink({
  uri: `http://localhost:${PORT}`
});

const authLink = setContext(() => {
  const token = localStorage.getItem('authToken');
  return {
    headers: {
      Authorization: token ? `Bearer ${token}` : ''
    }
  }
});

const client = new ApolloClient({
  link: authLink.concat(httpLink),
  cache: new InMemoryCache()
});

export default () => (
  <ApolloProvider client={client}>
    <App />
  </ApolloProvider>
);