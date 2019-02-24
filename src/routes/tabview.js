import {
    Route,Switch
   } from 'react-router-dom';
   import React from 'react';
  import {Ta,Tb,Tc} from '../testdata/testdata.js'
const routeList=<Switch>
  <Route path="/home"  component={Ta}/>
                  <Route path="/b" exact component={Tb}/>
                  <Route path="/c" component={Tc}/>
</Switch>
export {routeList} ;