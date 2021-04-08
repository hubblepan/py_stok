# 指南

## 介绍



> QuarkUI是赢时胜自研的一套针对本公司业务场景而封装的可视化组件，框架提供组件（Component）、块（Block）以及针对块而设计的通用业务逻辑服务、工具等。通过使用QuarkUI，可以提高开发效率，减少因开发不规范引起的性能问题。



### 主要特性

- 组价化，各组件可独立应用于任意页面中
- 功能块，提供通用的面板，简便页面的开发逻辑
- 集成Mock，支持前后端分离开发
- 支持按需引入
- 个性化全局样式封装，提供通用的样式



### 在线文档

**文档地址：**http://192.168.2.10:9001 (暂未部署)



除了在线文档，也支持在本地查看，在本地查看可以和在线文档保持一致，并且本地文档能确保文档内容的最新版本。

**启动文档：**

进入项目根目录，通过 `npm` 或 `yarn` 进行启动 ：

```shell
npm run dumi
# 或   
yarn run dumi
```



## 快速上手

### 环境需求

- Ant Design4.0以上版本，NodeJs 10.13以上。



### 环境部署

#### 安装依赖

通过 `npm` 或 `yarn` 进行安装，**推进使用`yanr`命令进行安装**：

```shell
npm install
# 或
yarn install
```

#### 启动项目

```shell
npm start    
# 或   
yarn start
```





# 组件（Component）

## ToolBar

### 普通工具栏

```jsx
import React from 'react';
import 'antd/dist/antd.css';
import ToolBar from '@/components/TableView/ToolBar';

const Demo = () => {
  const buttons = {
    add: {
      id: 'add',
      visible: 1,
    },
    check: {
      id: 'check',
      visible: 1,
    },
    uncheck: {
      id: 'uncheck',
      visible: 1,
    },
    deletes: {
      id: 'deletes',
      visible: 1,
      order: 301,
    },
    more: {
      id: 'more',
      visible: true,
    },
  };

  return <ToolBar buttons={buttons} />;
};

export default Demo;
```

### 带下拉框的工具栏

```jsx
import React from 'react';
import 'antd/dist/antd.css';
import ToolBar from '@/components/TableView/ToolBar';

const Demo = () => {
  const buttons = {
    add: {
      id: 'add',
      visible: 1,
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
    },
    uncheck: {
      id: 'uncheck',
      visible: 1,
    },
    deletes: {
      id: 'deletes',
      visible: 1,
      order: 301,
    },
    more: {
      id: 'more',
      visible: true,
    },
  };

  return <ToolBar buttons={buttons} />;
};

export default Demo;
```



### API

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

| 参数     | 说明           | 类型          | 默认值 | 版本 |
| -------- | -------------- | ------------- | ------ | ---- |
| visible  | 控制显示隐藏   |               |        |      |
| order    | 按钮排列顺序   |               |        |      |
| children | 子级列表       |               |        |      |
| method   | children方法名 | 1 显示 0 隐藏 | 1      |      |
| text     | 按钮文字内容   |               |        |      |



## QuarkTable

何时使用？

- 当有大量结构化的数据需要展现时；
- 当需要对数据进行排序、搜索、分页、自定义操作等复杂行为时。

### 基本用法

```jsx
import React from 'react';
import 'antd/dist/antd.css';
import QuarkTable from '@/components/TableView/QuarkTable';

export default () => {
  const dataSource = [
    {
      key: '1',
      name: '张新兰',
      age: 32,
      address: '上海市静安区人民大道135号',
    },
    {
      key: '2',
      name: '李新一',
      age: 42,
      address: '上海市静安区人民大道258号',
    },
    {
      key: '2',
      name: '王严希',
      age: 22,
      address: '上海市静安区人民大道37号',
    },
  ];
  const columns = [
    {
      id: 1,
      title: '姓名',
      dataIndex: 'name',
      key: 'name',
    },
    {
      id: 2,
      title: '年龄',
      dataIndex: 'age',
      key: 'age',
    },
    {
      id: 3,
      title: '住址',
      dataIndex: 'address',
      key: 'address',
    },
  ];

  return (
    <>
      <QuarkTable
        columns={columns}
        dataSource={dataSource}
        rowSelection={false}
      />
    </>
  );
};
```

### API

