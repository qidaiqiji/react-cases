/**
 * title: 手动上传
 */
import React, { PureComponent } from 'react';
import { connect } from 'dva';
@connect(state => ({
    manualUpload: state.manualUpload,
}))
class ManualUpload extends PureComponent{
    componentDidMount(){
    //   const { location } = this.props;
    }
    render(){
      return <div>
  
      </div>
    }
  
  }
  
  export default ManualUpload;