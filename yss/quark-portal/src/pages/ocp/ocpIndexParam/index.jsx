import React, { useState, useEffect, useRef, createContext } from 'react';
import { Input, Select, Tooltip, Popover, Pagination, Radio, Form } from 'antd';
import {
  CaretDownOutlined,
  CaretRightOutlined,
  SettingOutlined,
  ProfileOutlined,
  MoreOutlined,
  SearchOutlined,
} from '@ant-design/icons';
import { useModel } from 'umi';
import SvgIcon from '@/components/SvgIcon/index';
// 简易数据流
import PagePane from '@/blocks/PagePane';
import SplitPane from 'react-split-pane';
import MasterPane from '@/blocks/MasterPane';
import TablePane from '@/blocks/TablePane';
import ErrorBoundary from '@/components/ErrorBoundary';
import { queryMasterTable } from '@/services/targetParams.js';
import BaseHandle from '@/components/TableView/BaseHandle';
import request from '@/utils/request';
import ButtonState from '@/components/TableView/ButtonState';
import MsgBox from '@/utils/MsgBox';
import BaseService from '@/handles/BaseService';
import { changeParams } from '@/services/targetParams';
import ChangeModal from './components/ChangeModal';
import ViewDetail from './components/ViewDetail';
import EditModal from './components/EditModal';
import ParamsPreview from './components/ParamsPreview';
// import CombinMasterHandle from './handles/CombinMasterHandle';
import CommonPortMasterHandle from '../handles/CommonPortMasterHandle';
// import IndexMasterHandle from './handles/IndexMasterHandle';
import CommonIndexMasterHandle from '../handles/CommonIndexMasterHandle';
import CombinSubHandle from './handles/CombinSubHandle';
import IndexSubHandle from './handles/IndexSubHandle';
import DetailAndChange from './components/DetailAndChangeModal';
import QuarkTable from '@/components/QuarkTable';
import CombinSubService from './service/CombinSubService';
import TreeSearchSelect from '@/components/TreeSearchSelect/index';
// import CombinMasterService from './service/CombinMasterService';
import CommonPortMasterService from '../service/CommonPortMasterService';

const service = new CombinSubService();
const masterService = new CommonPortMasterService();

