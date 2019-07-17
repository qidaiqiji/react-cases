import fetch from 'dva/fetch';
import { notification } from 'antd';
/**
 * 根据 mode 改变请求 url 路径
 * @param {mode} 开发的模式 0 => 前端本地开发 1 => 生产环境/联调环境 2 => 测试环境
 */
export function getUrl(mode) {
  const urls = {
    mock: 'http://192.168.0.231:3000/mock/35',
    debug: 'http://erp.xiaomei360.com',
    t240: 'http://t240.erp.xiaomei360.com',
    t241: 'http://t241.erp.xiaomei360.com',
    t243: 'http://t243.erp.xiaomei360.com',
    t242: 'http://t242.erp.xiaomei360.com',
    test: 'http://test.erp.xiaomei360.com',   
    testerp: 'http://testerp.xiaomei360.com',
  };
  return urls[mode];
}
// const API_URL = getUrl(API_ENV);

async function checkStatus(response) {
  if (response.status >= 200 && response.status < 300) {
    return response;
  }

  const json = await response.json();
  notification.error({
    message: '错误提示',
    // message: `请求错误 ${response.status}: ${response.url}`,
    description: json.message,
  });
  // if (response.status === 401) {
  //   window.location.href = 'http://oa.xiaomei360.com/user/login';
  // }
  const error = new Error(response.statusText);
  error.response = response;

  throw error;
}

function checkResponse(responseJson) {
  if (responseJson.code === 0) {
    return responseJson;
  }
  notification.error({
    message: '错误提示',
    description: responseJson.msg,
  });
  const error = new Error(responseJson.msg);
  error.response = responseJson;
  throw error;
}
/**
 * Requests a URL, returning a promise.
 *
 * @param  {string} url       The URL we want to request
 * @param  {object} [options] The options we want to pass to "fetch"
 * @return {object}           An object containing either "data" or "err"
 */
export default function request(url, options = {}, isConveyToDev = false) {
  const defaultOptions = {
    credentials: 'include',
    headers: {
      authorization: `Basic ${window.btoa(`${localStorage.getItem('token')}:`)}`,
      Accept: 'application/json',
    },
    mode: 'cors',
  };
  const newOptions =  { ...defaultOptions, ...options };
  if (newOptions.method === 'POST' || newOptions.method === 'PUT') {
    console.log("ffgf",newOptions.body)
    if (!(newOptions.body instanceof FormData)) {
      console.log("22")
      newOptions.headers = {
        Accept: 'application/json',
        'Content-Type': 'application/json; charset=utf-8',
        ...newOptions.headers,
      };
      newOptions.body = JSON.stringify(newOptions.body);
    } else {
      console.log("11")
      // newOptions.body is FormData
      newOptions.headers = {
        Accept: 'application/json',
        ...newOptions.headers,
      };
    }
    // newOptions.body = JSON.stringify(newOptions.body);
  }
  return fetch(url, newOptions)
    .then(checkStatus)
    .then(response => response.json())
    .then(isConveyToDev ? res => res : checkResponse)
    // .then(responseJson => responseJson.data)
    .catch((error) => {
      console.log(error, error.code);
      // if (error.code) {
      //   notification.error({
      //     message: error.name,
      //     description: error.message,
      //   });
      // }
      // if ('stack' in error && 'message' in error) {
      //   notification.error({
      //     message: `请求错误: ${url}`,
      //     description: error.message,
      //   });
      // }
      throw error;
    });
}
