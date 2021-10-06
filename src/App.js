/* eslint-disable */
/* exported global_var */
import React, { useState, useEffect } from 'react';
import { AppRoutes } from './route/AppRoutes';
import { BrowserRouter as Router } from 'react-router-dom';
import './utils/axios';
import { ApolloClient, InMemoryCache, ApolloProvider } from '@apollo/client';
import { MuiThemeProvider, createTheme } from '@material-ui/core/styles';
import PasswordProtect from './component/PasswordProtect';
import { useSelector } from 'react-redux';
// const { store, persistor } = configureStore();
import Header from '../src/base/Header';
import Sidebar from '../src/base/Sidebar';
import { WalletProviderContext } from './contexts/walletProviderContext';

const theme = createTheme({
    palette: {
        secondary: {
            main: '#863ee3'
        }
    }
});

function App() {
    const [walletProvider, setWalletProvider] = useState(null);
    const [passwordUpdated, setPasswordUpdated] = useState(false)
    const correctPassword = useSelector((state) => state.password.passwordIs);
    
    console.log('password is ', correctPassword)
    
    const clienturl = 'https://api.studio.thegraph.com/query/6287/inflow-rinkeby/0.0.1';

    const client = new ApolloClient({
        uri: clienturl,
        cache: new InMemoryCache()
    });

    return (
        <MuiThemeProvider theme={theme}>
            <WalletProviderContext.Provider value={{ walletProvider, setWalletProvider }}>
                <ApolloProvider client={client}>
                    {correctPassword ? ( 
                        <Router>
                            <AppRoutes />
                        </Router>
                    ) : (
                        <PasswordProtect setPasswordUpdated={setPasswordUpdated}/>
                    )}
                </ApolloProvider>
            </WalletProviderContext.Provider>
        </MuiThemeProvider>
    );
}

export default App;