const IndexPage = (props) => {
  const [mode, setMode] = useState('1');
  const comRef = useRef(null);
  const [form] = Form.useForm();
  const changeMode = (e) => {
    setMode(e.target.value);
  };

  const [refreshParams0, setRefreshParams0] = useState([]);
  const [refreshParams1, setRefreshParams1] = useState([]);

  // 组合模式
  const combinMasterModel = useModel('ocp.ocpIndexParam.combinMaster');
  const combinSubModel = useModel('ocp.ocpIndexParam.combinSub');
  const {
    menus: menus0,
    setMenus: setMenus0,
    dataSource: dataSource0,
    expandedRowKeys: expandedRowKeys0,
    setExpandedRowKeys: setExpandedRowKeys0,
  } = combinMasterModel;
  const {
    viewDetails,
    setViewDetails,
    changeVisible,
    setChangeVisible,
    paramsPreview,
    setParamsPreview,
    formData,
    editVisible,
    setEditVisible,
    detailAndChange,
    setDetailAndChange,
    type,
    setType,
    expandedRowKeys: subExpandedRowKeys,
    setExpandedRowKeys: subSetExpandedRowKeys,
  } = combinSubModel;
  const combinMasterHandle = new CommonPortMasterHandle({
    ...combinMasterModel,
  });
  const combinSubHandle = new CombinSubHandle({
    ...combinSubModel,
    masterSelectedRows: combinMasterHandle.selectedRows,
  });

  // 指标模式
  const indexMasterModel = useModel('ocp.ocpIndexParam.indexMaster');
  const indexSubModel = useModel('ocp.ocpIndexParam.indexSub');
  const indexMasterHandle = new CommonIndexMasterHandle({
    ...indexMasterModel,
  });
  const indexSubHandle = new IndexSubHandle({
    ...indexSubModel,
    masterSelectedRows: indexMasterHandle.selectedRows,
  });
  const { menus: menus1, setMenus: setMenus1, dataSource: dataSource1 } = indexMasterModel;

  const {
    editIndexVisible,
    setEditIndexVisible,
    paramsPreviewIndex,
    setParamsPreviewIndex,
    detailAndChangeIndex,
    setDetailAndChangeIndex,
  } = indexSubModel;

  // 进入页面首先获取-组合缓存
  const fetchCache = async (treeData) => {
    const portcodeList = [];
    const search = (treeData) => {
      // 递归遍历
      treeData.map((item) => {
        if (item.dATA_TYPE === 'PORT_TYPE') {
          portcodeList.push(item.c_PORT_CODE);
        }
        if (item.children) {
          search(item.children);
        }
      });
    };
    search(treeData);
    // console.log(portcodeList);
    const response = await masterService.cache(portcodeList);
    console.log('fetchCache');
    console.log(response);
    setRefreshParams1({ cacheAllPortList: response.data });
    combinSubHandle.setParams({
      ...combinSubHandle.params,
      cacheAllPortList: response.data,
    });

    /** 同时将所有组合塞到indexSubHandle中 */
    indexSubHandle.setParams({
      ...indexSubHandle.params,
      // portCode,
      cacheAllPortList: response.data,
    });
  };

  const getPortAll = (treeData) => {
    const indexMap = {};
    const indexCode = [];
    const search = (treeData) => {
      // 递归遍历
      treeData.map((item) => {
        if (item.indexType) {
          indexMap[item.indexCode] = item.indexName;
          indexCode.push(item.indexCode);
        }
        if (item.children) {
          search(item.children);
        }
      });
    };
    search(treeData);
    console.log('indexMap');
    console.log(indexMap);
    console.log(indexCode);
    setRefreshParams0({ dictIndexMap: indexMap });
    combinSubHandle.setParams({
      ...combinSubHandle.params,
      dictIndexMap: indexMap,
      indexCode,
    });
  };

  console.log('refreshParams0');
  console.log(refreshParams0, refreshParams1);

  useEffect(() => {
    setMenus0(combinMasterHandle.getMasterMenus(dataSource0));
    if (dataSource0.length) {
      // 获取组合缓存
      fetchCache(dataSource0);
      /** 获取所有的组合 */
      getPortAll(dataSource1);
    }
  }, [dataSource0]);

  // 获取所有map
  const dictIndexMap = (treeData) => {
    const indexMap = {};
    const indexCode = [];
    const search = (treeData) => {
      // 递归遍历
      treeData.map((item) => {
        if (item.indexType) {
          indexMap[item.indexCode] = item.indexName;
          indexCode.push(item.indexCode);
        }
        if (item.children) {
          search(item.children);
        }
      });
    };
    search(treeData);
    // console.log('indexMap');
    // console.log(indexMap);
    // console.log(indexCode);
    combinSubHandle.setParams({
      ...combinSubHandle.params,
      dictIndexMap: indexMap,
      indexCode,
    });

    indexSubHandle.setParams({
      ...indexSubHandle.params,
      dictIndexMap: indexMap,
    });
  };

  // 排除已关账的组合
  const fetchFilter = async () => {
    const response = await masterService.filter();
    // console.log('fetchFilter');
    // console.log(response);
    const portFilter = response.data ? response.data.split('|') : [];
    // console.log('portFilter+++++++');
    // console.log(portFilter);
    combinSubHandle.setParams({
      ...combinSubHandle.params,
      portFilter,
    });
  };
  useEffect(() => {
    // 排除已关账的组合
    fetchFilter();
  }, []);

  useEffect(() => {
    setMenus1(indexMasterHandle.getMasterMenus(dataSource1));
    /** 获取所有指标的map */
    dictIndexMap(dataSource1);
  }, [dataSource1]);

  // 模式切换
  const HeaderRender = (
    <header className="a-card-header">
      <Radio.Group
        defaultValue="1"
        value={mode}
        // className="ml-2"
        onChange={changeMode}
        // size="small"
        style={{ margin: 'auto' }}
      >
        <Radio.Button value="1">组合模式</Radio.Button>
        <Radio.Button value="2">指标模式</Radio.Button>
      </Radio.Group>
    </header>
  );

  // 指标列表-下拉框
  const columnsIndex = [
    {
      title: '指标名称',
      align: 'left',
      key: 'indexName',
      dataIndex: 'indexName',
      width: 150,
    },
    {
      title: '指标代码',
      align: 'left',
      key: 'indexCode',
      dataIndex: 'indexCode',
      width: 150,
    },
  ];

  // 生效参数-下拉框
  const [effectParamData, setEffectParamData] = useState([]);
  useEffect(() => {
    async function fetchData() {
      const res = await service.effectParam(['OCP_PARAMTYPE']);
      setEffectParamData(res.data);
    }
    fetchData();
  }, []);

  // console.log(effectParamData);

  const DropDownSelect = (props) => {
    const { value = '', onChange, tableProps = {}, ...rest } = props;
    const [paramList, setParamList] = useState(value);
    const changeSelect = (selectedRowKeys, selectedRows) => {
      console.log(selectedRowKeys, selectedRows);
      setParamList(selectedRows.map((row) => row.c_DV_NAME).join('|'));
      // onChange && onChange(selectedRowKeys, selectedRows);
      onChange(selectedRows.map((row) => row.c_DV_CODE).join(','));
    };

    return (
      <Select
        allowClear
        placeholder="请选择"
        value={paramList}
        dropdownMatchSelectWidth={200}
        {...rest}
        dropdownRender={() => (
          <>
            <QuarkTable
              showHeader={false}
              columns={[{ dataIndex: 'c_DV_NAME', key: 'c_DV_CODE' }]}
              rowKey="c_DV_NAME"
              rowSelection={{
                columnWidth: 50,
                onChange: changeSelect,
              }}
              {...tableProps}
            />
          </>
        )}
      />
    );
  };

  const formItems0 = [
    <TreeSearchSelect
      label="指标列表"
      name="ARRAY_INDEX_CODE"
      tableProps={{
        rowKey: 'indexCode',
        dataSource: dataSource1,
        columns: columnsIndex,
      }}
      valueField="indexCode"
      labelField="indexCode"
    />,
    <DropDownSelect
      label="生效参数"
      name="OCP_PARAMTYPE"
      tableProps={{
        dataSource: effectParamData,
      }}
    />,
  ];
  const formItems1 = [
    <DropDownSelect
      label="生效参数"
      name="OCP_PARAMTYPE"
      tableProps={{
        dataSource: effectParamData,
      }}
    />,
  ];

  function hoverContent(record) {
    return (
      <div style={{ fontSize: 12, lineHeight: '30px' }}>
        <div
          style={{ cursor: 'pointer' }}
          onClick={() => {
            combinSubHandle.changeState({
              rowRecord: record,
            });

            // console.log('预览combinSubHandle.rowRecord');
            // console.log(combinSubHandle.rowRecord);
            setParamsPreview(true);
          }}
        >
          指标参数预览
        </div>
        <div
          style={{ cursor: 'pointer' }}
          onClick={() => {
            combinSubHandle.changeState({
              currentRecord: record,
            });
            // console.log('详情combinSubHandle.currentRecord');
            // console.log(combinSubHandle.currentRecord);
            setDetailAndChange(true);
            setType('detail');
          }}
        >
          指标信息详情
        </div>
        <div
          style={{ cursor: 'pointer' }}
          onClick={() => {
            combinSubHandle.changeState({
              currentRecord: record,
            });
            setDetailAndChange(true);
            setType('change');
          }}
        >
          指标变更记录
        </div>
      </div>
    );
  }

  // 指标模式 设置列
  function hoverIndexContent(record) {
    return (
      <>
        <div style={{ fontSize: 12, lineHeight: '30px' }}>
          <div
            style={{ cursor: 'pointer' }}
            onClick={() => {
              indexSubHandle.changeState({
                rowRecord: record,
              });
              setParamsPreviewIndex(true);
            }}
          >
            指标参数预览
          </div>
        </div>
        {record.parentCode === '[root]' ? (
          <div style={{ fontSize: 12, lineHeight: '30px' }}>
            <div
              style={{ cursor: 'pointer' }}
              onClick={() => {
                indexSubHandle.changeState({
                  currentRecord: record,
                });
                setDetailAndChangeIndex(true);
                setType('detail');
              }}
            >
              指标信息详情
            </div>
            <div
              style={{ cursor: 'pointer' }}
              onClick={() => {
                indexSubHandle.changeState({
                  currentRecord: record,
                });
                setDetailAndChangeIndex(true);
                setType('change');
              }}
            >
              指标变更记录
            </div>
          </div>
        ) : null}
      </>
    );
  }

  let activeKey = mode;
  const tabs = {
    items: [
      { key: '1', label: '组合模式' },
      { key: '2', label: '指标模式' },
    ],
    activeKey,
    onChange: (key) => {
      setMode(key);
    },
    options: {},
  };

  /** ****************************组合模式********************************** */

  const header0 = {
    tabs,
    toolbar: {
      buttons: {
        diyParamConfig: {
          text: '参数配置',
          visible: 1,
          method: 'diyParamConfig',
        },
        check: {
          visible: 1,
        },
        uncheck: {
          visible: 1,
        },
        more: {
          visible: true,
        },
      },
    },
  };
  const combinMasterTable = {
    // header: {
    //   headerRender: () => {
    //     return HeaderRender;
    //   },
    // },
    autoQuery: true,
    pageWrapper: false,
    search: {
      searchName: 'c_PORT_NAME_ST',
      formItems: [<Input placeholder="请输入关键词搜索" prefix={<SearchOutlined />} />],
      searchMethod: true,
    },
    columns: [
      {
        title: '组合简称',
        key: 'c_PORT_NAME_ST',
        dataIndex: 'c_PORT_NAME_ST',
        width: 150,
        resizable: true,
        ellipsis: true,
        // shouldCellUpdate: (record, prevRecord) => {
        //   console.log('测试一下', record, prevRecord);
        // },
        // filters: [
        //   {
        //     text: '全部组合',
        //     value: '1',
        //   },
        //   {
        //     text: '常用组合',
        //     value: '0',
        //   },
        // ],
      },
    ],
    toolbar: {
      buttons: {
        dashed: {
          visible: 1,
          children: {
            refresh: {
              visible: 1,
            },
            menu: {
              visible: 1,
              children: menus0,
            },
            structure: {
              text: '产品结构配置',
              // method: 'structure',
              visible: 1,
            },
          },
        },
      },
    },
    type: 'tree',
    queryParams: 'c_PORT_NAME_ST', //
    tableProps: {
      rowKey: 'c_PORT_CODE', // 必填
      defaultExpandAllRows: true, // 默认展开所有行
      // expandable: {
      //   expandedRowKeys: expandedRowKeys0,
      //   setExpandedRowKeys: setExpandedRowKeys0,
      // },
    },
  };

  const combinSubTable = {
    search: {
      formItems: formItems0,
      colsNumber: 4,
      labelWidth: 80,
    },
    columns: [
      {
        title: '名称',
        dataIndex: 'name',
        key: 'name',
        width: 200,
        getCellProps: (value, row, rowIndex) => {
          if (!row.isLeaf) {
            return { colSpan: 8, rowSpan: 1 };
          }
        },
        render: (value, row, index) => {
          if (!row.isLeaf) {
            return `【${row.name}】${row.name}（${row.remark}）`;
          }
          return row.name;
        },

        search: true,
        resizable: true,
        hidden: false,
        export: true,
        widget: 'input',
      },
      {
        title: '生效参数',
        dataIndex: 'paramType',
        key: 'paramType',
        width: 100,
        render: (content, record, index) => {
          let name = '';
          switch (record.paramType) {
            case 'ocp_indexParam':
              name = '指标参数';
              break;
            case 'ocp_groupParam':
              name = '分类参数';
              break;
            case 'ocp_portParam':
              name = '私有参数';
              break;
            default:
              break;
          }
          return name;
        },

        search: true,
        resizable: true,
        show: true,
        export: true,
        widget: 'input',
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
        render: (content, record, index) => {
          let relaType = '';
          switch (record.relaType) {
            case 'ocp_groupRela':
              relaType = '群组模式';
              break;
            case 'ocp_assRela':
              relaType = '资产类型';
              break;
            case 'ocp_datRela':
              relaType = '资产类别';
              break;
            case 'ocp_shortNumRela':
              relaType = '自定义分类';
              break;
            case 'ocp_portRela':
              relaType = '指定组合';
              break;
            default:
              break;
          }
          return relaType;
        },
      },
      {
        title: '审核状态',
        key: 'auditState',
        dataIndex: 'auditState',
        width: 80,
        render: (content, record, index) => {
          let auditState = '';
          switch (record.auditState) {
            case 0:
              auditState = '未审核';
              break;
            case 1:
              auditState = '已审核';
              break;
            default:
              break;
          }
          return auditState;
        },
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
        dataIndex: 'sets',
        align: 'center',
        fixed: 'right',
        resizable: true,
        // ellipsis: true,
        render: (text, record, index) => {
          return (
            <div style={{ wordWrap: 'break-word', wordBreak: 'break-word' }}>
              {record.paramType === 'ocp_noParam' ||
              (record.auditState === 1 && record.paramType === 'ocp_portParam') ? (
                <span style={{ width: '5px', height: '5px', marginRight: '15px' }} />
              ) : (
                <Tooltip title="参数配置">
                  <a
                    href="#"
                    onClick={(e) => {
                      combinSubHandle.changeState({
                        currentRecord: record,
                      });
                      console.log('combinSubHandle.currentRecord');
                      console.log(combinSubHandle.currentRecord);
                      setEditVisible(true);
                    }}
                  >
                    <SvgIcon icon="setting" />
                  </a>
                </Tooltip>
              )}
              &nbsp;&nbsp;&nbsp;&nbsp;
              <Tooltip title="更多">
                <Popover
                  trigger="click"
                  placement="bottom"
                  style={{ width: 300 }}
                  content={hoverContent(record)}
                >
                  <MoreOutlined />
                </Popover>
              </Tooltip>
            </div>
          );
        },
      },
    ],

    type: 'tree',
    autoQuery: false,
    tableProps: {
      rowKey: 'codeKey', // 必填
      expandable: {
        // defaultExpandAllRows: true, // 默认展开
        // expandedRowKeys: subExpandedRowKeys,
        // setExpandedRowKeys: subSetExpandedRowKeys,
      },
    },
    footer: {
      footerRender: (pageInfo, footerRender, rest) => {
        const changePage = (pageNo, pageSize) => {
          console.log('changePage');
          combinSubHandle.query(pageNo, pageSize);
        };
        return (
          <footer className="a-card-footer flex-right">
            <Pagination
              style={{ height: 22, lineHeight: '20px', paddingRight: 16 }}
              size="small"
              showSizeChanger
              showQuickJumper
              pageSizeOptions={['10', '20', '50', '100', '200']}
              // defaultPageSize={20}
              defaultPageSize={pageInfo.pageSize}
              defaultCurrent={pageInfo.pageNo}
              total={pageInfo.pageTotal}
              showTotal={(total) => `共 ${total} 项`}
              // pageSize={pageInfo.pageSize}
              current={pageInfo.pageNo}
              onChange={changePage}
            />
          </footer>
        );
      },
    },
  };

  /** ****************************指标模式********************************** */

  const header1 = {
    tabs,
    toolbar: {
      buttons: {
        diyParamConfig: {
          text: '参数配置',
          visible: 1,
          method: 'diyParamConfig',
        },
        check: {
          visible: 1,
        },
        uncheck: {
          visible: 1,
        },
        more: {
          visible: true,
        },
      },
    },
  };

  const indexMasterTable = {
    // header: {
    //   headerRender: () => {
    //     return HeaderRender;
    //   },
    // },
    search: {
      searchName: 'indexName',
      formItems: [<Input placeholder="请输入关键词搜索" prefix={<SearchOutlined />} />],
      searchMethod: true,
    },
    columns: [
      {
        key: 'indexName',
        title: '监控指标',
        dataIndex: 'indexName',
        width: 150,
        ellipsis: true,
      },
    ],
    toolbar: {
      buttons: {
        dashed: {
          visible: 1,
          children: {
            refresh: {
              visible: 1,
            },
            menu: {
              visible: 1,
              children: menus1,
            },
          },
        },
      },
    },
    // type: 'tree',
    autoQuery: true,
    queryParams: 'indexName', //
    tableProps: {
      rowKey: 'indexCode', // 必填
      expandable: {
        defaultExpandAllRows: true, // 默认展开所有行
      },
    },
  };

  const indexSubTable = {
    search: {
      formItems: formItems1,
      colsNumber: 4,
      labelWidth: 80,
    },
    columns: [
      {
        title: '名称',
        dataIndex: 'name',
        key: 'name',
        width: 200,
        ellipsis: true,
        getCellProps: (value, row, rowIndex) => {
          if (!row.isLeaf) {
            return { colSpan: 8, rowSpan: 1 };
          }
        },
        render: (value, row, index) => {
          if (!row.isLeaf) {
            return `【${row.code}】${row.name}（${row.remark}）`;
          }
          return row.name;
        },
      },
      {
        title: '生效参数',
        dataIndex: 'paramType',
        key: 'paramType',
        width: 100,
        render: (content, record, index) => {
          let paramType = '';
          switch (record.paramType) {
            case 'ocp_indexParam':
              paramType = '指标参数';
              break;
            case 'ocp_groupParam':
              paramType = '分类参数';
              break;
            case 'ocp_portParam':
              paramType = '私有参数';
              break;
            default:
              break;
          }
          return paramType;
        },
      },
      {
        title: '代码',
        dataIndex: 'code',
        width: 120,
        key: 'code',
      },
      {
        title: '关联模式',
        key: 'relaType',
        width: 100,
        dataIndex: 'relaType',
        render: (content, record, index) => {
          let relaType = '';
          switch (record.relaType) {
            case 'ocp_groupRela':
              relaType = '群组模式';
              break;
            case 'ocp_assRela':
              relaType = '资产类型';
              break;
            case 'ocp_datRela':
              relaType = '资产类别';
              break;
            case 'ocp_shortNumRela':
              relaType = '自定义分类';
              break;
            case 'ocp_portRela':
              relaType = '指定组合';
              break;
            default:
              break;
          }
          return relaType;
        },
      },
      {
        title: '审核状态',
        key: 'auditState',
        dataIndex: 'auditState',
        width: 80,
        render: (content, record, index) => {
          let auditState = '';
          switch (record.auditState) {
            case 0:
              auditState = '未审核';
              break;
            case 1:
              auditState = '已审核';
              break;
            default:
              break;
          }
          return auditState;
        },
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
        dataIndex: 'sets',
        align: 'center',
        fixed: 'right',
        resizable: true,
        render: (text, record, index) => {
          return (
            <div style={{ wordWrap: 'break-word', wordBreak: 'break-word' }}>
              {(record.paramType !== 'ocp_indexParam' && record.auditState === 1) ||
              (record.parentCode === '[root]' && record.auditState === 1) ? (
                <span style={{ width: '5px', height: '5px', marginRight: '15px' }} />
              ) : (
                <Tooltip title="参数配置">
                  <a
                    href="#"
                    onClick={(e) => {
                      // indexSubHandle.currentRecord = record;
                      indexSubHandle.changeState({
                        currentRecord: record,
                      });
                      // console.log('indexSubHandle.currentRecord');
                      // console.log(indexSubHandle.currentRecord);
                      setEditIndexVisible(true);
                    }}
                  >
                    <SvgIcon icon="setting" />
                  </a>
                </Tooltip>
              )}
              &nbsp;&nbsp;&nbsp;&nbsp;
              <Tooltip title="更多">
                <Popover
                  trigger="click"
                  placement="bottom"
                  style={{ width: 300 }}
                  content={hoverIndexContent(record)}
                >
                  <MoreOutlined />
                </Popover>
              </Tooltip>
            </div>
          );
        },
      },
    ],

    type: 'tree',
    autoQuery: false,
    tableProps: {
      rowKey: 'codeKey', // 必填
      expandable: {
        // defaultExpandAllRows: true, // 默认展开
        // expandedRowKeys: subExpandedRowKeys,
        // setExpandedRowKeys: subSetExpandedRowKeys,
      },
    },
    footer: {
      footerRender: (pageInfo, footerRender, rest) => {
        const changePage = (pageNo, pageSize) => {
          console.log('changePage');
          indexSubHandle.query(pageNo, pageSize);
        };
        return (
          <footer className="a-card-footer flex-right">
            <Pagination
              style={{ height: 22, lineHeight: '20px', paddingRight: 16 }}
              size="small"
              showSizeChanger
              showQuickJumper
              pageSizeOptions={['10', '20', '50', '100', '200']}
              // defaultPageSize={20}
              defaultPageSize={pageInfo.pageSize}
              defaultCurrent={pageInfo.pageNo}
              total={pageInfo.pageTotal}
              showTotal={(total) => `共 ${total} 项`}
              // pageSize={pageInfo.pageSize}
              current={pageInfo.pageNo}
              onChange={changePage}
            />
          </footer>
        );
      },
    },
  };

  return (
    <>
      <PagePane
        hide={mode !== '1'}
        ref={comRef}
        header={header0}
        masterTable={combinMasterTable}
        subTable={combinSubTable}
        masterModel={combinMasterModel}
        subModel={combinSubModel}
        subHandle={combinSubHandle}
        masterHandle={combinMasterHandle}
      >
        {/* 指标信息详情 */}
        {/* {viewDetails ? (
          <ViewDetail formData={formData} visible={viewDetails} setViewDetails={setViewDetails} />
        ) : null} */}

        {/* 指标参数预览 */}
        {paramsPreview ? (
          <ParamsPreview
            visible={paramsPreview}
            setParamsPreview={setParamsPreview}
            currentSelect={combinSubHandle.rowRecord}
          />
        ) : null}
      </PagePane>

      <PagePane
        hide={mode !== '2'}
        ref={comRef}
        header={header1}
        masterTable={indexMasterTable}
        subTable={indexSubTable}
        masterModel={indexMasterModel}
        subModel={indexSubModel}
        subHandle={indexSubHandle}
        masterHandle={indexMasterHandle}
      >
        {/* 指标参数预览 */}
        {paramsPreviewIndex ? (
          <ParamsPreview
            visible={paramsPreviewIndex}
            setParamsPreview={setParamsPreviewIndex}
            currentSelect={indexSubHandle.rowRecord}
          />
        ) : null}
        {/* 指标信息详情 */}
        {/* {viewDetails ? (
          <ViewDetail formData={formData} visible={viewDetails} setViewDetails={setViewDetails} />
        ) : null} */}
      </PagePane>

      {/* 指标变更记录&指标信息详情 */}
      {detailAndChange ? (
        <DetailAndChange
          visible={detailAndChange}
          setDetailAndChange={setDetailAndChange}
          currentSelect={combinSubHandle.currentRecord}
          type={type}
        />
      ) : null}

      {detailAndChangeIndex ? (
        <DetailAndChange
          visible={detailAndChangeIndex}
          setDetailAndChange={setDetailAndChangeIndex}
          currentSelect={indexSubHandle.currentRecord}
          type={type}
        />
      ) : null}

      {/* 组合模式修改 */}
      {editVisible ? (
        <EditModal
          editVisible={editVisible}
          setEditVisible={setEditVisible}
          currentSelect={combinSubHandle.currentRecord}
          refreshParams0={refreshParams0}
          refreshParams1={refreshParams1}
        />
      ) : null}

      {/* 指标模式修改 */}
      {editIndexVisible ? (
        <EditModal
          editVisible={editIndexVisible}
          setEditVisible={setEditIndexVisible}
          currentSelect={indexSubHandle.currentRecord}
        />
      ) : null}

      {/* 指标变更记录 */}
      {/* <ChangeModal
        changeVisible={changeVisible}
        setChangeVisible={setChangeVisible}
        onCancel={() => setChangeVisible(false)}
        // data={ChangeData}
      /> */}

      {/* <ErrorBoundary>
        <section className={`${mode !== '1' ? 'hidden' : ''} page-wrapper a-card`}>
          <SplitPane split="vertical" minSize={260} maxSize={600} paneStyle={{ overflow: 'auto' }}>
            <MasterPane
              hide={mode !== '1'}
              {...combinMasterTable}
              // {...createPanelProps('1').masterTable}
              {...combinMasterModel}
              handles={combinMasterHandle}
            />
            <TablePane
              hide={mode !== '1'}
              {...combinSubTable}
              // {...createPanelProps('1').subTable}
              filterButton
              {...combinSubModel}
              handles={combinSubHandle}
            >
              {paramsPreview ? (
                <ParamsPreview visible={paramsPreview} setParamsPreview={setParamsPreview} />
              ) : null}
            </TablePane>
          </SplitPane>
        </section>
      </ErrorBoundary> */}

      {/* <ErrorBoundary>
        <section className={`${mode !== '2' ? 'hidden' : ''} page-wrapper a-card`}>
          <SplitPane split="vertical" minSize={260} maxSize={600} paneStyle={{ overflow: 'auto' }}>
            <MasterPane
              hide={mode !== '2'}
              {...indexMasterTable}
              // {...createPanelProps('1').masterTable}
              {...indexMasterModel}
              handles={indexMasterHandle}
            />
            <TablePane
              hide={mode !== '2'}
              {...indexSubTable}
              // {...createPanelProps('1').subTable}
              filterButton
              {...indexSubModel}
              handles={indexSubHandle}
            />
          </SplitPane>
          {paramsPreview ? (
            <ParamsPreview visible={paramsPreview} setParamsPreview={setParamsPreview} />
          ) : null}
        </section>
      </ErrorBoundary> */}
    </>
  );
};

export default IndexPage;
