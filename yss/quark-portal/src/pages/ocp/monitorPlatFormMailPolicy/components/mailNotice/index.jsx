import React, { createContext } from 'react';
import { Tooltip } from 'antd';
import { FileTextOutlined, SettingOutlined } from '@ant-design/icons';
import { useModel } from 'umi';
import TablePane from '@/blocks/TablePane';
import MailHandle from '../../handles/mailHandle.js';
import ViewDetail from './ViewDetail';
import ModalBox from './ModalBox';

export const FatherContext = createContext();

const IndexPage = () => {
  const model = useModel('ocp.monitorPlatFormMailPolicy.mailModel');

  const { formVisible, setFormVisible, operate, formData, detailVisible, setDetailVisible } = model;
  const handles = new MailHandle(model);

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
        title: '策略名称',
        dataIndex: 'policyName',
      },
      {
        title: '收件人',
        dataIndex: 'addressee',
      },
      {
        title: '抄送人',
        dataIndex: 'CCto',
      },
      {
        title: '密送人',
        dataIndex: 'secretMesg',
      },
      {
        title: '主题',
        dataIndex: 'theme',
      },
      {
        title: '邮件内容',
        dataIndex: 'emailContent',
      },
      {
        title: '自动压缩',
        dataIndex: 'autoZip',
        width: 80,
      },
      {
        title: <SettingOutlined />,
        key: 'sets',
        width: 50,
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
