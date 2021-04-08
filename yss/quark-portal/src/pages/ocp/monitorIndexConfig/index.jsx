import React, { useState, useRef, useEffect, useLayoutEffect, useCallback, useMemo } from 'react';
import { Input, Select, Tooltip, Menu, Dropdown, Drawer } from 'antd';
import {
  SettingOutlined,
  SearchOutlined,
  ProfileOutlined,
  ExclamationCircleOutlined,
  FileTextOutlined,
  CloudUploadOutlined,
  FileSearchOutlined,
  LockOutlined,
  DeleteOutlined,
} from '@ant-design/icons';

import PagePane from '@/blocks/PagePane';

import EditDetailModal from './components/EditDetailModal';
import ChangeModal from './components/ChangeModal';
import DetectionModal from './components/DetectionModal';
import PermitModal from './components/PermitModal';
import PermissionModal from './components/PermissionModal';
import DeployModal from './components/deploy/index.jsx';
import MasterAddModal from './components/MasterAddModal';

import MasterHandle from './handles/MasterHandle';
import SubHandle from './handles/SubHandle';
import { useModel } from 'umi';

const IndexPage = (props) => {
  // const { targetMaster, targetSub } = props;
  /**
   * 主表
   */
  const targetMaster = useModel('ocp.monitorIndexConfig.master');
  const targetSub = useModel('ocp.monitorIndexConfig.sub');

  const { modalTitle, classifyNode, addVisible, menus, setMenus, dataSource } = targetMaster;
  // 主表列
  const masterColumns = [
    {
      title: '指标分类',
      key: 'indexName',
      dataIndex: 'indexName',
      sorter: true,
      resizable: true,
      ellipsis: true,
      render: (content, record, index) => {
        return content;
      },
    },
  ];
  // 主表搜索栏
  const masterSearchBar = [<Input placeholder="请输入关键词搜索" prefix={<SearchOutlined />} />];
  // 主表工具栏
  const masterToolbar = {
    buttons: {
      dashed: {
        visible: 1,
        children: {
          refresh: {
            visible: 1,
          },
          menu: {
            visible: 1,
            children: menus,
          },
          add: {
            text: '新增指标分类',
            method: 'add',
            icon: '',
            visible: true,
          },
        },
      },
    },
    contextmenus: {
      deletes: {
        text: '删除',
        method: 'deletes',
        visible: true,
        contextMenuVisible: true,
        disable(selectedRows) {
          let classifyCount = 0;
          selectedRows.forEach((item) => {
            if (!item.isLeaf) {
              classifyCount++;
            }
          });
          // 至少包含一个分类
          if (classifyCount > 0) {
            return false;
          }
          return true;
        },
      },
      edit: {
        text: '修改',
        method: 'edit',
        visible: true,
        contextMenuVisible: true,
        disable(selectedRows) {
          let classifyCount = 0;
          selectedRows.forEach((item) => {
            if (!item.isLeaf) {
              classifyCount++;
            }
          });
          // 有且仅有一个分类
          if (classifyCount === 1) {
            return false;
          }
          return true;
        },
      },
    },
  };
  // handles
  const masterHandle = new MasterHandle(targetMaster);
  useEffect(() => {
    setMenus(masterHandle.getMasterMenus(dataSource));
  }, [dataSource]);
  /**
   * 子表
   */
  const {
    detailVisible,
    modalOperate,
    detailData,
    changeVisible,
    permission,
    permitVisible,
    testVisible,
    deployVisible,
    currentRecord,
    primaryKey,
  } = targetSub;
  // 子表搜索栏
  const subSearchBar = [
    // <Input type="text" label="指标名称" name="indexName" />,
    <Select label="审核状态" allowClear name="auditState">
      <Select.Option value="1">已审核</Select.Option>
      <Select.Option value="0">未审核</Select.Option>
    </Select>,
  ];
  // 子表列
  const subColumns = [
    {
      title: '指标代码',
      dataIndex: 'indexCode',
      key: 'indexCode',
      width: 100,
      fixed: 'left',
      ellipsis: true,
      // sorter: true,
      search: true,
      resizable: true,
      hidden: false,
      export: true,
      widget: 'input',
      onFilter: (value, record) => record.mainCode.includes(value),
    },
    {
      title: '指标名称',
      dataIndex: 'indexName',
      key: 'indexName',
      width: 100,
      ellipsis: true,
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
      title: '指标别名',
      dataIndex: 'indexAlias',
      width: 120,
      ellipsis: true,
      key: 'indexAlias',
      resizable: true,
    },
    {
      title: '指标类型',
      key: 'indexType',
      dataIndex: 'indexType',
      width: 150,
      resizable: true,
      ellipsis: true,
    },

    {
      title: '指标规范',
      key: 'version',
      dataIndex: 'version',
      width: 120,
      resizable: true,
      ellipsis: true,
    },
    {
      title: '部署状态',
      key: 'installState',
      width: 100,
      dataIndex: 'installState',
      resizable: true,
      ellipsis: true,
    },
    {
      title: '备注',
      key: 'Remark',
      width: 100,
      dataIndex: 'Remark',
      resizable: true,
      ellipsis: true,
    },
    {
      title: '组件标识',
      key: 'fileName',
      dataIndex: 'fileName',
      width: 150,
      resizable: true,
      ellipsis: true,
    },

    {
      title: '指标说明',
      key: 'indexDesc',
      dataIndex: 'indexDesc',
      width: 150,
      resizable: true,
      ellipsis: true,
    },

    {
      title: '部署人',
      key: 'deployBy_Name',
      dataIndex: 'deployBy_Name',
      width: 150,
      resizable: true,
      ellipsis: true,
    },

    {
      title: '部署时间',
      key: 'deployTime',
      dataIndex: 'deployTime',
      width: 150,
      resizable: true,
      ellipsis: true,
    },

    {
      title: '审核状态',
      key: 'auditState_Name',
      dataIndex: 'auditState_Name',

      resizable: true,
      ellipsis: true,
      width: 150,
    },

    {
      title: '审核人',
      key: 'operator',
      dataIndex: 'operator',
      width: 150,
      resizable: true,
      ellipsis: true,
    },

    {
      title: '审核时间',
      key: 'auditDate',
      dataIndex: 'auditDate',
      width: 150,
      resizable: true,
      ellipsis: true,
    },

    {
      title: '触发位置',
      key: 'executeFunCodes',
      dataIndex: 'executeFunCodes',
      width: 150,
      resizable: true,
      ellipsis: true,
    },

    // {
    //   title: '权限设置',
    //   key: 'privilege',
    //   dataIndex: 'privilege',
    //   width: 150,
    // },

    {
      title: (
        <a
          href="#"
          onClick={(e) => {
            e.preventDefault();
          }}
        >
          <SettingOutlined />
        </a>
      ),
      key: 'sets',
      width: 80,
      ellipsis: true,
      dataIndex: 'sets',
      fixed: 'right',
      resizable: true,
      render: (text, record, index) => {
        return (
          <div style={{ wordWrap: 'break-word', wordBreak: 'break-word' }}>
            <Tooltip title="指标详情">
              <a
                href="#"
                onClick={async (e) => {
                  subHandle.changeState({
                    modalOperate: 'detail',
                    formData: record,
                    formVisible: true,
                    currentRecord: record,
                  });
                }}
              >
                <ProfileOutlined />
              </a>
            </Tooltip>
            &nbsp;&nbsp;&nbsp;&nbsp;
            <Tooltip title="变更记录">
              <a
                href="#"
                onClick={(e) => {
                  e.preventDefault();
                  subHandle.changeState({
                    primaryKey: record.indexCode,
                    changeVisible: true,
                  });
                }}
              >
                <FileTextOutlined />
              </a>
            </Tooltip>
          </div>
        );
      },
    },
  ];
  // 子表按钮栏
  const subToolbar = {
    buttons: {
      arrange: {
        text: '部署',
        visible: 1,
        method: 'deploy',
        order: 10,
        icon: <CloudUploadOutlined />,
      },
      test: {
        text: '检测',
        method: 'test',
        order: 20,
        visible: 1,
        icon: <FileSearchOutlined />,
      },
      unload: {
        id: 'unload',
        text: '卸载',
        method: 'unload',
        visible: 1,
        order: 30,
        icon: <DeleteOutlined />,
        // 替代buttonState
        disable: (rows) => {
          if (rows.length < 1) {
            return true;
          }
          // 选中操作逻辑以卸载为例，如果选中的指标全等于已审核，按钮为不可操作状态。但选中指标包含但不全等于已审核，按钮提交则过滤已审核的选中数据，仅提交未审核的选中数据。
          return rows.every((row) => row.checkState == 1);
        },
      },
      edit: {
        text: '修改',
        method: 'edit',
        visible: 1,
        order: 100,
        // disable: () => false,
      },
      permitConfig: {
        text: '权限配置',
        method: 'permitConfig',
        visible: 1,
        icon: <LockOutlined />,
      },
      check: {
        id: 'check',
        text: '审核',
        visible: 1,
      },
      uncheck: {
        id: 'uncheck',
        text: '反审核',
        visible: 1,
      },
      more: {
        visible: 1,
        children: {
          download: {
            visible: 1,
            id: 'download',
            operCode: 'DOWN',
            type: 'text',
            text: '下载',
            icon: 'solution',
            disable: (rows) => {
              return rows.length < 1;
            },
          },
        },
      },
    },
  };
  // handles
  const subHandle = new SubHandle({ ...targetSub, masterSelectedRows: masterHandle.selectedRows });

  // console.log(222, subHandle);

  const panelProps = useMemo(() => {
    return {
      title: '指标管理',
    };
  });
  // 主表属性
  const masterTable = {
    // handles: masterHandle,单独拼装
    autoQuery: true,
    pageWrapper: false,
    search: {
      searchName: 'indexName',
      formItems: masterSearchBar,
      searchMethod: true,
    },
    columns: masterColumns,
    toolbar: masterToolbar,
    tableProps: {
      rowKey: 'indexCode', // 必填
    },
    pageInfo: {},
  };
  // 子表属性
  const subTable = {
    // handles: subHandle, 单独拼装
    rowKey: 'indexCode',
    autoQuery: false,
    pageWrapper: false,
    search: {
      formItems: subSearchBar,
    },
    columns: subColumns,
    toolbar: subToolbar,
    tableProps: {
      rowKey: 'indexCode', // 必填
      rowClassName: (record, index) => {
        if (record.auditState === 0) {
          return 'text-warning';
        }
      },
      expandable: {
        defaultExpandAllRows: false,
        expandedRowRender: (record) => {
          return <p style={{ margin: 0 }}>{record.indexDesc}</p>;
        },
        expandIconColumnIndex: 1,
      },
      onRow: (record) => {
        return {
          onDoubleClick: async (e) => {
            const { indexCode } = record;
            const res = await subHandle.service.detail({ indexCode });
            subHandle.changeState({
              modalOperate: 'detail',
              formData: res.data,
              formVisible: true,
              currentRecord: record,
            });
          },
        };
      },
    },
    // 此处自定义分页 djtao
    page: {},
  };

  return (
    <>
      <PagePane
        {...panelProps}
        masterTable={masterTable}
        subTable={subTable}
        masterModel={targetMaster}
        subModel={targetSub}
        subHandle={subHandle}
        masterHandle={masterHandle}
      />

      {addVisible ? (
        <MasterAddModal
          handle={masterHandle}
          classifyNode={classifyNode}
          title={modalTitle}
          setAddVisible={(boolean) => {
            masterHandle.changeState({
              addVisible: boolean,
            });
          }}
          addVisible={addVisible}
        />
      ) : null}

      {/* 增删改 */}
      <EditDetailModal
        mode={modalOperate}
        detailVisible={targetSub.formVisible}
        setDetailVisitble={(boolean) => {
          subHandle.changeState({
            formVisible: boolean,
          });
        }}
        detailData={targetSub.formData}
        handles={subHandle.formHandles()}
        refresh={subHandle.query.bind(subHandle)}
        currentSelect={targetSub.currentRecord}
      />

      {/* 检测 */}
      {testVisible ? (
        <DetectionModal
          testVisible={testVisible}
          setTestVisible={(boolean) => {
            subHandle.changeState({
              testVisible: boolean,
            });
          }}
        />
      ) : null}

      {/* 权限配置 */}
      {permission ? (
        <PermissionModal
          permission={permission}
          setPermission={(boolean) => {
            subHandle.changeState({
              permission: boolean,
            });
          }}
        />
      ) : null}

      {/* 权限配置-test */}
      {permitVisible ? (
        <PermitModal
          permitVisible={permitVisible}
          setPermitVisible={(boolean) => {
            subHandle.changeState({
              permitVisible: boolean,
            });
          }}
        />
      ) : null}

      {/* 部署 */}
      {deployVisible ? (
        <DeployModal
          testVisible={deployVisible}
          setTestVisible={(boolean) => {
            subHandle.changeState({
              deployVisible: boolean,
            });
          }}
        />
      ) : null}

      {/* 变更记录 */}
      {changeVisible ? (
        <ChangeModal
          primaryKey={primaryKey}
          changeVisible={changeVisible}
          setChangeVisible={(boolean) => {
            subHandle.changeState({
              changeVisible: boolean,
            });
          }}
        />
      ) : null}
    </>
  );
};

export default IndexPage;
