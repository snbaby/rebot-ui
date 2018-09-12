import Vue from 'vue';
import Router from 'vue-router';
import Login from '../views/common/Login';
import Rebot from '../views/common/Rebot';
import Overview from '../views/business/Overview';
import System from '../views/business/System';
import Department from '../views/business/Department';
import Role from '../views/business/Role';
import User from '../views/business/User';
import Intelligent from '../views/business/Intelligent';
import InspectionRegistration from '../views/business/InspectionRegistration';
import EquipmentInspection from '../views/business/EquipmentInspection';
import DataExport from '../views/business/DataExport';

Vue.use(Router);

export const constantRouterMap = [
  {
    path: '/',
    redirect: '/login',
  },
  {
    path: '/login',
    name: '登录页面',
    component: Login,
  },
  {
    path: '/rebot',
    redirect: '/rebot/overview',
    name: '框架页面',
    component: Rebot,
    children: [
      {
        name: '综合看板',
        path: 'overview',
        component: Overview,
      },
      {
        name: '智能验机',
        path: 'intelligent',
        component: Intelligent,
        redirect: '/rebot/intelligent/inspection_registration',
        children: [
          {
            name: '验机登记',
            path: 'inspection_registration',
            component: InspectionRegistration,
          },
          {
            name: '设备验机',
            path: 'equipment_inspection',
            component: EquipmentInspection,
          },
          {
            name: '数据导出',
            path: 'data_export',
            component: DataExport,
          },
        ],
      },
      {
        name: '系统管理',
        path: 'system',
        component: System,
        redirect: '/rebot/system/department',
        children: [
          {
            name: '部门管理',
            path: 'department',
            component: Department,
          },
          {
            name: '角色管理',
            path: 'role',
            component: Role,
          },
          {
            name: '用户管理',
            path: 'user',
            component: User,
          },
          {
            name: '日志管理',
            path: 'log',
            component: DataExport,
          },
        ],
      },
    ],
  },
  {
    path: '*',
    redirect: '/rebot/overview',
  },
];

export default new Router({
  routes: constantRouterMap,
});