| 参数         | 说明                                           | 类型                                                         | 默认值  | 版本 |
| ------------ | ---------------------------------------------- | ------------------------------------------------------------ | ------- | ---- |
| bordered     | 是否展示外边框和列边框                         | boolean                                                      | false   |      |
| columns      | 表格列的配置描述                               | [ColumnsType](https://ant.design/components/table-cn/#Column)[] |         |      |
| dataSource   | 数据数组                                       | object[]                                                     |         |      |
| expandable   | 配置展开属性                                   | [expandable](https://ant.design/components/table-cn/#expandable) |         |      |
| footer       | 表格尾部                                       |                                                              |         |      |
| rowKey       | 表格行 key 的取值，可以是字符串或一个函数      |                                                              | key     |      |
| rowSelection | 表格行是否可选择                               | object                                                       |         |      |
| scroll       | 表格是否可滚动，也可以指定滚动区域的宽、高     | object                                                       |         |      |
| title        | 表格标题                                       |                                                              |         |      |
| onChange     | 分页、排序、筛选变化时触发                     |                                                              |         |      |
| onRow        | 设置行属性                                     |                                                              |         |      |
| size         | 表格大小                                       | default、middle、small                                       | default |      |
| ......       | 其他 API 详情请查看 Ant Design 官网 Modal 组件 |                                                              |         |      |

rowSelection 选择功能的配置。

| 参数            | 说明                                            | 类型 | 默认值 | 版本 |
| --------------- | ----------------------------------------------- | ---- | ------ | ---- |
| renderCell      | 渲染勾选框，用法与 Column 的  `render`  相同    |      |        |      |
| selectedRowKeys | 指定选中项的 key 数组，需要和 onChange 进行配合 |      | []     |      |
| onChange        | 选中项发生变化时的回调                          |      |        |      |
| onSelect        | 用户手动选择/取消选择某行的回调                 |      |        |      |
| onSelectAll     | 用户手动选择/取消选择所有行的回调               |      |        |      |
| .......         | 其他 API 详情请查看 Ant Design 官网 Modal 组件  |      |        |      |

expandable 展开功能的配置。

| 参数                   | 说明                                           | 类型     | 默认值 | 版本 |
| ---------------------- | ---------------------------------------------- | -------- | ------ | ---- |
| defaultExpandAllRows   | 初始时，是否展开所有行                         | boolean  | false  |      |
| defaultExpandedRowKeys | 默认展开的行                                   | string[] |        |      |
| expandedRowKeys        | 展开的行，控制属性                             | string[] |        |      |
| expandIcon             | 自定义展开图标                                 |          |        |      |
| onExpand               | 点击展开图标时触发                             |          |        |      |
| ......                 | 其他 API 详情请查看 Ant Design 官网 Modal 组件 |          |        |      |

## QuarkModal

何时使用？

>  需要用户处理事务，又不希望跳转页面以致打断工作流程时，可以使用 QuarkModal 在当前页面正中打开一个浮层，承载相应的操作。

### 基本用法

```jsx
import React, { useState } from 'react';
import { Button } from 'antd';
import QuarkModal from "@/components/TableView/QuarkModal";

const Demo = () => {
    const [ visible, setVisible ]=useState(false);
    const showModal = () => {
        setVisible(true)；
    }
    return (
      <>
        <Button type="primary" onClick={showModal}>
          点击QuarkModal
        </Button>
        <QuarkModal
           title="demo"
           visible={ visible }
           onCancel={()=>{
              setVisible(false);
           }}
           onOk={()=>{
              setVisible(false);
           }}
        >
          弹框内容
        </QuarkModal>   
      </>
    )  
}
export default Demo;
```



### 自定义模态框宽度 

```jsx
import React, { useState } from 'react';
import 'antd/dist/antd.css';
import QuarkModal from '@/components/QuarkModal/index';
import { Button } from 'antd';

const Demo = () => {
  const [visible, setVisible] = useState(false);
  return (
    <>
      <Button type="primary" onClick={() => setVisible(true)}>
        Open QuarkModal of 1000px width
      </Button>
      <QuarkModal
        title="QuarkModal 1000px width"
        centered
        visible={visible}
        onOk={() => setVisible(false)}
        onCancel={() => setVisible(false)}
        width={1000}
      >
        <p>some contents...</p>
        <p>some contents...</p>
        <p>some contents...</p>
      </QuarkModal>
    </>
  );
};
export default Demo;

```



### API

| 参数        | 说明                                           | 类型      | 默认值 | 版本 |
| ----------- | ---------------------------------------------- | --------- | ------ | ---- |
| title       | 标题                                           |           |        |      |
| visible     | 对话框是否可见                                 |           |        |      |
| footer      | 当不需要默认底部按钮时，可设为 `footer={null}` | ReactNode |        |      |
| modalRender | 自定义渲染对话框                               |           |        |      |
| style       | 可用于设置浮层的样式，调整浮层位置等           |           |        |      |
| width       | 宽度                                           |           | 900    |      |
| closeIcon   | 自定义关闭图标                                 |           |        |      |
| onOk        | 点击确定回调                                   |           |        |      |
| ......      | 其他API详情请查看Ant Design官网Modal组件       |           |        |      |

## SvgIcon

### 自定义图标

```jsx
import React, { useState } from 'react';
import 'antd/dist/antd.css';
import SvgIcon from '@/components/SvgIcon/index';

export default () => {
  return (
    <>
      <SvgIcon icon="add" />
    </>
  );
};
```



### API

| 参数      | 说明     | 类型          | 默认值 | 版本 |
| --------- | -------- | ------------- | ------ | ---- |
| icon      | svg名字  |               |        |      |
| fill      | 填充颜色 |               |        |      |
| className | 类名     |               |        |      |
| style     | 样式     | CSSProperties |        |      |
| options   |          |               |        |      |



## FooterPane

## HeaderPane

## SearchPane

## ToolBarPane



# 块（Block）

块（block）是在基础组件为适应业务需求进一步封装的页面级组件，允许开发者以较少且明确的配置进行常见表格管理页面的开发。分为:

- MasterTablePane
- TablePane
- PagePane

是基于react和antd-pro分组的表格组件。

- 基于antdPro的简易数据流（<a href="https://beta-pro.ant.design/docs/simple-model-cn">useModel</a>）管理状态，遵循配置化的开发思路。
- 兼容树形表格（根据数据类型有children）。支持扩展显示
- 可扩展自定义的逻辑。
- 在组件基础上可扩展更多交互场景。

**为高效开发，block组件在使用时请遵循以下约定**：

- 后端返回值

```json
{
	data:{
		list:[<data>]
	}
}
```

- 对于树形数据，后端返回

```json
{
	data:{
		list:[
		  {id:1,...}
		  {
		  	id:2,
		  	children:[<data>]
		  }
		]
	}
}
```

- 接口约定：假设基础接口为`api/xxx/`，增/删/改/查/审核/反审核 请求后缀则对应为add/delete/edit/check/uncheck。
- 表格对于审核/未审核数据，以颜色区分（黄色为未审核），同时可进行修改。对应字段未审核checkStatus=0，否则为1。

## masterTablePane

MasterTablePane作为TwoColumnView的必备组件，显示于左右双表布局的左侧。也可以独立使用。

总体开发模式如下：

```jsx
// page/xxx/index.js
import MasterTablePane from '@/blocks/MasterTablePane';
const props={...}
export default () => <MasterTablePane {...props} />
```

props支持search 。层级结构如下

```
├─ props
│  ├─ search
│  ├─ toolbar
│  ├─ colums
|  ├─ tableProps
│  └─ model
```

### 搜索栏（search）

功能介绍：搜索栏支持前端搜索。

| 属性         | 数据类型 | 说明                            | 默认值      |
| ------------ | -------- | ------------------------------- | ----------- |
| formItems    | Array    | 存放表单组件/包含自定义表单组件 |             |
| searchName   | String   | 搜索的数据字段名                | 可选 ，'id' |
| searchRender | jsx      | 自定义渲染搜索栏内容            | 可选，null  |
| tableProps   | Object   | 支持antd Table组件配置。        | 必填        |
| columns      | Array    | 支持antd Table组件配置。        | 必填        |

**formItems**

```jsx
  // 搜索栏
  const searchBar = [
    <Input type="text" label="指标名称" name="indexName" />,
	 // ....
  ];
```

formItems是一个数组。存放表单组件/包含自定义表单组件

- label：表单名称
- name：表单域

**searchName（可选）**

搜索的数据字段名。默认为id。

**searchRender（可选）**

searchRender可传入一个jsx组件。用于自定义渲染搜索栏内容。如Select组件等

> 当配置searchRender后优先渲染searchRender，前面属性失效。

### 按钮工具栏（toolbar）

功能介绍：按钮栏接收一个对象，反映MasterTablePane的按钮显隐和交互表现。以及在此指定handles中的操作方法。

| 属性    | 数据类型 | 说明                            | 默认值 |
| ------- | -------- | ------------------------------- | ------ |
| buttons | Object   | 存放表单组件/包含自定义表单组件 | 必填   |

> 当配置searchRender后优先渲染searchRender，前面属性失效。

toolbar体现对表格数据的按钮。

示例：

```jsx
const props={
	// ...
	toolbar: {
    buttons: {
      test: {
        text: '检测',
        method: 'test',
        order: 20,
        visible: true,
      },
      unload: {
        id: 'unload',
        text: '卸载',
        method: 'unload',
        visible: true,
        order: 30,
      },
      more: {
        visible: true,
      },
    },
  }
}		
```

buttons  api说明：

| 参数    | 数据类型 | 说明                                       | 默认值                                       | 版本 |
| ------- | -------- | ------------------------------------------ | -------------------------------------------- | ---- |
| text    | String   | 按钮文字内容                               | undefined                                    |      |
| visible | Boolean  | 配置为0时不显示。否则为1                   | 自定义按钮为0，对于内置按钮，为1<sup>*</sup> |      |
| method  | String   | 方法对应handle的同名方法，配置后可直接绑定 | undefined                                    |      |
| orders  | Number   | 排序权重，大者居前                         | undefined                                    |      |
|         |          |                                            |                                              |      |

当存在children时，将以dropdown的形式体现子菜单。

> \* 意味着你如果不需要某些按钮，必须制定对应按钮visible为0.

**按钮的状态控制**

参见[model >  handles > 按钮状态表现（ButtonState）](#title)。

**按钮方法绑定**

对于toolbar的按钮

>  参见[model >  handles > 按钮操作方法](#title)。

### 表格相关( tableProps)

MasterTablePane默认使用quarkTable类表格组件作为数据展示容器。此处兼容antd Table的属性配置。

>  参见[组件 >  QuarkTable ](#title)。

### colums

colums可依照antd Table的属性进行配置。注意层级位置

示例：

```js
  const columns = [
    {
      title: '指标别名',
      dataIndex: 'indexAlias',
      width: 120,
      key: 'indexAlias',
    },

    {
      title: '指标规范版本',
      key: 'indexVersion',
      dataIndex: 'indexVersion',
      width: 120,
    },
  ];
```

### tableProps

扩展于QuarkTable组件属性。如不需要某些属性，覆写即可。

```js
tableProps: {
        rowKey: 'id', // 必填
        expandable: {
          defaultExpandAllRows: true, // 默认展开所有行
        },
      }
```

### RenderTable

指定自定义的table组件替代内置的table。

> 配置后，需自定义相应的状态方法。之前与内置quarkTable的相关操作方法将失效。

### handles

> 参见[模型 >  handles ](#title)。

### models

配置时，需要从对应model中获取状态，完成整个组件的状态绑定。

```js
const props={
  // ...
  model:useModel('xxx')
}
```

> 参见[模型 >  models ](#title)。



## TablePane

TablePane作为TwoColumnView的必备组件，显示于左右双表布局的右侧。也独立适用于大多数单表数据管理场景。

总体开发模式如下：

```jsx
// page/xxx/index.js
import TablePane from '@/blocks/TablePane';
const props={...}
export default () => <TablePane {...props} />
```

props。层级结构如下

```
├─ props
│  ├─ search
│  ├─ toolbar
│  ├─ colums
|  └─ tableProps
```

**TablePane和MasterTablePane配置高度相似，在此除了陈列api，只会介绍不同点。**

### 搜索栏（search）

功能介绍：搜索栏支持后端搜索（请求方式：GET）。

| 属性         | 数据类型 | 说明                            | 默认值     |
| ------------ | -------- | ------------------------------- | ---------- |
| formItems    | Array    | 存放表单组件/包含自定义表单组件 | null       |
| searchRender | jsx      | 自定义渲染搜索栏内容            | 可选，null |
| tableProps   | Object   | 支持antd Table组件配置。        | 必填       |
| columns      | Array    | 支持antd Table组件配置。        | 必填       |
| model        | Object   | 状态                            | 必填       |

> 具体相关配置可参见[block > MasterTablePane > search](#title)。

### 按钮栏（toolbar）

功能介绍：按钮栏接收一个对象，反映MasterTablePane的按钮显隐和交互表现。

| 属性    | 数据类型 | 说明                                                         | 默认值 |
| ------- | -------- | ------------------------------------------------------------ | ------ |
| buttons | Object   | 存放表单组件/包含自定义表单组件<br>与MasterTablePane不一样之处。在于此处为扁平配置，见下节示例 | null   |

> 当配置searchRender后优先渲染searchRender，前面属性失效。

### toolbar（props.toolbar）

toolbar体现对表格数据的按钮。

示例：

```jsx
const props={
	// ...
	toolbar: {
    buttons: {
      test: {
        text: '检测',
        method: 'test',
        order: 20,
        visible: true,
      },
      unload: {
        id: 'unload',
        text: '卸载',
        method: 'unload',
        visible: true,
        order: 30,
      },
      // 涉及多个按钮可在“更多中隐藏”  
      more: {
        visible: true,
      },
    },
  }
}		
```

**按钮的状态控制**

参见[模型 >  handles > 按钮状态表现（ButtonState）](#title)。

**按钮方法绑定**

参见[模型 >  handles > 按钮操作方法](#title)。

###表格相关( tableProps)

MasterTablePane默认使用quarkTable类表格组件作为数据展示容器。此处兼容antd Table。

>  参见[组件 >  QuarkTable ](#title)。

### colums

colums可依照antd Table的属性进行配置。

示例

```js
  const columns = [
    {
      title: '指标别名',
      dataIndex: 'indexAlias',
      width: 120,
      key: 'indexAlias',
    },

    {
      title: '指标规范版本',
      key: 'indexVersion',
      dataIndex: 'indexVersion',
      width: 120,
    },
  ];
```

### tableProps

扩展于antd 的Table属性。如不需要某些属性，覆写即可。

```js
tableProps: {
        rowKey: 'id', // 必填
        expandable: {
          defaultExpandAllRows: true, // 默认展开所有行
        },
      }
```

### RenderTable

指定自定义的table组件替代内置的table。

> 配置后，需自定义相应的状态方法。

### handles

> 参见[工具类 >  handles ](#title)。

### models

此处需要从对应model中获取状态，完成整个组件的状态绑定。

```js
const props={
  // ...
  model:useModel('xxx')
}
```

## PagePane

TwoColumnView体现的是MasterTable和TablePane同时使用的场景。其中：

- MasterTablePane->主表
- TablePane->SubTablePane->子表

子表依赖主表选中进行查询。查询依据默认为ids。

总体开发模式如下：

```jsx
// page/xxx/index.js
import TwoColumnView from '@/blocks/TwoColumnView';
const props={...}
export default () => <TwoColumnView {...props} />
```

props支持search 。层级结构如下

```
├─ props
│  ├─ title
│  ├─ masterTable
│  └─ subTable
```

### 基本属性

| 属性        | 数据类型 | 说明                                                     | 默认值   |
| ----------- | -------- | -------------------------------------------------------- | -------- |
| title       | String   | TwoColumnView组件特有,反映标题                           | ''。可选 |
| masterTable | Object   | 一份完整的主表配置，参见[blocks > masterTable](#title)。 | 必填     |
| subTable    | Object   | 一份完整的子表配置，[blocks > TablePane](#title)。       | 必填     |

### 开发示例

> 示例需求：按照一份主表和子表的查询逻辑使用TwoColumnView开发xxx页面。
>
> 其中主表包括demo按钮，子表包括a，b按钮，以及默认的增删改查按钮

**建立model**

在`page/xxx`下新建该页面models，结构为：

```
├─ xxx
│  ├─ models
│  │	├─ master
│  │	└─ sub
```

使用baseModel快速生成：

```js
// model/master.js
// model/sub.js
import baseModel from '@/components/TableView/baseModel';
export default () => {
  return baseModel({});
};
```

**创建handles**

在`page/xxx`下新建该页面handles，结构为：

```
├─ xxx
│  ├─ model...
│  ├─ handles
│  │	├─ master
│  │	└─ sub
```

```js
// handles/master.js
import BaseHandle from '@/components/TableView/BaseHandle';
import BaseService from '@/components/TableView/BaseService';
import ButtonState from '@/components/TableView/ButtonState';
import BaseState from '@/components/TableView/BaseState';
import BeanUtil from '@/utils/BeanUtil';
import { useModel } from 'umi';

export default class MasterHandle extends BaseHandle {
  constructor(params) {
    const modelName = 'xxx.master';
    const modal = useModel(modelName);
    const service = new BaseService({ base: '/api/xxx/master' });
    const buttonState = BeanUtil.merge(BaseState, {});

    super({ service, buttonState, ...modal, ...params });
  }
}

```

```js
// handles/master.js
import BaseHandle from '@/components/TableView/BaseHandle';
import BaseService from '@/components/TableView/BaseService';
import ButtonState from '@/components/TableView/ButtonState';
import BaseState from '@/components/TableView/BaseState';
import BeanUtil from '@/utils/BeanUtil';
import { useModel } from 'umi';

export default class SubHandle extends BaseHandle {
  constructor(params) {
    const modelName = 'targetParams.sub';
    const modal = useModel(modelName);
    const service = new BaseService({ base: '/api/xxx/sub' });
    const buttonState = BeanUtil.merge(BaseState, {});

    super({ service, buttonState, ...modal, ...params });
  }
	// 点击a按钮事件
  a() {
    console.log(this)
    consolel.log('xxx')
  }
  // 点击b按钮事件
  b() {
    console.log(this)
    consolel.log('xxx')
  }
}

```

**具体页面开发**

```js
├─ xxx
│  ├─ models...
│  ├─ handles...
│  └─ index.jsx
```

```jsx
// xxx/index.jsx
import {
  SettingOutlined,
  SearchOutlined,
  ProfileOutlined,
  ExclamationCircleOutlined,
  FileTextOutlined,
} from '@ant-design/icons';
import { Input, Select,} from 'antd';
import styles from './style.less';
import MasterHandle from './handles/MasterHandle';
import SubHandle from './handles/SubHandle';
import { useModel } from 'umi';
import PagePane from '@/blocks/PagePane';

const Index = (props) => {
  const masterModel = useModel('xxx.master');
  const model = useModel('xxx.sub');

  const masterHandle = new MasterHandle();
  const subHandle = new SubHandle();


  // 表格column
  const masterTableColumns = [
    {
      title: '主表字段',
      key: 'typeName',
      dataIndex: 'typeName',
      sorter: true,
      resizable: true,
    },
  ];

  // 子表列
  const subTableColumns = [
    {
      title: '指标代码',
      dataIndex: 'indexCode',
      key: 'indexCode',
      width: 100,
      fixed: 'left',
      search: true,
      resizable: true,
      hidden: false,
      export: true,
      widget: 'input',
      onFilter: (value, record) => record.mainCode.includes(value),
    },
		// ...
    {
      title: (
        <a
          href="#"
          onClick={(e) => {
            e.preventDefault();
          }}
        >
          <SettingOutlined />
        </a>
      ),
      key: 'sets',
      width: 80,
      dataIndex: 'sets',
      fixed: 'right',
      resizable: true,
      render: (text, record, index) => {
        return (
          <div style={{ wordWrap: 'break-word', wordBreak: 'break-word' }}>
            <Tooltip title="指标详情">
              <a
                href="#"
              >
                <ProfileOutlined />
              </a>
            </Tooltip>
          </div>
        );
      },
    },
  ];

  // 工具栏
  const masterTabletoolbar = {
    buttons: {
      dashed: {
        visible: 1,
        children: {
          add: {
            text: 'demo',
            method: 'demo',
            visible: true,
          }
        },
      },
    },
  };

  const subTabletoolbar = {
    buttons: {
      a: {
        text: '子表按钮a',
        visible: true,
        method: 'a',
        order: 10,
      },
			b: {
        text: '子表按钮b',
        visible: true,
        method: 'b',
        order: 20,
      },
      more: {
        visible: true,
      },
    },
  };

  // 子表搜索栏
  const subTableSearchBar = [
    <Input type="text" label="指标名称" name="indexName" />,
    <Select label="监控状态" name="monitorStatus">
      <Select.Option value="rmb">RMB</Select.Option>
      <Select.Option value="dollar">Dollar</Select.Option>
    </Select>,
  ];


  const p = {
    title: '指标管理',
    // 左侧主表
    masterTable: {
      ...masterModel,
      columns: masterTableColumns,
      toolbar: masterTabletoolbar,
      tableProps: {
        rowKey: 'id', // 必填
      },
      handles: masterHandle,
      search: {
        searchName: 'typeName',
        formItems: [<Input placeholder="请输入关键词搜索" prefix={<SearchOutlined />} />],
      },
    },
    // 右侧从表
    subTable: {
      ...model,
      columns: subTableColumns,
      toolbar: subTabletoolbar,
      queryParams: 'typeName', // 查询子表的字段值
      autoQuery: false, // 如果为true时必须指定对应规则 autoQuery
      search: {
        formItems: subTableSearchBar,
      },
      // 可配置项
      tableProps: {
        rowKey: 'indexCode', // 必填
				// 可扩展
        expandable: {
          defaultExpandAllRows: false,
          expandedRowRender: (record) => {
            return <p style={{ margin: 0 }}>{record.description}</p>;
          },
          expandIconColumnIndex: 1,
        },
      },
      handles: subHandle,
    },
  };

  return (
    <>
      <PagePane ref={comRef} {...p} />
    </>
  );
};

export default Index;
```



# 项目实战

## 单表示例

使用TablePane创建一个curd的用户列表管理（userManarge）页面。

### 创建mock服务

根据框架约定创建mock服务：假定接口为：`/ocp/userManage`

```js
/**
 * mock接口
 */
import Mock from 'mockjs';
import { query, detail, save, deletes, changeState } from './MockUtil';

/**
 * 生成数据列表
 */
const getDataList = () => {
  const tempList = []
  for (let i = 0; i < 10; i += 1) {
    const listItem = Mock.mock({
      id: '@id',
      key: '@id',
      paramName: '@string(upper,7)',
      paramCondition: '@first',
      paramValue: '@natural(18,40)',
      paramValueCode: '@natural(18,40)',
      checkState: Math.random() > 0.5 ? 1 : 0,
    });
    tempList.push(listItem);
  }
  return tempList;
};

let dataList = getDataList();

export default {
  // 查询
  'GET /ocp/userManage/query': function (req, res) {
    const { data, pageNo, pageSize } = req.query;
    const result = {
      code: 'SUCCESS',
      data: { list: query(dataList, data, pageNo, pageSize), total: dataList.length },
      success: true,
      msg: '查询成功！',
    };
    res.json(result);
  },

  // 新增
  'POST /ocp/userManage/save': function (req, res) {
    const item = req.body;
    res.json(save(dataList, item));
  },

  // 删除
  'DELETE /ocp/userManage/deletes': function (req, res) {
    const { ids } = req.body;
    dataList = deletes(dataList, ids);
    res.json({
      code: '200',
      data: null,
      success: true,
      msg: '删除成功！',
    });
}
```

### 创建Models

在`page/userManage`下新建该页面models，结构为：

```
├─ userManage
│  ├─ models.js
│  

```

使用baseModel快速生成：

```js
// model/index.js
import baseModel from '@/components/TableView/baseModel';
export default () => {
  return baseModel({
    mode:'add' // 扩展模态框模式
  });
};
```

此时models的命名空间为`userManage`。

### 创建handles

在`page/userManage`下新建该页面handles，结构为：

```
├─ userManage
│  ├─ model...
│  ├─ handles
│  │	└─ index.js

```

```js
//  handles/index.js
import BaseHandle from '@/components/TableView/BaseHandle';
import BaseService from '@/components/TableView/BaseService';
import ButtonState from '@/components/TableView/ButtonState';
import BaseState from '@/components/TableView/BaseState';
import BeanUtil from '@/utils/BeanUtil';
import { useModel } from 'umi';

export default class TableHandle extends BaseHandle {
  constructor(params) {
    const modelName = 'userManage';
    const modal = useModel(modelName);
    // 配置基础接口
    const service = new BaseService({ base: '/ocp/userManage' });
    // 按钮状态采用默认配置即可
    const buttonState = BeanUtil.merge(BaseState, {});
		
    super({ service, buttonState, ...modal, ...params });
  }
  
  add(){
    this.setFormVisible(true);
    this.setFormData(null);
    this.setMode('add')
  }
  
  edit(){
    this.setFormVisible(true);
    this.setFormData(this.detailData);
    this.setMode('edit')
  }

}

```

### 界面文件

在`src/pages/userManage`目录下新建文件`index.jsx`

```
├─ userManage
│  ├─ model...
│  ├─ handles
│  └─ index.jsx

```

```jsx
import React from 'react';
import { useModel } from 'umi';
import TablePane from '@/xxxxxxx/TablePane';
import Handles from './handles';

// 新增/编辑定义模态框
// 注意，如果想要使用框架内置，务必讲visible的状态设置为showForm
const EditModal = (...args)=>{
  // return <QuarkModal ... />
}

// 子表搜索栏,包含两个表单组件
const tableSearchBar = [
  <Input type="text" key="1" label="方案名称" name="schemeName" />,
  <Select label="方案代码" key="2" name="schemeCode">
    <Select.Option value="rmb">RMB</Select.Option>
    <Select.Option value="dollar">Dollar</Select.Option>
  </Select>,
];

// 表格列
const columns = [
  // 表格columns
  {
    title: '参数名称',
    dataIndex: 'paramName',
  },
  {
    title: '参数条件',
    dataIndex: 'paramCondition',
  },
  {
    title: '参数值',
    dataIndex: 'paramValue',
  },
  {
    title: '参数关联值',
    dataIndex: 'paramValueCode',
  },
  {
    title: '审核状态',
    dataIndex: 'checkState',
  },
];

const UserIndex = () => {
  const modelName = 'userManage';
  const model = useModel(modelName);
  const {formVisible,setFormVisible,FormData,setFormData } = model;
  const handles = new Handles();
  // TablePane属性
  const panelProps = {
    title: '用户管理',
    modelName,
    ...model,
    handles,
    autoQuery: true,    // 自动查询
    search: {           // 搜索栏
      formItems: tableSearchBar,
    },
    columns,            // 列
    toolbar: {          // 按钮栏
      buttons: {
        add: {
          visible: 1,
          // 内置按钮属性缺省时会自动绑定内置方法
        },
        edit: {
          visible: 1,
        },
        deletes: {
          visible: 1,
        },
        check: {
          visible: 0,
        },
        uncheck: {
          visible: 0,
        },
      },
      // 不显示“筛选”
      filterButton: false, 
    },
    tableProps: {},
    page: false,
  };

  return (
    <>
      <section className="page-wrapper a-card">
        <TablePane {...panelProps} />
      	{/*注意，如果想要使用框架内置，务必讲visible的状态设置为showForm*/} 
        <EditModal
           onCancel={() => setEditVisible(false)}
           modalVisible={formVisible}
           setModalVisible={setFormVisible}
           formData={formData}
           setFormData={setFormData}
           setForm={setForm}
           mode={mode}
         />
      </section>
    </>
  );
};

export default useManager;
```





## 普通双表示例

## 多模式双表示例



# 模型

## models

model需要提供block组件运行的必要状态，以及对应状态的设置方法。

其它页面如有需要，也可以使用model。使用指南参见umi的<a href="https://beta-pro.ant.design/docs/simple-model-cn">简易数据流</a>。

在 `src/page/xxx/models` 目录下新建文件，文件名会成为 model 的 namespace。

> eg. `xxx/models/demo.js` 的 namespace 是 `xxx.demo`

### model使用示例

一个 model 的内容需要是一个标准的 JavaScript function，并被默认导出，可以在 function 中使用 hooks。

以block组件的model为例：

```js
import { useState } from 'react';

export default () => {
  const [dataSource, setDataSource] = useState([]);
  const [formVisible, setFormVisible] = useState(false);
  const [params, setParams] = useState({});
  const [fromData, setFormData] = useState({});
  const [searchForm, setSearchForm] = useState(null);
  const [selectedRowKeys, setSelectedRowKeys] = useState([]);
  const [selectedRows, setSelectedRows] = useState([]);
  const [loading, setLoading] = useState(false);
  const [pageInfo, setPageInfo] = useState({ pageNo: 1, pageSize: 20, pageTotal: 30 });


  return {
    formVisible, // 模态框显隐
    setFormVisible,
    selectedRows,// 选中具体行
    setSelectedRows, 
    selectedRowKeys, // 选中行主键
    setSelectedRowKeys,
    params,// 传入额外的查询参数
    setParams,
    searchForm, // 搜索栏表单
    setSearchForm,
    fromData,// 
    setFormData,
    loading,// 加载中
    setLoading,
    dataSource, // 表格数据
    setDataSource,
    pageInfo, //分页信息
    setPageInfo,
  };
};

```

在具体页面中

```js
import { useModel } from 'umi';

const model=useModel('xxx.demo');
const {
  	formVisible,
    setFormVisible,
    // ...
}=models;
```

即可获取对应的状态。

### 快速生成models

在实际开发block组件的页面中，可以使用baseModel方法可快速生成默认的Model以及setModel方法，并提供扩展：

```js
// model/xxx.js
import baseModel from '@/components/TableView/baseModel';
export default () => {
  return baseModel({
    // 额外状态
    editVisible:false
  });
};
```

如上，传递一个自定义的`editVisible`可生成`editVisible`和对应同名的的`setEditVisible`方法。

如果开发非block组件，baseModel并非完全必要，根据业务需求，开发者也可以定义自身的生成model方法。

## handles

handles存放block组件按钮逻辑操作的核心。功能包括

- 状态容器
- 按钮状态表现
- 接口请求
- 按钮操作方法

handles在配置中。在项目中是建议作为独立文件定义。框架为开发者提供了一个基础的handles配置（BaseHandles），开发者需要对该类进行配置。

### 状态容器

框架通过baseModel方法把状态集成到handle中：

```js
// pages/xxx/handles/index.js
import BaseHandle from '@/components/TableView/BaseHandle';
import BaseService from '@/components/TableView/BaseService';
import ButtonState from '@/components/TableView/ButtonState';

export default class XxxHandle extends BaseHandle {
  constructor(params) {
    // 获取状态
    const modelName = 'xxx.demo';
    const modal = useModel(modelName);

    super({ ... ,...modal});
  }
  
  // ...具体方法
}
```

如上，即可在XxxHandle的方法中通过this获取状态，以及对应的set状态方法。

### 按钮状态表现(ButtonState)

框架通过ButtonState为开发者提供了增/删/改/审核/反审核的对应按钮状态控制。具体使用中，可直接`new ButtonState()`让其继承于handle。也可以根据自身需要扩展。

具体方法的入参为表格选中行，开发者可根据数据添加自身的过滤逻辑。

```js
// pages/xxx/handles/index.js
import BaseHandle from '@/components/TableView/BaseHandle';
import BaseService from '@/components/TableView/BaseService';
import ButtonState from '@/components/TableView/ButtonState';

// 自定义handles
class ButtonState extends ButtonState {
  constructor(props) {
    super(props);
  }

  xxx (selectedRows) {
    // 示例需求：操作xxx按钮需要选中数据xxx属性为1，只能对单条操作
    if(selectedRows.length!==1){
      return false;
    }
    if(selectedRows[0].xxx!=='1'){
      return false;
    }
    return true;
  }
  
}

export default class MasterHandle extends BaseHandle {
  constructor(params) {
    // 配置按钮状态
    const buttonState = new MasterButtonState();
    // ...
    super({ ..., buttonState });
  }
}
```

buttonState的操作也可以通过合并属性来实现：

```js
import BeanUtil from '@/utils/BeanUtil';

const buttonState = BeanUtil.merge(BaseState, {
  // 按钮配置
});
```

### 接口请求（BaseService）

框架通过BaseService把状态集成到handle中：

```js
// pages/xxx/handles/index.js
import BaseHandle from '@/components/TableView/BaseHandle';
import BaseService from '@/components/TableView/BaseService';
import ButtonState from '@/components/TableView/ButtonState';

export default class MasterHandle extends BaseHandle {
  constructor(params) {
    // 定义操作方法的接口
    const service = new BaseService({ base: '/api/xxx' });

    super({ ... ,...service});
  }
}
```

如上，即可在MasterHandle的方法中通过this.service做接口请求。

如有需要，baseService也可以单独使用扩展：

```js
const service = new SubService({
      base: '/ocp/monitor/sub',
      confirm: '/ocp/monitor/sub/confirm',
})

// 使用
service.confirm({id:1})
```

### 按钮操作方法

handle的具体方法提供了对表格数据进行增/删/改/审核/反审核等操作功能。在方法内部直接以this获取状态和状态设置方法。如果需要修改默认行为或增加操作方法，可以**类继承**的形式扩展该类。

```js
// pages/xxx/handles/index.js
import BaseHandle from '@/components/TableView/BaseHandle';
import BaseService from '@/components/TableView/BaseService';
import ButtonState from '@/components/TableView/ButtonState';

class MasterButtonState extends ButtonState {
  constructor(props) {
    super(props);
  }
  // 。。。	
}

export default class MasterHandle extends BaseHandle {
  constructor(params) {
    const modelName = 'target.master';
    const modal = useModel(modelName);
    const service = new BaseService({ base: '/ocp/indexinfo/indextype' });
    const buttonState = new MasterButtonState();

    super({ service, buttonState, ...modal, ...params });
  }
	// 根据应用场景覆写deletes
  deletes () {
    console.log(this)；// this包含状态
    console.log('deletessssss')
  }
	
  // 扩展其它的操作方法
  xxx (){
    console.log('当按钮配置xxx方法后，此方法被调用')
  }
  
}
```



# 工具（utils）

## MockUtil

### 模拟功能

- 根据数据模板生成模拟数据
- 模拟 Ajax 请求，生成并返回模拟数据
- 基于 HTML 模板生成模拟数据

### 用法示例

```js
import Mock from 'mockjs';
// MockUtil封装的是一些方法，包括查询明细、详情、保存、删除、变更数据状态 等方法；
import { query, detail, save, deletes, changeState } from './MockUtil';

// 快速生成数据列表
const getDataList = () => {
  const tempList = [];
  for (let i = 0; i < 25; i += 1) {
    // 生成25组随机数据
    const listItem = Mock.mock({
      mainCode: '@string(upper,7)', // 主体代码
      id: '@id', // 数据id
      mainName: '@first', // 主体名称
      mainNum: '@natural(18,40)', // 主体数量
      tags: '@id', //
      mainType: '@ctitle(2,4)', // 主体类型
      oraCode: '@integer(1000000,9999999)', // 组织代码
      creditCode: '@integer(100000,999999)', // 验证代码
      oraStyle: '@ctitle(2,4)', // 组织类型
      checkState: i % 2, // 审核状态
      selectable: i % 5 !== 0, // 用来控制这一行数据是不是能被选中，如果不能被选中，按钮将是禁用状态。
      selected: i % 3 === 0, // 默认选中
    });
    tempList.push(listItem);
  }
  return tempList;
};

export default {
  'get /api/server/query': function (req, res) {
    const { data, pageNo, pageSize } = req.query;
    const result = {
      code: 'SUCCESS',
      data: {
        list: query(dataList, data, pageNo, pageSize),
        total: dataList.length,
      },
      success: true,
      msg: '查询成功！',
    };
    res.json(result);
  },
};
```

### 接口规则

> 请求方法常用有三种：GET、POST、DELETE。  
> 测试接口是否成功可选择 postman 进行测试。

- 接口命名后面 + /query 表示查询功能
- query 方法需要传入四个参数：dataList，data 需要查询的数据，pageNo 页码，pageSize 页的大小

```js
// 举例
export default {
  'get /api/server/query': function (req, res) {
    const { data, pageNo, pageSize } = req.query;
    const result = {
      code: 'SUCCESS',
      data: {
        list: query(dataList, data, pageNo, pageSize),
        total: dataList.length,
      },
      success: true,
      msg: '查询成功！',
    };
    res.json(result);
  },
};
```

- 接口命名后面 + /detail 表示查询明细功能
- detail 需要传入一个参数：数据 id

```js
// 举例
'get /api/server/detail': function (req, res) {
    const { id } = req.query;
    res.json(detail(dataList, id));
},
```

- 接口命名后面 + /save 表示保存功能
- save 需要传入一个参数：需要保存的数据 item

```js
// 举例
'post /api/server/save': function (req, res) {
    const item = req.body;
    res.json(save(dataList, item));
    },
```

- 接口命名后面 + /deletes 表示删除功能
- deletes 需要传入一个参数：要删除的多个数据 ids

```js
// 举例
'delete /api/server/deletes': function (req, res) {
    const { ids } = req.body;
    console.log(ids);
    dataList = deletes(dataList, ids);
    res.json({
        code: '201',
        data: null,
        success: true,
        msg: '删除成功！',
    });
    },
```

- 接口命名后面 + /check 表示审核功能
- changeState 需要传入一个参数：数据 dataList，ids，审核状态 1

```js
// 举例
'post /api/server/check': function (req, res) {
    const { ids } = req.body;
    console.log(ids);
    return res.json(changeState(dataList, ids, 1));
    },
```

- 接口命名后面 + /uncheck 表示反审核功能
- changeState 需要传入一个参数：数据 dataList，ids，审核状态 0

```js
// 举例
'post /api/server/uncheck': function (req, res) {
    const { ids } = req.body;
    console.log(ids);
    return res.json(changeState(dataList, ids, 0));
    },
```

### 使用方法

- 第一种情况：使用框架

此种情况下，不需要单独封装 services 函数，直接引用框架里面的 toolbar 即可。

- 第二种情况：不使用框架

此种情况下，需要单独封装 services 函数，然后调用封装的函数名即可（示例说明）。

```js
import request from '@/utils/request';

// 封装查询接口，在调用的时候，只需调用query（）方法即可。
export async function query() {
  return request('/ocp/sysparam/query');
}

// 有参数调用时写法
export async function saveData(params) {
  return request('/ocp/sysparam/xxxxxx', {
    method: 'POST',
    data: { ...params },
  });
}
```

- 其他封装的函数同上。





## 全局样式style封装



...

## request请求

...

## 消息框MsgBox

...

## 会话工具类session、local封装



...

### 































