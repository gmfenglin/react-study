import React from 'react';
import {
    Link
  } from 'react-router-dom';
 const Menu=({onNav})=>{
    return  <div className="panel-menu">
    <Link to="/b" onClick={()=> onNav("/b",2)}>
    B
    </Link>
    <div></div>
    <Link to="/c" onClick={()=> onNav("/c",3)}>
    C
    </Link>
    </div>
}
export default Menu