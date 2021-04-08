import React, { useEffect, useRef, useState } from 'react';
import PagePane from '@/blocks/PagePane';
import { SearchOutlined, SettingOutlined, FileTextOutlined } from '@ant-design/icons';
import { Form, Input, Radio, Select, Tooltip, TreeSelect } from 'antd';
import SvgIcon from '@/components/SvgIcon';
import { useModel } from 'umi';
import ProductStructureModal from '@/pages/ocp/ocpIndexRela/components/ProductStructureModal';
// import TaskDetailModal from './components/TaskDetailModal';
import TaskDetailModal from '@/pages/ocp/taskManage/components/DetailModal';
import SplitPane from 'react-split-pane';
import MasterPane from '@/blocks/MasterPane';
import TablePane from '@/blocks/TablePane';
import ErrorBoundary from '@/components/ErrorBoundary';
import TreeSearchSelect from '@/components/TreeSearchSelect';
import styles from './style.less';
import ConfirmModal from './components/ConfirmModal';
import MonitorDetailDrawer from './components/MonitorDetailDrawer';
import TargetDetailDrawer from './components/TargetDetailDrawer';
import RangePickerFormatter from './components/RangePickerFormatter';
import MasterHandle from './handles/MasterHandle';
import SubHandle from './handles/SubHandle';
// 任务模式 接口都是假的
import TaskMasterHandle from './handles/TaskMasterHandle';
import TaskSubHandle from './handles/TaskSubHandle';
import ImportSetModal from './components/ImportSetModal';
import Execute from './components/ExecuteModal';

const { Option } = Select;

