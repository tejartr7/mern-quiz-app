import React from 'react';
import ReactDOM from 'react-dom';
import '../src/styles/index.css' // Import your CSS file (assuming it's in the same directory as index.js)
import App from './App';
import store from './redux/store'; // Import the Redux store, not rootReducer
import { Provider } from 'react-redux';
import { SnackbarProvider } from 'notistack';
ReactDOM.render(
  <Provider store={store}>
    <SnackbarProvider maxSnack={3}>
      <App />
    </SnackbarProvider>
  </Provider>,
  document.getElementById('root')
);
