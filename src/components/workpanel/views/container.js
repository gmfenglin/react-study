import React from 'react';
import ReactDOM from 'react-dom';
import { connect } from 'react-redux'
import { withRouter } from 'react-router'


import Top from './top.js'
import Menu from './menu.js'
import Footer from './footer.js'
import {actions,TabView} from '../../tabview';
import axios from 'axios';
import './style.css'
 
class WorkPanel extends React.Component{
    componentDidMount(){
      this.props.onHome("/home");
     
      
      axios.get("/api/user/list").then((response)=>{
        console.log(response);
      }).catch((error)=>{
        console.log(error);
      });
    }
    //,
    render(){
        const {addTab,routeList}=this.props;
        return <div className="panel-container" >
            <Top />
            <div className="panel-content">
                <Menu onNav={addTab}/>
                <div className="panel-work">
                <TabView >
                  {routeList}
                </TabView>
                </div>
                
            </div>
           <Footer/>
        </div>
    }
}
const mapStateToProps = (state) => {
    return {
        navItems: state.tabview.navItems
    }
  }
  const mapDispatchToProps=(dispatch)=> {
      const {addTab,homeTab}=actions;
     
      return {
          addTab:(navItem)=>{
            dispatch(addTab(navItem)); 
          },
          onHome:(path)=>{
            dispatch(homeTab(path));
        }
    };
  }
export default withRouter(connect(mapStateToProps,mapDispatchToProps)(WorkPanel));