import { combineReducers } from "@reduxjs/toolkit";
import { persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";

import authReducer from "./authSlice";
import walletSlice from "./walletSlice";
import appSlice from "./appSlice";
import { createTransform } from 'redux-persist';
import JSOG from 'jsog'

export const JSOGTransform = createTransform(
  (inboundState, key) => JSOG.encode(inboundState),
  (outboundState, key) => JSOG.decode(outboundState),
)

const persistConfig = {
  key: "root",
  storage,
  transforms: [JSOGTransform]
};

const rootReducer = combineReducers({
  auth: authReducer,
  wallet: walletSlice,
  app: appSlice,
});

export default persistReducer(persistConfig, rootReducer);
