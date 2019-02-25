import React from 'react';
 const TabContainer=({rightMenu,header,content})=>{
    return <div className="tab-container"> {rightMenu}{header} {content}</div>
}
export default TabContainer