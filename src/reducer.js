import {combineReducers} from 'redux';
import tabviewReducers from './components/tabview/tabview.reducers.js';
const reducer=combineReducers({
    tabview:tabviewReducers
});
 export default reducer;