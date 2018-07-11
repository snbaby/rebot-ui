import axios from 'axios';
import ElementUI from 'element-ui';

import {
  showFullScreenLoading,
  tryHideFullScreenLoading,
} from './axiosInitHelper';

axios.defaults.baseURL = 'http://soc.seadun.com:8765';
axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded';
axios.defaults.timeout = 10000;

// 请求拦截器
axios.interceptors.request.use(
  (config) => {
    showFullScreenLoading();
    return config;
  },
  error => Promise.reject(error)
  ,
);

// 响应拦截器
axios.interceptors.response.use(
  (response) => {
    tryHideFullScreenLoading();
    return response.data;
  },
  (error) => {
    const resp = error.response;
    let message = '';
    if (resp && Object.prototype.hasOwnProperty.call(resp, 'data')) {
      message = error.response.data.description;
    } else {
      message = '服务器或网络异常，请稍后重试！';
    }
    ElementUI.Notification.error({
      title: '错误',
      message: `请求错误,${message}`,
    });
    tryHideFullScreenLoading();
    return Promise.reject(error);
  },
);

export default {
  // get请求
  get(url, param) {
    return new Promise((resolve, reject) => {
      axios.get(url, {
        params: param,
      }).then((res) => {
        resolve(res);
      }).catch((err) => {
        reject(err);
      });
    });
  },
  // post请求
  post(url, param) {
    return new Promise((resolve, reject) => {
      axios.post(url, {
        data: param,
      }).then((res) => {
        resolve(res);
      }).catch((error) => {
        reject(error);
      });
    });
  },
};

