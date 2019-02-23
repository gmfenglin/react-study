const initialState={
    navItems:[
      { path:"/a",title:"首页",selected:true,key:"home",icon:"icofont-home"}
    ],
    indexSelected:1
};
function createReducer(initialState, handlers) {
    return function reducer(state = initialState, action) {
      if (handlers.hasOwnProperty(action.type)) {
        return handlers[action.type](state, action)
      } else {
        return state
      }
    }
  }


function updateObject(oldObject, newValues) {
    return Object.assign({}, oldObject, newValues);
}
  function updateItemInArray(array, itemId, updateItemCallback) {
    const updatedItems = array.map(item => {
        const updatedItem = updateItemCallback(item,itemId);
        return updatedItem;
    });

    return updatedItems;
}
  function selectedTab(state,action){
      let indexSelected=state.indexSelected;
      let count=0;
    const newState=updateItemInArray(state.navItems, action.key, (item,itemId )=> {
        if(item.key==itemId){
            indexSelected=count;
        }
        count++
        return updateObject(item, {selected : item.key==itemId});
    });
    return updateObject(state, {navItems : newState,indexSelected:indexSelected});
  }
  function closeTab(state,action){
      const {navItems,indexSelected}=state;
      const {key,index}=action;
      if(key=="home"||navItems.length<index){
        return state;
      }
      let selectedIndex=indexSelected;
      let newState=[];
     for(let i=0;i<navItems.length;i++){
        newState[i]=updateObject(navItems[i],{});
     }
      newState.splice(index,1);
      
      if(index==indexSelected){
				if(index!=0){
					selectedIndex=index-1;
					newState[index-1].selected=true;
				}else{
					if(newState.length>0){
						selectedIndex=0;
						newState[0].selected=true;
					}
				}
		}else{
				if(index<indexSelected){
					selectedIndex=indexSelected-1;
				}
    }
    return updateObject(state, {navItems : newState,indexSelected:selectedIndex});
  }
  function addTab(state,action){
    const {navItems}=state;
    const {navItem}=action;
    let flag=false;
    for(let i=0;i<navItems.length;i++){
      if(navItem.key==navItems[i].key){
        flag=true;
        break;
      }
    }
    if(flag){
      return selectedTab(state,{key:navItem.key});
    }else{
      let newState=[];
      for(let i=0;i<navItems.length;i++){
          newState[i]=updateObject(navItems[i],{selected:false});
      }
      navItem.selected=true;
      newState[newState.length]=navItem;
      return updateObject(state, {navItems : newState,indexSelected:newState.length-1});
    }
  }
export default createReducer(initialState,{
'SELECTED_TAB':selectedTab,
'CLOSE_TAB':closeTab,
'ADD_TAB':addTab

});