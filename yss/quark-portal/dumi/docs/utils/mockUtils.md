---
nav:
  title: 工具
title: MockUtils
---

## 模拟功能

- 根据数据模板生成模拟数据
- 模拟 Ajax 请求，生成并返回模拟数据
- 基于 HTML 模板生成模拟数据

## 用法示例

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
  'get /api/server/query': function(req, res) {
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

## 接口规则

> 请求方法常用有三种：GET、POST、DELETE。  
> 测试接口是否成功可选择 postman 测试。

- 接口命名后面 + /query 表示查询功能
- query 方法需要传入四个参数：dataList，data 需要查询的数据，pageNo 页码，pageSize 页的大小

```js
// 举例
export default {
  'get /api/server/query': function(req, res) {
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

## 使用方法

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
