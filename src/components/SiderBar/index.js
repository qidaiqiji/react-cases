import React, { PureComponent } from 'react';
import styles from './index.less';
class SiderBar extends PureComponent {
    constructor(props){
        super(props);
        let routes = props.routes;
        routes.forEach(item=>{
            item.checked = false;
        })
        this.state={
            routes,
            path:props.path,
        }
    }
    componentDidMount(){
        this.state.routes.map(item=>{
            if(item.path === this.state.path) {
                return item.checked = true;
            }else{
                return item.checked = false;
            }
        })
        
    }
    render() {
        return (
            <div className={styles.siderbar}>
                <ul>
                    {
                        this.state.routes.map((item,index)=>(
                            <a 
                            href={item.path} 
                            key={index}
                            className={item.checked?styles.color:''}
                            >
                                <li style={{marginBottom:20}}>{item.title}</li>
                            </a>
                        ))
                    }
                </ul>
            </div>
        );
    }
}
export default SiderBar;