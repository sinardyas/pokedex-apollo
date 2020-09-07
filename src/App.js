import React from 'react';
import './App.css';

import ApolloClient from 'apollo-boost';
import { ApolloProvider } from '@apollo/react-hooks';
import { InMemoryCache } from 'apollo-cache-inmemory'
import {Switch, Route, BrowserRouter} from 'react-router-dom'
import { Provider } from 'react-redux';

import { PokemonList, PokemonDetail } from './page';
import { Header } from './component';
import { store } from './shared/redux';

function App() {
  const client = new ApolloClient({
    uri: 'https://graphql-pokemon2.vercel.app/',
    cache: new InMemoryCache()
  });

  const AppRoutes = () => {
    return (
      <div>
        <BrowserRouter>
          <Header />
          <Switch>
            <Route exact path="/">
              <PokemonList />
            </Route>
            <Route path="/p/:id">
              <PokemonDetail />
            </Route>
          </Switch>
        </BrowserRouter>
      </div>
    )
  }

  return (
    <Provider store={store}>
      <ApolloProvider client={client}>
        <AppRoutes />
      </ApolloProvider>
    </Provider>
  );
}

export default App;
