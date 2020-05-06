import { ApolloClient } from 'apollo-client';
import { InMemoryCache, NormalizedCacheObject } from 'apollo-cache-inmemory';
import { HttpLink } from 'apollo-link-http';
import { ApolloProvider, useQuery } from '@apollo/react-hooks';
import React from 'react';
import ReactDOM from 'react-dom';
import Pages from './pages';
import Login from './pages/login';
import gql from 'graphql-tag';
import GlobalStyle from './styles';
import { resolvers, typeDefs } from './resolvers';

const IS_LOGGED_IN = gql`
  query IsUserLoggedIn {
    isLoggedIn @client
  }
`;

function IsLoggedIn() {
  const { data } = useQuery(IS_LOGGED_IN);
  return data.isLoggedIn ? <Pages /> : <Login />;
}

const cache = new InMemoryCache();
const link = new HttpLink({
  uri: 'http://localhost:4000',
  headers: {
    authorization: window.localStorage.getItem('token'),
  },
});

const client: ApolloClient<NormalizedCacheObject> = new ApolloClient({
  cache,
  link,
  typeDefs,
  resolvers,
});

cache.writeData({
  data: {
    isLoggedIn: !!window.localStorage.getItem('token'),
    cartItems: [],
  },
});

ReactDOM.render(
  <div>
    <GlobalStyle />
    <ApolloProvider client={client}>
      <Pages />
    </ApolloProvider>
  </div>,
  document.getElementById('root')
);
