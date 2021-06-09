import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
// Adding Router Wrapper to the APP
import { BrowserRouter } from 'react-router-dom';

ReactDOM.render(
  <BrowserRouter>
    <App />
  </BrowserRouter>,
  document.getElementById('root')
);

