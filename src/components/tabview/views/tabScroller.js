import React from 'react';
const TabScroller=({condition,onScroll,obj,direction})=>{
    return condition?<div onClick={()=>onScroll(obj,direction)} className={['tab-scroller',
    direction=='left'?'tab-scroller-left icofont-circled-left':'tab-scroller-right icofont-circled-right'].join(' ')}></div>:null;
}
export default TabScroller