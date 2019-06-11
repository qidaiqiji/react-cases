/**
 * title: 手动上传
 */
import React, { PureComponent } from 'react';
import { connect } from 'dva';
import { Button, Modal, Icon, Upload } from 'antd';
@connect(state => ({
    manualUpload: state.manualUpload,
}))
class ManualUpload extends PureComponent{
    componentDidMount(){
    //   const { location } = this.props;
    }
    handleShowUploadModal=()=>{
      const { dispatch } = this.props;
      dispatch({
        type:'manualUpload/updatePageReducer',
        payload:{
          showModal:true,
        }
      })
    }
    handlePreview=(file)=>{
      const { dispatch } = this.props;
      dispatch({
          type:'manualUpload/updatePageReducer',
          payload:{
              previewModal:true,
              previewUrl:file.thumbUrl
          }
      })
    }
    handleCloseModal=type=>()=>{
      const { dispatch } = this.props;
      dispatch({
          type:'manualUpload/updatePageReducer',
          payload:{
              [type]:false,
          }
      })
    }
    handleConfirmUpload=()=>{
      const { dispatch, manualUpload } = this.props;
      const { fileList } = manualUpload;
      const formData = new FormData();
      fileList.forEach((file) => {
          formData.append('files[]', file);
      });
      dispatch({
          type:'manualUpload/confirmUpload',
          payload:{
              formData,
          }
      })
    }
    render(){
      const { 
        dispatch,
        manualUpload:{
          showModal,
          fileList,
          files,
          previewModal,
          previewUrl
        }
       } = this.props;
      const uploadButton = (
        <div>
            <Icon type='plus' />
            <div>上传图片</div>
            </div>
      );
      const props = {
        onRemove:(file)=>{
            const index = fileList.indexOf(file);
            const newFileList = fileList.slice();
            newFileList.splice(index, 1);
            dispatch({
                type:'manualUpload/updatePageReducer',
                payload:{
                    fileList: newFileList,
                    files: newFileList,
                }
            })
        },
        beforeUpload:(file)=>{
            // let count = [];
            let fileList = [];
            const reader = new FileReader();
            reader.readAsDataURL(file);
            reader.onload = e => {
                file.thumbUrl = e.target.result;
                files.push(file)
                // files.map((item,index)=>{
                //     if(file.name === item.name) {
                //         count.push(index);
                //         if(count.length>1) {
                //             message.error("文件已存在!");
                //             files.splice(index, 1); 
                //             return;
                //         }
                //     }
                // })
                dispatch({
                    type:'manualUpload/updatePageReducer',
                    payload:{
                        fileList: [...fileList,...files],
                    }
                })
            };
            return false;
        },
        onPreview:this.handlePreview,
        fileList:fileList,
        listType:"picture-card",
        multiple:true,
      }
      return <div>
            <Button type="primary" onClick={this.handleShowUploadModal}>点击上传</Button>
            <Modal
            visible={showModal}
            title="上传图片"
            onCancel={this.handleCloseModal('showModal')}
            onOk={this.handleConfirmUpload}
            >
              <Upload
              { ...props }
              >
                  {uploadButton}
              </Upload>
            </Modal>
            <Modal
            visible={previewModal}
            footer={null}
            onCancel={this.handleCloseModal('previewModal')}
            >
                <img style={{ width: '100%' }} src={previewUrl} alt="图片"/>
            </Modal>
      </div>
    }
  
  }
  
  export default ManualUpload;