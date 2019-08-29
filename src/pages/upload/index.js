/**
 * title: 手动上传
 */
import React, { PureComponent } from 'react';
import { connect } from 'dva';
import { Button, Modal } from 'antd';
import ManualUpload from '@/components/ManualUpload';
@connect(state => ({
    uploadCase: state.uploadCase,
}))
class UploadCase extends PureComponent{
  handleShowUploadModal=()=>{
    this.props.dispatch({
      type:'uploadCase/updatePageReducer',
      payload:{
        showModal:true,
      }
    })
  }
  handleCloseModal=()=>{
    this.props.dispatch({
      type:'uploadCase/updatePageReducer',
      payload:{
        showModal:false,
      }
    })
  }
  handleChangeFile=(files)=>{
    this.props.dispatch({
      type:'uploadCase/updatePageReducer',
      payload:{
        fileList:files,
      }
    })
  }
  handleConfirmUpload=()=>{
    const { dispatch, uploadCase } = this.props;
    const { fileList } = uploadCase;
    const formData = new FormData();
    fileList.forEach((file) => {
        formData.append('files[]', file);
    });
    dispatch({
        type:'uploadCase/confirmUpload',
        payload:{
            formData,
        }
    })
  }
    render(){
      const { 
        uploadCase:{
          showModal,
        }
       } = this.props;
      
      return <div>
            <Button type="primary" onClick={this.handleShowUploadModal}>点击上传</Button>
            <Modal
            visible={showModal}
            title="上传图片"
            onCancel={this.handleCloseModal}
            onOk={this.handleConfirmUpload}
            >
              <ManualUpload
              onChange={this.handleChangeFile}
              />
             
            </Modal>
      </div>
    }
  
  }
  
  export default UploadCase;