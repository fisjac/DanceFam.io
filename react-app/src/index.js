import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';

import App from './App';
import configureStore from './store';
import { ModalProvider } from './context/Modal/Modal';

import './index.css';
import { LocationProvider } from './context/Maps/MapsLoader';

const store = configureStore();

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <ModalProvider>
        <LocationProvider>
          <App />
        </LocationProvider>
      </ModalProvider>
    </Provider>
  </React.StrictMode>,
  document.getElementById('root')
);
