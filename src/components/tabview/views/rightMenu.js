import React from 'react';
const RightMenu=({isShowRightMenu,menuData,onSelectedMeun})=>{
    return  isShowRightMenu?<div className="right-menu">
    <ul className="right-menu-ul">
        {
            menuData.map((item,index)=>{
               return <li className="right-menu-li" key={index}><a className="right-menu-a" onClick={(e)=>{
                    onSelectedMeun(item,index);
                }}>{item.text}</a></li>
            })
        }
        
    </ul>
</div>:null
}
export default RightMenu