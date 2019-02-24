import React from 'react';
import {
    Link
  } from 'react-router-dom';
 const Menu=({onNav})=>{
    return  <div className="panel-menu">
     <Link to="/home" onClick={()=> onNav({ path:"/home",title:"首页",selected:true,key:"home",icon:"icofont-home"})}>
    A
    </Link>
    <div></div>
    <Link to="/b" onClick={()=> onNav({ path:"/b",title:"首页b",selected:true,key:"b",icon:"icofont-home"})}>
    B
    </Link>
    <div></div>
    <Link to="/c" onClick={()=> onNav({ path:"/c",title:"首页c",selected:true,key:"c",icon:"icofont-home"})}>
    C
    </Link>
    </div>
}
export default Menu