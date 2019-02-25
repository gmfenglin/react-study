import {SELECTED_TAB,CLOSE_TAB,ADD_TAB,HOME_TAB,DIY_CLOSE_TAB} from './actionTypes.js';


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
function homeTab(state,action){
  const {path}=action
  let newState=[];
      newState[newState.length]= { path:path,title:"首页",selected:true,key:"home",icon:"icofont-home"};
  return updateObject(state, {navItems : newState});
}

function diyCloseTab(state,action){
  const {navItems,indexSelected}=state;
  const {key,navKey,navIndex}=action.item;
  switch(key){
    case 'close':{
      return closeTab(state,{key:navKey,index:navIndex});
    }
    case 'closeLeft':{
      let newState=[];
      for(let i=0;i<navItems.length;i++){

          newState[i]=updateObject(navItems[i],{});
      }
      newState.splice(1,navIndex-1);
      let newSelectedIndex=0;
      for(let i=0;i<newState.length;i++){
        if(newState[i].selected){
          newSelectedIndex=i;
        }
      }
      if(newSelectedIndex==0){
        newState[1].selected=true;
        newSelectedIndex=1;
      }
      return updateObject(state, {navItems : newState,indexSelected:newSelectedIndex});
    }
    case 'closeRight':{
      let newState=[];
      for(let i=0;i<navItems.length;i++){

          newState[i]=updateObject(navItems[i],{});
      }
      newState.splice(navIndex+1,newState.length-1);
      let newSelectedIndex=0;
      for(let i=0;i<newState.length;i++){
        if(newState[i].selected){
          newSelectedIndex=i;
        }
      }
      if(newSelectedIndex==0){
        newState[newState.length-1].selected=true;
        newSelectedIndex=newState.length-1;
      }
      return updateObject(state, {navItems : newState,indexSelected:newSelectedIndex});
    }
    case 'closeOther':{
      let newState=[];
      for(let i=0;i<navItems.length;i++){

          newState[i]=updateObject(navItems[i],{});
      }
      if(navIndex==0){
        newState.splice(1,newState.length-1);
      }else{
        newState.splice(1,navIndex-1);
        newState.splice(2,newState.length-1);
      }
      
      let newSelectedIndex=0;
      for(let i=0;i<newState.length;i++){
        if(newState[i].selected){
          newSelectedIndex=i;
        }
      }
      if(newSelectedIndex==0){
        if(navIndex==0){
          newState[0].selected=true;
          newSelectedIndex=0;
        }else{
          newState[1].selected=true;
          newSelectedIndex=1;
        }
       
      }
      return updateObject(state, {navItems : newState,indexSelected:newSelectedIndex});
    }
    case 'closeAll':{
      let newState=[];
      for(let i=0;i<navItems.length;i++){

          newState[i]=updateObject(navItems[i],{});
      }
      newState.splice(1,newState.length-1);
     
      let newSelectedIndex=0;
      newState[0].selected=true;
      return updateObject(state, {navItems : newState,indexSelected:newSelectedIndex});
    }
  }
  return state;
}

export default(state={
  navItems:[
  ],
  indexSelected:1
},action)=>{
  switch(action.type){
    case SELECTED_TAB:{
      return selectedTab(state,action);
    }
    case CLOSE_TAB:{
      return closeTab(state,action);
    }
    case ADD_TAB:{
      return addTab(state,action);
    }
    case HOME_TAB:{
      return homeTab(state,action);
    }
    case DIY_CLOSE_TAB:{
      return diyCloseTab(state,action);
    }
    default:return state;
  }
}