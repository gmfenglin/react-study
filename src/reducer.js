import {combineReducers,createStore,compose,applyMiddleware } from 'redux';
import thunkMiddleware from 'redux-thunk';
import {reducer as tabviewReducers}  from './components/tabview';
const reducer=combineReducers({
    tabview:tabviewReducers
});
const win = window;

const middleware = [];
middleware.push(thunkMiddleware);
const reduxEnhancers = compose(
    applyMiddleware(...middleware),
    (win && win.devToolsExtension ? win.devToolsExtension() : f => f)
);

export default createStore(reducer, {}, reduxEnhancers)