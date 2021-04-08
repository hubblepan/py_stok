import React, {
  createContext,
  useCallback,
  useEffect,
  useLayoutEffect,
  useRef,
  useMemo,
  useState,
} from 'react';
import ModalAdd from './add-list/index';

import { connect, useModel } from 'umi';

import TablePane from '@/blocks/TablePane';
import { mapStateToProps, mapDispatchToProps } from '@/handles/mapModelToProps';
import ErrorBoundary from '@/components/ErrorBoundary';
import { SearchOutlined, SyncOutlined, DownOutlined } from '@ant-design/icons';
import { Button, Form, Input, Select, Row, Col, message, Pagination, Dropdown } from 'antd';
import ManageHandle from '../handles/ManageHandle';
import BaseHandle from '@/handles/BaseHandle';
import BeanUtil from '@/utils/BeanUtil';

export const FatherContext = createContext();

const IndexPage = () => {
  console.log('------Demo User');
  // const modelName = 'user.manage';
  const user2 = useModel('examples.virtualTable');
  const { formVisible, setFormVisible, fromData } = user2;
  const handles = new BaseHandle({ ...user2, url: { base: '/api/server' } });
  // 子表搜索栏
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
  const panelProps = useMemo(() => {
    return {
      title: '用户管理',
      namespace: 'user2',
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
          render: (text, record, index) => `${index + 1}`,
        },
        {
          title: '主题代码',
          dataIndex: 'mainCode',
          key: 'mainCode',
          width: 320,
          fixed: 'left',
          sorter: 1,
          ellipsis: true,

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
          onFilter: (value, record) => record.mainCode.includes(value),
        },
        {
          title: '主题名称',
          dataIndex: 'mainName',
          key: 'mainName',
          width: 500,
          search: 1,
          sortable: 1,
          resizable: 1,
          ellipsis: true,

          // index: 1,
          show: 1,
          export: 1,
          widget: 'input',
          sorter: (a, b) => a.mainCode.length - b.mainCode.length,
          // render: (text) => (
          //   <div style={{ wordWrap: 'break-word', wordBreak: 'break-word' }}>{text}</div>
          // ),
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
          ellipsis: true,

          width: 120,
        },
        {
          title: '统一信用代码',
          key: 'creditCode',
          dataIndex: 'creditCode',
          ellipsis: true,

          width: 150,
        },
        {
          title: '组织形式',
          key: 'oraStyle',
          width: 100,
          dataIndex: 'oraStyle',
          ellipsis: true,

          // render: (text) => (
          //   <div style={{ wordWrap: 'break-word', wordBreak: 'break-word' }}>{text}</div>
          // ),
        },

        {
          title: '主题机构代码',
          key: 'oraCode',
          width: 120,
          dataIndex: 'oraCode',
          ellipsis: true,

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
          dataIndex: 'sets',
          render: () => (
            <div style={{ wordWrap: 'break-word', wordBreak: 'break-word' }}>
              查看 &nbsp;&nbsp; 修改
            </div>
          ),
        },
      ],

      toolbar: {
        buttons: {
          add: {
            visible: 1,
          },
          query: {
            visible: 1,
          },
          edit: {
            visible: 1,
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
        // rowSelection: false,
      },
      // 此处自定义分页 djtao
      // page: {
      //   // pageSize: 500,
      //   // pageNo: 2,
      //   // pageTotal: 25,
      // },
    };
  }, []);

  return (
    <>
      <TablePane {...panelProps} {...user2} handles={handles}>
        <ModalAdd
          onCancel={() => setFormVisible(false)}
          modalVisible={formVisible}
          dataSource={fromData}
        />
      </TablePane>
    </>
  );
};

export default IndexPage;

// const indexPage = (namespace) =>
//   connect(
//     ({ user2 }) => {
//       return { user2 };
//     },
//     mapDispatchToProps(namespace),
//     (stateProps, dispatchProps, ownProps) => {
//       return BeanUtil.merge(stateProps, dispatchProps, ownProps);
//     },
//   )(IndexPage);

// export default function (props) {
//   const namespace = 'user2';
//   let Pane = useCallback(indexPage(namespace), []);
//   return <Pane {...props} />;
// }
