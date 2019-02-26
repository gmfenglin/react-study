import {
    Link
  } from 'react-router-dom';
  import React from 'react';
const TabNavItem=({selected,icon,title,context,path,itemKey,index,onSelected,onClose,onRightMenu})=>{
    if(selected){
        context.props.location.pathname=path;
    }
    return <li className={['tab-nav',selected?'tab-selected':''].join(' ')}>
                <Link to={path} className={['tab-inner',icon].join(' ')} onContextMenu={(e)=>{
                    e.preventDefault();
                    onRightMenu(context,itemKey,index);
                }} onClick={(e)=>{
                   if(e.nativeEvent.target.className.indexOf('tab-close')==-1){
                    onSelected(itemKey,context,e)
                   }
                   
                }}>
                <span className="tab-title">{title}</span>
                {
                    itemKey=="home"?null:<span className="tab-close icofont-close-circled" onClick={(e)=>{
                        onClose(itemKey,context,index,e);
                       
                    }}></span>
                }
                </Link>
                
                
            </li>
}
export default TabNavItem