import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux'
import {WorkPanel} from './components/workpanel';
import store from './reducer.js';
import {
    BrowserRouter as Router,Route
  } from 'react-router-dom';

  //test code
function Ta(){
  return <div>a</div>
}
function Tb(){
  return <div>b</div>
}
function Tc(){
  return <div>c</div>
}
  //test code
const routes=[
  {path:"/a",component:Ta},
  {path:"/b",component:Tb},
  {path:"/c",component:Tc}
]
ReactDOM.render(
    <Provider store={store}>
      <Router >
      <WorkPanel routes={routes}>
                  
                </WorkPanel>
      </Router>
  </Provider>
    ,
document.getElementById("app")
);