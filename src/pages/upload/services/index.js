// import { stringify } from 'qs';
import request from '@/utils/request';
export async function reqUpload(params) {
    return request('https://www.mocky.io/v2/5cc8019d300000980a055e76', {
      method: 'POST',
      body:params.formData
    });
  }