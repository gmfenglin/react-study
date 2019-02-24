import React from 'react';
import ReactDOM from 'react-dom';
import { connect } from 'react-redux'
import { withRouter } from 'react-router'
import {
   Route
  } from 'react-router-dom';

import Top from './top.js'
import Menu from './menu.js'
import Footer from './footer.js'
import {actions,TabView} from '../../tabview';
import axios from 'axios';
import './style.css'
class WorkPanel extends React.Component{
    componentDidMount(){
      axios.get("/api/user/list").then((response)=>{
        console.log(response);
      }).catch((error)=>{
        console.log(error);
      });
    }
    render(){
        const {addTab,routes}=this.props;
        return <div className="panel-container" >
            <Top />
            <div className="panel-content">
                <Menu onNav={addTab}/>
                <div className="panel-work">
                <TabView >
                    {routes.map((route)=>{
                         <Route path={route.path} component={route.component}/>
                    })}
                </TabView>
                </div>
                
            </div>
           <Footer/>
        </div>
    }
}
const mapStateToProps = (state) => {
    console.log(state)
    return {
        navItems: state.tabview.navItems
    }
  }
  const mapDispatchToProps=(dispatch)=> {
      const {addTab}=actions;
     
      return {
          addTab:(path,index)=>{
              let navItem={icon:"icofont-basket",path:path,title:"库存总览"+index,selected:false,key:"key5"+index};
            dispatch(addTab(navItem)); 
          }
    };
  }
export default withRouter(connect(mapStateToProps,mapDispatchToProps)(WorkPanel));