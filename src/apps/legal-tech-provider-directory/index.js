import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';  // Ensure the path is correct

if (typeof window !== 'undefined') {
  window.process = {
    env: { NODE_ENV: 'development' }
  };
}

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);
