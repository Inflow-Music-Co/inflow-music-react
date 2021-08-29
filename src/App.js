/* eslint-disable */
import React, { useState } from "react";
import { AppRoutes } from "./route/AppRoutes";
import { BrowserRouter } from "react-router-dom";
import { Web3ReactProvider, useWeb3React, UnsupportedChainIdError } from '@web3-react/core'
import { Web3Provider } from '@ethersproject/providers'

import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider,
} from "@apollo/client";

// const { store, persistor } = configureStore();
import Header from '../src/base/Header';
import Sidebar from '../src/base/Sidebar';
import { WalletProviderContext } from "./contexts/walletProviderContext";

function getLibrary(provider) {
  var library

  if (provider/* && provider.chainType === 'hmy'*/ && provider.chainId === 4) {
    library = provider.blockchain
  } else {
    library = new Web3Provider(provider)
    library.pollingInterval = 12000
  }

  return library
}

function App() {
  // const clienturl = useSelector((state) => state.graphql.clienturl);
  const clienturl = 'https://api.studio.thegraph.com/query/6287/inflow-rinkeby/0.0.1';

  const client = new ApolloClient({
    uri: clienturl,
    cache: new InMemoryCache()
  });
  
  return (
    <Web3ReactProvider getLibrary={getLibrary}>
      <ApolloProvider client={client}>
        <BrowserRouter>
          <AppRoutes />
          <Header />
          <Sidebar />
          {/* <div className="main-comman-wrapping">
            <AppRoutes />
          </div> */}
        </BrowserRouter>
      </ApolloProvider>
    </Web3ReactProvider>
  );
}

export default App;

