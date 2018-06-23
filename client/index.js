import React from 'react';
<<<<<<< HEAD
import ReactDOM from 'react-dom';
import App from './components/App.jsx';

ReactDOM.render( < App / > , document.getElementById('app'));
=======
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import store from './store/index';
import App from './components/App';

render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('app')
);
>>>>>>> Added App.jsx and main index.js
