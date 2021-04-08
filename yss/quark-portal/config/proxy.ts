/**
 * 在生产环境 代理是无法生效的，所以这里没有生产环境的配置
 * The agent cannot take effect in the production environment
 * so there is no configuration of the production environment
 * For details, please see
 * https://pro.ant.design/docs/deploy
 */
export default {
  dev: {
    // 联调代理
    '/YSSUCOBRIDGE/ws/': {
      target: 'http://192.168.6.105:8083/',
      //target: 'http://222.240.48.26:18084/',
      changeOrigin: true,
      pathRewrite: {
        '^': '',
      },
    },
    '/osgi-basebusiness/': {
      //组合接口
      target: 'http://222.240.48.26:18084/',
      changeOrigin: true,
      pathRewrite: {
        '^': '',
      },
    },
    '/yssmonitor-testor/': {
      //管控接口
      target: 'http://222.240.48.26:8184/',
      // target: 'http://222.240.48.26:18084/',
      changeOrigin: true,
      pathRewrite: {
        '^': '',
      },
    },
    '/fomp-sso-server/': {
      //登录接口
      target: 'http://222.240.48.26:18084/',
      changeOrigin: true,
      pathRewrite: {
        '^': '',
      },
    },
    '/osgi-fast/': {
      //fast接口
      target: 'http://222.240.48.26:18084/',
      changeOrigin: true,
      pathRewrite: {
        '^': '',
      },
    },
  },
  /**
  dev: {
    '/ocp/': {
      target: 'http://192.168.2.110:9090/',
      changeOrigin: true,
      pathRewrite: {
        '^': '',
      },
    },
  },
  test: {
    '/ocp/': {
      target: 'http://10.10.20.29:9090/',
      changeOrigin: true,
      pathRewrite: {
        '^': '',
      },
    },
  },
  */
  pre: {
    '/api/': {
      target: 'your pre url',
      changeOrigin: true,
      pathRewrite: {
        '^': '',
      },
    },
  },
};
