import React from 'react';
import ReactDOM from 'react-dom/client';
//import App from './apps/legal-tech-provider-directory/App';  // 
import App from './apps/law-firm-transparency-directory/App'; 
import reportWebVitals from "./reportWebVitals";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

reportWebVitals();