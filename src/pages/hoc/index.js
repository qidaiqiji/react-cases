/**
 * title: 高阶组件
 */
import React, { PureComponent } from 'react';
class HOC extends PureComponent{
    render(){
        // function welcome(username) {
        //     console.log('welcome ' + username);
        // }
        
        // function goodbye(username) {
        //     console.log('goodbye ' + username);
        // }
        // function study(username){
        //     console.log('study ' + username);
        // }

        // function wrapWithUsername(wrappedFunc) {
        //     let newFunc = () => {
        //         let username = localStorage.getItem('username');
        //         wrappedFunc(username);
        //     };
        //     return newFunc;
        // }
        // welcome = wrapWithUsername(welcome);
        // goodbye = wrapWithUsername(goodbye);
        // study = wrapWithUsername(study);
        // welcome();
        // goodbye();
        // study();
        return <div>
            <Welcome />
            <Goodbye />
        </div>
    }
}
class Welcome extends PureComponent {
    render() {
        return (
            <div>welcome {this.state.username}</div>
        )
    }
}
Welcome = wrapWithUsername(Welcome);
class Goodbye extends PureComponent {
    render() {
        return (
            <div>goodbye {this.state.username}</div>
        )
    }
}
export default (WrappedComponent) => {
    class NewComponent extends PureComponent {
        constructor() {
            super();
            this.state = {
                username: localStorage.getItem('username')
            }
        }

        componentWillMount() {
            let username = localStorage.getItem('username');
            this.setState({
                username: username
            })
        }

        render() {
            return <WrappedComponent username={this.state.username}/>
        }
    }

    return NewComponent
}
export default HOC;
