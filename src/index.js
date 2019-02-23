import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux'
import { createStore } from 'redux'
import WorkPanel from './components/workpanel/workpanel.js';
import TabView from './components/tabview/tabview.js';
import reducer from './reducer.js';
import {
    BrowserRouter as Router,Route
  } from 'react-router-dom';


let store = createStore(reducer);
// test code 
function Ta(props){
  return <div>a</div>
}
function Tb(props){
  return <div>b</div>
}
function Tc(props){
  return <div>c</div>
}
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