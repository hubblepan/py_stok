import React, { useCallback, useEffect, useRef, useMemo, useState } from 'react';
import ReactDOM from 'react-dom';
import request from '@/utils/request';
import PagePane from '@/blocks/PagePane';
import {
  CaretDownOutlined,
  CaretRightOutlined,
  SearchOutlined,
  SettingOutlined,
} from '@ant-design/icons';
import {
  Button,
  Input,
  Modal,
  Select,
  Tooltip,
  DatePicker,
  TreeSelect,
  Drawer,
  Cascader,
  Form,
} from 'antd';
import TableTreeDropdown from '@/pages/largeScreen/components/tableTreeDropdown';
import moment from 'moment';
import BaseHandle from '@/components/TableView/BaseHandle';
import ButtonState from '@/components/TableView/ButtonState';
import SvgIcon from '@/components/SvgIcon';
import BaseService from '@/handles/BaseService';
import MsgBox from '@/utils/MsgBox';
import TablePane from '@/blocks/TablePane';
import { useModel } from 'umi';
import ProductStructureModal from '@/pages/targetCorrelation/components/ProductStructureModal';
import RankItem from '@/pages/home/manage/components/RankItem';
import TreeSearchSelect from './components/TreeSearchSelect';
import styles from './style.less';
import ConfirmModal from './components/ConfirmModal';
import MonitorDetailDrawer from './components/MonitorDetailDrawer';
import TargetDetailDrawer from './components/TargetDetailDrawer';
import MasterHandle from './handles/MasterHandle';
import SubHandle from './handles/SubHandle';
import { connect } from 'umi';
import { mapStateToProps, mapDispatchToProps } from '@/handles/mapModelToProps';
import BeanUtil from '@/utils/BeanUtil';

const { Option } = Select;
const { RangePicker } = DatePicker;
const { TreeNode } = TreeSelect;

