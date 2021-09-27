import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import SearchBooks from './pages/SearchBooks';
import SavedBooks from './pages/SavedBooks';
import Navbar from './components/Navbar';
import { ApolloProvider } from '@apollo/client'
import ApolloClient from 'apollo-boost'
import {  
  ApolloProvider, 
  createHTTPLink,
  InMemoryCache  } from '@apollo/client';
import { setContext } from '@apollo/client/link/context';

const httpLink = createHTTPLink({
  uri:'/graphql'
})

const client = new ApolloClient({
  // uri: 'https://localhost:3001/graphql
  request: operation => {
    const token = localStorage.getItem('id_token');
    operation.setContext({
      headers: {
        authorization: token ? `Bearer ${token}` : ''
      }
    })
  },
  uri: '/graphql'
})

function App() {
  return (
    <Router>
      <>
        <Navbar />
        <Switch>
          <Route exact path='/' component={SearchBooks} />
          <Route exact path='/saved' component={SavedBooks} />
          <Route render={() => <h1 className='display-2'>Wrong page!</h1>} />
        </Switch>
      </>
    </Router>
  );
}

export default App;
