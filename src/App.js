import React, { useState } from "react";
import { AppRoutes } from "./route/AppRoutes";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import store from "./store/configureStore";
import { BrowserRouter as Router } from "react-router-dom";
import History from "./route/History";

import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider,
} from "@apollo/client";
import { useSelector } from "react-redux";
import Login from "./page/Login";
// const { store, persistor } = configureStore();
import Header from '../src/base/Header';
import Sidebar from '../src/base/Sidebar';
import { WalletProviderContext } from "./contexts/walletProviderContext";


function App() {
  const [walletProvider, setWalletProvider] = useState(null);

  // const clienturl = useSelector((state) => state.graphql.clienturl);
  const clienturl = 'https://api.thegraph.com/subgraphs/name/dmj16/panda2';

  const client = new ApolloClient({
    uri: clienturl,
    cache: new InMemoryCache()
  });

  console.log(client);
  
  return (
    <WalletProviderContext.Provider value={{ walletProvider, setWalletProvider}}>
      <ApolloProvider client={client}>
        <Router history={History}>
          <AppRoutes />
          <Login />
          <Header />
          <Sidebar />
          <div className="main-comman-wrapping">
            <AppRoutes />
          </div>
        </Router>
      </ApolloProvider>
    </WalletProviderContext.Provider>
  );
}

export default App;

