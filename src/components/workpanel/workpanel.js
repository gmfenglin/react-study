import React from 'react';
import { withRouter } from 'react-router'
import TabView from '../tabview/tabview.js';
import './workpanel.css';
import {
   
    Route,
    Link
  } from 'react-router-dom';
import { connect } from 'react-redux'
// test code
function Ta(props){
    return <div>a</div>
}
function Tb(props){
    return <div>b</div>
}
function Tc(props){
    return <div>c</div>
}
/*
 
*/
class WorkPanel extends React.Component{
    componentDidMount(){
      
    }
    render(){
        return <div className="panel-container" >
            <div className="panel-top">top</div>
            <div className="panel-content">
                <div className="panel-menu">
                <Link to="/b" onClick={()=> this.props.addTab("/b",2)}>
                B
                </Link>
                <div></div>
                <Link to="/c" onClick={()=> this.props.addTab("/c",3)}>
                C
                </Link>
                </div>
                <div className="panel-work">
                <TabView >
                    <Route path="/a" component={Ta}/>
                    <Route path="/b" component={Tb}/>
                    <Route path="/c" component={Tc}/>
                </TabView>
                </div>
                
            </div>
           <div className="panel-footer">footer</div>
        </div>
    }
}
const mapStateToProps = (state) => {
    return {
        navItems: state.tabview.navItems
    }
  }
  function mapDispatchToProps(dispatch) {
      return {
          addTab(path,index){
            dispatch({
                type: 'ADD_TAB',
                navItem:{icon:"icofont-basket",path:path,title:"库存总览"+index,selected:false,key:"key5"+index}
            }); 
          }
    };
  }
export default withRouter(connect(mapStateToProps,mapDispatchToProps)(WorkPanel));