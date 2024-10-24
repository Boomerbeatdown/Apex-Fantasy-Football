// src/store/index.js

import { configureStore } from '@reduxjs/toolkit';
import rootReducer from './reducers'; // Ensure this path is correct

const store = configureStore({
    reducer: rootReducer, // Automatically includes thunk middleware
});

export default store;

import React from 'react';
import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';
import store from './store'; // Ensure your store is configured correctly
import App from './App';

const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
  <Provider store={store}>
    <App />
  </Provider>
);


