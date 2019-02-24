import {combineReducers,createStore} from 'redux';
import {reducer as tabviewReducers}  from './components/tabview';
const reducer=combineReducers({
    tabview:tabviewReducers
});
 export default createStore(reducer);