import React, { PureComponent } from 'react';
import Link from 'umi/link';
import styles from './index.less';
class SiderBar extends PureComponent {
    constructor(props){
        super(props);
        let routes = props.routes;
        routes.forEach(item=>{
            item.checked = false;
        })
        routes = routes.filter(item=>item.path !== undefined);
        this.state={
            routes,
            path:props.path,
        }
    }
    componentDidMount(){
    }
    handleCheckMenu(item,index){
        let tempRoute = this.state.routes;
        if(item.path === this.state.path) {
            tempRoute[index].checked = true;
        }else{
            tempRoute[index].checked = false;
        }
        this.setState({
            routes:tempRoute
        })
    }
    render() {
        
        return (
            <div className={styles.siderbar}>
                <ul>
                    {
                        this.state.routes.map((item,index)=>(
                            <div 
                            key={index}
                            className={item.checked?styles.color:''}
                            onClick={this.handleCheckMenu.bind(this,item,index)}
                            style={{cursor:'pointer'}}
                            >
                                <li style={{marginBottom:20}} ><Link to={item.path}>{item.title}</Link></li>
                            </div>
                        ))
                    }
                </ul>
            </div>
        );
    }
}
export default SiderBar;