import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import store from './store';
import {Provider} from 'react-redux'


//Styles and Bootstrap styles
import './App.scss';

ReactDOM.render(
  <>
  <Provider store={store}>
    <React.StrictMode>
      <App/>
    </React.StrictMode>
  </Provider>
 
  </>,
  document.getElementById('root')
);


