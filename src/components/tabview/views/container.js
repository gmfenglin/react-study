import React from 'react';
import ReactDOM from 'react-dom';
import { connect } from 'react-redux'
import { withRouter } from 'react-router'
import TabContainer from './tabContainer.js'
import TabScroller from './tabScroller.js'
import TabNavContainer from './tabNavContainer.js'
import TabContent from './tabContent.js'
import {selectedTab,closeTab} from '../actions.js'
import './style.css'

class TabView extends React.Component {
    constructor(props) {
        super(props);
        this.onSelected.bind(this);
        this.onClose.bind(this);
        this.onScroll.bind(this);
      }
      onClose(key,obj,index,e){
        obj.props.onClose(key,index);
      }
      onSelected(key,obj,e){
        
        obj.props.onSelected(key);
      }
      onScroll(obj,deltax){
        document.querySelector('.tab-wrap').scrollLeft=Math.min(document.querySelector('.tab-wrap').scrollLeft + deltaX, ((document.querySelector('.tab-nav').clientWidth+4)*(obj.props.navItems.length+1)-document.querySelector('.tab-header').clientWidth));
      }
       
      componentDidMount(){
          const that=this;
        window.addEventListener('resize', function(){
                  
                 
        });	
      }
    render() {
        const {navItems,condition}=this.props;
        return <TabContainer header={<div className="tab-header">
        <TabScroller direction={"left"} condition={condition} obj={this} onScroll={this.onScroll}/>
        <TabScroller direction={"right"} condition={condition} obj={this} onScroll={this.onScroll}/>
        <TabNavContainer navItems={navItems} context={this} onClose={this.onClose} onSelected={this.onSelected}/>
    </div>} content={<TabContent context={this}/>}/>
    }
}
function  isScorll(newCount){
    let flag=false;
      if(document.querySelector('.tab-nav')==null){
         
          return flag;
      }
      flag=(document.querySelector('.tab-nav').clientWidth+4)*(newCount+1)>document.querySelector('.tab-header').clientWidth;
      if(!flag){
          document.querySelector('.tab-wrap').scrollLeft=0;
      }
      return flag;
     
  } 
const mapStateToProps = (state) => {
    const {navItems}=state.tabview;
    return {
        navItems,
        condition:isScorll(navItems.length)
    }
  }
  const mapDispatchToProps=(dispatch) =>{
    return { 
            onSelected:(key)=>{
                dispatch(selectedTab(key));
            },
            onClose:(key,index,callback)=>{
                dispatch(closeTab(key,index,callback)); 
            },
           
        }
  }
export default withRouter(connect(mapStateToProps,mapDispatchToProps)(TabView));