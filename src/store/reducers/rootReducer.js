import { combineReducers } from '@reduxjs/toolkit';
import { persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';

import passwordSlice from './passwordSlice';
import authReducer from './authSlice';
import walletSlice from './walletSlice';
import appSlice from './appSlice';
import playlistSlice from './playlistSlice';
import videoSlice from './videoSlice';


const persistConfig = {
    key: 'root',
    storage
};

const rootReducer = combineReducers({
    auth: authReducer,
    wallet: walletSlice,
    app: appSlice,
    password: passwordSlice,
    playlist : playlistSlice,
    video: videoSlice
});

export default persistReducer(persistConfig, rootReducer);
