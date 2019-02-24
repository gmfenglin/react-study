import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux'
import WorkPanel from './components/workpanel/workpanel.js';
import store from './reducer.js';
import {
    BrowserRouter as Router,Route
  } from 'react-router-dom';

ReactDOM.render(
    <Provider store={store}>
      <Router >
      <WorkPanel >
                  
                </WorkPanel>
      </Router>
  </Provider>
    ,
document.getElementById("app")
);