import React from 'react';
import ReactDOM from 'react-dom';
import { Router, Route, hashHistory, IndexRoute } from 'react-router';
import AppoloClient from 'apollo-client';
import { ApolloProvider } from 'react-apollo';

import App from './components/App';


const client = new AppoloClient({
  dataIdFromObject: o => o.id
});


const Root = () => {
  return (
    <ApolloProvider client={client}>
      <Router history={hashHistory}>
        <Route path="/" component={App}>
        </Route>
      </Router>
    </ApolloProvider>
  );
};

ReactDOM.render(<Root />, document.querySelector('#root'));
