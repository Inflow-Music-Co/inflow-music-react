/* eslint-disable */
import React, { useState } from "react";
import { AppRoutes } from "./route/AppRoutes";
import { BrowserRouter } from "react-router-dom";

import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider,
} from "@apollo/client";

// const { store, persistor } = configureStore();
import Header from '../src/base/Header';
import Sidebar from '../src/base/Sidebar';
import { WalletProviderContext } from "./contexts/walletProviderContext";


function App() {
  const [walletProvider, setWalletProvider] = useState(null);

  // const clienturl = useSelector((state) => state.graphql.clienturl);
  const clienturl = 'https://api.thegraph.com/subgraphs/name/itsjerryokolo/inflowmusic';

  const client = new ApolloClient({
    uri: clienturl,
    cache: new InMemoryCache()
  });
  
  return (
    <WalletProviderContext.Provider value={{ walletProvider, setWalletProvider}}>
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
    </WalletProviderContext.Provider>
  );
}

export default App;

