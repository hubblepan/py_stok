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
      // {
      //   path: '',
      //   redirect: 'setup',
      // },
      // 单机首页
      // {
      //   path: 'index',
      //   name: 'index',
      //   meta: {
      //     auth: true,
      //     title: '一键升级',
      //   },
      //   component: _import('system/index'),
      // },
      // // 多机首页
      {
        path: 'index',
        name: 'index',
        meta: {
          auth: true,
          title: '应用升级',
        },
        component: _import('system/index'),
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
      // {
      //   path: 'setup',
      //   redirect: { name: 'setup' },
      //   component: _import('monitor/setup/Index'),
      //   // children: [
      //   //   {
      //   //     path: '/',
      //   //     redirect: 'summary',
      //   //     meta: {
      //   //       auth: true,
      //   //     },
      //   //     component: _import('monitor/setup/Summary'),
      //   //   },
      //   // ],
      // },
      {
        path: 'setup/downloadInfo',
        name: 'downloadInfo',
        meta: {
          auth: true,
          title: '下载监控信息',
        },
        component: _import('monitor/setup/DownloadInfo'),
      },
      {
        path: 'upgrade/index',
        name: 'upgrade',
        meta: {
          auth: true,
          title: '升级部署',
        },
        component: _import('monitor/upgrade/Index'),
      },
      {
        path: 'setup/index',
        name: 'update',
        meta: {
          auth: true,
          title: '一键部署',
        },
        component: _import('monitor/setup/Index'),
      },
      // {
      //   path: 'update/step',
      //   name: 'step',
      //   meta: {
      //     auth: true,
      //     title: '升级',
      //   },
      //   component: _import('monitor/update/Step'),
      // },
      {
        path: 'update/upgradeMerge',
        name: 'upgradeMerge',
        meta: {
          auth: true,
          title: '补丁包合并',
        },
        component: _import('monitor/update/UpgradeMerge'),
      },

      {
        path: 'monit/index',
        name: 'monit',
        meta: {
          auth: true,
          title: '监控信息',
        },
        component: _import('monitor/monit/Index'),
      },
      {
        path: 'monit/MonitReport',
        name: 'MonitReport',
        meta: {
          auth: true,
          title: '巡检报告',
        },
        component: _import('monitor/monit/MonitReport'),
      },

      /* 模板页面1 */
      {
        path: 'demo/page1',
        name: 'page1',
        meta: {
          auth: true,
          title: '页面1',
        },
        component: _import('demo/page1'),
      },

      /* 模板页面2 */
      {
        path: 'demo/page2',
        name: 'page2',
        meta: {
          auth: true,
          title: '页面2',
        },
        component: _import('demo/page2'),
      },

      /* 模板页面2 */
      {
        path: 'demo/page2',
        name: 'page2',
        meta: {
          auth: true,
          title: '页面2',
        },
        component: _import('demo/page2'),
      },

      /* 节点列表 */
      {
        path: 'monitor/nodes/NodeList',
        name: 'NodeList',
        meta: {
          auth: true,
          title: '应用部署',
        },
        component: _import('monitor/nodes/NodeList'),
      },

      /* 节点部署 */
      {
        path: 'monitor/nodes/NodeDeploy',
        name: 'NodeDeploy',
        meta: {
          auth: true,
          title: '节点部署',
        },
        component: _import('monitor/nodes/NodeDeploy'),
      },

      /* 节点管理 */
      {
        path: 'monitor/nodes/NodeManage',
        name: 'NodeManage',
        meta: {
          auth: true,
          title: '节点管理',
        },
        component: _import('monitor/nodes/NodeManage'),
      },

      /* 节点升级 */
      {
        path: 'monitor/nodes/NodeUpgrade',
        name: 'NodeUpgrade',
        meta: {
          auth: true,
          title: '节点升级',
        },
        component: _import('monitor/nodes/NodeUpgrade'),
      },

      /* 节点升级结果 */
      {
        path: 'monitor/nodes/NodeUpgradeComplete',
        name: 'NodeUpgradeComplete',
        meta: {
          auth: true,
          title: '升级完成',
        },
        component: _import('monitor/nodes/NodeUpgradeComplete'),
      },

      /* 控制台 */
      {
        path: 'monitor/terminal/WebSSH',
        name: 'WebSSH',
        meta: {
          auth: true,
          title: '控制台',
        },
        component: _import('monitor/terminal/WebSSH'),
      },

      /* 监控信息 */
      {
        path: 'monit/MonitNode',
        name: 'WebSSH',
        meta: {
          auth: true,
          title: '监控信息',
        },
        component: _import('monitor/monit/MonitNode'),
      },
      /* 场景管理 */
      {
        path: 'monit/SceneManage',
        name: 'SceneManage',
        meta: {
          auth: true,
          title: '场景管理',
        },
        component: _import('monitor/monit/SceneManage'),
      },

      /* 场景监控 */
      {
        path: 'monit/SceneMonit',
        name: 'SceneMonit',
        meta: {
          auth: false,
          title: '场景监控',
        },
        component: _import('monitor/monit/SceneMonit'),
      },

      /* 场景分析 */
      {
        path: 'monit/SceneAnalysis',
        name: 'SceneAnalysis',
        meta: {
          auth: true,
          title: '场景分析',
        },
        component: _import('monitor/monit/SceneAnalysis'),
      },

      /* 微服务-方案管理 */
      {
        path: 'micro/MicroProjectManage',
        name: 'MicroProjectManage',
        meta: {
          auth: true,
          title: '方案管理',
        },
        component: _import('monitor/micro/MicroProjectManage'),
      },

      /* 微服务-方案管理 */
      {
        path: 'micro/MicroProgramManage',
        name: 'MicroProgramManage',
        meta: {
          auth: true,
          title: '程序管理',
        },
        component: _import('monitor/micro/MicroProgramManage'),
      },
      /* 微服务-预警监控 */
      {
        path: 'micro/MicroSettingsManage',
        name: 'MicroSettingsManage',
        meta: {
          auth: true,
          title: '配置管理',
        },
        component: _import('monitor/micro/MicroSettingsManage'),
      },

      /* 微服务-预警监控 */
      {
        path: 'micro/MicroMonit',
        name: 'MicroMonit',
        meta: {
          auth: true,
          title: '预警管理',
        },
        component: _import('monitor/micro/MicroMonit'),
      },

      /* 微服务-服务器管理 */
      {
        path: 'micro/MicroServerManage',
        name: 'MicroServerManage',
        meta: {
          auth: true,
          title: '服务器管理',
        },
        component: _import('monitor/micro/MicroServerManage'),
      },
      /* 微服务-微服务配置 */
      {
        path: 'micro/MicroDeployUpgradeProgram',
        name: 'MicroDeployUpgradeProgram',
        meta: {
          auth: true,
          title: '服务配置',
        },
        component: _import('monitor/micro/MicroDeployUpgradeProgram'),
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
  // setup页面单独显示
  {
    path: '/setup',
    name: 'setup',
    component: _import('monitor/setup/Index'),
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
