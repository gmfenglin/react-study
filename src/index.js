import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux'
import { createStore } from 'redux'
import TabView from './components/tabview/tabview.js';
import reducer from './reducer.js';
import {
    BrowserRouter as Router,
    Route,
    IndexRoute,
    Link
  } from 'react-router-dom';
const navItems=[{title:"test123",selected:false,key:"key"},{title:"test1234",selected:true,key:"key1"},{title:"test1235",selected:false,key:"key2"}];
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

let store = createStore(reducer);
// test code 
ReactDOM.render(
    <Provider store={store}>
   <Router >
    <TabView>
      <Route path="/a" component={Ta}/>
      <Route path="/b" component={Tb}/>
      <Route path="/c" component={Tc}/>
    </TabView>
  </Router>
  </Provider>
    ,
document.getElementById("app")
);