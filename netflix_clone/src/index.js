import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import MoviesProvider from './Provider/MoviesProvider';
import reportWebVitals from './reportWebVitals';

ReactDOM.render(
  <MoviesProvider>
  <React.StrictMode>
    <App />
  </React.StrictMode>
  </MoviesProvider>,
  document.getElementById('root')
);


reportWebVitals();
