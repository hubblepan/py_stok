import React, { createContext } from 'react';
import { Tooltip } from 'antd';
import { FileTextOutlined, SettingOutlined } from '@ant-design/icons';
import { useModel } from 'umi';
import TablePane from '@/blocks/TablePane';
import MesHandle from '../../handles/mesHandle.js';
import ViewDetail from './ViewDetail';
import ModalBox from './ModalBox';

export const FatherContext = createContext();

const IndexPage = () => {
  const model = useModel('ocp.monitorPlatFormMailPolicy.mesModel');

  const { detailVisible, setDetailVisible, formData, formVisible, setFormVisible, operate } = model;
  const handles = new MesHandle(model);

  const panelProps = {
    title: '管控短消息通知',
    ...model,
    handles,
    // formVisible: setCommonModalVisible,
    search: {
      // formItems: subTableSearchBar,
    },
    autoQuery: true,

    columns: [
      {
        title: '功能模块',
        dataIndex: 'functionModule',
      },
      {
        title: '指标开发场景',
        dataIndex: 'indexDevScene',
      },
      {
        title: '收信人',
        dataIndex: 'addressee',
        render: (text) => (
          <div
            style={{
              wordWrap: 'break-word',
              wordBreak: 'break-word',
              whiteSpace: 'nowrap',
              overflow: 'hidden',
              textOverflow: 'ellipsis',
            }}
          >
            {text}
          </div>
        ),
      },
      {
        title: '内容',
        dataIndex: 'content',
        render: (text) => (
          <div
            style={{
              wordWrap: 'break-word',
              wordBreak: 'break-word',
              whiteSpace: 'nowrap',
              overflow: 'hidden',
              textOverflow: 'ellipsis',
            }}
          >
            {text}
          </div>
        ),
      },
      {
        title: '开始日期',
        dataIndex: 'startDate',
        render: (text) => (
          <div
            style={{
              wordWrap: 'break-word',
              wordBreak: 'break-word',
              whiteSpace: 'nowrap',
              overflow: 'hidden',
              textOverflow: 'ellipsis',
            }}
          >
            {text}
          </div>
        ),
      },
      {
        title: '结束日期',
        dataIndex: 'endDate',
      },
      {
        title: '审核状态',
        dataIndex: 'checkState',
        width: 80,
      },
      {
        title: <SettingOutlined />,
        key: 'sets',

        dataIndex: 'sets',
        fixed: 'right',
        render: () => (
          <div style={{ wordWrap: 'break-word', wordBreak: 'break-word' }}>
            <Tooltip title="查看详情">
              <a
                href="#"
                onClick={(e) => {
                  setDetailVisible(true);
                }}
              >
                <FileTextOutlined />
              </a>
            </Tooltip>
          </div>
        ),
      },
    ],

    toolbar: {
      buttons: {
        add: {
          visible: 1,
        },
        edit: {
          text: '修改',
          visible: 1,
        },
        copy: {
          visible: 1,
        },
        deletes: {
          visible: 1,
        },
        check: {
          visible: 1,
        },
        uncheck: {
          visible: 1,
        },
      },
      filterButton: false,
      // toolbarRender,
    },
    tableProps: {},
    // page: false,
  };

  return (
    <>
      <TablePane {...panelProps} {...model}>
        <ViewDetail
          visible={detailVisible}
          setDetailVisible={setDetailVisible}
          formData={formData}
        />
        <ModalBox
          formVisible={formVisible}
          setFormVisible={setFormVisible}
          handles={handles}
          operate={operate}
          // formData={formData}
        />
      </TablePane>
    </>
  );
};

export default IndexPage;
