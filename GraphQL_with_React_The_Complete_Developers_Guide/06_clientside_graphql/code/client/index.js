import React from 'react';
import ReactDOM from 'react-dom';
import AppoloClient from 'apollo-client';
import { ApolloProvider } from 'react-apollo';
import SongList from './components/SongList';


const client = new AppoloClient({});

const Root = () => {
  return <ApolloProvider client={client}>
    <SongList />
  </ApolloProvider>
};

ReactDOM.render(
  <Root />,
  document.querySelector('#root')
);
