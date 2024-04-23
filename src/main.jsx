import React from 'react';
import ReactDOM from 'react-dom/client';

import { StyledEngineProvider } from '@mui/material/styles';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';

import { BrowserRouter } from 'react-router-dom';

import App from './components/App/App';

import './main.css';

import 'flowbite';

import { Provider } from 'react-redux';
import { store } from './features/store';

ReactDOM.createRoot(document.getElementById('root')).render(
  <Provider store={store}>
    <React.StrictMode>
      <StyledEngineProvider injectFirst>
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <BrowserRouter>
            <App />
          </BrowserRouter>
        </LocalizationProvider>
      </StyledEngineProvider>
    </React.StrictMode>
  </Provider>
);
