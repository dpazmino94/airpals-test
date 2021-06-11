import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';

//=== Added imports ===
import 'fontsource-roboto';
import { BrowserRouter } from 'react-router-dom';

ReactDOM.render(
  <BrowserRouter basename={process.env.PUBLIC_URL}>
    <App />
  </BrowserRouter>,
  document.getElementById('root')
);