const MonitorLog = (props) => {
  /**
   * 主表
   */
  const masterModel0 = useModel('ocp.monitorLogSummary.master0');
  const masterModel1 = useModel('ocp.monitorLogSummary.master1');
  const masterHandle0 = new MasterHandle({ ...masterModel0, url: { base: '/ocp/monitor/master' } });
  const masterHandle1 = new MasterHandle({
    ...masterModel1,
    url: { base: '/ocp/monitor/master1' },
  });
  const {
    structureVisible: structureVisible0,
    setStructureVisible: setStructureVisible0,
    dataSource: dataSource0,
    setExpandedRowKeys: setExpandedRowKeys0,
    expandedRowKeys: expandedRowKeys0,
    menus: menus0,
    setMenus: setMenus0,
  } = masterModel0;
  const {
    structureVisible: structureVisible1,
    setStructureVisible: setStructureVisible1,
    dataSource: dataSource1,
    setExpandedRowKeys: setExpandedRowKeys1,
    expandedRowKeys: expandedRowKeys1,
    menus: menus1,
    setMenus: setMenus1,
  } = masterModel1;
  useEffect(() => {
    setMenus0(masterHandle0.getMasterMenus(dataSource0));
  }, [dataSource0]);
  useEffect(() => {
    setMenus1(masterHandle1.getMasterMenus(dataSource1));
  }, [dataSource1]);

  // 任务模式
  const taskMasterModel = useModel('ocp.monitorLogSummary.master2');
  const taskMasterHandle = new TaskMasterHandle({
    ...taskMasterModel,
    url: { base: '/ocp/monitor/master' },
  });
  const {
    menus: menus2,
    setMenus: setMenus2,
    dataSource: dataSource2,
    setExpandedRowKeys: setExpandedRowKeys2,
    expandedRowKeys: expandedRowKeys2,
  } = taskMasterModel;

  useEffect(() => {
    setMenus2(taskMasterHandle.getMasterMenus(dataSource2));
  }, [dataSource2]);

  /**
   * 子表
   */
  const subModel0 = useModel('ocp.monitorLogSummary.sub0');
  const subHandle0 = new SubHandle({
    ...subModel0,
    masterSelectedRows: masterHandle0.selectedRows,
    url: {
      base: '/ocp/monitor/sub',
      confirm: '/ocp/monitor/sub/confirm',
      unconfirm: '/ocp/monitor/sub/unconfirm',
      execute: '/ocp/monitor/sub/execute',
      plan: '/ocp/monitor/sub/queryplans',
      tree: '/ocp/monitor/sub/treetarget',
    },
  });
  const subModel1 = useModel('ocp.monitorLogSummary.sub1');
  const subHandle1 = new SubHandle({
    ...subModel1,
    masterSelectedRows: masterHandle1.selectedRows,
    url: {
      base: '/ocp/monitor/sub1',
      confirm: '/ocp/monitor/sub1/confirm',
      unconfirm: '/ocp/monitor/sub1/unconfirm',
      execute: '/ocp/monitor/sub1/execute',
      plan: '/ocp/monitor/sub/queryplans',
      tree: '/ocp/monitor/sub/treetarget',
    },
  });

  // 任务模式

  const taskSubModel = useModel('ocp.monitorLogSummary.sub2');
  const taskSubHandle = new TaskSubHandle({
    ...taskSubModel,
    url: {
      base: '/ocp/monitor/sub',
    },
    masterSelectedRows: taskMasterHandle.selectedRows,
  });

  const { importSetVisible, setImportSetVisible, executeVisible, setExecuteVisible } = taskSubModel;

  const {
    /** 任务弹窗 */
    taskVisible: taskVisible0,
    setTaskVisible: setTaskVisible0,
    /** 确认弹窗 */
    confirmVisible: confirmVisible0,
    setConfirmVisible: setConfirmVisible0,
    confirmIds: confirmIds0,
    /** 指标详情 */
    targetId: targetId0,
    setTargetId: setTargetId0,
    targetVisible: targetVisible0,
    setTargetVisible: setTargetVisible0,
    /** 监控详情 */
    monitorId: monitorId0,
    setMonitorId: setMonitorId0,
    monitorVisible: monitorVisible0,
    setMonitorVisible: setMonitorVisible0,
  } = subModel0;
  const {
    /** 任务弹窗 */ taskVisible: taskVisible1,
    setTaskVisible: setTaskVisible1,
    /** 确认弹窗 */
    confirmVisible: confirmVisible1,
    setConfirmVisible: setConfirmVisible1,
    confirmIds: confirmIds1,
    /** 指标详情 */
    targetId: targetId1,
    setTargetId: setTargetId1,
    targetVisible: targetVisible1,
    setTargetVisible: setTargetVisible1,
    /** 监控详情 */
    monitorId: monitorId1,
    setMonitorId: setMonitorId1,
    monitorVisible: monitorVisible1,
    setMonitorVisible: setMonitorVisible1,
  } = subModel1;
  // 这个是固定的，非接口
  const [treeData, setTreeData] = useState([
    {
      title: '监控状态',
      value: '0-0',
      key: '0-0',
      children: [
        {
          title: '异常',
          value: '0',
          key: '0',
        },
        {
          title: '预警',
          value: '1',
          key: '1',
        },
        {
          title: '正常',
          value: '2',
          key: '2',
        },
      ],
    },
    {
      title: '执行状态',
      value: '0-1',
      key: '0-1',
      children: [
        {
          title: '程序错误',
          value: '3',
          key: '3',
        },
        {
          title: '未执行',
          value: '4',
          key: '4',
        },
      ],
    },
  ]);
  // 这个无所谓做成简易数据流，是情况而定
  const [queryPlans, setQueryPlans] = useState([]);
  const [treeTarget, setTreeTarget] = useState([]);
  const columns = [
    {
      title: '指标名称',
      dataIndex: 'indexName',
      width: 120,
      // resizable:1,
    },
    {
      title: '指标代码',
      dataIndex: 'indexCode',
      width: 120,
      // resizable:1,
    },
    {
      title: '公共指标',
      dataIndex: 'commonIndex',
      width: 120,
      // resizable:1,
    },
  ];
  useEffect(() => {
    const { service } = subHandle0;
    service.plan().then((response) => {
      setQueryPlans(response.data.list || []);
    });
    service.tree().then((response) => {
      setTreeTarget(response.data.list || []);
    });
  }, []);
  const monitorRef = useRef(null);
  const [mode, setMode] = useState('1');
  const changeMode = (e) => {
    setMode(e.target.value);
  };

  // 三个模式切换
  const activeKey = mode;
  const tabs = {
    items: [
      { key: '1', label: '组合模式' },
      { key: '2', label: '指标模式' },
      { key: '3', label: '任务模式' },
    ],
    activeKey,
    onChange: (key) => {
      setMode(key);
    },
    options: {},
  };

  const createModeStatus = (mode) => {
    const modeStatus = {};
    switch (mode) {
      case '1':
        modeStatus.menus = menus0;
        modeStatus.expandedRowKeys = expandedRowKeys0;
        modeStatus.setExpandedRowKeys = setExpandedRowKeys0;
        modeStatus.toolbar = {
          buttons: {
            add: { visible: 1 },
            edit: { visible: 1 },
            check: { visible: 1 },
            uncheck: { visible: 1 },
            execute: {
              text: '执行',
              visible: 1,
              id: 'execute',
              icon: 'execute',
              disable: (rows) => {
                if (rows && rows.length) {
                  return false;
                }
                return true;
              },
            },
            executelog: {
              text: '执行日志2',
              visible: 1,
              id: 'executelog',
              method: 'executelog',
              icon: 'execute',
              // disable: (rows) => {
              //   if (rows && rows.length) {
              //     return false;
              //   }
              //   return true;
              // },
            },
            confirm: {
              text: '确认',
              visible: 1,
              id: 'confirm',
              icon: 'confirm',
              disable: (rows) => {
                if (rows && rows.length) {
                  return !rows.some((row) => row.confirmStatus === 0);
                }
                return true;
              },
            },
            unconfirm: {
              text: '反确认',
              visible: 1,
              id: 'unconfirm',
              icon: 'unconfirm',
              disable: (rows) => {
                if (rows && rows.length) {
                  return !rows.some((row) => row.confirmStatus === 1);
                }
                return true;
              },
            },
          },
        };
        modeStatus.columns = [
          {
            title: '指标名称',
            dataIndex: 'c_INDEX_NAME',
            key: 'c_INDEX_NAME',
            width: 100,
            fixed: 'left',
            resizable: 1,
          },
          {
            title: '监控状态',
            dataIndex: 'c_MONITOR_STATE',
            key: 'c_MONITOR_STATE',
            width: 100,
          },
          {
            title: '执行状态',
            dataIndex: 'c_EXECUTE_STATE',
            key: 'c_EXECUTE_STATE',
            width: 120,
          },
          {
            title: '确认状态',
            dataIndex: 'confirmStatus',
            key: 'confirmStatus',
            width: 120,
          },
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
            width: 70,
            fixed: 'right',
            render: (text, record, index) => {
              return (
                <div style={{ wordWrap: 'break-word', wordBreak: 'break-word' }}>
                  <Tooltip title="指标详情">
                    <a
                      href="#"
                      onClick={(event) => {
                        event.preventDefault();
                        setTargetId0(record.id);
                        setTargetVisible0(true);
                      }}
                    >
                      <SvgIcon icon="detail" style={{ fontSize: '18px' }} />
                    </a>
                  </Tooltip>
                  &nbsp;&nbsp;&nbsp;&nbsp;
                  <Tooltip title="监控详情">
                    <a
                      href="#"
                      onClick={(event) => {
                        event.preventDefault();
                        setMonitorId0(record.id);
                        setMonitorVisible0(true);
                      }}
                    >
                      <SvgIcon icon="preview" style={{ fontSize: '18px' }} />
                    </a>
                  </Tooltip>
                </div>
              );
            },
          },
        ];
        modeStatus.formItems = [
          <Input.Group compact style={{ display: 'flex', flexWrap: 'nowarp' }}>
            <Form.Item name="SEARCH_STYLE" label="" initialValue="business">
              <Select label="" style={{ width: '100px' }}>
                <Option value="business">业务日期</Option>
                <Option value="execute">执行日期</Option>
              </Select>
            </Form.Item>
            <Form.Item name="querydate" label="" style={{ flex: '1 1 auto', marginRight: '0px' }}>
              <RangePickerFormatter style={{ width: '100%' }} />
              {/* <DatePickerFormatter style={{ width: '100%' }} /> */}
            </Form.Item>
          </Input.Group>,
          <TreeSearchSelect
            label="监控指标"
            name="INDEX_CODES"
            tableProps={{
              dataSource: treeTarget,
              columns: columns,
            }}
            valueField="indexCode"
            labelField="indexName"
          />,
          // <TableTreeDropdown label="监控指标" name="INDEX_CODES" data={[{code: 'aaa'}]} />,
          <TreeSelect
            className={styles.multiSelect}
            treeData={treeData}
            label="状态"
            name="MONITOR_STATE"
            treeDefaultExpandAll
            treeCheckable
            showCheckedStrategy={TreeSelect.SHOW_CHILD}
          />,
          <Select label="处理状态" name="CHECK_STATE" allowClear mode="multiple">
            <Option value="1">未处理</Option>
            <Option value="2">已处理</Option>
          </Select>,
          <Select
            optionLabelProp="label"
            label="查询方案"
            name="queryfangan"
            allowClear
            style={{ width: '100%' }}
          >
            {queryPlans.map((item, index) => {
              return (
                <Option value={item.code} label={item.label} key={index}>
                  <div>
                    <span style={{ display: 'inline-block', width: '60px' }}>{item.code}</span>
                    <span>{item.label}</span>
                  </div>
                </Option>
              );
            })}
          </Select>,
        ];
        break;
      case '2':
        modeStatus.menus = menus1;
        modeStatus.expandedRowKeys = expandedRowKeys1;
        modeStatus.setExpandedRowKeys = setExpandedRowKeys1;
        modeStatus.toolbar = {
          buttons: {
            add: { visible: 1 },
            edit: { visible: 1 },
            check: { visible: 1 },
            uncheck: { visible: 1 },
            execute: {
              text: '执行',
              visible: 1,
              id: 'execute',
              icon: 'execute',
              disable: (rows) => {
                if (rows && rows.length) {
                  return false;
                }
                return true;
              },
            },
            executelog: {
              text: '执行日志2',
              visible: 1,
              id: 'executelog',
              method: 'executelog',
              icon: 'execute',
              // disable: (rows) => {
              //   if (rows && rows.length) {
              //     return false;
              //   }
              //   return true;
              // },
            },
            confirm: {
              text: '确认',
              visible: 1,
              id: 'confirm',
              icon: 'confirm',
              disable: (rows) => {
                if (rows && rows.length) {
                  return !rows.some((row) => row.confirmStatus === 0);
                }
                return true;
              },
            },
            unconfirm: {
              text: '反确认',
              visible: 1,
              id: 'unconfirm',
              icon: 'unconfirm',
              disable: (rows) => {
                if (rows && rows.length) {
                  return !rows.some((row) => row.confirmStatus === 1);
                }
                return true;
              },
            },
          },
        };
        modeStatus.columns = [
          {
            title: '指标名称',
            dataIndex: 'c_INDEX_NAME',
            key: 'c_INDEX_NAME',
            width: 100,
            fixed: 'left',
            resizable: 1,
          },
          {
            title: '监控状态',
            dataIndex: 'c_MONITOR_STATE',
            key: 'c_MONITOR_STATE',
            width: 100,
          },
          {
            title: '执行状态',
            dataIndex: 'c_EXECUTE_STATE',
            key: 'c_EXECUTE_STATE',
            width: 120,
          },
          {
            title: '确认状态',
            dataIndex: 'confirmStatus',
            key: 'confirmStatus',
            width: 120,
          },
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
            width: 70,
            fixed: 'right',
            render: (text, record, index) => {
              return (
                <div style={{ wordWrap: 'break-word', wordBreak: 'break-word' }}>
                  <Tooltip title="指标详情">
                    <a
                      href="#"
                      onClick={(event) => {
                        event.preventDefault();
                        setTargetId1(record.id);
                        setTargetVisible1(true);
                      }}
                    >
                      <SvgIcon icon="detail" style={{ fontSize: '18px' }} />
                    </a>
                  </Tooltip>
                  &nbsp;&nbsp;&nbsp;&nbsp;
                  <Tooltip title="监控详情">
                    <a
                      href="#"
                      onClick={(event) => {
                        event.preventDefault();
                        setMonitorId1(record.id);
                        setMonitorVisible1(true);
                      }}
                    >
                      <SvgIcon icon="preview" style={{ fontSize: '18px' }} />
                    </a>
                  </Tooltip>
                </div>
              );
            },
          },
        ];
        modeStatus.formItems = [
          <Input.Group compact style={{ display: 'flex', flexWrap: 'nowarp' }}>
            <Form.Item name="SEARCH_STYLE" label="" initialValue="business">
              <Select label="" style={{ width: '100px' }}>
                <Option value="business">业务日期</Option>
                <Option value="execute">执行日期</Option>
              </Select>
            </Form.Item>
            <Form.Item name="querydate" label="" style={{ flex: '1 1 auto', marginRight: '0px' }}>
              <RangePickerFormatter style={{ width: '100%' }} />
              {/* <DatePickerFormatter style={{ width: '100%' }} /> */}
            </Form.Item>
          </Input.Group>,
          <TreeSearchSelect
            label="监控指标"
            name="INDEX_CODES"
            tableProps={{
              dataSource: treeTarget,
              columns: columns,
            }}
            valueField="indexCode"
            labelField="indexName"
          />,
          // <TableTreeDropdown label="监控指标" name="INDEX_CODES" data={[{code: 'aaa'}]} />,
          <TreeSelect
            className={styles.multiSelect}
            treeData={treeData}
            label="状态"
            name="MONITOR_STATE"
            treeDefaultExpandAll
            treeCheckable
            showCheckedStrategy={TreeSelect.SHOW_CHILD}
          />,
          <Select label="处理状态" name="CHECK_STATE" allowClear mode="multiple">
            <Option value="1">未处理</Option>
            <Option value="2">已处理</Option>
          </Select>,
          <Select
            optionLabelProp="label"
            label="查询方案"
            name="queryfangan"
            allowClear
            style={{ width: '100%' }}
          >
            {queryPlans.map((item, index) => {
              return (
                <Option value={item.code} label={item.label} key={index}>
                  <div>
                    <span style={{ display: 'inline-block', width: '60px' }}>{item.code}</span>
                    <span>{item.label}</span>
                  </div>
                </Option>
              );
            })}
          </Select>,
        ];
        break;
      case '3':
        modeStatus.menus = menus2;
        modeStatus.expandedRowKeys = expandedRowKeys2;
        modeStatus.setExpandedRowKeys = setExpandedRowKeys2;
        modeStatus.toolbar = {
          buttons: {
            execute: {
              text: '执行',
              visible: 1,
              id: 'execute',
              icon: 'execute',
              disable: (rows) => {
                if (rows && rows.length) {
                  return false;
                }
                return true;
              },
            },
            add: { visible: 1 },
            edit: { visible: 1 },
            deletes: {
              visible: 1,
              disable: (rows) => {
                if (rows && rows.length) {
                  return false;
                }
                return true;
              },
            },
            importSetting: {
              text: '数据导入设置',
              visible: 1,
              id: 'importSetting',
              icon: 'execute',
            },
            positionRelation: {
              text: '任务岗位关联',
              visible: 1,
              id: 'positionRelation',
              icon: 'execute',
            },
          },
        };
        modeStatus.columns = [
          {
            title: '任务名称',
            dataIndex: 'c_MONITOR_STATE',
            key: 'c_MONITOR_STATE',
            width: 100,
          },
          {
            title: '指标名称',
            dataIndex: 'c_INDEX_NAME',
            key: 'c_INDEX_NAME',
            width: 100,
            fixed: 'left',
            resizable: 1,
          },
          {
            title: '执行状态',
            dataIndex: 'c_EXECUTE_STATE',
            key: 'c_EXECUTE_STATE',
            width: 120,
          },
          {
            title: '最后一次执行时间',
            dataIndex: 'confirmStatus',
            key: 'confirmStatus',
            width: 120,
          },
          {
            title: '执行详情',
            dataIndex: 'confirmStatus',
            key: 'confirmStatus',
            width: 120,
          },
          {
            title: '下一次执行时间',
            dataIndex: 'c_EXECUTE_STATE',
            key: 'c_EXECUTE_STATE',
            width: 120,
          },
          {
            title: '修改人',
            dataIndex: 'confirmStatus',
            key: 'confirmStatus',
            width: 120,
          },
          {
            title: '修改时间',
            dataIndex: 'confirmStatus',
            key: 'confirmStatus',
            width: 120,
          },
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
            width: 70,
            fixed: 'right',
            render: (text, record, index) => {
              return (
                <Tooltip title="执行详情">
                  <a
                    href="#"
                    onClick={(e) => {
                      e.preventDefault();
                      // taskSubHandle.changeState({
                      //   detailVisible: true,
                      // });
                    }}
                  >
                    <FileTextOutlined />
                  </a>
                </Tooltip>
              );
            },
          },
        ];
        modeStatus.formItems = [
          <Form name="basic">
            <Form.Item label="执行时间" name="querydate">
              <RangePickerFormatter style={{ width: '100%' }} />
            </Form.Item>
          </Form>,
          <Select label="执行状态" name="N_CHECK_STATE" allowClear>
            <Select.Option value="SearchAll">执行状态1</Select.Option>
            <Select.Option value="SearchAudit">执行状态2</Select.Option>
            <Select.Option value="SearchUnAudit">执行状态3</Select.Option>
          </Select>,
          <Form name="basic">
            <Form.Item label="任务名称" name="taskName">
              <Input />
            </Form.Item>
          </Form>,
        ];
        break;

      default:
        break;
    }
    return modeStatus;
  };
  const createPanelProps = (mode) => {
    const modeStatus = createModeStatus(mode);
    return {
      masterTable: {
        search: {
          formItems: [<Input placeholder="请输入关键词搜索" prefix={<SearchOutlined />} />],
          searchMethod: true,
          searchName: 'classifyName',
        },
        toolbar: {
          buttons: {
            dashed: {
              visible: 1,
              children: {
                menu: {
                  text: '分级菜单',
                  visible: 1,
                  children: modeStatus.menus || {},
                },
                refresh: {
                  text: '刷新数据',
                  visible: 1,
                  method: 'refresh',
                },
                // structure: {
                //   text: '产品结构配置',
                //   method: 'structure',
                //   visible: 1,
                // },
              },
            },
          },
        },
        columns: [
          {
            title: '指标分类',
            dataIndex: 'classifyName',
          },
        ],
        tableProps: {
          expandable: {
            expandedRowKeys: modeStatus.expandedRowKeys,
            setExpandedRowKeys: modeStatus.setExpandedRowKeys,
          },
        },
      },
      header: {
        tabs,
        toolbar: modeStatus.toolbar,
      },
      subTable: {
        columns: modeStatus.columns,
        tableProps: {},
        search: {
          dateformat: {
            querydate: 'YYYY-MM-DD',
          },
          formItems: modeStatus.formItems,
          colsNumber: 3,
          labelWidth: 80,
        },
      },
    };
  };
  const masterTable0 = {
    header: {
      headerRender: () => {
        return (
          <header className="a-card-header">
            <Radio.Group
              defaultValue="1"
              value={mode}
              onChange={changeMode}
              style={{ margin: 'auto' }}
            >
              <Radio.Button value="1">组合模式</Radio.Button>
              <Radio.Button value="2">指标模式</Radio.Button>
            </Radio.Group>
          </header>
        );
      },
    },
    search: {
      formItems: [<Input placeholder="请输入关键词搜索" prefix={<SearchOutlined />} />],
      searchMethod: true,
      searchName: 'classifyName',
    },
    toolbar: {
      buttons: {
        swap: {
          visible: 1,
          icon: 'swap',
          text: '',
        },
        dashed: {
          visible: 1,
          children: {
            menu: {
              text: '分级菜单',
              visible: 1,
              children: menus0 || {},
            },
            refresh: {
              text: '刷新数据',
              visible: 1,
              method: 'refresh',
            },
            // structure: {
            //   text: '产品结构配置',
            //   method: 'structure',
            //   visible: 1,
            // },
          },
        },
      },
    },
    columns: [
      {
        title: '指标分类',
        dataIndex: 'classifyName',
      },
    ],
    tableProps: {
      expandable: {
        expandedRowKeys: expandedRowKeys0,
        setExpandedRowKeys: setExpandedRowKeys0,
      },
    },
  };

  return (
    <>
      <PagePane
        hide={mode !== '1'}
        ref={monitorRef}
        {...createPanelProps('1')}
        masterModel={masterModel0}
        subModel={subModel0}
        masterHandle={masterHandle0}
        subHandle={subHandle0}
      >
        {taskVisible0 && <TaskDetailModal visible={taskVisible0} setVisible={setTaskVisible0} />}
        {structureVisible0 && (
          <ProductStructureModal
            structureVisible={structureVisible0}
            setStructureVisible={setStructureVisible0}
            // refreshMaster={() => {
            //   comRef.current.refreshMasterTable();
            // }}
          />
        )}
        {confirmVisible0 && (
          <ConfirmModal
            confirmVisible={confirmVisible0}
            setConfirmVisible={setConfirmVisible0}
            confirmIds={confirmIds0}
            handles={subHandle0}
          />
        )}
        {monitorVisible0 && (
          <MonitorDetailDrawer
            id={monitorId0}
            monitorVisible={monitorVisible0}
            setMonitorVisible={setMonitorVisible0}
          />
        )}
        {targetVisible0 && (
          <TargetDetailDrawer
            id={targetId0}
            targetVisible={targetVisible0}
            setTargetVisible={setTargetVisible0}
            handles={subHandle0}
          />
        )}
      </PagePane>
      {/* <ErrorBoundary> */}
      {/*  <section className={`${mode !== '1' ? 'hidden' : ''} page-wrapper a-card`}> */}
      {/*    <SplitPane split="vertical" minSize={260} maxSize={600} paneStyle={{ overflow: 'auto' }}> */}
      {/*      <MasterPane */}
      {/*        hide={mode !== '1'} */}
      {/*        {...masterTable0} */}
      {/*        {...masterModel0} */}
      {/*        handles={masterHandle0} */}
      {/*      /> */}
      {/*      <TablePane */}
      {/*        hide={mode !== '1'} */}
      {/*        {...createPanelProps('1').subTable} */}
      {/*        {...subModel0} */}
      {/*        handles={subHandle0} */}
      {/*      /> */}
      {/*    </SplitPane> */}
      {/*  </section> */}
      {/* </ErrorBoundary> */}
      <PagePane
        hide={mode !== '2'}
        ref={monitorRef}
        {...createPanelProps('2')}
        masterModel={masterModel1}
        subModel={subModel1}
        masterHandle={masterHandle1}
        subHandle={subHandle1}
      >
        {taskVisible1 && <TaskDetailModal visible={taskVisible1} setVisible={setTaskVisible1} />}
        {structureVisible1 && (
          <ProductStructureModal
            structureVisible={structureVisible1}
            setStructureVisible={setStructureVisible1}
            // refreshMaster={() => {
            //   comRef.current.refreshMasterTable();
            // }}
          />
        )}
        {confirmVisible1 && (
          <ConfirmModal
            confirmVisible={confirmVisible1}
            setConfirmVisible={setConfirmVisible1}
            confirmIds={confirmIds1}
            handles={subHandle1}
          />
        )}
        {monitorVisible1 && (
          <MonitorDetailDrawer
            id={monitorId1}
            monitorVisible={monitorVisible1}
            setMonitorVisible={setMonitorVisible1}
          />
        )}
        {targetVisible1 && (
          <TargetDetailDrawer
            id={targetId1}
            targetVisible={targetVisible1}
            setTargetVisible={setTargetVisible1}
            handles={subHandle1}
          />
        )}
      </PagePane>

      <PagePane
        hide={mode !== '3'}
        ref={monitorRef}
        {...createPanelProps('3')}
        masterModel={taskMasterModel}
        subModel={taskSubModel}
        subHandle={taskSubHandle}
        masterHandle={taskMasterHandle}
      />

      {/* 数据导入设置 */}
      {importSetVisible ? (
        <ImportSetModal visible={importSetVisible} setVisible={setImportSetVisible} />
      ) : null}

      {/* 执行 */}
      {executeVisible ? <Execute visible={executeVisible} setVisible={setExecuteVisible} /> : null}
    </>
  );
};

export default MonitorLog;
