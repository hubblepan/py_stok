// 菜单 侧边栏
export default [
  // {
  //   title: '单机管理',
  //   icon: 'briefcase',
  //   children: [
  //
  //     // {path: '/upgrade/index', title: '升级部署', icon: 'level-up'},
  //     {path: '/index', title: '一键升级', icon: 'hand-pointer-o'},
  //     {path: '/update/upgradeMerge', title: '补丁包合并', icon: 'hand-pointer-o'},
  //     { path: '/setup/index', title: '一键部署', icon: 'hand-o-right' },
  //     // {path: '/monit/index', title: '监控信息', icon: 'hand-pointer-o'},
  //     // { path: '/setup/downloadInfo', title: '下载监控信息', icon: 'download' },
  //   ],
  // },
  // {
  //   title: '实验室',
  //   icon: 'folder-o',
  //   children: [
  //     // { path: '/devops/registry', title: '注册中心' },
  //     // { path: '/devops/config', title: '配置中心' },
  //     // { path: '/devops/gateway', title: '网关管理' },
  //     { path: '/demo/page1', title: '页面 1' },
  //     { path: '/demo/page2', title: '页面 2' },
  //   ],
  // },
  //
  {
    title: '单机部署',
    icon: 'folder-o',
    children: [
      { path: '/index', title: '应用升级/回退'},
      // { path: '/monitor/nodes/NodeUpgrade', title: '应用升级'},
      { path: '/monitor/nodes/NodeList', title: '应用部署' },
      { path: '/monitor/nodes/NodeManage', title: '节点管理' },
      {path: '/update/upgradeMerge', title: '补丁包合并', icon: 'hand-pointer-o'},
      // { path: '/monitor/terminal/WebSSH', title: '控制台'},
    ],
  },
  {
    title: '监控管理',
    icon: 'bell-o',
    children: [
      {path: '/monit/MonitNode', title: '监控信息', icon: 'hand-pointer-o'},
      {path: '/monit/SceneManage', title: '场景管理', icon: 'hand-pointer-o'},
      {path: '/monit/SceneMonit', title: '场景大盘', icon: 'hand-pointer-o'},
    ],
  },
  {
    title: '分布式部署',
    icon: 'bell-o',
    children: [
      { path: '/micro/MicroServerManage', title: '服务器管理' },
      {path: '/micro/MicroProgramManage', title: '服务管理'},
      {path: '/micro/MicroProjectManage', title: '方案管理'},
      // {path: '/micro/MicroMonit', title: '方案监控', icon: 'hand-pointer-o'},
      // {path: '/micro/MicroDeployUpgrade', title: '部署升级', icon: 'hand-pointer-o'},
      // {path: '/micro/MicroSettingsManage', title: '配置管理', icon: 'hand-pointer-o'},
      // {path: '/monit/SceneManage', title: '场景管理', icon: 'hand-pointer-o'},
    ],
  },
];
