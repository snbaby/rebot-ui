// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
// 引入element
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import echarts from 'echarts';
import Vue from 'vue';
import App from './App';
import router from './router';
import '../static/framework.css';

Vue.config.productionTip = false;
Vue.prototype.$echarts = echarts;

// 引入mockjs
require('./mock.js');

Vue.use(ElementUI);

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>',
});
