import { defineConfig } from 'dumi';
import { join } from 'path';
import config from './config';
export default defineConfig({
  title: 'quark',
  favicon:
    'https://user-images.githubusercontent.com/9554297/83762004-a0761b00-a6a9-11ea-83b4-9c8ff721d4b8.png',
  logo:
    'https://user-images.githubusercontent.com/9554297/83762004-a0761b00-a6a9-11ea-83b4-9c8ff721d4b8.png',
  outputPath: 'docs-dist',
  mode: 'site',
  menus: config.menus,
  navs: config.navs,
  // more config: https://d.umijs.org/config

  chainWebpack: (config: any) => {
    config.plugins.delete('copy');
    config.module
      .rule('js')
      .test(/\.(js|mjs|jsx|ts|tsx)$/)
      .include.add(join(__dirname, '..', 'src'))
      .end()
      .exclude.add(/node_modules/)
      .end()
      .use('babel-loader');
    config.module.rules.delete('svg'); // 这里一定要先删除其他loader处理svg
    config.module
      .rule('svg')
      .test(/\.svg$/)
      .use('svg-sprite-loader')
      .loader('svg-sprite-loader');
    config.resolve.alias.set('@', join(__dirname, '../src'));
  },
  alias: {
    '@': join(__dirname, '..', 'src'),
  },
});
