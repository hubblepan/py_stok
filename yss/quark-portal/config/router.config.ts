export default [
  {
    path: '/',
    component: '../layouts/BlankLayout',
    routes: [
      {
        path: '/user',
        component: '../layouts/UserLayout',
        routes: [
          {
            path: '/user',
            redirect: '/user/login',
          },
          {
            name: 'login',
            icon: 'smile',
            path: '/user/login',
            component: './user/login',
          },
          {
            name: 'register-result',
            icon: 'smile',
            path: '/user/register-result',
            component: './user/register-result',
          },
          {
            name: 'register',
            icon: 'smile',
            path: '/user/register',
            component: './user/register',
          },
          {
            component: '404',
          },
        ],
      },
      {
        path: '/login',
        component: '../layouts/BlankLayout',
        routes: [
          {
            name: 'login-index',
            icon: 'smile',
            path: '/login',
            component: './login/index',
          },
        ],
      },
      {
        path: '/largeScreen',
        component: '../layouts/LargeScreenLayout',
        routes: [
          {
            path: '/largeScreen',
            redirect: '/largeScreen/index',
          },
          {
            name: 'largeScreen-index',
            icon: 'smile',
            path: '/largeScreen/index',
            component: './largeScreen/index',
          },
          {
            name: 'largeScreen-detail',
            icon: 'smile',
            path: '/largeScreen/detail',
            component: './largeScreen/components/DetailModal',
          },
        ],
      },
      {
        path: '/',
        component: '../layouts/BasicLayout',
        Routes: ['src/pages/Authorized'],
        authority: ['admin', 'user'],
        routes: [
          {
            name: '首页',
            path: '/home',
            icon: 'home',
            routes: [
              {
                name: '首页-管理岗',
                path: '/home/manage',
                component: './home/manage',
              },
              {
                name: '首页-业务岗',
                path: '/home/business',
                component: './home/business',
              },
              {
                name: '首页-IT岗',
                path: '/home/IT',
                component: './home/IT',
              },
            ],
          },
          {
            name: '示例',
            path: '/examples',
            routes: [
              {
                name: 'aliReactTable',
                icon: 'team',
                path: '/examples/aliReactTable',
                component: './examples/aliReactTable',
              },
              {
                name: 'virtualTable',
                icon: 'team',
                path: '/examples/virtualTable',
                component: './examples/virtualTable',
              },
              // {
              //   name: 'demo2无框架class',
              //   icon: 'team',
              //   path: '/examples/demo2',
              //   component: './examples/demo2',
              // },
              // {
              //   name: 'demo3无框架dva',
              //   icon: 'team',
              //   path: '/examples/demo3',
              //   component: './examples/demo3',
              // },
            ],
          },
          {
            name: '管控平台',
            path: '/monitor',
            routes: [
              {
                name: '指标信息管理',
                icon: 'team',
                path: '/monitor/monitor-index-config',
                component: './ocp/monitorIndexConfig',
              },
              {
                name: '管控指标关联',
                icon: 'team',
                path: '/monitor/ocp-index-rela',
                component: './ocp/ocpIndexRela',
              },
              {
                name: '监控日志总览',
                icon: 'team',
                path: '/monitor/monitor-log-summary',
                component: './ocp/monitorLogSummary',
              },
              {
                name: '任务中心',
                icon: 'team',
                path: '/monitor/task',
                component: './ocp/taskManage',
              },
              {
                name: '消息中心',
                icon: 'team',
                path: '/monitor/message',
                component: './ocp/message',
              },
              {
                name: '指标参数设置',
                icon: 'team',
                path: '/monitor/ocp-index-param',
                component: './ocp/ocpIndexParam',
              },
              {
                name: '管控基础参数',
                icon: 'team',
                path: '/monitor/monitor-sys-param',
                component: './ocp/monitorSysParam',
              },
              {
                name: '指标开发配置',
                icon: 'team',
                path: '/monitor/ocp-dev-platform',
                component: './ocp/ocpDevPlatform',
              },
              {
                name: '结果通知管理',
                icon: 'message',
                path: '/monitor/monitor-plat-form-mail-policy',
                component: './ocp/monitorPlatFormMailPolicy',
              },
            ],
          },
          {
            name: '权限管理',
            path: '/right',
            component: '../layouts/BasicLayout',
            routes: [
              {
                name: '岗位权限',
                path: '/right/postRight',
                component: './right/postRight',
              },
              {
                name: '用户权限',
                path: '/right/userRight',
                component: './right/userRight',
              },
              {
                name: '用户岗位管理',
                path: '/right/userPost',
                component: './right/userPost',
              },
            ],
          },
          {
            path: '/dashboard',
            name: 'dashboard',
            icon: 'dashboard',
            routes: [
              {
                name: 'analysis',
                icon: 'smile',
                path: '/dashboard/analysis',
                component: './dashboard/analysis',
              },
              {
                name: 'monitor',
                icon: 'smile',
                path: '/dashboard/monitor',
                component: './dashboard/monitor',
              },
              {
                name: 'workplace',
                icon: 'smile',
                path: '/dashboard/workplace',
                component: './dashboard/workplace',
              },
            ],
          },
          {
            name: 'exception',
            icon: 'warning',
            path: '/exception',
            routes: [
              {
                name: '403',
                icon: 'smile',
                path: '/exception/403',
                component: './exception/403',
              },
              {
                name: '404',
                icon: 'smile',
                path: '/exception/404',
                component: './exception/404',
              },
              {
                name: '500',
                icon: 'smile',
                path: '/exception/500',
                component: './exception/500',
              },
            ],
          },
          {
            path: '/',
            redirect: '/dashboard/analysis',
            authority: ['admin', 'user'],
          },
          {
            component: '404',
          },
        ],
      },
    ],
  },
];
