import { ApolloClient } from 'apollo-client';
import { InMemoryCache, NormalizedCacheObject } from 'apollo-cache-inmemory';
import { HttpLink } from 'apollo-link-http';
import { ApolloProvider } from '@apollo/react-hooks';
import React from 'react';
import ReactDOM from 'react-dom';
import Pages from './pages';
import GlobalStyle from './styles';

const cache = new InMemoryCache();
const link = new HttpLink({
  uri: 'http://localhost:4000',
});

const client: ApolloClient<NormalizedCacheObject> = new ApolloClient({
  cache,
  link,
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
