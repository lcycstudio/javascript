import React from 'react';
import ReactDOM from 'react-dom';
import { Router, Route, hashHistory, IndexRoute } from 'react-router';
import { ApolloProvider } from 'react-apollo';
import AppoloClient from 'apollo-client';

import App from './components/App';
import SongList from './components/SongList';
import SongCreate from './components/SongCreate';

const client = new AppoloClient({});

const Root = () => {
  return <ApolloProvider client={client}>
    <Router history={hashHistory}>
      <Route path="/" component={App}>
        <IndexRoute component={SongList} />
        <Route path="songs/new" component={SongCreate} />
      </Route>
    </Router>
  </ApolloProvider>
};

ReactDOM.render(
  <Root />,
  document.querySelector('#root')
);
