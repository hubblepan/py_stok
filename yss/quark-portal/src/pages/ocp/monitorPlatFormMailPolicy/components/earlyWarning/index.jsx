import React, { useEffect } from 'react';
import { useModel } from 'umi';
import {
  SettingOutlined,
  SearchOutlined,
  ProfileOutlined,
  FileTextOutlined,
} from '@ant-design/icons';
import PagePane from '@/blocks/PagePane';
import { Input, Select } from 'antd';
import MasterHandle from '../../handles/warningMasterHandle';
import SubHandle from '../../handles/warningSubHandle';
import ModalBox from './ModalBox';

const IndexPage = () => {
  const masterModel = useModel('ocp.monitorPlatFormMailPolicy.warningMasterModel');
  const subModel = useModel('ocp.monitorPlatFormMailPolicy.warningSubModel');
  const { menus, setMenus, dataSource } = masterModel;
  const {
    expandedRowKeys: subExpandedRowKeys,
    setExpandedRowKeys: subSetExpandedRowKeys,
    formVisible,
    setFormVisible,
    operate,
    formData,
  } = subModel;

  const masterHandle = new MasterHandle(masterModel);
  const subHandle = new SubHandle({
    ...subModel,
    masterSelectedRows: masterHandle.selectedRows,
  });
  useEffect(() => {
    setMenus(masterHandle.getMasterMenus(dataSource));
  }, [dataSource]);
  const masterTableColumns = [
    {
      title: '指标分类',
      key: 'indexType',
      dataIndex: 'indexType',
      ellipsis: true,
    },
  ];

  const subTableColumns = [
    {
      title: '指标名称',
      dataIndex: 'targetName',
      key: 'targetName',
      width: 80,
      resizable: true,
      ellipsis: true,
    },
    {
      title: '风险级别',
      dataIndex: 'riskLevel',
      key: 'riskLevel',
      width: 80,
      resizable: true,
      ellipsis: true,
    },
    {
      title: '监控结果',
      dataIndex: 'monitorResult',
      key: 'monitorResult',
      width: 80,
      resizable: true,
      ellipsis: true,
    },
    {
      title: '提醒方式',
      dataIndex: 'noticeType',
      key: 'noticeType',
      width: 80,
      resizable: true,
      ellipsis: true,
    },
    {
      title: '提醒内容',
      dataIndex: 'noticeContent',
      key: 'noticeContent',
      width: 100,
      resizable: true,
      ellipsis: true,
      onCell: () => {
        return {
          style: {
            maxWidth: 100,
            overflow: 'hidden',
            whiteSpace: 'nowrap',
            textOverflow: 'ellipsis',
            cursor: 'pointer',
          },
        };
      },
    },
    {
      title: '创建人',
      dataIndex: 'maker',
      key: 'maker',
      width: 80,
      resizable: true,
      ellipsis: true,
    },
    {
      title: '创建时间',
      dataIndex: 'creatDate',
      key: 'creatDate',
      width: 100,
      resizable: true,
      ellipsis: true,
      render: (value, row, index) => {
        const obj = {
          children: value,
          props: { colSpan: 2 },
        };
        return obj;
      },
    },
    {
      title: <SettingOutlined />,
      dataIndex: 'operate',
      key: 'operate',
      width: 50,
      resizable: true,
      ellipsis: true,
      render: (value, row, index) => {
        const obj = {
          children: value,
          props: { colSpan: 0 },
        };
        return obj;
      },
    },
  ];

  // 工具栏
  const masterTabletoolbar = {
    buttons: {
      dashed: {
        visible: 1,
        children: {
          refresh: {
            text: '刷新数据',
            visible: 1,
            method: 'refresh',
          },
          menu: {
            text: '分级菜单',
            visible: 1,
            children: menus,
          },
        },
      },
    },
  };

  const subTabletoolbar = {
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
  };

  // 搜索栏
  const subTableSearchBar = [
    <Select
      label="风险级别"
      key="2"
      name="riskLevel"
      allowClear
      mode="multiple"
      maxTagCount={2}
      maxTagTextLength={2}
    >
      <Select.Option value="1">风险级别1</Select.Option>
      <Select.Option value="0">风险级别2</Select.Option>
      <Select.Option value="3">风险级别3</Select.Option>
      <Select.Option value="4">风险级别4</Select.Option>
      <Select.Option value="5">风险级别5</Select.Option>
      <Select.Option value="6">风险级别6</Select.Option>
    </Select>,
  ];

  // 主表配置
  const masterTable = {
    columns: masterTableColumns,
    toolbar: masterTabletoolbar,
    tableProps: {
      rowKey: 'id', // 必填
      expandable: {
        defaultExpandAllRows: true, // 默认展开所有行
      },
    },
    search: {
      formItems: [<Input placeholder="请输入关键词搜索" prefix={<SearchOutlined />} />],
      searchMethod: true,
      searchName: 'indexType',
    },
    // footer: {
    //   footerRender: false,
    // },
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
    },
  };

  return (
    <>
      <PagePane
        masterTable={masterTable}
        subTable={subTable}
        masterModel={masterModel}
        subModel={subModel}
        subHandle={subHandle}
        masterHandle={masterHandle}
      >
        <ModalBox
          formVisible={formVisible}
          setFormVisible={setFormVisible}
          handles={subHandle}
          operate={operate}
          formData={formData}
        />
      </PagePane>
    </>
  );
};

export default IndexPage;
