import React from 'react';
import ReactDOM from 'react-dom';
import { connect } from 'react-redux'
import { withRouter } from 'react-router'
import {
    Link
  } from 'react-router-dom';
import './tabview.css';
function TabScroller(props){
    return props.condition?<div onClick={()=>props.scroller(props.obj)} className={['tab-scroller',props.direction=='left'?'tab-scroller-left icofont-circled-left':'tab-scroller-right icofont-circled-right'].join(' ')}></div>:null;
}
function TabNavItem(props){
    if(props.selected){
        props.context.props.location.pathname=props.path;
    }
    return <li className={['tab-nav',props.selected?'tab-selected':''].join(' ')}>
                <Link to={props.path} className={['tab-inner',props.icon].join(' ')}  onClick={(e)=>{
                    props.clickFun(props.itemKey,props.context,e)
                }}>
                <span className="tab-title">{props.title}</span>
                </Link>
                {
                    props.itemKey=="home"?null:<a className="tab-close icofont-close-circled" onClick={(e)=>{
                        props.clickClose(props.itemKey,props.context,props.index,e)
                    }}></a>
                }
                
            </li>
}
function TabNavContainer(props){
    return <div className="tab-wrap">
            <ul className="tabs">
                {props.navItems.map((navItem,index)=><TabNavItem path={navItem.path} icon={navItem.icon} index={index} clickClose={props.clickClose} context={props.context} key={navItem.key} itemKey={navItem.key} clickFun={props.clickFun} title={navItem.title} selected={navItem.selected}/>)} 
            </ul>
        </div>
}
function TabContainer(props){
    return <div className="tab-container"> {props.header} {props.content}</div>
}
function TabContent(props){
    return  <div className="tab-content">{props.context.props.children}</div>
}
class TabView extends React.Component {
    constructor(props) {
        super(props);
       
       
        this.clickFun.bind(this);
        this.clickClose.bind(this);
        this.scrollLeft.bind(this);
        this.scrollRight.bind(this);
        this.scrollBy.bind(this);
      }
      clickClose(key,obj,index,e){
        obj.props.closeTab(key,index);
      }
      clickFun(key,obj,e){
        obj.props.selectedTab(key);
      }
      
        scrollLeft(obj){
			obj.scrollBy(100,obj);
		}
		scrollRight(obj){
			 obj.scrollBy(-100,obj);
		}
		scrollBy(deltaX,obj){
			document.querySelector('.tab-wrap').scrollLeft=Math.min(document.querySelector('.tab-wrap').scrollLeft + deltaX, ((document.querySelector('.tab-nav').clientWidth+4)*(obj.props.navItems.length+1)-document.querySelector('.tab-header').clientWidth));
					 
		}
      componentDidMount(){
          const that=this;
        window.addEventListener('resize', function(){
                  
                 
        });	
      }
    render() {
        const {navItems,scrollerCondition}=this.props;
        return <TabContainer header={<div className="tab-header">
        <TabScroller direction={"left"} condition={scrollerCondition} obj={this} scroller={this.scrollLeft}/>
        <TabScroller direction={"right"} condition={scrollerCondition} obj={this} scroller={this.scrollRight}/>
        <TabNavContainer navItems={navItems} context={this} clickClose={this.clickClose}clickFun={this.clickFun}/>
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
        scrollerCondition:isScorll(navItems.length)
    }
  }
  function mapDispatchToProps(dispatch) {
    return { selectedTab(key){
                dispatch({
                    type: 'SELECTED_TAB',
                    key: key
                });
            },
            closeTab(key,index,callback){
                dispatch({
                    type: 'CLOSE_TAB',
                    key: key,
                    index:index,
                    callback:callback
                }); 
            },
           
        }
  }
export default withRouter(connect(mapStateToProps,mapDispatchToProps)(TabView));