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
  SearchOutlined,
  ProfileOutlined,
  FileTextOutlined,
} from '@ant-design/icons';
import { useModel } from 'umi';

import TablePane from '@/blocks/TablePane/index';
import EditModal from './EditModal';
import ViewDetail from './ViewDetail';

import TargetThemeProgrammeHandle from '../../handles/TargetThemeProgrammeHandle';
// import styles from './style.less';

export default () => {
  const modelName = 'ocp.ocpDevPlatform.targetThemeProgramme';
  const model = useModel(modelName);

  const {
    editVisible,
    setEditVisible,
    editData,
    mode,
    viewDetailVisible,
    setViewDetailVisible,
    detailData,
    setDetailData,
    // selectedRows,
  } = model;

  const handles = new TargetThemeProgrammeHandle(model);

 // const {columns} = model;

  // 列
  const columns = [
    {
      title: '模板名称',
      dataIndex: 'topicPlanName',
      key: 'topicPlanName',
      width: 100,
      fixed: 'left',
      search: 1,
      resizable: 1,
      hidden: 0,
      export: 1,
      widget: 'input',
    },
    {
      title: '模板代码',
      dataIndex: 'topicPlanCode',
      key: 'topicPlanCode',
      width: 100,
      search: 1,
      sortable: 1,
      resizable: 1,
      show: 1,
      export: 1,
      widget: 'input',
    },
    {
      title: '数据主题',
      dataIndex: 'topicCode',
      key: 'topicCode',
      width: 120,
    },
    {
      title: '模板描述',
      key: 'topicPlanDesc',
      dataIndex: 'topicPlanDesc',
      width: 120,
    },
    {
      title: '审核状态',
      key: 'auditState_Name',
      dataIndex: 'auditState_Name',
      width: 150,
    },
    {
      title: '操作人',
      key: 'modifier_Name',
      dataIndex: 'modifier_Name',
      width: 100,
    },
    {
      title: '操作时间',
      key: 'modifyDate',
      width: 120,
      dataIndex: 'modifyDate',
    },
    {
      title: '审核人',
      key: 'operator',
      dataIndex: 'operator',
      width: 100,
    },
    {
      title: <SettingOutlined />,
      key: 'sets',
      width: 50,
      dataIndex: 'sets',
      fixed: 'right',
      render: () => (
        <div style={{ wordWrap: 'break-word', wordBreak: 'break-word' }}>
          <Tooltip title="模板详情">
            <a
              href="#"
              onClick={(e) => {
                setViewDetailVisible(true);
              }}
            >
              <FileSearchOutlined />
            </a>
          </Tooltip>
        </div>
      ),
    },
  ];


  // 按钮栏
  const toolbar = {
    buttons: {
      add: {
        visible: 1,
      },
      edit: {
        visible: 1,
      },
      copy: {
        visible: 1,
      },
      check: {
        visible: 1,
      },
      uncheck: {
        visible: 1,
      },
      deletes: {
        visible: 1,
        order: 301,
      },
      more: {
        visible: true,
      },
    },
  };

  // 搜索栏
  const tableSearchBar = [
    <Input type="text" key="1" label="模板名称" name="C_TOPIC_NAME" />,
/*     <Select label="模板代码" key="2" name="schemeCode" allowClear>
      <Select.Option value="rmb">RMB</Select.Option>
      <Select.Option value="dollar">Dollar</Select.Option>
    </Select>, */
  ];

  // 属性
  const panelProps = {
    funCode: 'ocpTopicPlan',
    title: '指标开发配置',
    autoQuery: true,
    pageWrapper: true,
    search: {
      formItems: tableSearchBar,
    },
    columns,
    toolbar,
    tableProps: {
      // rowKey : 'topicPlanCode',
      onRow(record) {
        return {
          onClick: () => {
            setDetailData(record);
          },
        };
      },
    },
  };

  return (
    <>
      <TablePane {...model} {...panelProps} handles={handles} />
      { viewDetailVisible && (
      <ViewDetail
        fromData={detailData}
        viewDetailVisible={viewDetailVisible}
        setViewDetailVisible={setViewDetailVisible}
        detailData={detailData}
        handles={handles}
      />
      )}
      { editVisible && (
      <EditModal
        fromData={editData}
        onCancel={() => setEditVisible(false)}
        modalVisible={editVisible}
        mode={mode}
        handles={handles}
      />
      )}
    </>
  );
};
