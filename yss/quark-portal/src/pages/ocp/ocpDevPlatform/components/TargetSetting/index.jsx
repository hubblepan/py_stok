// 管控配置化指标双表（Tab1） dangjingtao 2020/01/14
import React, { useEffect, useState, useMemo } from 'react';
import { useModel } from 'umi';
import { SettingOutlined, SearchOutlined, ProfileOutlined, FileTextOutlined } from '@ant-design/icons';
import { Tooltip, Input, Select } from 'antd';

import PagePane from '@/blocks/PagePane';
import AddModal from './AddModal';
import DeployModal from './DeployModal';
// 主表handles
import TargeSettingMasterHandle from '../../handles/IndexDevHandle';
// 子表handles
import TargeSettingSubHandle from '../../handles/TargeSettingSubHandle';

const TargetSetting = (props) => {
  const masterModel = useModel('ocp.ocpDevPlatform.targetSettingMaster');
  const subModel = useModel('ocp.ocpDevPlatform.targetSettingSub');

  const {
    addModalVisible,
    setAddModalVisible,
    deployModalVisible,
    setDeployModalVisible,
    currentRecord,
    mode,
  } = subModel;

  const masterHandle = new TargeSettingMasterHandle(masterModel);
  const subHandle = new TargeSettingSubHandle({
    ...subModel,
    masterSelectedRows: masterHandle.selectedRows,
  });

  const masterTableColumns = [
    {
      title: '指标树',
      key: 'C_INDEX_NAME',
      dataIndex: 'C_INDEX_NAME',
    },
  ];

  const subTableColumns = [
    {
      title: '指标代码',
      key: 'indexCode',
      dataIndex: 'indexCode',
      resizable: true,
    },
    {
      title: '指标名称',
      key: 'indexName',
      dataIndex: 'indexName',
      sorter: true,
      resizable: true,
    },
    {
      title: '监控类型',
      key: 'monitorType',
      dataIndex: 'monitorType',
      resizable: true,
    },
    {
      title: '提醒类型',
      key: 'PromptingType',
      dataIndex: 'PromptingType',
      resizable: true,
    },
    {
      title: '数据主题',
      key: 'dataTopicDisplayText',
      dataIndex: 'dataTopicDisplayText',
      resizable: true,
    },

    {
      title: '最近部署时间',
      key: 'deployTime',
      dataIndex: 'deployTime',
      resizable: true,
    },
    {
      title: '制作时间',
      key: 'modifyDate',
      dataIndex: 'modifyDate',
      resizable: true,
    },
    {
      title: '制作人',
      key: 'maker',
      dataIndex: 'maker',
      resizable: true,
    },
    {
      title: '审核状态',
      dataIndex: 'auditState',
      key: 'auditState',
      resizable: true,
    },
    {
      title: '审核时间',
      key: 'auditDate',
      dataIndex: 'auditDate',
      resizable: true,
    },
    {
      title: '审核人',
      key: 'C_CHECK_BY',
      dataIndex: 'C_CHECK_BY',
      resizable: true,
    },

    {
      title: <SettingOutlined />,
      key: 'operate',
      dataIndex: 'operate',
      resizable: true,
      fixed: 'right',
      render: () => (
        <div style={{ wordWrap: 'break-word', wordBreak: 'break-word' }}>
          <Tooltip title="详情">
            <a
              href="#"
              onClick={(e) => {
                e.preventDefault();
              }}
            >
              <ProfileOutlined />
            </a>
          </Tooltip>
          &nbsp;&nbsp;&nbsp;&nbsp;
          <Tooltip title="我不知道这是啥">
            <a
              href="#"
              onClick={(e) => {
                e.preventDefault();
              }}
            >
              <FileTextOutlined />
            </a>
          </Tooltip>
        </div>
      ),
    },
  ];

  // 工具栏
  const masterTabletoolbar = {
    buttons: {
      dashed: {
        visible: 1,
        children: {
          add: {
            text: '新增',
            method: 'add',
            visible: true,
          },
          deletes: {
            text: '删除',
            method: 'deletes',
            visible: true,
          },
          edit: {
            text: '修改',
            method: 'edit',
            visible: true,
          },
        },
      },
    },
  };

  const subTabletoolbar = {
    buttons: {
      deploy: {
        text: '部署',
        visible: 1,
        method: 'deploy',
        order: 10,
      },
      add: {
        text: '新增',
        method: 'add',
        order: 20,
        visible: 1,
      },

      edit: {
        text: '修改',
        method: 'edit',
        visible: 1,
        order: 30,
      },
      copy: {
        text: '复制',
        method: 'copy',
        visible: 1,
        order: 40,
      },
      deletes: {
        text: '删除',
        // method: 'deletes',
        visible: true,
        order: 50,
      },
      check: {
        id: 'check',
        text: '审核',
        visible: true,
        order: 60,
      },
      uncheck: {
        id: 'uncheck',
        visible: true,
        order: 70,
      },

      more: {
        visible: true,
      },
    },
  };

  const [topicSelect, setTopicSelect] = useState([]);

  useEffect(() => {
    (async () => {
      const selects = await subHandle.service.getTopicSelect();
      setTopicSelect(
        selects.data.map((x) => {
          return (
            <Select.Option
              key={x.id}
              value={`${x.id}|${x.version}|${x.code}`} // id/版本/代码
            >
              {x.name}
            </Select.Option>
          );
        }),
      );
    })();
  }, []);

  // 搜索栏
  const subTableSearchBar = [
    <Select
      mode="multiple"
      placeholder="请选择"
      label="监控类型"
      key="1"
      name="monitorType"
      allowClear
      maxTagCount={1}
      style={{
        width: '100%',
      }}
    >
      {topicSelect}
    </Select>,
    <Select
      mode="multiple"
      placeholder="请选择"
      label="数据主题"
      key="2"
      name="dataTheme"
      allowClear
      maxTagCount={1}
      style={{
        width: '100%',
      }}
    >
      {topicSelect}
      {/* <Select.Option value="1">已部署</Select.Option>
      <Select.Option value="0">未部署</Select.Option> */}
    </Select>,
  ];
  // 主表配置
  const masterTable = {
    columns: masterTableColumns,
    toolbar: masterTabletoolbar,
    tableProps: {
      rowKey: 'C_INDEX_CODE', // 必填
      expandable: {
        defaultExpandAllRows: true, // 默认展开所有行
      },
    },
    search: {
      formItems: [<Input placeholder="请输入关键词搜索" prefix={<SearchOutlined />} />],
      searchMethod: true,
      searchName: 'name',
    },
  };

  // 子表配置
  const subTable = {
    columns: subTableColumns,
    toolbar: subTabletoolbar,
    queryParams: 'id', // 查询子表的字段值
    autoQuery: false, // 如果为true时必须指定对应规则 autoQuery
    search: {
      formItems: subTableSearchBar,
    },
    // 可配置项
    tableProps: {
      rowKey: 'id', // 必填
      rowClassName: (record, index) => {
        if (record.checkState == 0) {
          return 'text-warning';
        }
      },
    },
  };

  const panelProps = useMemo(() => {
    return {
      title: '指标开发配置',
    };
  });

  return (
    <>
      <PagePane
        {...panelProps}
        masterTable={masterTable}
        subTable={subTable}
        masterModel={masterModel}
        subModel={subModel}
        subHandle={subHandle}
        masterHandle={masterHandle}
      />


      {addModalVisible ? (
        <AddModal visible={addModalVisible} setVisible={setAddModalVisible}
          currentRecord={currentRecord} mode={mode}
        />
      ) : null}

      {deployModalVisible ? (
        <DeployModal visible={deployModalVisible} setVisible={setDeployModalVisible} />
      ) : null}
    </>
  );
};

export default TargetSetting;
