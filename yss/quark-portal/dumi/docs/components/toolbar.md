---
nav:
  title: 组件
title: ToolBar 工具栏
---

## 普通工具栏

```jsx
import React from 'react';
import 'antd/dist/antd.css';
import ToolBar from '@/components//ToolBar/index';

const Demo = () => {
  const buttons = {
    edit: {
      id: 'edit',
      visible: 1,
      icon: 'edit',
    },
    check: {
      id: 'check',
      visible: 1,
      icon: 'audit',
    },
    uncheck: {
      id: 'uncheck',
      visible: 1,
      icon: 'uncheck',
    },
    deletes: {
      id: 'deletes',
      visible: 1,
      order: 301,
      icon: 'delete',
    },
    more: {
      id: 'more',
      icon: 'more',
      visible: true,
    },
  };

  return (
    <>
      <ToolBar buttons={buttons} />
    </>
  );
};

export default Demo;
```

## 带下拉框的工具栏

```jsx
import React from 'react';
import 'antd/dist/antd.css';
import '@/dumiStyle.less';
import ToolBar from '@/components//ToolBar/index';

const Demo = () => {
  const buttons = {
    edit: {
      id: 'edit',
      visible: 1,
      icon: 'edit',
      children: {
        menu: {
          text: '分级菜单',
          visible: 1,
          // children: menus, //数组
        },
        refresh: {
          text: '刷新数据',
          visible: 1,
          method: 'refresh',
        },
        structure: {
          text: '产品结构配置',
          method: 'structure',
          visible: 1,
        },
      },
    },
    check: {
      id: 'check',
      visible: 1,
      icon: 'audit',
    },
    uncheck: {
      id: 'uncheck',
      visible: 1,
      icon: 'uncheck',
    },
    deletes: {
      id: 'deletes',
      visible: 1,
      order: 301,
      icon: 'delete',
    },
    more: {
      id: 'more',
      icon: 'more',
      visible: true,
    },
  };

  return (
    <>
      <ToolBar buttons={buttons} />
    </>
  );
};

export default Demo;
```

## API

| 参数         | 说明       | 类型 | 默认值 | 版本 |
| ------------ | ---------- | ---- | ------ | ---- |
| buttons      | 功能性按钮 |      |        |      |
| filterButton | 筛选按钮   |      | false  |      |

buttons 操作方法

| 参数    | 说明   | 类型 | 默认值 | 版本 |
| ------- | ------ | ---- | ------ | ---- |
| deploy  | 部署   |      |        |      |
| add     | 新增   |      |        |      |
| deletes | 删除   |      |        |      |
| copy    | 复制   |      |        |      |
| edit    | 编辑   |      |        |      |
| check   | 审核   |      |        |      |
| uncheck | 反审核 |      |        |      |
| link    | 绑定   |      |        |      |
| delink  | 解绑   |      |        |      |
| more    | 更多   |      |        |      |
| ......  |        |      |        |      |

操作方法配置

| 参数     | 说明            | 类型          | 默认值 | 版本 |
| -------- | --------------- | ------------- | ------ | ---- |
| visible  | 控制显示隐藏    |               |        |      |
| order    | 按钮排列顺序    |               |        |      |
| children | 子级列表        |               |        |      |
| method   | children 方法名 | 1 显示 0 隐藏 | 1      |      |
| text     | 按钮文字内容    |               |        |      |
