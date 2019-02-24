import {
    Route,Switch
   } from 'react-router-dom';
   import React from 'react';
  import Ta from '../testdata/ta.js'
  import Tb from '../testdata/tb.js'
  import Tc from '../testdata/tc.js'
const routeList=<Switch>
  <Route path="/home"  component={Ta}/>
                  <Route path="/b" exact component={Tb}/>
                  <Route path="/c" component={Tc}/>
</Switch>
export {routeList} ;