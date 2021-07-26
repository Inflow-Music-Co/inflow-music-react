// import React from 'react';
// import ReactDOM from 'react-dom';
// import './index.css';
// import './style.css';
// import App from './App';
// import reportWebVitals from './reportWebVitals';
// import Header from './base/Header';
// import Sidebar from './base/Sidebar';
// import 'bootstrap/dist/css/bootstrap.min.css';

import React from "react";
import ReactDOM from "react-dom";
import reportWebVitals from "./reportWebVitals";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import { persistStore } from "redux-persist";

//Redux Store
import store from "./store/configureStore";
import App from "./App";
//style
import 'bootstrap/dist/css/bootstrap.min.css';
import './index.css';
import './style.css';

const persistor = persistStore(store);

ReactDOM.render(
  <Provider store={store}>
    <PersistGate persistor={persistor}>
        <App />
    </PersistGate>
  </Provider>,
  document.getElementById("root")
);

reportWebVitals();

