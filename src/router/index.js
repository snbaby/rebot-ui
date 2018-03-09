import Vue from 'vue';
import Router from 'vue-router';
import Login from '@/views/common/Login';
import Rebot from '@/views/common/Rebot';
import Overview from '@/views/business/Overview';

Vue.use(Router);

export const constantRouterMap = [
  {
    path: '/',
    redirect: '/login',
    hidden: true,
  },
  {
    path: '/login',
    name: '登录页面',
    hidden: true,
    component: Login,
  },
  {
    path: '/rebot',
    name: '框架页面',
    hidden: false,
    component: Rebot,
    children: [
      {
        name: 'Overview',
        path: 'overview',
        meta: {
          title: 'overview',
          icon: 'el-icon-menu',
        },
        component: Overview,
      },
    ],
  },
];

export default new Router({
  routes: constantRouterMap,
});

