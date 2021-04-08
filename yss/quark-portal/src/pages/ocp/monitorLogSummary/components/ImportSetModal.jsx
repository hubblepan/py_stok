import React, { useState } from 'react';
import PagePane from '@/blocks/PagePane';
import { Modal, Input } from 'antd';
import { useModel } from 'umi';
import { SearchOutlined } from '@ant-design/icons';
import QuarkModal from '@/components/QuarkModal';
import ImportSetMasterHandle from '../handles/ImportSetMasterHandle';
import ImportSetSubHandle from '../handles/ImportSetSubHandle';

const ExecuteDetail = (props) => {
  const { visible, setVisible } = props;
  const handleOk = () => {
    setVisible(false);
  };

  const handleCancel = () => {
    setVisible(false);
  };

  const MasterModel = useModel('ocp.monitorLogSummary.importSetMaster');
  const SubModel = useModel('ocp.monitorLogSummary.importSetSub');
  const MasterHandle = new ImportSetMasterHandle({
    ...MasterModel,
    url: { base: '/ocp/monitor/master' },
  });
  const SubHandle = new ImportSetSubHandle({
    ...SubModel,
    url: {
      base: '/ocp/monitor/sub',
    },
    masterSelectedRows: MasterHandle.selectedRows,
  });

  const MasterTable = {
    autoQuery: true,
    pageWrapper: false,
    footer: { footerRender: false },
    search: {
      searchName: 'c_PORT_NAME_ST',
      formItems: [<Input placeholder="请输入关键词搜索" prefix={<SearchOutlined />} />],
      searchMethod: true,
    },
    columns: [
      {
        title: '指标名称',
        key: 'c_PORT_NAME_ST',
        dataIndex: 'c_PORT_NAME_ST',
        width: 150,
        resizable: true,
        ellipsis: true,
      },
    ],
    toolbar: {},
    type: 'tree',
    queryParams: 'c_PORT_NAME_ST', //
    tableProps: {
      rowKey: 'c_PORT_CODE', // 必填
      rowSelection: false,
      defaultExpandAllRows: true, // 默认展开所有行
    },
  };
  const SubTable = {
    search: {},
    columns: [
      {
        title: '名称',
        dataIndex: 'name',
        key: 'name',
        width: 200,
      },
      {
        title: '生效参数',
        dataIndex: 'paramType',
        key: 'paramType',
        width: 100,
      },

      {
        title: '代码',
        dataIndex: 'code',
        width: 150,
        key: 'code',
      },
      {
        title: '关联模式',
        key: 'relaType',
        width: 100,
        // ellipsis: true,
        dataIndex: 'relaType',
      },
      {
        title: '审核状态',
        key: 'auditState',
        dataIndex: 'auditState',
        width: 80,
      },
      {
        title: '操作人',
        key: 'modifier',
        dataIndex: 'modifier',
        width: 80,
      },
      {
        title: '操作时间',
        key: 'modifyDate',
        dataIndex: 'modifyDate',
        width: 150,
      },
    ],
    type: 'tree',
    autoQuery: false,
    tableProps: {
      rowKey: 'codeKey', // 必填
      expandable: {},
    },
  };

  return (
    <QuarkModal
      title="数据导入设置"
      visible={visible}
      onOk={handleOk}
      width={1300}
      onCancel={handleCancel}
      bodyStyle={{ padding: 0, height: '700px' }}
    >
      <PagePane
        masterTable={MasterTable}
        subTable={SubTable}
        masterModel={MasterModel}
        subModel={SubModel}
        subHandle={SubHandle}
        masterHandle={MasterHandle}
      />
    </QuarkModal>
  );
};

export default ExecuteDetail;
