import {
    Link
  } from 'react-router-dom';
  import React from 'react';
const TabNavItem=({selected,icon,title,context,path,itemKey,index,onSelected,onClose})=>{
    if(selected){
        context.props.location.pathname=path;
    }
    return <li className={['tab-nav',selected?'tab-selected':''].join(' ')}>
                <Link to={path} className={['tab-inner',icon].join(' ')}  onClick={(e)=>{
                    onSelected(itemKey,context,e)
                }}>
                <span className="tab-title">{title}</span>
                </Link>
                {
                    itemKey=="home"?null:<a className="tab-close icofont-close-circled" onClick={(e)=>{
                        onClose(itemKey,context,index,e)
                    }}></a>
                }
                
            </li>
}
export default TabNavItem