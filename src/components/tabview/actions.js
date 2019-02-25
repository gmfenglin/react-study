import {SELECTED_TAB,CLOSE_TAB,ADD_TAB,HOME_TAB,DIY_CLOSE_TAB} from './actionTypes.js';
export const selectedTab=(key)=>{
        return {
                type: SELECTED_TAB,
                key: key
        }
}
export const closeTab=(key,index)=>{
        return {
                type: CLOSE_TAB,
                key: key,
                index:index
        }  
}

export  const addTab=(navItem)=>{
        return {
                type: ADD_TAB,
                navItem:navItem
        }
  }
  export const homeTab=(path)=>{
          return {
               type:HOME_TAB,
               path:path   
          };
  }
  export const diyCloseTab=(item)=>{
        return {
                type:DIY_CLOSE_TAB,
                item:item   
           };
  }