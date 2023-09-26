import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.scss';
import App from './App';
import QueryProvider from 'providers/query-provider';
import { BrowserRouter } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';
import AuthProvider from 'contexts/AuthProvider';
import { AlertProvider } from 'components';

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement);
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <HelmetProvider>
        <QueryProvider>
          <AuthProvider>
            <AlertProvider>
              <App />
            </AlertProvider>
          </AuthProvider>
        </QueryProvider>
      </HelmetProvider>
    </BrowserRouter>
  </React.StrictMode>
);
