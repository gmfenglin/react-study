import TabNavItem from './tabNavItem.js'
import React from 'react';
const TabNavContainer=({navItems,context,onClose,onSelected,onRightMenu})=>{
    return <div className="tab-wrap">
            <ul className="tabs">
                {navItems.map((navItem,index)=><TabNavItem path={navItem.path} icon={navItem.icon} index={index} onClose={onClose}
                 context={context} key={navItem.key} itemKey={navItem.key} onRightMenu={onRightMenu} onSelected={onSelected} title={navItem.title} selected={navItem.selected}/>)} 
            </ul>
        </div>
}
export default TabNavContainer