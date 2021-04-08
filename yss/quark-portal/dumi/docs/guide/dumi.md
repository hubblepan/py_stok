---

title: Dumi介绍
---

## 快速上手

dumi，一款基于 Umi 打造、为组件开发场景而生的文档工具。[官网](https://d.umijs.org/zh-CN)

特点：

- 开箱即用
- 高性能
- 为组件开发而生

### 环境准备

首先得有 [node](https://nodejs.org/en/)，并确保 node 版本是 10.13 或以上。

```bash
$ node -v
v10.13.0


```

### 脚手架初始化

#### **文档模式**

```bash
$ npx @umijs/create-dumi-lib        # 初始化一个文档模式的组件库开发脚手架
# or
$ yarn create @umijs/dumi-lib

```

#### **站点模式**

```bash
$ npx @umijs/create-dumi-lib --site # 初始化一个站点模式的组件库开发脚手架
# or
$ yarn create @umijs/dumi-lib --site
```

- 多语言的站点模式脚手架

```bash
$ npx @umijs/create-dumi-app
# or
$ yarn create @umijs/dumi-app
```

### 安装

```bash
$ npm i dumi -D
```

### 执行

```bash
npx dumi dev
```

## 约定式规则

dumi 和 Umi 一样，有一套路由生成的约定。

生成均以 [`resolve.includes`](https://d.umijs.org/zh-CN/config#includes) 配置项的值作为基础检测路径，倘若我们不配置该值，则会默认探测 `docs` 目录、`src` 目录（普通项目）、`packages/pkg/src` 目录（lerna 项目）下面的Markdown文档。

它会根据你文件夹的嵌套自动地生成路由的嵌套，而文件夹下面的每一个Markdown文档就是一个具体的页面。文件夹的第一级嵌套会作为导航，并且它会优先在文件夹下寻找 index.md 或者 REAdME.md作为首页。

假定 `docs` 有如下目录结构，dumi 会这么进行识别：

```bash
.
└── docs/
    ├── index.md       # 生成 / 路由
    ├── index.zh-CN.md # 生成 /zh-CN 路由
    ├── examples.md    # 生成 /examples 路由
    ├── guide
    |   ├── README.md  # 生成 /guide 路由
    |   ├── help.md    # 生成 /guide/help 路由
```

另外，dumi 会将驼峰命名（camelCased）转换为短横线命名（kebab-case），例如 `docs/gettingStarted` 会被转化为 `docs/getting-started`。

### 文档的层级结构

整个文档的层级结构共分为三级：

一级——导航

二级——菜单。每个导航下有多个菜单，位置在左侧。

三级——锚点。文档右侧，它可以帮助你快速定位到该页的某个位置。dumi会把Markdown中的标题识别为锚点，最多嵌套两级。从二级开始，二级标题、三级标题。

### frontmatter配置

#### **每个页面的名称、顺序等，导航等信息**

它会根据你Markdown文件顶端的 FrontMatter 去设置页面名称、页面顺序，当前页面所处的导航信息等等，你只需要根据它官网的说明去进行相应的配置就可以了。

要注意：冒号后面要有空格，否则会报错。

```bash
---
nav:
  title: 指南
title: 环境准备
......

---
```

#### **首页**

```bash
---
hero:
  title: quark
  desc: quark site example
  actions:
    - text: 快速上手
      link: /guide
features:
  - icon: https://gw.alipayobjects.com/zos/bmw-prod/881dc458-f20b-407b-947a-95104b5ec82b/k79dm8ih_w144_h144.png
    title: Feature 1
    desc: Balabala
  - icon: https://gw.alipayobjects.com/zos/bmw-prod/d60657df-0822-4631-9d7c-e7a869c2f21c/k79dmz3q_w126_h126.png
    title: Feature 2
    desc: Balabala
  - icon: https://gw.alipayobjects.com/zos/bmw-prod/d1ee0c6f-5aed-4a45-a507-339a4bfe076c/k7bjsocq_w144_h144.png
    title: Feature 3
    desc: Balabala
footer: Open-source MIT Licensed | Copyright © 2020<br />Powered by [Quark](https://d.umijs.org)
---
```

## 配置化

### 配置化菜单

如果发现约定式无法满足需要，可通过 [`menus` 配置项](https://d.umijs.org/zh-CN/config#menus) 对侧边菜单进行**增量自定义**。

比如这里菜单分组的效果：

```ts
// config/index.ts
export default {
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
        ],
      },
      {
        title: '其他',
        children: ['guide/dumi.md', 'guide/faq.md'],
      },
    ],
    '/components': [
      {
        title: '组件总览',
        path: '/components',
      },
      {
        title: 'block级组件',
        children: ['components/PagePane.md'],
      },
      {
        title: '常用组件',
        children: ['components/table.md', 'components/modal.md'],
      },
    ],
    // 如果该路径有其他语言，需在前面加上语言前缀，需与 locales 配置中的路径一致
    // '/zh-CN/guide': [
    //   // 省略，配置同上
    // ],
  },
}
```

注：框架文档所有的配置都放在/config/index.ts中

### 配置化导航

```ts
// config/index.ts
export default {
  navs: [
    null, // null 值代表保留约定式生成的导航，只做增量配置
    {
      title: 'GitHub',
      path: 'https://github.com/umijs/dumi',
    },
    {
      title: '我有二级导航',
      // path: '链接是可选的',
      children: [
        { title: 'dumi官网', path: 'https://d.umijs.org' },
        { title: '指南', path: '/guide' },
        { title: '组件', path: '/components' },
      ],
    },
  ],
};

```

### 配置文件入口.umirc.ts

它的配置文件是这个——.umirc.ts，这是它配置文件的入口，因为它最后是从这个文件里面去读取你的配置，你在这里要把config引入进来，这样它才会去拿你config里面的配置，要不然你的config是没有效果的。

所以如果之后要添加相应的配置：

1. 在/config/index.ts中添加
2. 在.umirc.ts中引入

就搞定了！

```ts
import { defineConfig } from 'dumi';
import config from './config'
export default defineConfig({
  title: 'quark',
  favicon: '...',
  logo: '...',
  outputPath: 'docs-dist',
  mode: 'site',
  menus:config.menus,
  navs:config.navs,
  // more config: https://d.umijs.org/config
});
```

## 将dumi集成到quark-portal中

### 如何在项目中使用 dumi？

1. 安装模块。

   ```bash
   yarn add dumi cross-env -D
   ```

2. 增加启动命令，修改 `package.json`。

   ```bash
     "scripts": {
       "dumi": "cross-env APP_ROOT=dumi dumi dev",
       "dumi-build": "cross-env APP_ROOT=dumi dumi build"
     },
   
   ```

3. 增加配置，新建 `config/config.js`。

   ```bash
   export default {
     chainWebpack(memo) {
       memo.plugins.delete('copy');
     },
   };
   
   ```

4. 新建文档目录 `dumi/docs/`，这里的 `dumi` 目录即第二步中配置的环境变量，你可以随意同步修改。

5. 新建文档 `dumi/docs/index.md`。

   ```bash
   # 这是一个 Dumi 结合 create-react-app 的 Demo
   ```

6. 将 dumi 的临时文件添加到 `.gitignore` 中。

   ```bash
   .umi
   ```

   来源：https://d.umijs.org/zh-CN/guide/faq#%E5%A6%82%E4%BD%95%E5%9C%A8-cra-%E7%AD%89%E9%9D%9E-umi-%E9%A1%B9%E7%9B%AE%E4%B8%AD%E4%BD%BF%E7%94%A8-dumi%EF%BC%9F

### 在dumi中引入原项目中的组件

需要在dumi内使用原umi项目的组件，需要添加一些webpack配置。也就是配置在刚刚讲到的配置文件/dumi/.umirc.ts中。

#### **引入原项目的组件*.jsx、*.tsx等文件**

根据以上步骤，现有项目中集成已经跑起来了，但是在dumi下的components/xxx.md中引用原有项目的组件报错了。这是因为它无法识别jsx、js等文件，此时需要配置loader，像这样配置完之后就能加载原有项目中的组件啦。

```bash
Module parse failed: Unexpected token (12:2)
You may need an appropriate loader to handle this file type, currently no loaders are configured to process this file. 
```

------

```ts
/dumi/.umirc.ts
export default defineConfig({
  ...

  chainWebpack: (config: any) => {
    config.module
      .rule('js')
      .test(/\.(js|mjs|jsx|ts|tsx)$/)
      .include.add(join(__dirname, '..', 'src'))
      .end()
      .exclude.add(/node_modules/)
      .end()
      .use('babel-loader');
    
  },
  
});
```

#### **alias** @

要想在dumi中使用alias @，就是说直接用@就能定位到原项目的src目录，这样就省得我们一级一级去找目录结构了，而且有些组件中其本身就使用了@语法来导入其他文件，那么这时候就需要alias @的相关配置。

需要这样配置，@就能指向原项目的/src目录：

```ts
/dumi/.umirc.ts
export default defineConfig({
  	...

  chainWebpack: (config: any) => {
    config.resolve
      .alias
      .set('@', join(__dirname, '../src'))
  },
  alias: {
    '@': join(__dirname, '..', 'src'),
  },

  
});
```

来源：https://github.com/umijs/dumi/issues/161

#### **如何配置使支持svg 图标**

当在md中引入svg时，`.svg`文件会被url-loader(或其他相关loader)被转成base64而无法在component中使用，导致报错。那现在我希望不走 base64，而是产生 svg 文件。使其保持原来的svg格式的代码。交由svg-sprite-loader处理。

```ts

export default defineConfig({

  chainWebpack: (config: any) => {
    // ...
    config.module.rules.delete('svg'); // 这里一定要先删除其他loader处理svg
    config.module
      .rule('svg')
      .test(/\.svg$/)
      .use('svg-sprite-loader')
      .loader('svg-sprite-loader');
  }
  
});
```

