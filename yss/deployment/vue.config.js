const VueFilenameInjector = require('@d2-projects/vue-filename-injector');

const ThemeColorReplacer = require('webpack-theme-color-replacer');
const forElementUI = require('webpack-theme-color-replacer/forElementUI');
const { each, keys } = require('lodash');

// 拼接路径
const resolve = (dir) => require('path').join(__dirname, dir);

// 增加环境变量
process.env.VUE_APP_VERSION = require('./package.json').version;
process.env.VUE_APP_BUILD_TIME = require('dayjs')().format('YYYY-M-D HH:mm:ss');

// 基础路径 注意发布之前要先修改这里
let publicPath = process.env.VUE_APP_PUBLIC_PATH || '/';
const port = process.env.port || process.env.npm_config_port || 8080; // dev port

// 多页面配置
const pages = {
  index: {
    entry: 'src/main.js',
    // 应用的模版，相当于单页面应用的public/index.html，可选项，省略时默认与模块名一致
    template: 'public/index.html',
    // 编译后在dist目录的输出文件名，可选项，省略时默认与模块名一致
    filename: 'index.html',
    chunks: ['chunk-vendors', 'chunk-common', 'index'],
  },
  login: {
    entry: 'src/modules/login/index.js',
    template: 'public/login.html',
    // 编译后在dist目录的输出文件名，可选项，省略时默认与模块名一致
    filename: 'login.html',
    chunks: ['chunk-vendors', 'chunk-common', 'login'],
  },
};

module.exports = {
  // 根据你的实际情况更改这里
  publicPath,
  lintOnSave: process.env.NODE_ENV === 'development',
  productionSourceMap: false,
  pages,
  devServer: {
    port: port,
    open: true,
    overlay: {
      warnings: false,
      errors: true,
    },
    proxy: {
      [process.env.VUE_APP_DEVOPS_API]: {
        target: process.env.VUE_APP_DEVOPS_URL + process.env.VUE_APP_DEVOPS_API,
        ws: true,
        changeOrigin: true,
        secure: false,
        pathRewrite: {
          ['^' + process.env.VUE_APP_DEVOPS_API]: '',
        },
      },
      [process.env.VUE_APP_TOOLS_API]: {
        target: process.env.VUE_APP_TOOLS_URL + process.env.VUE_APP_TOOLS_API,
        ws: true,
        changeOrigin: true,
        secure: false,
        pathRewrite: {
          ['^' + process.env.VUE_APP_TOOLS_API]: '',
        },
      },
      [process.env.VUE_APP_MONITOR_API]: {
        target: process.env.VUE_APP_MONITOR_URL + process.env.VUE_APP_MONITOR_API,
        ws: true,
        changeOrigin: true,
        secure: false,
        pathRewrite: {
          ['^' + process.env.VUE_APP_MONITOR_API]: '',
        },
      },
      // 测试div嵌套
      // '/test': {
      //   target: 'https://www.cnblogs.com/chenfangzhi/p/9665538.html',
      //   ws: true,
      //   changeOrigin: true,
      //   pathRewrite: {
      //     '^/test': '',
      //   },
      // },
    },
  },
  css: {
    loaderOptions: {
      // 设置 scss 公用变量文件
      sass: {
        data: `@import '~@/assets/style/public.scss';`,
      },
    },
  },
  // 默认设置: https://github.com/vuejs/vue-cli/tree/dev/packages/%40vue/cli-service/lib/config/base.js
  chainWebpack: (config) => {
    /**
     * 删除懒加载模块的 prefetch preload，降低带宽压力
     * https://cli.vuejs.org/zh/guide/html-and-static-assets.html#prefetch
     * https://cli.vuejs.org/zh/guide/html-and-static-assets.html#preload
     * 而且预渲染时生成的 prefetch 标签是 modern 版本的，低版本浏览器是不需要的
     */
    config.plugins.delete('prefetch').delete('preload');
    // 解决 cli3 热更新失效 https://github.com/vuejs/vue-cli/issues/1559
    config.resolve.symlinks(true);
    config.plugin('theme-color-replacer').use(ThemeColorReplacer, [
      {
        fileName: 'css/theme-colors.[contenthash:8].css',
        matchColors: [
          ...forElementUI.getElementUISeries(process.env.VUE_APP_ELEMENT_COLOR), // Element-ui主色系列
        ],
        externalCssFiles: ['./node_modules/element-ui/lib/theme-chalk/index.css'], // optional, String or string array. Set external css files (such as cdn css) to extract colors.
        changeSelector: forElementUI.changeSelector,
      },
    ]);
    config
      // 开发环境
      .when(
        process.env.NODE_ENV === 'development',
        // sourcemap不包含列信息 cheap-source-map
        (config) => config.devtool('source-map')
      )
      // TRAVIS 构建 vue-loader 添加 filename
      .when(
        process.env.VUE_APP_SCOURCE_LINK === 'TRUE',
        VueFilenameInjector(config, {
          propName: process.env.VUE_APP_SOURCE_VIEWER_PROP_NAME,
        })
      );
    // markdown
    config.module
      .rule('md')
      .test(/\.md$/)
      .use('text-loader')
      .loader('text-loader')
      .end();
    // svg
    const svgRule = config.module.rule('svg');
    svgRule.uses.clear();
    svgRule.include
      .add(resolve('src/assets/svg-icons/icons'))
      .end()
      .use('svg-sprite-loader')
      .loader('svg-sprite-loader')
      .options({
        symbolId: 'd2-[name]',
      })
      .end();
    // image exclude
    const imagesRule = config.module.rule('images');
    imagesRule
      .test(/\.(png|jpe?g|gif|webp|svg)(\?.*)?$/)
      .exclude.add(resolve('src/assets/svg-icons/icons'))
      .end();
    // 重新设置 alias
    config.resolve.alias.set('@api', resolve('src/api'));
    // 判断环境加入模拟数据
    // const entry = config.entry('app')
    if (process.env.VUE_APP_MOCK === 'true') {
      const multiEntry = keys(pages || {});
      console.log('mock启动中');
      const entrys = multiEntry.length ? multiEntry : ['app'];
      each(entrys, (entry) => {
        config
          .entry(entry)
          .add('./mock')
          .end();
      });
    }
  },
  // i18n
  pluginOptions: {
    i18n: {
      locale: 'zh-chs',
      fallbackLocale: 'en',
      localeDir: 'locales',
      enableInSFC: true,
    },
  },
};
