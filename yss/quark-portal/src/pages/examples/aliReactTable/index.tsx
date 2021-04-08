import React, { useMemo, useState, useCallback } from 'react';
import { connect } from 'dva';
import { Input, Select } from 'antd';
import TablePane from '@/blocks/AliTablePane';
import BaseHandle from '@/handles/BaseHandle';
import { mapDispatchToProps } from '@/handles/BaseModel';
import BeanUtil from '@/utils/BeanUtil';

import { MenuOutlined } from '@ant-design/icons';
import { sortableHandle } from 'react-sortable-hoc';
import ModalAdd from './add-list/index';

const DragHandle = sortableHandle(() => (
  <MenuOutlined style={{ cursor: 'pointer', color: '#999' }} />
));

const IndexPage = (props: any) => {
  const { tableDemo: model } = props;

  console.log('aliReactTable======', props);

  const handles = useMemo(() => {
    return new BaseHandle({ ...model, url: { base: '/api/server' } });
  }, []);

  const { formVisible, setFormVisible, fromData, expandedRowKeys } = model;
  const [subTableSearchBar] = useState([
    <Input type="text" key="1" label="指标名称" name="indexName" />,
    <Select label="监控状态" key="2" name="monitorStatus">
      <Select.Option value="rmb">RMB</Select.Option>
      <Select.Option value="dollar">Dollar</Select.Option>
    </Select>,
    <Select label="监控状态" key="3" name="monitorStatus">
      <Select.Option value="rmb">RMB</Select.Option>
      <Select.Option value="dollar">Dollar</Select.Option>
    </Select>,
    <Select label="监控状态" key="4" name="monitorStatus">
      <Select.Option value="rmb">RMB</Select.Option>
      <Select.Option value="dollar">Dollar</Select.Option>
    </Select>,
    <Select label="监控状态" key="5" name="monitorStatus">
      <Select.Option value="rmb">RMB</Select.Option>
      <Select.Option value="dollar">Dollar</Select.Option>
    </Select>,
    <Select label="监控状态" key="6" name="monitorStatus">
      <Select.Option value="rmb">RMB</Select.Option>
      <Select.Option value="dollar">Dollar</Select.Option>
    </Select>,
    <Select label="监控状态" key="7" name="monitorStatus">
      <Select.Option value="rmb">RMB</Select.Option>
      <Select.Option value="dollar">Dollar</Select.Option>
    </Select>,
    <Select label="监控状态" key="8" name="monitorStatus">
      <Select.Option value="rmb">RMB</Select.Option>
      <Select.Option value="dollar">Dollar</Select.Option>
    </Select>,
    <Select label="监控状态" key="9" name="monitorStatus">
      <Select.Option value="rmb">RMB</Select.Option>
      <Select.Option value="dollar">Dollar</Select.Option>
    </Select>,
  ]);

  // 弹出模态框
  const panelProps = {
    title: '用户管理',
    autoQuery: true,
    pageWrapper: true,
    type: 'tree',
    search: {
      formItems: subTableSearchBar,
    },
    columns: [
      {
        title: '序号',
        fixed: 'left',
        width: 80,
        render: (text, record, index) => {
          return (
            <div style={{ wordWrap: 'break-word', wordBreak: 'break-word' }}>
              {index + 1}
              <DragHandle />
            </div>
          );
        },
      },
      {
        title: '主题代码',
        dataIndex: 'mainCode',
        key: 'mainCode',
        width: 220,
        ellipsis: true,
        fixed: 'left',
        align: 'right',
        search: 1,
        resizable: 1,
        // index: 1,
        hidden: 0,
        export: 1,
        widget: 'input',
        // selectOption: {},
        // filters: [
        //   { text: 'Joe', value: 'Joe' },
        //   { text: 'Jim', value: 'Jim' },
        // ],
        // filteredValue: filteredInfo.mainCode || null,
        sorter: (a, b) => {
          return a - b;
        },
        onFilter: (value, record) => record.mainCode.includes(value),
      },
      {
        title: '主题名称',
        dataIndex: 'mainName',
        key: 'mainName',
        width: 300,
        search: 1,
        sortable: 1,
        resizable: 1,
        align: 'center',
        ellipsis: true,

        // index: 1,
        show: 1,
        export: 1,
        widget: 'input',
        sorter: (a, b) => {
          return a - b;
        },
        render: (text, record, index) => {
          return <Input type="text" key={index} name="dd" />;
        },
      },
      {
        title: '主题类型',
        dataIndex: 'mainType',
        width: 120,
        ellipsis: true,

        key: 'mainType',
        // render: (text) => (
        //   <div style={{ wordWrap: 'break-word', wordBreak: 'break-word' }}>{text}</div>
        // ),
      },
      {
        title: '主题机构代码',
        key: 'oraCode',
        dataIndex: 'oraCode',
        width: 120,
      },
      {
        title: '统一信用代码',
        key: 'creditCode',
        dataIndex: 'creditCode',
        width: 150,
      },
      {
        title: '组织形式',
        key: 'oraStyle',
        width: 100,
        dataIndex: 'oraStyle',
        // render: (text) => (
        //   <div style={{ wordWrap: 'break-word', wordBreak: 'break-word' }}>{text}</div>
        // ),
      },

      {
        title: '主题机构代码',
        key: 'oraCode',
        width: 120,
        dataIndex: 'oraCode',
        fixed: 'right',
      },
      // {
      //   title: '组织形式',
      //   key: 'code',
      //   dataIndex: 'code',
      //   width: 100,
      //   render: (text) => (
      //     <div style={{ wordWrap: 'break-word', wordBreak: 'break-word' }}>{text}</div>
      //   ),
      // },
      // {
      //   title: '统一社会',
      //   key: 'code',
      //   width: 100,
      //   dataIndex: 'code',
      //   render: (text) => <div style={{ wordWrap: 'normal', wordBreak: 'break-word' }}>{text}</div>,
      // },
      {
        title: '操作',
        key: 'sets',
        width: 100,
        fixed: 'right',
        align: 'center',
        dataIndex: 'sets',
        render: (value, record, rowIndex) => (
          <span style={{ wordWrap: 'break-word', wordBreak: 'break-word' }}>
            查看&nbsp;&nbsp;修改
          </span>
        ),
      },
    ],

    toolbar: {
      buttons: {
        add: {
          visible: 1,
          method: () => {
            handles.expandAll.call(handles);
          },
        },
        selectAll: {
          text: '取消选中',
          visible: 1,
          method: () => {
            handles.changeSelectedRows([], []);
          },
        },
        query: {
          visible: 1,
        },
        edit: {
          visible: 1,
          method: () => {
            handles.setExpandedRowKeys([]);
          },
        },
        check: {
          visible: 1,
        },
        uncheck: {
          visible: 1,
        },
        print: {
          visible: 1,
        },
        deletes: {
          text: '删除',
          visible: 1,
          order: 301,
        },
      },
      more: {
        print: {
          visible: 1,
        },
        exports: {
          visible: 1,
        },
      },
      // filterButton: false,
      // toolbarRender,
    },
    tableProps: {
      selectMode: { mode: 'checkbox' },
      // expandedRowKeys,
      useVirtual: 'auto',
      getRowProps: (record, rowIndex) => {
        // let className = null;
        // if (record.checkState !== 0) {
        //   className = 'text-error';
        // }
        return {
          id: 'darggable',
          // className,
          draggable: true,
          onDragStart: (e) => {
            console.log('放置元素 ondragstart ', '<' + e.dataTransfer.getData('item') + '>');
          },
          onDrag: (e) => {
            console.log('放置元素 onDrag ', '<' + e.dataTransfer.getData('item') + '>');
          },
          onDragEnd: (e) => {
            console.log('放置元素 ondragend  ', '<' + e.dataTransfer.getData('item') + '>');
          },
          onDragEnter: (e) => {
            console.log('放置元素 ondragenter', '<' + e.dataTransfer.getData('item') + '>');
          },
          onDragOver: (e) => {
            e.preventDefault();
            console.log('放置元素 ondragover', '<' + e.dataTransfer.getData('item') + '>');
          },
          onDragLeave: (e) => {
            console.log('放置元素 ondragleave', '<' + e.dataTransfer.getData('item') + '>');
          },
          onDrop: (e) => {
            console.log('放置元素 ondrop', '<' + e.dataTransfer.getData('item') + '>');
          },
          // className: record.checkState === 0 ? 'text-warning' : '',
          onClick: (a, b) => {
            // console.log('onClick===========', a, record, rowIndex);
          },
          onDoubleClick: (a, b) => {
            console.log('onDoubleClick==========', a, b);
          },
          onContextMenu: (a, b) => {
            a.stopPropagation();
            console.log('oncontextmenu==========', a, b);
          },
        };
      },
      onExpandedRowsChange: (a, b, c) => {
        console.log('onExpandedRowsChange==', a, b, c);
      },
    },
  };

  return (
    <>
      <TablePane {...panelProps} {...model} handles={handles}>
        <ModalAdd
          onCancel={() => setFormVisible(false)}
          modalVisible={formVisible}
          dataSource={fromData}
        />
      </TablePane>
    </>
  );
};

const indexPage = (...namespaces: string[]) =>
  connect(
    ({ tableDemo }) => {
      return { tableDemo };
    },
    mapDispatchToProps(namespaces),
    (stateProps, dispatchProps, ownProps) => {
      return BeanUtil.merge(stateProps, dispatchProps, ownProps);
    },
  )(IndexPage);

export default (props: any) => {
  const Pane = useCallback(indexPage('tableDemo'), []);
  return <Pane {...props} />;
};
