import React from 'react';
import ReactDOM from 'react-dom';
import { connect } from 'react-redux'
import { withRouter } from 'react-router'
import {
    Link
  } from 'react-router-dom';
import './tabview.css';
function TabScroller(props){
    return props.condition?<div className={['tab-scroller',props.direction=='left'?'tab-scroller-left icofont-circled-left':'tab-scroller-right icofont-circled-right'].join(' ')}></div>:null;
}
function TabNavItem(props){
    if(props.selected){
        props.context.location.pathname=props.path;
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
    console.log(props);
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
    return  <div className="tab-content">{props.context.children}</div>
}
class TabView extends React.Component {
    constructor(props) {
        super(props);
        console.log(this);
        this.state = {
            leftCondition:false,
            rightCondition:false, 
            
        };
        this.clickFun.bind(this);
        this.clickClose.bind(this);
      }
      clickClose(key,props,index,e){
        console.log(key+"--close");
        props.closeTab(key,index);
      }
      clickFun(key,props,e){
        props.selectedTab(key);
      }
    render() {
        const {leftCondition,rightCondition}=this.state;
        const {navItems}=this.props;
        return <TabContainer header={<div className="tab-header">
        <TabScroller direction={"left"} condition={leftCondition}/>
        <TabScroller direction={"right"} condition={rightCondition}/>
        <TabNavContainer navItems={navItems} context={this.props} clickClose={this.clickClose}clickFun={this.clickFun}/>
    </div>} content={<TabContent context={this.props}/>}/>
    }
}
const mapStateToProps = (state) => {
    return {
        navItems: state.tabview.navItems
    }
  }
  function mapDispatchToProps(dispatch) {
    return { selectedTab(key){
                dispatch({
                    type: 'SELECTED_TAB',
                    key: key
                });
            },
            closeTab(key,index){
                dispatch({
                    type: 'CLOSE_TAB',
                    key: key,
                    index:index
                }); 
            } 
        }
  }
export default withRouter(connect(mapStateToProps,mapDispatchToProps)(TabView));