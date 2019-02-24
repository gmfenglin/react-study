import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux'
import {WorkPanel} from './components/workpanel';
import store from './reducer.js';
import {routeList} from './routes/tabview.js'
import {
    BrowserRouter as Router,Route
  } from 'react-router-dom';

 
ReactDOM.render(
    <Provider store={store}>
      <Router >
      <WorkPanel routeList={routeList}>
                  
                </WorkPanel>
      </Router>
  </Provider>
    ,
document.getElementById("app")
);