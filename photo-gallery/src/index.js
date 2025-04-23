import React from 'react';
import ReactDOM from 'react-dom/client'; // імпортуємо з 'react-dom/client'
import './index.css';
import App from './App';

// Для React 18 і новіших:
const root = ReactDOM.createRoot(document.getElementById('root')); // створюємо корінь
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
