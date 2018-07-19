import axios from 'axios';
import ElementUI from 'element-ui';

import {
  showFullScreenLoading,
  tryHideFullScreenLoading,
} from './axiosInitHelper';

axios.defaults.baseURL = 'http://soc.seadun.com:8765';
axios.defaults.withCredentials = true;
axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded';
axios.defaults.timeout = 60000;

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
      if (resp.data.code === 'USER_NOT_LOGIN_EXCEPTION') {
        ElementUI.Message.error('请重新登录');
        tryHideFullScreenLoading();
        setTimeout(() => {
          window.location.href = '/login';
        }, 2000);
        return Promise.reject(error);
      }
    }

    if (resp && Object.prototype.hasOwnProperty.call(resp, 'data')) {
      message = resp.data.description;
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
  post(url, data) {
    return new Promise((resolve, reject) => {
      axios.post(url, data).then((res) => {
        resolve(res);
      }).catch((error) => {
        reject(error);
      });
    });
  },
  // put请求
  put(url, data) {
    return new Promise((resolve, reject) => {
      axios.put(url, data).then((res) => {
        resolve(res);
      }).catch((error) => {
        reject(error);
      });
    });
  },
};

