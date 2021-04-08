import React, {
  useState,
  useRef,
  useEffect,
  useLayoutEffect,
  useCallback,
  createContext,
} from 'react';
import EditDropDown from './components/editDropDown';

export const masterColumns = [
  {
    title: '分类名称',
    key: 'c_GROUP_NAME',
    dataIndex: 'c_GROUP_NAME',
    // sorter: true,
    resizable: true,
    width: 120,
    // render: (text, record, index) => {
    //   const props = { content: text, row: record }
    //   return <EditDropDown {...props} toolbar={[]} />
    // }
  },
  {
    title: '分类编码',
    key: 'c_GROUP_CODE',
    dataIndex: 'c_GROUP_CODE',
    sorter: true,
    resizable: true,
  },
];

export const subColumns = [
  {
    title: '组合名称',
    dataIndex: 'c_PORT_NAME',
    key: 'c_PORT_NAME',
    width: 100,
    fixed: 'left',
    // sorter: true,
    search: true,
    resizable: true,
    hidden: false,
    export: true,
    widget: 'input',
    onFilter: (value, record) => record.mainCode.includes(value),
  },
  {
    title: '组合代码',
    dataIndex: 'c_PORT_CODE',
    key: 'c_PORT_CODE',
    width: 100,
    search: true,
    // sortable: true,
    resizable: true,
    // index: 1,
    show: true,
    export: true,
    widget: 'input',
    sorter: (a, b) => a.indexName.length - b.indexName.length,
  },
  {
    title: '组合级别',
    dataIndex: 'c_DV_PORT_CODE',
    width: 120,
    key: 'c_DV_PORT_CODE',
  },

  {
    title: '操作人',
    key: 'operator',
    dataIndex: 'operator',
    width: 120,
  },
  {
    title: '操作时间',
    key: 'modifyDate',
    // width: 100,
    dataIndex: 'modifyDate',
  },
]
