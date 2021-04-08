import layoutHeaderAside from '@/layout/header-aside';
import util from '@/libs/util';

// 由于懒加载页面太多的话会造成webpack热更新太慢，所以开发环境不使用懒加载，只有生产环境使用懒加载
const _import = require('@/libs/util.import.' + process.env.NODE_ENV);

/**
 * 在主框架内显示
 */
const frameIn = [
  {
    path: '/',
    redirect: { name: 'index' },
    component: layoutHeaderAside,
    children: [
      // 首页
      {
        path: 'index',
        name: 'index',
        meta: {
          auth: true,
        },
        component: _import('system/index'),
      },
      // 演示页面
      {
        path: 'page1',
        name: 'page1',
        meta: {
          title: '页面 1',
          auth: true,
        },
        component: _import('demo/page1'),
      },
      {
        path: 'page2',
        name: 'page2',
        meta: {
          title: '页面 2',
          auth: true,
        },
        component: _import('demo/page2'),
      },
      {
        path: 'page3',
        name: 'page3',
        meta: {
          title: '页面 3',
          auth: true,
        },
        component: _import('demo/page3'),
      },
      // 系统 前端日志
      {
        path: 'log',
        name: 'log',
        meta: {
          title: '前端日志',
          auth: true,
        },
        component: _import('system/log'),
      },
      // 刷新页面 必须保留
      {
        path: 'refresh',
        name: 'refresh',
        hidden: true,
        component: _import('system/function/refresh'),
      },
      // 页面重定向 必须保留
      {
        path: 'redirect/:route*',
        name: 'redirect',
        hidden: true,
        component: _import('system/function/redirect'),
      },

      // 模板管理
      {
        path: 'template',
        name: 'template',
        component: _import('devops/template/template'),
      },
      // 模板明细管理
      {
        path: 'templateDetail/:code',
        name: 'templateDetail',
        component: _import('devops/template/templateDetail'),
      },
      // 服务器管理
      {
        path: 'service/',
        name: 'service',
        component: _import('devops/service/Index'),
      },

      // 探针管理
      {
        path: 'agent',
        name: 'agent',
        component: _import('devops/agent/Index'),
      },
      // 应用管理
      {
        path: 'appmanage/',
        name: 'appmanage',
        component: _import('devops/appmanage/Index'),
      },
    ],
  },
  {
    path: '/devops/',
    redirect: { name: 'devops' },
    component: layoutHeaderAside,
    children: [
      {
        path: 'registry',
        component: _import('devops/registry/Index'),
        children: [
          {
            path: '/',
            redirect: 'summary',
            name: 'summary',
            meta: {
              auth: true,
            },
            component: _import('devops/registry/Summary'),
          },
          {
            path: 'summary',
            name: 'summary',
            meta: {
              auth: true,
            },
            component: _import('devops/registry/Summary'),
          },
          {
            path: 'config',
            name: 'config',
            meta: {
              auth: true,
            },
            component: _import('devops/registry/Config'),
          },
        ],
      },
      {
        path: 'config/',
        redirect: { name: 'config' },
        component: _import('devops/config/Index'),
        children: [
          {
            path: '/',
            redirect: 'summary',
            meta: {
              auth: true,
            },
            component: _import('devops/config/Summary'),
          },
          {
            path: 'summary',
            name: 'summary',
            meta: {
              auth: true,
            },
            component: _import('devops/config/Summary'),
          },
          {
            path: 'config',
            name: 'config',
            meta: {
              auth: true,
            },
            component: _import('devops/config/Config'),
          },
        ],
      },
      {
        path: 'gateway/',
        redirect: { name: 'gateway' },
        component: _import('devops/gateway/Index'),
        children: [
          {
            path: '/',
            redirect: 'summary',
            meta: {
              auth: true,
            },
            component: _import('devops/gateway/Summary'),
          },
          {
            path: 'summary',
            name: 'summary',
            meta: {
              auth: true,
            },
            component: _import('devops/gateway/Summary'),
          },
          {
            path: 'config',
            name: 'config',
            meta: {
              auth: true,
            },
            component: _import('devops/gateway/Config'),
          },
        ],
      },
    ],
  },
];
const menusStore = util.db.get('menus').value();
if (menusStore) {
  let menus = JSON.parse(menusStore);
  let routesStore = util.backendMenusToTwoRouters(menus);
  frameIn.push(routesStore[0]);
}

/**
 * 在主框架之外显示
 */
const frameOut = [
  // 登录
  {
    path: '/login',
    name: 'login',
    component: _import('system/login'),
  },
];

/**
 * 错误页面
 */
const errorPage = [
  {
    path: '*',
    name: '404',
    component: _import('system/error/404'),
  },
];

// 导出需要显示菜单的
export const frameInRoutes = frameIn;

// 重新组织后导出
export default [...frameIn, ...frameOut, ...errorPage];
