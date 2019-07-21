import {
    reqUpload
  } from '../services';
export default {
    namespace: 'uploadCase',
    state: {
        showModal:false,
        fileList:[],
        files:[]
        
    },
    effects: {
        *confirmUpload({ payload },{ call }) {
            // 在这里才发请求
            try{
                yield call(reqUpload,{ formData:payload.formData })

            }catch(err){

            }

        }
        
    },
    reducers: {
        updatePageReducer(state, { payload }) {
            return {
                ...state,
                ...payload,
            };
        },
        unmountReducer() {
            return {
                showModal:false,
                fileList:[],
                files:[]
               
            };
        },
    },
};
