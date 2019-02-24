import React from 'react';
const TabContent=({context})=>{
    return  <div className="tab-content">{context.props.children}</div>
}
export default TabContent