const MonitorLog = (props) => {
  // 主表
  // const modelName = 'monitor.master';
  const { monitorMaster, monitorSub } = props;

  console.log(monitorMaster, monitorSub);
  const masterHandle = new MasterHandle({ ...monitorMaster });
  const subHandle = new SubHandle({ ...monitorSub });

  const {
    structureVisible,
    setStructureVisible,
    dataSource,
    expandedRowKeys,
    expandLevel,
    setExpandedRowKeys,
  } = monitorMaster;
  const [menus, setMenus] = useState({});
  // useEffect(() => {
  //   console.log('主表dataSource');
  //   console.log(dataSource);
  //   const depth = expandLevel(0, dataSource);
  //   const menus = {};
  //   for (let i = 1; i <= depth; i++) {
  //     menus[i] = {};
  //     menus[i].text = `${i}级菜单`;
  //     menus[i].visible = 1;
  //     menus[i].method = 'expand';
  //     menus[i].level = i;
  //   }
  //   setMenus(menus);
  // }, [dataSource]);
  // 子表
  // const subModelName = 'monitor.sub';
  const {
    selectedId,
    setSelectedId,
    confirmVisible,
    confirmIds,
    monitorVisible,
    targetVisible,
    targetFormData,
    setConfirmVisible,
    setMonitorVisible,
    setTargetVisible,
    setTargetFormData,
  } = monitorSub;

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
  const [queryPlans, setQueryPlans] = useState([]);
  const [treeTarget, setTreeTarget] = useState([]);
  // useEffect(() => {
  //   request.post('/ocp/monitor/sub/queryplans').then((response) => {
  //     setQueryPlans(response.data.list || []);
  //   });
  //   request.get('/ocp/monitor/sub/treetarget').then((response) => {
  //     setTreeTarget(response.data.list || []);
  //   });
  // }, []);
  // const [confirmVisible, setConfirmVisible] = useState(false);
  // const [monitorVisible, setMonitorVisible] = useState(false);
  // const [targetVisible, setTargetVisible] = useState(false);
  // const [targetFormData, setTargetFormData] = useState({});
  // const [confirmIds, setConfirmIds] = useState([]);
  const monitorRef = useRef(null);
  const RangePickerFormatter = ({ value = '', onChange, ...rest }) => {
    const dateStart = value ? moment(value[0]) : null;
    const dateEnd = value ? moment(value[1]) : null;
    const changeDate = (date, dateString) => {
      if (onChange) {
        onChange(date ? dateString : null);
      }
    };
    /**
     * 1.要注意这个绑定的value一定要与暴露的value有所关联
     * 2.当清空时value一定要为null。value要么为moment对象，要么为null
     */
    return (
      <RangePicker {...rest} onChange={changeDate} value={value ? [dateStart, dateEnd] : null} />
    );
  };
  const DatePickerFormatter = ({ value = '', onChange, ...rest }) => {
    const changeDate = (date, dateString) => {
      // console.log(date);
      // console.log(dateString);

      if (onChange) {
        onChange(dateString);
      }
    };
    return <DatePicker {...rest} onChange={changeDate} value={value ? moment(value) : null} />;
  };
  const panelProps = useMemo(() => {});
  const masterTable = useMemo(() => {
    return {
      search: {
        formItems: [<Input placeholder="请输入关键词搜索" prefix={<SearchOutlined />} />],
      },
      toolbar: {
        buttons: {
          dashed: {
            visible: 1,
            children: {
              menu: {
                text: '分级菜单',
                visible: 1,
                children: menus || {},
              },
              refresh: {
                text: '刷新数据',
                visible: 1,
                method: 'refresh',
              },
              structure: {
                text: '产品结构配置',
                method: 'structure',
                visible: 1,
              },
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
          expandedRowKeys,
          setExpandedRowKeys,
        },
      },
      handles: masterHandle,
      ...monitorMaster,
    };
  });
  const subTable = useMemo(() => {
    return {
      columns: [
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
                      const { id } = record;
                      request
                        .get('/ocp/monitor/target/detail', {
                          params: { id },
                        })
                        .then((response) => {
                          console.log('response.data.list');
                          console.log(response.data.list);
                          setTargetFormData(response.data.list);
                          setTargetVisible(true);
                        });
                    }}
                  >
                    <SvgIcon icon="detail" style={{ fontSize: '18px' }} />
                  </a>
                </Tooltip>
                &nbsp;&nbsp;&nbsp;&nbsp;
                <Tooltip title="监测详情">
                  <a
                    href="#"
                    onClick={(event) => {
                      event.preventDefault();
                      setMonitorVisible(true);
                      console.log('columns record.id');
                      console.log(record.id);
                      setSelectedId(record.id);
                    }}
                  >
                    <SvgIcon icon="preview" style={{ fontSize: '18px' }} />
                  </a>
                </Tooltip>
              </div>
            );
          },
        },
      ],
      tableProps: {},
      search: {
        dateformat: {
          querydate: 'YYYY-MM-DD',
        },
        formItems: [
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
          <TreeSearchSelect label="监控指标" name="INDEX_CODES" tableProps={{dataSource:treeTarget}} />,
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
        ],
        colsNumber: 3,
        labelWidth: 80,
      },
      toolbar: {
        buttons: {
          execute: {
            text: '执行',
            visible: 1,
            id: 'execute',
            icon: 'execute',
          },
          confirm: {
            text: '确认',
            visible: 1,
            id: 'confirm',
            icon: 'confirm',
          },
          unconfirm: {
            text: '反确认',
            visible: 1,
            id: 'unconfirm',
            icon: 'unconfirm',
          },
        },
      },
      page: true,
      handles: subHandle,
      ...monitorSub,
    };
  });

  return (
    <>
      <PagePane
        ref={monitorRef}
        {...panelProps}
        masterTable={masterTable}
        subTable={subTable}
        masterModel={monitorMaster}
        subModel={monitorSub}
        masterHandle={masterHandle}
        subHandle={subHandle}
      >
        {/* <ProductStructureModal
          structureVisible={structureVisible}
          setStructureVisible={setStructureVisible}
          // refreshMaster={() => {
          //   comRef.current.refreshMasterTable();
          // }}
        />
        <ConfirmModal
          confirmVisible={confirmVisible}
          setConfirmVisible={setConfirmVisible}
          confirmIds={confirmIds}
          handles={subHandle}
          // service={monitorService}
        />
        <MonitorDetailDrawer
          monitorVisible={monitorVisible}
          setMonitorVisible={setMonitorVisible}
        />
        <TargetDetailDrawer
          targetVisible={targetVisible}
          setTargetVisible={setTargetVisible}
          formData={targetFormData}
        /> */}
      </PagePane>
    </>
  );
};

const indexPage = (namespaceMaster, namespaceSub) =>
  connect(
    ({ monitorMaster, monitorSub }) => {
      return { monitorMaster, monitorSub };
    },
    mapDispatchToProps(namespaceMaster, namespaceSub),
    (stateProps, dispatchProps, ownProps) => {
      return BeanUtil.merge(stateProps, dispatchProps, ownProps);
    },
  )(MonitorLog);

export default function (props) {
  const namespaceMaster = 'monitorMaster';
  const namespaceSub = 'monitorSub';
  let Pane = useCallback(indexPage(namespaceMaster, namespaceSub), []);
  return <Pane {...props} />;
}
