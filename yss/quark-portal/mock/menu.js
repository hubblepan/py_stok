export default {
  '/api/menu/queryList': {
    data: [
      {
        id: '1',
        path: '/list/search',
        name: '管控平台',
        component: './list/search',
        redirect: 'noRedirect',
        icon: 'home',
        alwaysShow: true,
        children: [
          {
            id: '11',
            name: '首页-管理岗',
            path: '/home/manage',
            component: './home/manage',
            isCollection: false,
          },
          {
            id: '12',
            name: '首页-业务岗',
            path: '/home/business',
            component: './home/business',
            isCollection: true,
          },
          {
            id: '13',
            name: '首页-IT岗',
            path: '/home/IT',
            component: './home/IT',
            isCollection: false,
          },
          {
            id: '14',
            name: '指标信息管理',
            icon: 'file-manage',
            path: '/monitor/monitor-index-config',
            component: './ocp/monitorIndexConfig',
            isCollection: true,
          },
          {
            id: '15',
            name: '管控指标关联',
            icon: 'links',
            path: '/monitor/ocp-index-rela',
            component: './ocp/ocpIndexRela',
            isCollection: false,
          },
          {
            id: '16',
            name: '指标参数设置',
            icon: 'param-set',
            path: '/monitor/ocp-index-param',
            component: './ocp/ocpIndexParam',
            isCollection: false,
          },
          {
            id: '17',
            name: '监控日志总览',
            icon: 'monitor',
            path: '/monitor/monitor-log-summary',
            component: './ocp/monitorLogSummary',
            isCollection: true,
          },
          {
            id: '188',
            name: '结果通知管理',
            icon: 'message',
            path: '/monitor/monitor-plat-form-mail-policy',
            component: './ocp/monitorPlatFormMailPolicy',
            isCollection: true,
          },
          {
            id: '18',
            name: '指标开发配置',
            icon: 'operationmmt',
            path: '/monitor/ocp-dev-platform',
            component: './ocp/ocpDevPlatform',
            isCollection: true,
          },
          {
            id: '19',
            name: '管控基础参数',
            icon: 'station',
            path: '/monitor/monitor-sys-param',
            component: './ocp/monitorSysParam',
            isCollection: true,
          },
          // {
          //   id: '110',
          //   name: '任务中心',
          //   icon: 'taskcenter',
          //   path: '/monitor/task',
          //   component: './ocp/taskManage',
          // },
          {
            id: '111',
            name: '消息中心',
            icon: 'message',
            path: '/monitor/message',
            component: './ocp/message',
          },
        ],
      },
      {
        id: '2',
        name: '示例',
        path: '/examples',
        icon: 'tenant-setting',
        alwaysShow: true,
        children: [
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
          //   id: '23',
          //   name: '用户管理无框架 class Api',
          //   icon: 'team',
          //   path: '/system/user/demo2',
          //   component: './user/demo2',
          // },
          // {
          //   id: '24',
          //   name: '用户管理dva demo3',
          //   icon: 'team',
          //   path: '/system/user/demo3',
          //   component: './user/demo3',
          // },
        ],
      },
      {
        id: '3',
        name: '权限管理',
        path: '/right',
        redirect: 'noRedirect',
        component: 'right/',
        icon: 'audit',
        alwaysShow: true,
        children: [
          {
            id: '35',
            name: '岗位权限',
            path: '/right/postRight',
            component: './right/postRight',
            isCollection: true,
          },
          {
            id: '36',
            name: '用户权限',
            path: '/right/userRight',
            component: './right/userRight',
            isCollection: false,
          },
          {
            id: '37',
            name: '用户岗位管理',
            path: '/right/userPost',
            component: './right/userPost',
            isCollection: false,
          },
        ],
      },
    ],
    success: true,
    code: 200,
  },
};
