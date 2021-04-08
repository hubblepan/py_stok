export default {
  // ssr: {},
  // hash: true,
  // title: 'dumi',
  // mode: 'site',

  menus: {
    // 需要自定义侧边菜单的路径，没有配置的路径还是会使用自动生成的配置
    '/guide': [
      {
        title: '介绍',
        // path: '',  // 配置式菜单且不设置 path，就是黑体加粗的，非链接
        children: [
          // 菜单子项（可选）
          'guide/index.md', // 对应的 Markdown 文件，路径是相对于 resolve.includes 目录识别的
          'guide/gettingStarted.md',
          'guide/online.md',
        ],
      },
      {
        title: '快速上手',
        children: ['guide/demand.md', 'guide/deploy.md'],
      },
      {
        title: '其他',
        children: ['guide/dumi.md', 'guide/faq.md'],
      },
    ],
    '/components': [
      {
        title: '组件',
        // path: '/components',
        children: [
          'components/quarkTable.md',
          'components/quarkModal.md',
          'components/svgIcon.md',
          'components/toolbar.md',
        ],
      },
      {
        title: 'block（块）',
        children: [
          'components/masterTablePane.md',
          'components/TablePane.md',
          'components/PagePane.md',
        ],
      },

      // {
      //   title: '栅格组件',
      //   path: '/components/grid',
      // },
    ],
    // 如果该路径有其他语言，需在前面加上语言前缀，需与 locales 配置中的路径一致
    // '/zh-CN/guide': [
    //   // 省略，配置同上
    // ],
  },
  navs: [
    null, // null 值代表保留约定式生成的导航，只做增量配置
    {
      title: 'GitHub',
      path: 'https://github.com/umijs/dumi',
    },
    // {
    //   title: '我有二级导航',
    //   // path: '链接是可选的',
    //   children: [
    //     { title: 'dumi官网', path: 'https://d.umijs.org' },
    //     { title: '指南', path: '/guide' },
    //     { title: '组件', path: '/components' },
    //   ],
    // },
  ],
};
