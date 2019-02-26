import React from 'react';
import ReactDOM from 'react-dom';
import { connect } from 'react-redux'
import { withRouter } from 'react-router'
import TabContainer from './tabContainer.js'
import TabScroller from './tabScroller.js'
import TabNavContainer from './tabNavContainer.js'
import TabContent from './tabContent.js'
import RightMenu from './rightMenu.js'
import {selectedTab,closeTab,homeTab,diyCloseTab} from '../actions.js'
import './style.css'
let navItemsFlag=false;
class TabView extends React.Component {
    constructor(props) {
        super(props);
        this.state={
          left:0,
          right:0,
          scrollFlag:false,
          isShowRightMenu:false,
          leftMenu:0,
          topMenu:0,
          menuData:[]
        }
        this.onSelected.bind(this);
        this.onClose.bind(this);
        this.onScroll.bind(this);
        this.onRightMenu.bind(this);
        this.onMouseLeave.bind(this);
      }
      onClose(key,obj,index,e){
        obj.props.onClose(key,index);
      }
      onSelected(key,obj,e){
        
        obj.props.onSelected(key);
      }
      onScroll(obj,direction){
        let eleArray= document.querySelectorAll('.tab-nav');

        let length=4;
      
        if(direction=='left'){
          for(let i=obj.state.left;i<eleArray.length;i++){
            length+=eleArray[i].clientWidth;
          }
        }else{
          for(let i=eleArray.length-obj.state.right-1;i>=0;i--){
            length+=eleArray[i].clientWidth;
          }
        }
    
       let flag=length>document.querySelector('.tab-header').clientWidth;
        if(flag || (obj.state.left>0 && direction=="right") || (obj.state.right>0 && direction=="left")){
          let tx=direction=='left'?eleArray[obj.state.left].clientWidth+4:-eleArray[obj.state.left-1].clientWidth-4;
          document.querySelector('.tab-wrap').scrollLeft+=tx;
          let left=direction=='left'?obj.state.left+1:obj.state.left-1<0?0:obj.state.left-1;
          let right=direction=='right'?obj.state.right+1:obj.state.right-1<0?0:obj.state.right-1;
          obj.setState({
            left,
            right
          });
        }
       
      }
      shouldComponentUpdate(nextProps,nextState){
        navItemsFlag=false;
        if(nextProps.navItems.length!=this.props.navItems.length){
          navItemsFlag=true;
          
        }
        return true;
      }
      componentDidUpdate(){
        if(navItemsFlag){
          const that=this;
          let flag=isScorll();
          that.setState({
            scrollFlag:isScorll()
          });
        }
      }
      componentDidMount(){
          const that=this;
          that.setState({
            scrollFlag:isScorll()
          });
        window.addEventListener('resize', function(){
          that.setState({
            scrollFlag:isScorll()
          });
        });	
      }
      onRightMenu(obj,itemKey,index){
        let eleArray= document.querySelectorAll('.tab-nav');
        let ele=eleArray[index];
        let menuData=[];
        if(index==0&& itemKey=='home'&&eleArray.length>1){
          menuData.push({text:"关闭其他",key:"closeOther",navKey:itemKey,navIndex:index});
        }else if(itemKey!='home'){
          if(index==1&&eleArray.length==2){
            menuData.push({text:"关闭",key:"close",navKey:itemKey,navIndex:index});
          }else{
            if(index==eleArray.length-1){
              menuData.push({text:"关闭",key:"close",navKey:itemKey,navIndex:index});
              menuData.push({text:"关闭左边",key:"closeLeft",navKey:itemKey,navIndex:index});
            }else{
              
              menuData.push({text:"关闭",key:"close",navKey:itemKey,navIndex:index});
              menuData.push({text:"关闭所有",key:"closeAll",navKey:itemKey,navIndex:index});
              if(index!=1){
                menuData.push({text:"关闭其他",key:"closeOther",navKey:itemKey,navIndex:index});
                menuData.push({text:"关闭左边",key:"closeLeft",navKey:itemKey,navIndex:index});
              }
              menuData.push({text:"关闭右边",key:"closeRight",navKey:itemKey,navIndex:index});
            }
          }
        }
        let scrollDistance=0;
        for(let i=0;i<obj.state.left;i++){
          scrollDistance+=eleArray[i].clientWidth+4;
        }
        obj.setState({
          isShowRightMenu:true,
          leftMenu:ele.offsetLeft+4-scrollDistance,
          topMenu:ele.offsetTop+25,
          menuData:menuData
        });
      }
      onMouseLeave(obj){
        obj.setState({
          isShowRightMenu:false
        });
      }
      onSelectedMeun(obj,item,index){
        obj.props.onDiyClose(item);
        obj.setState({
          isShowRightMenu:false
        });
      }
    render() {
        const {navItems}=this.props;
        const {scrollFlag,isShowRightMenu,leftMenu,topMenu,menuData}=this.state;
        return <TabContainer rightMenu={
          <RightMenu isShowRightMenu={isShowRightMenu} onMouseLeave={this.onMouseLeave} left={leftMenu} top={topMenu} obj={this} menuData={menuData} onSelectedMeun={this.onSelectedMeun}></RightMenu>
        } header={<div className="tab-header">
        
        <TabScroller direction={"left"} condition={scrollFlag} obj={this} onScroll={this.onScroll}/>
        <TabScroller direction={"right"} condition={scrollFlag} obj={this} onScroll={this.onScroll}/>
        <TabNavContainer navItems={navItems} context={this} onRightMenu={this.onRightMenu} onClose={this.onClose} onSelected={this.onSelected}/>
    </div>} content={<TabContent context={this}/>}/>
    }
}
function  isScorll(){
    let flag=false;
      if(document.querySelector('.tab-nav')==null){
         
          return flag;
      }
     let eleArray= document.querySelectorAll('.tab-nav');
     let length=4;
     for(let i=0;i<eleArray.length;i++){
        length+=eleArray[i].clientWidth;
     }
      flag=length>document.querySelector('.tab-header').clientWidth;
      if(!flag){
          document.querySelector('.tab-wrap').scrollLeft=0;
      }
      return flag;
     
  } 
const mapStateToProps = (state,ownerProps) => {
    const {navItems}=state.tabview;
    return {
        navItems
    }
  }
  const mapDispatchToProps=(dispatch) =>{
    return { 
            onSelected:(key)=>{
                dispatch(selectedTab(key));
            },
            onClose:(key,index)=>{
                dispatch(closeTab(key,index)); 
            },
            onHome:(path)=>{
                dispatch(homeTab(path));
            },
            onDiyClose:(item)=>{
              dispatch(diyCloseTab(item));
            }
           
        }
  }
export default withRouter(connect(mapStateToProps,mapDispatchToProps)(TabView));