import Vue from 'vue';
import Router from 'vue-router';
import Login from '../views/common/Login';
import Rebot from '../views/common/Rebot';
import Overview from '../views/business/Overview';
import System from '../views/business/System';
import TemplateManager from '../views/business/TemplateManager';
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
        name: '系统配置管理',
        path: 'system',
        redirect: '/rebot/system/template_manager',
        component: System,
        children: [
          {
            name: '操作系统模板管理',
            path: 'template_manager',
            component: TemplateManager,
          },
        ],
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

