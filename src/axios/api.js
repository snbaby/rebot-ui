import axios from 'axios';
import { Notification } from 'element-ui';

import {
  showFullScreenLoading,
  tryHideFullScreenLoading,
} from './axiosInitHelper';

axios.defaults.baseURL = 'http://soc.seadun.com:8765'
axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded';
axios.defaults.timeout = 10000;

// 请求拦截器
axios.interceptors.request.use(
  (config) => {
    if (config.showLoading) {
      showFullScreenLoading();
    }
    return config;
  },
  (error) => {
    Notification({
      title: '成功',
      message: '这是一条成功的提示消息',
      type: 'success'
    });
    console.log(error);
    Promise.reject(error);
  },
);

// 响应拦截器
axios.interceptors.response.use(
  (response) => {
    if (response.config.showLoading) {
      tryHideFullScreenLoading();
    }
    return response;
  },
  (error) => {
    console.log(error);
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

