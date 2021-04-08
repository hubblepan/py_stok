import path from 'path';
const resolve = (dir) => require('path').join(__dirname, dir);

function getModulePackageName(module) {
  if (!module.context) return null;
  const nodeModulesPath = path.join(__dirname, '../node_modules/');

  if (module.context.substring(0, nodeModulesPath.length) !== nodeModulesPath) {
    return null;
  }

  const moduleRelativePath = module.context.substring(nodeModulesPath.length);
  const [moduleDirName] = moduleRelativePath.split(path.sep);
  let packageName = moduleDirName; // handle tree shaking

  if (packageName && packageName.match('^_')) {
    // eslint-disable-next-line prefer-destructuring
    packageName = packageName.match(/^_(@?[^@]+)/)[1];
  }

  return packageName;
}

const webpackPlugin = (config) => {
  config.module.rules.delete('svg'); // 删除其他loader处理svg
  config.module
    .rule('svg')
    .test(/\.svg$/)
    .use('svg-sprite-loader')
    .loader('svg-sprite-loader');


  // svg
  // const svgRule = config.module.rule('svg');
  // svgRule.uses.clear();
  /**
  config.module
    .rule('svg')
    .test(/.svg(\?v=\d+.\d+.\d+)?$/)
    .use([
      {
        loader: 'babel-loader',
      },
      {
        loader: '@svgr/webpack',
        options: {
          babel: false,
          icon: true,
        },
      },
    ])
    .loader(require.resolve('@svgr/webpack'));
*/
  //         svgRule.include
  // .add(resolve('src/assets/svg-icons/icons'))
  // .end()
  // .use('svg-sprite-loader')
  // .loader('svg-sprite-loader')
  // .options({
  //   symbolId: 'icon-[name]',
  // })
  // .end();

  // optimize chunks
  config.optimization // share the same chunks across different modules
    .runtimeChunk(false)
    .splitChunks({
      chunks: 'async',
      name: 'vendors',
      maxInitialRequests: Infinity,
      minSize: 0,
      cacheGroups: {
        vendors: {
          test: (module) => {
            const packageName = getModulePackageName(module) || '';

            if (packageName) {
              return [
                'bizcharts',
                'gg-editor',
                'g6',
                '@antv',
                'l7',
                'gg-editor-core',
                'bizcharts-plugin-slider',
              ].includes(packageName);
            }

            return false;
          },

          name(module) {
            const packageName = getModulePackageName(module);

            if (packageName) {
              if (['bizcharts', '@antv_data-set'].indexOf(packageName) >= 0) {
                return 'viz'; // visualization package
              }
            }

            return 'misc';
          },
        },
      },
    });

  // svg
  // set svg-sprite-loader
  // config.module
  //   .rule('svg')
  //   .exclude.add(resolve('src/assets/svg-icons/icons'))

  //   .end();
  // config.module
  //   .rule('icons')
  //   .test(/\.svg$/)
  //   .include.add(resolve('src/assets/svg-icons/icons'))
  //   .end()
  //   .use('svg-sprite-loader')
  //   .loader('svg-sprite-loader')
  //   .options({
  //     symbolId: 'icon-[name]'
  //   })
  //   .end();

  // set preserveWhitespace
  // config.module
  //   .rule('vue')
  //   .use('vue-loader')
  //   .loader('vue-loader')
  //   .tap(options => {
  //     options.compilerOptions.preserveWhitespace = true;
  //     return options;
  //   })
  //   .end();
};

export default webpackPlugin;
