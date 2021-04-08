import React, { useEffect, useRef, useState } from 'react';
import { Button, Input, Pagination, Radio, Select, Tooltip } from 'antd';
import { SearchOutlined, SettingOutlined } from '@ant-design/icons';
import PagePane from '@/blocks/PagePane';
import SvgIcon from '@/components/SvgIcon/index';
import { useModel } from 'umi';
import TreeSearchSelect from '@/components/TreeSearchSelect/index';
import AddModal from './components/AddModal';
import ProductStructureModal from './components/ProductStructureModal';
import DiyClassifyAdminModal from './components/DiyClassifyAdminModal';
// import MasterHandle0 from './handles/MasterHandle0';
import CommonPortMasterHandle from '../handles/CommonPortMasterHandle';
// import MasterHandle1 from './handles/MasterHandle1';
import CommonIndexMasterHandle from '../handles/CommonIndexMasterHandle';
import MasterHandle2 from './handles/MasterHandle2';
import SubHandle0 from './handles/SubHandle0';
import SubHandle1 from './handles/SubHandle1';
import SubHandle2 from './handles/SubHandle2';
import styles from './style.less';
import UnbindModal from './components/UnbindModal';

const TargetCorrelation = (props) => {
  /**
   * 主表-3种模式
   */
  const masterModel0 = useModel('ocp.ocpIndexRela.master0');
  const masterModel1 = useModel('ocp.ocpIndexRela.master1');
  const masterModel2 = useModel('ocp.ocpIndexRela.master2');
  const masterHandle0 = new CommonPortMasterHandle(masterModel0);
  const masterHandle1 = new CommonIndexMasterHandle(masterModel1);
  const masterHandle2 = new MasterHandle2(masterModel2);
  const {
    expandedRowKeys: expandedRowKeys0,
    setExpandedRowKeys: setExpandedRowKeys0,
    rowKey: rowKey0,
    menus: menus0,
    setMenus: setMenus0,
    dataSource: dataSource0,
    structureVisible,
    setStructureVisible,
  } = masterModel0;
  const {
    expandedRowKeys: expandedRowKeys1,
    setExpandedRowKeys: setExpandedRowKeys1,
    rowKey: rowKey1,
    menus: menus1,
    setMenus: setMenus1,
    dataSource: dataSource1,
  } = masterModel1;
  const {
    expandedRowKeys: expandedRowKeys2,
    setExpandedRowKeys: setExpandedRowKeys2,
    rowKey: rowKey2,
    menus: menus2,
    setMenus: setMenus2,
    dataSource: dataSource2,
    diyVisible,
    setDiyVisible,
  } = masterModel2;
  /**
   * 子表-3种模式
   */
  const subModel0 = useModel('ocp.ocpIndexRela.sub0');
  const subModel1 = useModel('ocp.ocpIndexRela.sub1');
  const subModel2 = useModel('ocp.ocpIndexRela.sub2');
  const subHandle0 = new SubHandle0({
    ...subModel0,
    masterSelectedRows: masterHandle0.selectedRows,
  });
  const subHandle1 = new SubHandle1({
    ...subModel1,
    masterSelectedRows: masterHandle1.selectedRows,
  });
  const subHandle2 = new SubHandle2({
    ...subModel2,
    masterSelectedRows: masterHandle2.selectedRows,
  });
  const { addVisible, setAddVisible } = subHandle2;
  const {
    currentRecord: currentRecord0,
    setCurrentRecord: setCurrentRecord0,
    unbindVisible: unbindVisible0,
    setUnbindVisible: setUnbindVisible0,
    dataSource: subDataSource0,
    expandedRowKeys: subExpandedRowKeys0,
    setExpandedRowKeys: subSetExpandedRowKeys0,
  } = subModel0;
  const {
    currentRecord: currentRecord1,
    setCurrentRecord: setCurrentRecord1,
    unbindVisible: unbindVisible1,
    setUnbindVisible: setUnbindVisible1,
    dataSource: subDataSource1,
    expandedRowKeys: subExpandedRowKeys1,
    setExpandedRowKeys: subSetExpandedRowKeys1,
  } = subModel1;
  const {
    dataSource: subDataSource2,
    expandedRowKeys: subExpandedRowKeys2,
    setExpandedRowKeys: subSetExpandedRowKeys2,
  } = subModel2;
  const fetchPortCache = async (treeData) => {
    const portCode = [];
    const search = (treeData) => {
      // 递归遍历
      treeData.map((item) => {
        if (item.dATA_TYPE === 'PORT_TYPE') {
          portCode.push(item.c_PORT_CODE);
        }
        if (item.children) {
          search(item.children);
        }
      });
    };
    search(treeData);
    console.log(portCode);
    const response = await masterHandle0.service.cache(portCode);
    console.log('fetchPortCache');
    console.log(response);
    subHandle0.setParams({
      ...subHandle0.params,
      cacheAllPortList: response.data,
    });
    /** 同时将所有组合塞到subHandle1中 */
    subHandle1.setParams({
      ...subHandle1.params,
      portCode,
      cacheAllPortList: response.data,
    });
  };
  useEffect(() => {
    console.log('subHandle1.params');
    console.log(subHandle1.params);
  }, [subHandle1.params]);
  const fetchPortFilter = async () => {
    const response = await masterHandle0.service.filter();
    console.log('fetchPortFilter');
    console.log(response);
    const portFilter = response.data ? response.data.split('|') : [];
    subHandle0.setParams({
      ...subHandle0.params,
      portFilter,
    });
  };

  useEffect(() => {
    /** 需要排除的组合(仅组合模式下) */
    fetchPortFilter();
  }, []);
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
  const columnsPort = [
    {
      title: '组合简称',
      dataIndex: 'c_PORT_NAME_ST',
      width: 150,
    },
    {
      title: '组合代码',
      dataIndex: 'c_PORT_CODE',
      width: 150,
    },
  ];
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
    console.log('indexMap');
    console.log(indexMap);
    console.log(indexCode);
    subHandle0.setParams({
      ...subHandle0.params,
      dictIndexMap: indexMap,
      indexCode,
    });
    subHandle1.setParams({
      ...subHandle1.params,
      dictIndexMap: indexMap,
    });
    subHandle2.setParams({
      ...subHandle0.params,
      indexCode,
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
    subHandle0.setParams({
      ...subHandle0.params,
      dictIndexMap: indexMap,
      indexCode,
    });
  };
  useEffect(() => {
    setMenus0(masterHandle0.getMasterMenus(dataSource0));
    if (dataSource0.length) {
      /** 获取缓存的组合 */
      fetchPortCache(dataSource0);
      /** 获取所有的组合 */
      getPortAll(dataSource0);
    }
  }, [dataSource0]);
  useEffect(() => {
    setMenus1(masterHandle1.getMasterMenus(dataSource1));
    /** 获取所有指标的map */
    dictIndexMap(dataSource1);
  }, [dataSource1]);
  useEffect(() => {
    setMenus2(masterHandle2.getMasterMenus(dataSource2));
  }, [dataSource2]);

  useEffect(() => {
    subHandle0.expandLevel(0, subDataSource0);
  }, [subDataSource0]);
  useEffect(() => {
    subHandle1.expandLevel(0, subDataSource1);
  }, [subDataSource1]);
  useEffect(() => {
    subHandle2.expandLevel(0, subDataSource2);
  }, [subDataSource2]);

  const [mode, setMode] = useState('1');
  const comRef = useRef(null);

  const changeMode = (e) => {
    setMode(e.target.value);
  };

  const createModeStatus = (mode) => {
    let modeStatus = {};
    switch (mode) {
      case '1':
        modeStatus = {
          getRowProps: (row, rowIndex) => {
            let className = '';
            if (row.indexCode) {
              const isAudit =
                row.auditState === 0 &&
                (row.bindState === 'ocp_handUnbind' || row.bindState === 'ocp_notBind');
              if (isAudit) className = 'text-warning';
            }
            return {
              className,
            };
          },
          rowKey: rowKey0,
          subColumns: [
            {
              title: '指标名称',
              dataIndex: 'indexName',
              key: 'indexName',
              width: 250,
              resizable: 1,
              // render: (value, row, index) => {
              //   const obj = {
              //     children: value,
              //     props: {},
              //   };
              //   if (!row.isLeaf) {
              //     /**
              //      * 这里不能是12（总列数）
              //      * 注意：需要把固定列数去掉，不能把固定列列数也算在内
              //      */
              //     obj.props.colSpan = 11;
              //     obj.children = row.remark;
              //   }
              //   return obj;
              // },
              getCellProps: (value, row, rowIndex) => {
                if (!row.isLeaf) {
                  return { colSpan: 11, rowSpan: 1 };
                }
              },
              render: (value, row, index) => {
                if (!row.isLeaf) {
                  return row.remark;
                }
                return row.indexName;
              },
              // getValue: (row, rowIndex) => {
              //   console.log('row');
              //   console.log(row);
              //   console.log('rowIndex');
              //   console.log(rowIndex);
              //   if (!row.isLeaf) {
              //     return row.remark;
              //   }
              //   return row.indexName;
              // },
            },
            {
              title: '指标代码',
              dataIndex: 'indexCode',
              key: 'indexCode',
              width: 180,
            },
            {
              title: '关联模式',
              dataIndex: 'relaType',
              width: 150,
              key: 'relaType',
            },
            {
              title: '绑定状态',
              align: 'center',
              key: 'bindState',
              dataIndex: 'bindState',
              width: 150,
            },
            {
              title: '备注',
              align: 'center',
              key: 'remark',
              dataIndex: 'remark',
              width: 80,
            },
            {
              title: '创建人',
              align: 'center',
              key: 'modifier',
              dataIndex: 'modifier',
              width: 80,
            },
            {
              title: '创建时间',
              key: 'modifyDate',
              dataIndex: 'modifyDate',
              width: 150,
            },
            {
              title: '审核状态',
              align: 'center',
              key: 'auditState',
              dataIndex: 'auditState',
              width: 150,
            },
            {
              title: '审核人',
              align: 'center',
              key: 'operator',
              dataIndex: 'operator',
              width: 80,
            },
            {
              title: '审核时间',
              key: 'auditDate',
              dataIndex: 'auditDate',
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
              width: 100,
              align: 'center',
              fixed: 'right',
              render: (text, record, index) => {
                // const obj = {
                //   children: text,
                //   props: {},
                // };
                // if (!record.isLeaf) {
                //   obj.children = null;
                //   obj.props.colSpan = 0; // 不渲染
                //   return obj;
                // }
                return (
                  <>
                    <Tooltip title="绑定">
                      <Button
                        style={{ height: '22px', padding: '0px 8px' }}
                        type="text"
                        disabled={
                          !(
                            record.indexCode &&
                            (record.bindState === 'ocp_handUnbind' ||
                              record.bindState === 'ocp_notBind')
                          )
                        }
                        onClick={(event) => {
                          subHandle0.bind({ event, record });
                        }}
                      >
                        <SvgIcon icon="links" />
                      </Button>
                    </Tooltip>
                    <Tooltip title="解绑">
                      <Button
                        style={{ height: '22px', padding: '0px 8px' }}
                        type="text"
                        disabled={
                          !(
                            record.indexCode &&
                            record.auditState === 1 &&
                            (record.bindState === 'ocp_autoBind' ||
                              record.bindState === 'ocp_handBind')
                          )
                        }
                        onClick={() => {
                          subHandle0.unbindSingle();
                          setCurrentRecord0(record);
                        }}
                      >
                        <SvgIcon icon="delink" />
                      </Button>
                    </Tooltip>
                  </>
                );
              },
            },
          ],
          expandedRowKeys: expandedRowKeys0,
          setExpandedRowKeys: setExpandedRowKeys0,
          subExpandedRowKeys: subExpandedRowKeys0,
          subSetExpandedRowKeys: subSetExpandedRowKeys0,
          modelName: 'targetCorrelation.master0',
          subModel: subHandle0,
          subHandle: subHandle0,
          masterModel: masterHandle0,
          masterHandle: masterHandle0,
          masterColumns: [
            {
              title: '组合简称',
              dataIndex: 'c_PORT_NAME_ST',
              ellipsis: true,
              width: 150,
              filters: [
                {
                  text: '全部',
                  value: '1',
                },
                {
                  text: '常用',
                  value: '0',
                },
              ],
            },
          ],
          masterToolbar: {
            buttons: {
              dashed: {
                visible: 1,
                children: {
                  menu: {
                    text: '分级菜单',
                    visible: true,
                    children: menus0,
                  },
                  refresh: {
                    id: 'refresh',
                    method: 'refresh',
                    text: '刷新数据',
                    visible: 1,
                  },
                  structure: {
                    method: 'structure',
                    text: '产品结构配置',
                    visible: 1,
                  },
                },
              },
            },
          },
          subToolbar: {
            buttons: {
              bind: {
                id: 'bind',
                text: '绑定',
                icon: 'links',
                method: 'bind',
                visible: 1,
                order: 1,
                disable: (rows) => {
                  // 1.首先排除掉父结点
                  const indexRows = rows && rows.filter((item) => item.indexCode);
                  if (indexRows && indexRows.length) {
                    // 2.人工解绑或者未绑定
                    return !indexRows.some(
                      (row) =>
                        row.bindState === 'ocp_handUnbind' || row.bindState === 'ocp_notBind',
                    );
                  }
                  return true;
                },
              },
              unbind: {
                id: 'unbind',
                text: '解绑',
                icon: 'delink',
                method: 'unbind',
                visible: 1,
                order: 2,
                disable: (rows) => {
                  // 1.首先排除掉父结点
                  const indexRows = rows && rows.filter((item) => item.indexCode);
                  if (indexRows && indexRows.length) {
                    // 2.人工解绑或者未绑定
                    return !indexRows.some(
                      (row) =>
                        row.auditState === 1 &&
                        (row.bindState === 'ocp_autoBind' || row.bindState === 'ocp_handBind'),
                    );
                  }
                  return true;
                },
              },
              check: {
                visible: 1,
                disable: (rows) => {
                  // 1.首先排除掉父结点
                  const indexRows = rows && rows.filter((item) => item.indexCode);
                  if (indexRows && indexRows.length) {
                    // 2.人工解绑或者未绑定
                    return !indexRows.some(
                      (row) =>
                        row.auditState === 0 &&
                        (row.bindState === 'ocp_handUnbind' || row.bindState === 'ocp_notBind'),
                    );
                  }
                  return true;
                },
              },
            },
          },
          formItems: [
            // <Input type="text" label="指标列表" name="ARRAY_INDEX_CODE" />,
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
            <Select
              label="绑定状态"
              name="C_BIND_STATE"
              allowClear
              showArrow
              mode="multiple"
              maxTagCount={2}
              maxTagTextLength={2}
              className={styles.multiSelect}
            >
              <Select.Option value="ocp_notBind">未绑定</Select.Option>
              <Select.Option value="ocp_autoBind">自动绑定</Select.Option>
              <Select.Option value="ocp_handBind">人工绑定</Select.Option>
              <Select.Option value="ocp_handUnbind">人工解绑</Select.Option>
              {/* <Select.Option value="dollar3">人工解绑1</Select.Option> */}
              {/* <Select.Option value="dollar4">人工解绑2</Select.Option> */}
              {/* <Select.Option value="dollar5">人工解绑3</Select.Option> */}
              {/* <Select.Option value="dollar6">人工解绑4</Select.Option> */}
            </Select>,
            <Select label="审核状态" name="N_CHECK_STATE" allowClear>
              <Select.Option value="SearchAll">全部</Select.Option>
              <Select.Option value="SearchAudit">已审核</Select.Option>
              <Select.Option value="SearchUnAudit">未审核</Select.Option>
            </Select>,
          ],
          subUrlbase: '/ocp/indexrela/portmode',
          footer: {
            footerRender: (pageInfo, footerRender, rest) => {
              const changePage = (pageNo, pageSize) => {
                console.log('changePage');
                subHandle0.query(pageNo, pageSize);
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
        break;
      case '2':
        modeStatus = {
          getRowProps: (row, rowIndex) => {
            let className = '';
            if (row.portCode) {
              const isAudit =
                row.auditState === 0 &&
                (row.bindState === 'ocp_handUnbind' || row.bindState === 'ocp_notBind');
              if (isAudit) className = 'text-warning';
            }
            return {
              className,
            };
          },
          rowKey: rowKey1,
          subColumns: [
            {
              title: '组合名称',
              dataIndex: 'portName',
              key: 'portName',
              width: 300,
              fixed: 'left',
              resizable: 1,
              getCellProps: (value, row, rowIndex) => {
                if (!row.isLeaf) {
                  return { colSpan: 11, rowSpan: 1 };
                }
              },
              render: (value, row, index) => {
                if (!row.isLeaf) {
                  return row.remark;
                }
                return row.portName;
              },
            },
            {
              title: '组合代码',
              dataIndex: 'portCode',
              key: 'portCode',
              width: 180,
            },
            {
              title: '关联模式',
              dataIndex: 'relaType',
              width: 150,
              key: 'relaType',
            },
            {
              title: '绑定状态',
              align: 'center',
              key: 'bindState',
              dataIndex: 'bindState',
              width: 150,
            },
            {
              title: '备注',
              key: 'remark',
              dataIndex: 'remark',
              width: 150,
            },
            {
              title: '创建人',
              align: 'center',
              key: 'modifier',
              dataIndex: 'modifier',
              width: 80,
            },
            {
              title: '创建时间',
              key: 'modifyDate',
              dataIndex: 'modifyDate',
              width: 150,
            },
            {
              title: '审核状态',
              align: 'center',
              key: 'auditState',
              dataIndex: 'auditState',
              width: 80,
            },
            {
              title: '审核人',
              align: 'center',
              key: 'operator',
              dataIndex: 'operator',
              width: 80,
            },
            {
              title: '审核时间',
              key: 'auditDate',
              dataIndex: 'auditDate',
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
              width: 100,
              fixed: 'right',
              align: 'center',
              render: (text, record, index) => {
                return (
                  <>
                    <Tooltip title="绑定">
                      <Button
                        type="text"
                        style={{ height: '22px', padding: '0px 8px' }}
                        disabled={
                          !(
                            record.portCode &&
                            (record.bindState === 'ocp_handUnbind' ||
                              record.bindState === 'ocp_notBind')
                          )
                        }
                        onClick={() => {
                          subHandle1.bind({ event, record });
                        }}
                      >
                        <SvgIcon icon="links" />
                      </Button>
                    </Tooltip>
                    <Tooltip title="解绑">
                      <Button
                        type="text"
                        style={{ height: '22px', padding: '0px 8px' }}
                        disabled={
                          !(
                            record.portCode &&
                            record.auditState === 1 &&
                            (record.bindState === 'ocp_autoBind' ||
                              record.bindState === 'ocp_handBind')
                          )
                        }
                        onClick={() => {
                          subHandle1.unbindSingle();
                          setCurrentRecord1(record);
                        }}
                      >
                        <SvgIcon icon="delink" />
                      </Button>
                    </Tooltip>
                  </>
                );
              },
            },
          ],
          expandedRowKeys: expandedRowKeys1,
          setExpandedRowKeys: setExpandedRowKeys1,
          subExpandedRowKeys: subExpandedRowKeys1,
          subSetExpandedRowKeys: subSetExpandedRowKeys1,
          modelName: 'targetCorrelation.master1',
          subModel: subHandle1,
          subHandle: subHandle1,
          masterModel: masterHandle1,
          masterHandle: masterHandle1,
          masterColumns: [
            {
              title: '监控指标',
              dataIndex: 'indexName',
              width: 150,
              ellipsis: true,
            },
          ],
          masterToolbar: {
            buttons: {
              dashed: {
                visible: 1,
                children: {
                  menu: {
                    text: '分级菜单',
                    visible: true,
                    children: menus1,
                  },
                  refresh: {
                    text: '刷新数据',
                    visible: 1,
                    method: 'refresh',
                  },
                },
              },
            },
          },
          subToolbar: {
            buttons: {
              bind: {
                id: 'bind',
                text: '绑定',
                icon: 'links',
                method: 'bind',
                visible: 1,
                order: 1,
                disable: (rows) => {
                  // 1.首先排除掉父结点
                  const indexRows = rows && rows.filter((item) => item.portCode);
                  if (indexRows && indexRows.length) {
                    // 2.人工解绑或者未绑定
                    return !indexRows.some(
                      (row) =>
                        row.bindState === 'ocp_handUnbind' || row.bindState === 'ocp_notBind',
                    );
                  }
                  return true;
                },
              },
              unbind: {
                id: 'unbind',
                text: '解绑',
                icon: 'delink',
                method: 'unbind',
                visible: 1,
                order: 2,
                disable: (rows) => {
                  // 1.首先排除掉父结点
                  const indexRows = rows && rows.filter((item) => item.portCode);
                  if (indexRows && indexRows.length) {
                    // 2.人工解绑或者未绑定
                    return !indexRows.some(
                      (row) =>
                        row.auditState === 1 &&
                        (row.bindState === 'ocp_autoBind' || row.bindState === 'ocp_handBind'),
                    );
                  }
                  return true;
                },
              },
              check: {
                visible: 1,
                disable: (rows) => {
                  // 1.首先排除掉父结点
                  const indexRows = rows && rows.filter((item) => item.portCode);
                  if (indexRows && indexRows.length) {
                    // 2.人工解绑或者未绑定
                    return !indexRows.some(
                      (row) =>
                        row.auditState === 0 &&
                        (row.bindState === 'ocp_handUnbind' || row.bindState === 'ocp_notBind'),
                    );
                  }
                  return true;
                },
              },
              uncheck: {
                visible: 1,
                disable: () => {
                  return true;
                },
              },
            },
          },
          formItems: [
            <TreeSearchSelect
              label="组合列表"
              name="ARRAY_PORT_CODE"
              tableProps={{
                rowKey: 'c_PORT_CODE',
                dataSource: dataSource0,
                columns: columnsPort,
              }}
              valueField="c_PORT_CODE"
              labelField="c_PORT_CODE"
            />,
            <Select
              label="绑定状态"
              name="C_BIND_STATE"
              allowClear
              showArrow
              mode="multiple"
              maxTagCount={2}
              maxTagTextLength={2}
              className={styles.multiSelect}
            >
              <Select.Option value="ocp_notBind">未绑定</Select.Option>
              <Select.Option value="ocp_autoBind">自动绑定</Select.Option>
              <Select.Option value="ocp_handBind">人工绑定</Select.Option>
              <Select.Option value="ocp_handUnbind">人工解绑</Select.Option>
            </Select>,
            <Select label="审核状态" name="N_CHECK_STATE" allowClear>
              <Select.Option value="SearchAll">全部数据</Select.Option>
              <Select.Option value="SearchAudit">已审数据</Select.Option>
              <Select.Option value="SearchUnAudit">未审数据</Select.Option>
            </Select>,
          ],
          subUrlbase: '/ocp/indexrela/indexmode',
          footer: {
            footerRender: (pageInfo, footerRender, rest) => {
              const changePage = (pageNo, pageSize) => {
                console.log('changePage');
                subHandle1.query(pageNo, pageSize);
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
        break;
      case '3':
        modeStatus = {
          getRowProps: (row, rowIndex) => {
            let className = '';
            if (row.indexCode) {
              const isAudit = row.auditState === 0;
              if (isAudit) className = 'text-warning';
            }
            return {
              className,
            };
          },
          rowKey: rowKey2,
          subColumns: [
            {
              title: '指标名称',
              dataIndex: 'indexName',
              key: 'indexName',
              width: 300,
              // fixed: 'left',
              resizable: 1,
              getCellProps: (value, row, rowIndex) => {
                if (!row.isLeaf) {
                  return { colSpan: 7, rowSpan: 1 };
                }
              },
              render: (value, row, index) => {
                if (!row.isLeaf) {
                  return `[${row.relaCode}]${row.relaName}(已关联指标${row.remark}个)`;
                }
                return row.indexName;
              },
            },
            {
              title: '关联模式',
              dataIndex: 'relaType',
              width: 150,
              key: 'relaType',
            },
            {
              title: '创建人',
              align: 'center',
              key: 'modifier',
              dataIndex: 'modifier',
              width: 150,
            },
            {
              title: '创建时间',
              key: 'modifyDate',
              dataIndex: 'modifyDate',
              width: 150,
            },
            {
              title: '审核状态',
              align: 'center',
              key: 'auditState',
              dataIndex: 'auditState',
              width: 150,
            },
            {
              title: '审核人',
              align: 'center',
              key: 'operator',
              dataIndex: 'operator',
              width: 150,
            },
            {
              title: '审核时间',
              key: 'auditDate',
              dataIndex: 'auditDate',
              width: 150,
            },
          ],
          expandedRowKeys: expandedRowKeys2,
          setExpandedRowKeys: setExpandedRowKeys2,
          subExpandedRowKeys: subExpandedRowKeys2,
          subSetExpandedRowKeys: subSetExpandedRowKeys2,
          modelName: 'targetCorrelation.master2',
          subModel: subHandle2,
          subHandle: subHandle2,
          masterModel: masterHandle2,
          masterHandle: masterHandle2,
          masterColumns: [
            {
              title: '产品组合',
              dataIndex: 'relaName',
              width: 150,
              ellipsis: true,
            },
          ],
          masterToolbar: {
            buttons: {
              dashed: {
                visible: 1,
                children: {
                  menu: {
                    text: '分级菜单',
                    visible: true,
                    children: menus2,
                  },
                  refresh: {
                    text: '刷新数据',
                    visible: 1,
                    method: 'refresh',
                  },
                  diyClassifyAdmin: {
                    text: '自定义分类管理',
                    method: 'checkGroup',
                    visible: true,
                  },
                },
              },
            },
          },
          subToolbar: {
            buttons: {
              add: {
                text: '新增',
                icon: 'add-o',
                method: 'add',
                visible: 1,
                order: 1,
              },
              deletes: {
                icon: 'close',
                visible: 1,
                order: 2,
                method: 'deletes',
                disable: (rows) => {
                  // 1.首先排除掉父结点
                  const indexRows = rows && rows.filter((item) => item.indexCode);
                  if (indexRows && indexRows.length) {
                    // 2.未审核
                    return !indexRows.some((row) => row.auditState === 0);
                  }
                  return true;
                },
              },
              check: {
                visible: 1,
                disable: (rows) => {
                  // 1.首先排除掉父结点
                  const indexRows = rows && rows.filter((item) => item.indexCode);
                  if (indexRows && indexRows.length) {
                    // 2.人工解绑或者未绑定
                    return !indexRows.some((row) => row.auditState === 0);
                  }
                  return true;
                },
              },
              uncheck: {
                visible: 1,
                disable: (rows) => {
                  // 1.首先排除掉父结点
                  const indexRows = rows && rows.filter((item) => item.indexCode);
                  if (indexRows && indexRows.length) {
                    // 2.人工解绑或者未绑定
                    return !indexRows.some((row) => row.auditState === 1);
                  }
                  return true;
                },
              },
            },
          },
          formItems: [
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
            <Select label="审核状态" name="N_CHECK_STATE" allowClear>
              <Select.Option value="SearchAll">全部数据</Select.Option>
              <Select.Option value="SearchAudit">已审数据</Select.Option>
              <Select.Option value="SearchUnAudit">未审数据</Select.Option>
            </Select>,
          ],
          subUrlbase: '/ocp/indexrela/relamode',
          footer: {
            footerRender: (pageInfo, footerRender, rest) => {
              const changePage = (pageNo, pageSize) => {
                console.log('changePage');
                subHandle2.query(pageNo, pageSize);
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
        break;
    }
    return modeStatus;
  };

  const createPanelProps = (mode) => {
    const modeStatus = createModeStatus(mode);
    let activeKey = mode;
    const tabs = {
      items: [
        { key: '1', label: '组合模式' },
        { key: '2', label: '指标模式' },
        { key: '3', label: '关联模式' },
      ],
      activeKey,
      onChange: (key) => {
        setMode(key);
      },
      options: {},
    };
    return {
      header: {
        tabs,
        toolbar: modeStatus.subToolbar,
      },
      masterTable: {
        search: {
          formItems: [<Input placeholder="请输入关键词搜索" prefix={<SearchOutlined />} />],
        },
        columns: modeStatus.masterColumns,
        toolbar: modeStatus.masterToolbar,
        queryParams: 'classifyName',
        // tableType: 'antd',
        tableProps: {
          rowKey: modeStatus.rowKey,
          expandable: {
            expandedRowKeys: modeStatus.expandedRowKeys,
            setExpandedRowKeys: modeStatus.setExpandedRowKeys,
          },
        },
      },
      subTable: {
        columns: modeStatus.subColumns,
        search: {
          formItems: modeStatus.formItems,
          colsNumber: 3,
          labelWidth: 80,
        },
        // tableType: 'antd',
        tableProps: {
          tableLayout: 'fixed',
          rowKey: 'code',
          expandable: {
            expandedRowKeys: modeStatus.subExpandedRowKeys,
            setExpandedRowKeys: modeStatus.subSetExpandedRowKeys,
          },
          getRowProps: modeStatus.getRowProps,
        },
        footer: modeStatus.footer,
        url: { base: modeStatus.subUrlbase },
      },
    };
  };
  useEffect(() => {
    console.log('currentRecord0');
    console.log(currentRecord0);
  }, [currentRecord0]);
  useEffect(() => {
    console.log('currentRecord1');
    console.log(currentRecord1);
  }, [currentRecord1]);
  return (
    <>
      <PagePane
        hide={mode !== '1'}
        {...createPanelProps('1')}
        ref={comRef}
        masterModel={masterModel0}
        subModel={subModel0}
        masterHandle={masterHandle0}
        subHandle={subHandle0}
      />
      <PagePane
        hide={mode !== '2'}
        {...createPanelProps('2')}
        ref={comRef}
        masterModel={masterModel1}
        subModel={subModel1}
        masterHandle={masterHandle1}
        subHandle={subHandle1}
      />
      <PagePane
        hide={mode !== '3'}
        {...createPanelProps('3')}
        ref={comRef}
        masterModel={masterModel2}
        subModel={subModel2}
        masterHandle={masterHandle2}
        subHandle={subHandle2}
      />

      <UnbindModal
        visible={unbindVisible0}
        setVisible={setUnbindVisible0}
        handles={subHandle0}
        record={currentRecord0}
      />
      <UnbindModal
        visible={unbindVisible1}
        setVisible={setUnbindVisible1}
        handles={subHandle1}
        record={currentRecord1}
      />
      {/* 新增弹窗-关联模式 */}
      <AddModal addVisible={addVisible} setAddVisible={setAddVisible} handles={subHandle2} />
      {/* 产品结构配置 */}
      <ProductStructureModal
        structureVisible={structureVisible}
        setStructureVisible={setStructureVisible}
        handles={subHandle0}
      />

      {/* 自定义分类 */}
      {diyVisible ? (
        <DiyClassifyAdminModal
          visible={diyVisible}
          setVisible={setDiyVisible}
          // refreshMaster={() => {
          //   comRef.current.refreshMasterTable();
          // }}
        />
      ) : null}
    </>
  );
};

export default TargetCorrelation;
