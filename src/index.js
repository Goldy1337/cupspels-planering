import React from 'react';
import ReactDOM from 'react-dom';
import './scss/style.scss';
import App from './App';
import * as serviceWorker from './serviceWorker';
import NewTeam from './components/NewTeam';

ReactDOM.render(
  <React.StrictMode>
    <App />
    <NewTeam></NewTeam>
  </React.StrictMode>,
  document.querySelector('#root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
