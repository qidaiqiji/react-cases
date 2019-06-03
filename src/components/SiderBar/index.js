import React, { PureComponent } from 'react';
// import globalStyle from '@/assets/index.less';
// import PropTypes from 'prop-types';
import styles from './index.less';
class SiderBar extends PureComponent {
    render() {
        const { routes, path } = this.props;
        console.log("routes",routes,path)
        return (
            <div className={styles.siderbar}>
                <ul>
                    {
                        routes.map(item=>(
                            <a href={item.path}><li>{item.title}</li></a>
                        ))
                    }
                </ul>
            </div>
        );
    }
}
export default SiderBar;