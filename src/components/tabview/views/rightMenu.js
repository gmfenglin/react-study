import React from 'react';
const RightMenu=({obj,isShowRightMenu,onMouseLeave,menuData,onSelectedMeun,left,top})=>{
    return  <div className="right-menu" onMouseLeave={()=>{onMouseLeave(obj)}} style={{display:isShowRightMenu?"block":"none",left:left,top:top}}>
    <ul className="right-menu-ul">
        {
            menuData.map((item,index)=>{
               return <li className="right-menu-li" key={index}><a className="right-menu-a" onClick={(e)=>{
                    onSelectedMeun(obj,item,index);
                }}>{item.text}</a></li>
            })
        }
        
    </ul>
</div>
}
export default RightMenu