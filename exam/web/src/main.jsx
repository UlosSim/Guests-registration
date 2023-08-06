import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.jsx';
import './index.css';
import { AuthProvider } from 'react-auth-kit';

ReactDOM.createRoot(document.getElementById('root')).render(
  <AuthProvider
    authType={'cookie'}
    authName={'auth'}
    cookieDomain={window.location.hostname}
    cookieSecure
  >
    <React.StrictMode>
      <App />
    </React.StrictMode>
    ,
  </AuthProvider>
);
