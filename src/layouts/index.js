
import React, { PureComponent } from 'react';
// import withRouter from 'umi/withRouter';
import Hello from '../components/Hello';
import styles from './index.less';
import SiderBar from '../components/SiderBar'

class BasicLayout extends PureComponent{
  
  render(){
    const { route, location, children } = this.props;
    const path = location.pathname;
    return <div className={styles.container}>
        <SiderBar routes={route.routes} path={path}/>
        <div className={styles.caseContainer}>
          {
            path === "/"?<Hello></Hello>:children
          }
        </div>
    </div>
  }

}

export default BasicLayout;
