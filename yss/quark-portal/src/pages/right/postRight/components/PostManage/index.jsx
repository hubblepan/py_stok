import React, {
  createContext,
  useState,
  useCallback,
  useEffect,
  useRef,
  useLayoutEffect,
} from 'react';
import { Tabs, Tooltip, Input, Select } from 'antd';

import {
  FileSearchOutlined,
  SettingOutlined,
} from '@ant-design/icons';
import { useModel } from 'umi';
import TablePane from '@/blocks/TablePane';
import ModalAdd from '../../add-list/index';

import PostHandle from '../../handles/PostHandle';

export const FatherContext = createContext();

const PostManage = (props) => {

  const {changeTab} = props;
  const modelName = 'right.postRight.postModel';
  const model = useModel(modelName);
  const { formVisible, setFormVisible, formData, operate } = model;
  const handles = new PostHandle(model);

  // 子表搜索栏
  const tableSearchBar = [
    <Input type="text" key="1" label="岗位名称" name="c_POST_NAME" />
  ];

  const postProps = {
    title: '岗位管理',
    modelName,
    ...model,
    handles,
    autoQuery: true,
    pageWrapper: true,
    search: {
      formItems: tableSearchBar,
    },
    columns: [
      {
        title: '岗位名称',
        dataIndex: 'c_POST_NAME',
        key: 'c_POST_NAME',
        width: 100,
        fixed: 'left',
        // sorter: 1,
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
        // onFilter: (value, record) => record.mainCode.includes(value),
      },
      {
        title: '岗位代码',
        dataIndex: 'c_POST_CODE',
        key: 'c_POST_CODE',
        width: 100,
        search: 1,
        sortable: 1,
        resizable: 1,
        // index: 1,
        show: 1,
        export: 1,
        widget: 'input',
        // sorter: (a, b) => a.mainCode.length - b.mainCode.length,
        // render: (text) => (
        //   <div style={{ wordWrap: 'break-word', wordBreak: 'break-word' }}>{text}</div>
        // ),
      },
      {
        title: '权限机构',
        dataIndex: 'c_AUTH_ORG_CODE',
        width: 120,
        key: 'c_AUTH_ORG_CODE',
        render: (text,record) => (
          <div style={{ wordWrap: 'break-word', wordBreak: 'break-word' }}>{record.c_AUTH_ORG_NAME}</div>
        ),
      },
      {
        title: '创建人',
        key: 'modifier',
        dataIndex: 'modifier',
        width: 120,
        render: (text,record) => (
          <div style={{ wordWrap: 'break-word', wordBreak: 'break-word' }}>{record.modifierName}</div>
        ),
      },

      {
        title: '创建时间',
        key: 'modifyDate',
        width: 120,
        dataIndex: 'modifyDate',
      },
      {
        title: '审核人',
        key: 'operator',
        dataIndex: 'operator',
        width: 100,
        render: (text,record) => (
          <div style={{ wordWrap: 'break-word', wordBreak: 'break-word' }}>{record.operatorName}</div>
        ),
      },
      {
        title: '审核状态',
        key: 'auditState',
        dataIndex: 'auditState',
        width: 150,
        render: (text,record) => (
          <div style={{ wordWrap: 'break-word', wordBreak: 'break-word' }}>{record.auditStateName}</div>
        ),
      },
      {
        title: <SettingOutlined />,
        key: 'sets',
        width: 50,
        dataIndex: 'sets',
        fixed: 'right',
        render: () => (
          <div style={{ wordWrap: 'break-word', wordBreak: 'break-word' }}>
            <Tooltip title="权限配置">
              <a
                href="#"
                onClick={(e) => {
                  changeTab("2");
                }}
              >
                <FileSearchOutlined />
              </a>
            </Tooltip>
          </div>
        ),
      },
    ],

    toolbar: {
      funCode:'PostManager',
      buttons: {
        add: {
          operCode: 'ADD',
          text: '新增',
          visible: 1,
        },
        edit: {
          operCode: 'UPD',
          text: '修改',
          visible: 1,
        },
        copy: {
          operCode: 'CPY',
          visible: 1,
          disable: (data) => {
            if(data.length == 1){
              return false;
            }else{
              return true;
            }
          },
        },
        check: {
          operCode: 'CHK',
          visible: 1,
        },
        uncheck: {
          operCode: 'UCHK',
          visible: 1,
        },
        deletes: {
          operCode: 'DEL',
          visible: 1,
          order: 301,
        },
        more: {
          visible: true,
        },
      },
    },

    tableProps: {
      // rowSelection: false,
      onRow(record) {
        return {
          onClick: () => {
            //setdetailData(record);
          },
        };
      },
      rowClassName: (record, index) => {
        if (record.checkState == 0 || record.auditState === 0 ) {
          return 'text-warning';
        }
      }
    },
    // 此处自定义分页 djtao
    page: {
      // pageSize: 500,
      // pageNo: 2,
      // pageTotal: 25,
    },
  };

  return (
    <>
      <TablePane {...postProps} />
      <ModalAdd
        onCancel={() => setFormVisible(false)}
        modalVisible={formVisible}
        formData={formData}
        operate={operate}
      />
    </>
  );
};

export default PostManage;
