import { configureStore } from '@reduxjs/toolkit'
import { createLogger } from "redux-logger";
import thunk from "redux-thunk";
import storage from "redux-persist/lib/storage";
import { persistReducer} from "redux-persist";
import reducer from "./reducers/rootReducer";

const persistConfig = {
  key: "root",
  storage
};

let middleware = [thunk]
if (process.env.NODE_ENV === "development") {
  const logger = createLogger({
    level: "info",
    collapsed: true,
  });
  middleware.push(logger);
}

const persistedReducer = persistReducer(persistConfig, reducer);

export default  configureStore({
  reducer: persistedReducer,
  middleware,
});