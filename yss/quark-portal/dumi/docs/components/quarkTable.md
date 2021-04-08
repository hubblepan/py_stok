---
nav:
  title: 组件
title: QuarkTable 表格
---

# QuarkTable 表格

#### 何时使用

- 当有大量结构化的数据需要展现时；
- 当需要对数据进行排序、搜索、分页、自定义操作等复杂行为时。

## 基本用法

```jsx
import React from 'react';
import 'antd/dist/antd.css';
import QuarkTable from '@/components/QuarkTable/index';

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
      key: '3',
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

## 可选择

```jsx
import React, { useState } from 'react';
import 'antd/dist/antd.css';
import QuarkTable from '@/components/QuarkTable/index';

export default () => {
  const rowSelection = {
    onChange: (selectedRowKeys, selectedRows) => {
      console.log(
        `selectedRowKeys: ${selectedRowKeys}`,
        'selectedRows: ',
        selectedRows,
      );
    },
    getCheckboxProps: record => ({
      name: record.name,
    }),
  };
  const dataSource = [
    {
      id: '1',
      name: '张新兰',
      age: 32,
      address: '上海市静安区人民大道135号',
    },
    {
      id: '2',
      name: '李新一',
      age: 42,
      address: '上海市静安区人民大道258号',
    },
    {
      id: '3',
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
        rowKey="id"
        rowSelection={rowSelection}
        columns={columns}
        dataSource={dataSource}
      />
    </>
  );
};
```

## 树型表格

```jsx
import React, { useState } from 'react';
import 'antd/dist/antd.css';
import QuarkTable from '@/components/QuarkTable/index';
import { CaretDownOutlined, CaretRightOutlined } from '@ant-design/icons';

export default () => {
  const dataSource = [
    {
      key: '1',
      name: '张新兰',
      age: 32,
      address: '上海市静安区人民大道135号',
      children: [
        {
          key: '12',
          name: '李新一',
          age: 42,
          address: '上海市静安区人民大道258号',
        },
        {
          key: '13',
          name: '王严希',
          age: 22,
          address: '上海市静安区人民大道37号',
        },
      ],
    },
    {
      key: '2',
      name: '赵齐欢',
      age: 42,
      address: '北京市朝阳区人民大道258号',
    },
    {
      key: '3',
      name: '胡严斌',
      age: 22,
      address: '北京市朝阳区人民大道37号',
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
        bordered
        rowKey="key"
        destroyOnClose
        columns={columns}
        pagination={false}
        expandable={{
          defaultExpandAllRows: true,
          expandIcon: ({ expanded, onExpand, record }) => {
            if (record.isLeaf) {
              return null;
            }
            return expanded ? (
              <CaretDownOutlined
                style={{ marginRight: '8px' }}
                onClick={e => onExpand(record, e)}
              />
            ) : (
              <CaretRightOutlined
                style={{ marginRight: '8px' }}
                onClick={e => onExpand(record, e)}
              />
            );
          },
        }}
        dataSource={dataSource}
      />
    </>
  );
};
```

## API

| 参数         | 说明                                           | 类型                                                             | 默认值  | 版本 |
| ------------ | ---------------------------------------------- | ---------------------------------------------------------------- | ------- | ---- |
| bordered     | 是否展示外边框和列边框                         | boolean                                                          | false   |      |
| columns      | 表格列的配置描述                               | [ColumnsType](https://ant.design/components/table-cn/#Column)[]  |         |      |
| dataSource   | 数据数组                                       | object[]                                                         |         |      |
| expandable   | 配置展开属性                                   | [expandable](https://ant.design/components/table-cn/#expandable) |         |      |
| footer       | 表格尾部                                       |                                                                  |         |      |
| rowKey       | 表格行 key 的取值，可以是字符串或一个函数      |                                                                  | key     |      |
| rowSelection | 表格行是否可选择                               | object                                                           |         |      |
| scroll       | 表格是否可滚动，也可以指定滚动区域的宽、高     | object                                                           |         |      |
| title        | 表格标题                                       |                                                                  |         |      |
| onChange     | 分页、排序、筛选变化时触发                     |                                                                  |         |      |
| onRow        | 设置行属性                                     |                                                                  |         |      |
| size         | 表格大小                                       | default、middle、small                                           | default |      |
| ......       | 其他 API 详情请查看 Ant Design 官网 Modal 组件 |                                                                  |         |      |

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
