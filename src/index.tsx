import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './index.css';

window.onerror = (message) => {
  if (message.toString().includes("JSON") || message.toString().includes("SyntaxError")) {
    console.warn("Detected JSON corruption. Refreshing page...");
    setTimeout(() => {
      window.location.reload();
    }, 2000);
  }
};

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
