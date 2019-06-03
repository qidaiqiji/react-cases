
import React, { PureComponent } from 'react';
// import withRouter from 'umi/withRouter';
// import { connect } from 'dva';
import SiderBar from '../components/SiderBar'

class BasicLayout extends PureComponent{
  // componentDidMount(){
  //   const { location, route } = this.props;
  // }
  
  render(){
    const { route, location } = this.props;
    const path = location.pathname;
    return <div>
        <SiderBar routes={route.routes} path={path}/>
    </div>
  }

}

export default BasicLayout;
