import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';

//=== Added imports ===
import 'fontsource-roboto';
import { BrowserRouter } from 'react-router-dom';

ReactDOM.render(
  <BrowserRouter>
    <App />
  </BrowserRouter>,
  document.getElementById('root')
);

//AIzaSyD6tLxic9ggVs0iwnlvQ0U65QPr_NDgrzQ