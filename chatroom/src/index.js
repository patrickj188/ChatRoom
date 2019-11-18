import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from "react-redux";
import App from './components/app/App';
import configureStore from './config/configureStore';
import './index.css';

const store = configureStore();

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>, document.querySelector("#root")
);
