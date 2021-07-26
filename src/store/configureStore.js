import { configureStore } from '@reduxjs/toolkit'
import thunk from "redux-thunk";
import storage from "redux-persist/lib/storage";
import { persistReducer} from "redux-persist";
import reducer from "./reducers/rootReducer";

const persistConfig = {
  key: "root",
  storage
};

const persistedReducer = persistReducer(persistConfig, reducer);

export default  configureStore({
  reducer: persistedReducer,
  middleware: [thunk],
});