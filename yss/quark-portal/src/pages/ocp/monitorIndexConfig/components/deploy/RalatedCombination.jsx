import _ from 'lodash';
import { Upload, message, Button, Divider, Table, Tooltip, Spin } from 'antd';
import QuarkTable from '@/components/QuarkTable';
import { InfoCircleTwoTone, LinkOutlined } from '@ant-design/icons';
import { useState, useEffect, useRef, useImperativeHandle } from 'react';
import DropdownSelect from '@/components/DropDownSelect/index.js';
import Tipbar from './Tipbar';
import * as DeployService from './DeployService';

// 上传指标
const UploadTarget = (props) => {
  const { store, setStore } = props;

  // 中间变量
  const [tableData, setTableData] = useState(_.cloneDeep(store.RelatedCombination.tableData));

  // 通过监听变化来设置store。
  useEffect(() => {
    store.RelatedCombination.tableData = tableData;
    setStore(store);
  }, [tableData]);

  const table = useRef(null);

  const col = [
    {
      title: '序号',
      dataIndex: 'index',
      key: 'index',
      width: 40,
      render: (text, recode, index) => <div className="text-center">{index + 1}</div>,
    },
    {
      title: '指标别名',
      dataIndex: 'indexAlias',
      key: 'indexAlias',
      ellipsis: true,
      render: (content) => (
        <Tooltip placement="topLeft" title={content}>
          {content}
        </Tooltip>
      ),
    },
    {
      title: '关联类型',
      dataIndex: 'relatedType',
      key: 'relatedType',
      ellipsis: true,
      render: (content) => (
        <Tooltip placement="topLeft" title={content}>
          {content}
        </Tooltip>
      ),
    },
    {
      title: '关联模式',
      dataIndex: 'relatedMode',
      key: 'relatedMode',
      ellipsis: true,
    },
  ];
  //
  const [columns, setColunms] = useState(col);

  //  模式缓存
  const [modes, setModes] = useState({});

  useEffect(() => {
    col[3].render = (content, record, index) => {
      // console.log(222, content);
      // content.selectedValues = topValue;
      return (
        <DropdownSelect
          value={_.cloneDeep(content)}
          globalSelects={{
            data: store.RelatedCombination.dropdownData.combinationType,
            onChange: async (setKey, key) => {
              let values;
              if (modes[key]) {
                values = modes[key];
                console.log('切换模式-不请求！', values);
                // 需要强制更新视图
                setModes({ ...modes });
              } else {
                const res = await DeployService.queryRelationModes({ SearchType: key });
                const dataSet = {};
                dataSet[key] = res.data.list;
                console.log('aaa', dataSet);
                // dataSet[key] = [
                //   // 调试
                //   {
                //     name: '111' + Math.random(),
                //     key: '关联模式：' + key + Math.random(),
                //     id: Math.random(),
                //   },
                // ];
                values = dataSet[key];
                // console.log('切换模式-请求！', { ...modes, ...values });
                setModes({ ...modes, ...dataSet });
              }

              table.current.props.dataSource[index].relatedMode = {
                mode: key,
                values: values,
              };
              setTableData(_.cloneDeep(table.current.props.dataSource));

              // setKey是内部操作
              setKey(key);
            },
            selected: record.relatedMode?.mode,
          }}
          columns={[{ dataIndex: 'relaName', key: 'relaName' }]}
          name="relaName" // 搜索用字段
          data={record.relatedMode?.values || []}
          onChange={async (value, selectedRows) => {
            // 在此更新tableData和selectrows
            table.current.props.dataSource[index].relatedMode.selectedValues = value;
            setTableData(_.cloneDeep(table.current.props.dataSource));
            store.RelatedCombination.selectRows.forEach((x) => {
              if (record.indexCode === x.indexCode) {
                x.relatedMode.selectedValues = value;
              }
            });
            setStore(store);
            // 在此单独保存设置

            // 转换参数
            window.setTimeout(async () => {
              const saveRecords = store.RelatedCombination.selectRows.map((x) => {
                return {
                  indexCode: x.indexCode,
                  indexName: x.indexName,
                  relaCode: x.relatedMode.selectedValues.join(','), //组合指标，选择的关联代码
                  relaName: selectedRows.map((x) => x.relaName).join(','),
                  relaType: x.relatedMode.mode,
                  updateBy: x.updateBy,
                  updateTime: x.updateTime,
                  checkState: x.checkState,
                  checkBy: x.checkBy,
                  checkTime: x.checkTime,
                  id: x.id,
                };
              });

              const saveRes = await DeployService.saveRelationMode(saveRecords);
              if (saveRes.success) {
                console.log('保存成功2');
              }
            });
          }}
        />
      );
    };
    setColunms(col);
  }, [store.RelatedCombination.dropdownData.combinationMode, modes, topValue]);

  const rowSelection = {
    onChange: (selectedRowKeys, selectedRows) => {
      store.RelatedCombination.selectRows = selectedRows;
      setStore({ ...store });
    },
  };

  const [topMode, setTopMode] = useState(undefined);
  const [topValue, setTopValue] = useState([]);
  const [dropdownSelectKey, setDropdownSelectKey] = useState(new Date().getTime());

  return (
    <>
      <div style={{ height: '50px', display: 'flex' }}>
        {/* <Tipbar type="info" content={<>{store.RelatedCombination.msg}</>} /> */}

        <div style={{ flex: 1, textAlign: 'right', paddingTop: '10px' }}>
          <DropdownSelect
            key={dropdownSelectKey}
            columns={[{ dataIndex: 'relaName', key: 'relaName' }]}
            name="relaName" // 搜索用字段
            renderContent={{
              text: '批量关联',
              icon: <LinkOutlined />,
            }}
            value={''}
            globalSelects={{
              data: store.RelatedCombination.dropdownData.combinationType,
              onChange: async (setKey, key) => {
                let values;
                if (modes[key]) {
                  values = modes[key];
                  console.log('切换模式-不请求！', values);
                  // 需要强制更新视图
                  setModes({ ...modes });
                } else {
                  const dataSet = (await DeployService.queryRelationModes([key])).data;
                  dataSet[key] = [
                    // 调试
                    {
                      name: '调试用关联模式：' + key + Math.random(),
                      key: '关联模式：' + key + Math.random(),
                      id: Math.random(),
                    },
                  ];
                  values = dataSet[key];
                  // console.log('切换模式-请求！', { ...modes, ...values });
                  setModes({ ...modes, ...dataSet });
                }
                // 在此更新tableData和selectrows
                const selectRows = store.RelatedCombination.selectRows;
                table.current.props.dataSource.forEach((x) => {
                  selectRows.forEach((y) => {
                    console.log(x.indexCode, y.indexCode);
                    if (y.indexCode === x.indexCode) {
                      x.relatedMode = {
                        mode: key,
                        values,
                        selectedValues: [],
                      };
                      y.relatedMode = {
                        mode: key,
                        values,
                        selectedValues: [],
                      };
                    }
                  });
                });

                setTableData(_.cloneDeep(table.current.props.dataSource));
                store.RelatedCombination.selectRows = selectRows;
                setStore(store);
                // setKey是内部操作
                setKey(key);
                setTopMode(key);
              },
            }}
            data={modes[topMode] ? modes[topMode] : []}
            onChange={(value) => {
              // 在此更新tableData和selectrows
              const selectRows = store.RelatedCombination.selectRows;
              table.current.props.dataSource.forEach((x) => {
                selectRows.forEach((y) => {
                  if (y.indexCode === x.indexCode) {
                    x.relatedMode.selectedValues = value;
                    y.relatedMode.selectedValues = value;
                  }
                });
              });
              setTableData(table.current.props.dataSource);
              setStore(store);
              setTopValue(value);

              // 在此保存接口
              window.setTimeout(async () => {
                const saveRes = await DeployService.saveRelationMode(
                  store.RelatedCombination.selectRows,
                );
                if (saveRes.success) {
                  console.log('批量保存成功');
                }
              });
            }}
            onVisibleChange={(visible) => {
              if (visible === false) {
                setDropdownSelectKey(new Date().getTime());
                setTopMode(undefined);
              }
            }}
          />
        </div>
      </div>
      <div>
        <QuarkTable
          loading={store.RelatedCombination.tableData.length === 0}
          rowKey="indexCode"
          resizable={false}
          ref={table}
          columns={columns}
          rowSelection={{
            ...rowSelection,
          }}
          dataSource={store.RelatedCombination.tableData}
        />
      </div>
    </>
  );
};

export default UploadTarget;
