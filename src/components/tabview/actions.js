import {SELECTED_TAB,CLOSE_TAB,ADD_TAB} from './actionTypes.js';
export const selectedTab=(key)=>{
        return {
                type: SELECTED_TAB,
                key: key
        }
}
export const closeTab=(key,index,callback)=>{
        return {
                type: CLOSE_TAB,
                key: key,
                index:index,
                callback:callback
        }  
}

export  const addTab=(navItem)=>{
        return {
                type: ADD_TAB,
                navItem:navItem
        }
  }