import React, { useState, useEffect, useRef, forwardRef, useImperativeHandle } from 'react';
import { Form, Row, Col, Input, Select, Table, Divider, Button, Tabs, Tooltip, AutoComplete } from 'antd';
import MsgBox from '@/utils/MsgBox';
import { QuestionCircleOutlined, PlusCircleOutlined, CloseOutlined } from '@ant-design/icons';
import QuarkTable from '@/components/QuarkTable';
import Tipbar from '@/components/Tipbar';
import DropDownSelect from './DropDownSelect';
import { queryTopicSelect, queryIndexDevTopicViewPlan, queryIndexDevORCABI, queryVocDataList } from '../../../services/devConfig';
import FeTable from './FeTable';

const { TabPane } = Tabs;

const ThemeParams = forwardRef((props, refParam) => {
  const { store, setStore } = props;
//  const { $Global } = store;
//  const { isCombineMode, condictionFunc, condictionParam, condictionCalc } = $Global;
  // 主题参数表格的 datasource
  const {topicParamterT1, topicParamterT2, topicParamterT3} = store;
  // 扩展参数表格的 datasource
  const {topicParamterExtendT1, topicParamterExtendT2, topicParamterExtendT3} = store;
  // 扩展参数的条件字段下拉框内容
  const topicDataDetailT1 = store.topicT1?.topicDataDetail;
  const topicDataDetailT2 = store.topicT2?.topicDataDetail;
  const topicDataDetailT3 = store.topicT3?.topicDataDetail;

  // 选择的主题
  const {topicT1, topicT2 ,topicT3} = store;
  const [localTopicT1, setLocalTopicT1] = useState(topicT1);
  const [localTopicT2, setLocalTopicT2] = useState(topicT2);
  const [localTopicT3, setLocalTopicT3] = useState(topicT3);

  const refT1 = useRef();
  const refT2 = useRef();
  const refT3 = useRef();

  // 主题参数的参数值的函数下拉框
  const [funcOptions, setFuncOptions] = useState([]);
  // 扩展参数的条件值下拉框
  const [funcVocData, setFuncVocData] = useState([]);
  // 主题参数 条件运算
  const [calcDataList, setCalcDataList] = useState([]);

  // 扩展参数表格的 datasource
  const [dataSourceExtendT1, setDataSourceExtendT1] = useState([]);
  const [dataSourceExtendT2, setDataSourceExtendT2] = useState([]);
  const [dataSourceExtendT3, setDataSourceExtendT3] = useState([]);

  const baseColumnsT1 = [
    {
      title: '主题参数',
      dataIndex: 'paramCode',
      key: 'paramCode',
      render: (text) => <a>{text}</a>,
    },
    {
      title: '条件',
      dataIndex: 'paramCondition',
      key: 'paramCondition',
    },
    {
      title: '参数值',
      dataIndex: 'paramValue',
      key: 'paramValue',
      render: (content, row, index) => {
        return (
          <AutoComplete
            style={{ width: '100%', height: '100%' }}
            options={funcOptions}
            value={content}
            placeholder="请录入或者选择"
            onChange={(value, option) => {
              topicParamterT1[index].paramValue = value;
              setStore({
                ...store,
                topicParamterT1,
              })
            }}
          />
        );
      },
    },
  ];

  const baseColumnsT2 = [
    {
      title: '主题参数',
      dataIndex: 'paramCode',
      key: 'paramCode',
      render: (text) => <a>{text}</a>,
    },
    {
      title: '条件',
      dataIndex: 'paramCondition',
      key: 'paramCondition',
    },
    {
      title: '参数值',
      dataIndex: 'paramValue',
      key: 'paramValue',
      render: (content, row, index) => {
        return (
          <AutoComplete
            style={{ width: '100%', height: '100%' }}
            options={funcOptions}
            value={content}
            placeholder="请录入或者选择"
            onChange={(value, option) => {
              topicParamterT2[index].paramValue = value;
              setStore({
                ...store,
                topicParamterT2,
              })
            }}
          />
        );
      },
    },
  ];

  const baseColumnsT3 = [
    {
      title: '主题参数',
      dataIndex: 'paramCode',
      key: 'paramCode',
      render: (text) => <a>{text}</a>,
    },
    {
      title: '条件',
      dataIndex: 'paramCondition',
      key: 'paramCondition',
    },
    {
      title: '参数值',
      dataIndex: 'paramValue',
      key: 'paramValue',
      render: (content, row, index) => {
        return (
          <AutoComplete
            style={{ width: '100%', height: '100%' }}
            options={funcOptions}
            value={content}
            placeholder="请录入或者选择"
            onChange={(value, option) => {
              topicParamterT3[index].paramValue = value;
              setStore({
                ...store,
                topicParamterT3,
              })
            }}
          />
        );
      },
    },
  ];



  const tablePanelPropsT1 = {
    title: { text: '扩展参数', desc: '与基础参数为并且关系' },
    toolbar: {},
    tableProps: {
      dataSource: dataSourceExtendT1,
      columns: [
        {
          title: '条件字段',
          dataIndex: 'paramCode',
          render: (content, row, index) => {
            return (
              <DropDownSelect
                defaultValue={content}
                keyName="name"
                keyValue="code"
                keyColType="colType"
                data={topicDataDetailT1}
                onChange={(value, option) => {
                  const extendDataSourceT1 = refT1?.current?.getDataSource();
                  if(extendDataSourceT1){
                    extendDataSourceT1[index].paramCode = value;
                    extendDataSourceT1[index].paramType = option.colType;
                    refT1?.current?.setDataSource(extendDataSourceT1);
                  }
                }}
              />
            );
          },
        },
        {
          title: '条件运算',
          dataIndex: 'paramCondition',
          render: (content, row, index) => {
            return (
              <DropDownSelect
                defaultValue={content}
                keyValue="c_DV_CODE" // key为jsx保留字
                keyName="c_DV_NAME"
                data={calcDataList}
                onChange={(value, option) => {
                  const extendDataSourceT1 = refT1?.current?.getDataSource();
                  if(extendDataSourceT1){
                    extendDataSourceT1[index].paramCondition = value;
                    refT1?.current?.setDataSource(extendDataSourceT1);
                  }
                }}
              />
            );
          },
        },
        {
          title: '条件值',
          dataIndex: 'paramValue',
          key: 'paramValue',
          render: (content, row, index) => {
            return (
              <AutoComplete
                style={{ width: '100%', height: '100%' }}
                options={funcOptions}
                value={content}
                placeholder="请录入或者选择"
                onChange={(value, option) => {
                  const dataSourceT1 = refT1.current.getDataSource();
                  if(dataSourceT1){
                    dataSourceT1[index].paramValue = value;
                    dataSourceExtendT1[index].paramValue = value;
                    setDataSourceExtendT1(dataSourceExtendT1);
                    refT1?.current?.setDataSource(dataSourceT1);
                  }
                }}
              />
            );
          },
        },
      ],
    },
  };

  const tablePanelPropsT2 = {
    title: { text: '扩展参数', desc: '与基础参数为并且关系' },
    toolbar: {},
    tableProps: {
      dataSource: dataSourceExtendT2,
      columns: [
        {
          title: '条件字段',
          dataIndex: 'paramCode',
          render: (content, record, index) => {
            return (
              <DropDownSelect
                defaultValue={content}
                keyName="name"
                keyValue="code"
                keyColType="colType"
                data={topicDataDetailT2}
                onChange={(value, option) => {
                  const extendDataSourceT2 = refT2?.current?.getDataSource();
                  if(extendDataSourceT2){
                    extendDataSourceT2[index].paramCode = value;
                    extendDataSourceT2[index].paramType = option.colType;
                    refT2?.current?.setDataSource(extendDataSourceT2);
                  }
                }}
              />
            );
          },
        },
        {
          title: '条件运算',
          dataIndex: 'paramCondition',
          render: (content, record, index) => {
            return (
            <DropDownSelect
              defaultValue={content}
              keyValue="c_DV_CODE" // key为jsx保留字
              keyName="c_DV_NAME"
              // defaultSelectKeyName={content}
              data={calcDataList}
              onChange={(value, option) => {
                const extendDataSourceT2 = refT2?.current?.getDataSource();
                if(extendDataSourceT2){
                  extendDataSourceT2[index].paramCondition = value;
                  refT2?.current?.setDataSource(extendDataSourceT2);
                }
              }}
              />
            );
          },
        },
        {
          title: '条件值',
          dataIndex: 'paramValue',
          render: (content, row, index) => {
            return (
              <AutoComplete
                style={{ width: '100%', height: '100%' }}
                options={funcOptions}
                value={content}
                placeholder="请录入或者选择"
                onChange={(value, option) => {
                  const dataSourceT2 = refT2?.current?.getDataSource();
                  if(dataSourceT2){
                    dataSourceT2[index].paramValue = value;
                    dataSourceExtendT2[index].paramValue = value;
                    refT2?.current?.setDataSource(dataSourceT2);
                  }
                }}
              />
            );
          },
        },
      ],
    },
  };

  const tablePanelPropsT3 = {
    title: { text: '扩展参数', desc: '与基础参数为并且关系' },
    toolbar: {},
    tableProps: {
      dataSource: dataSourceExtendT3,
      columns: [
        {
          title: '条件字段',
          dataIndex: 'paramCode',
          render: (content, record, index) => {
            return (
              <DropDownSelect
                defaultValue={content}
                keyName="name"
                keyValue="code"
                keyColType="colType"
                data={topicDataDetailT3}
                onChange={(value, option) => {
                  const extendDataSourceT3 = refT3?.current?.getDataSource();
                  if(extendDataSourceT3){
                    extendDataSourceT3[index].paramCode = value;
                    extendDataSourceT3[index].paramType = option.colType;
                    refT3?.current?.setDataSource(extendDataSourceT3);
                  }
                }}
              />
            );
          },
        },
        {
          title: '条件运算',
          dataIndex: 'paramCondition',
          render: (content, record, index) => {
            return (
            <DropDownSelect
              defaultValue={content}
              keyValue="c_DV_CODE" // key为jsx保留字
              keyName="c_DV_NAME"
              // defaultSelectKeyName={content}
              data={calcDataList}
              onChange={(value, option) => {
                const extendDataSourceT3 = refT3?.current?.getDataSource();
                if(extendDataSourceT3){
                  extendDataSourceT3[index].paramCondition = value;
                  refT3?.current?.setDataSource(extendDataSourceT3);
                }
              }}
            />
            );
          },
        },
        {
          title: '条件值',
          dataIndex: 'paramValue',
          render: (content, row, index) => {
            return (
              <AutoComplete
                style={{ width: '100%', height: '100%' }}
                options={funcOptions}
                value={content}
                placeholder="请录入或者选择"
                onChange={(value, option) => {
                  const dataSourceT3 = refT3?.current?.getDataSource();
                  if(dataSourceT3){
                    dataSourceT3[index].paramValue = value;
                    dataSourceExtendT3[index].paramValue = value;
                    refT3?.current?.setDataSource(dataSourceT3);
                  }
                }}
              />
            );
          },
        },
      ],
    },
  };

  useImperativeHandle(refParam, () => ({
    // validate 就是暴露给父组件的方法
    validate:  async () => {
      let isValidate = true;

      // 主题基础参数有则填写 ， 扩展参数可以不填
      const extendDataSourceT1 = refT1?.current?.getDataSource();
      if(extendDataSourceT1){
        for(let i=0; i<extendDataSourceT1.length; i++){
          if(extendDataSourceT1[i].paramCode === undefined){
            MsgBox.warning({ message: "请输入数据主题T1的扩展参数的条件字段" });
            isValidate = false;
          }
          if(extendDataSourceT1[i].paramCondition === undefined){
            MsgBox.warning({ message: "请输入数据主题T1的扩展参数的条件运算" });
            isValidate = false;
          }
          if(extendDataSourceT1[i].paramValue === undefined){
            MsgBox.warning({ message: "请输入数据主题T1的扩展参数的条件值" });
            isValidate = false;
          }
        }
      }
      const extendDataSourceT2 = refT2?.current?.getDataSource();
      if(extendDataSourceT2){
        for(let i=0; i<extendDataSourceT2.length; i++){
          if(extendDataSourceT2[i].paramCode === undefined){
            MsgBox.warning({ message: "请输入数据主题T2的扩展参数的条件字段" });
            isValidate = false;
          }
          if(extendDataSourceT2[i].paramCondition === undefined){
            MsgBox.warning({ message: "请输入数据主题T2的扩展参数的条件运算" });
            isValidate = false;
          }
          if(extendDataSourceT2[i].paramValue === undefined){
            MsgBox.warning({ message: "请输入数据主题T2的扩展参数的条件值" });
            isValidate = false;
          }
        }
      }
      const extendDataSourceT3 = refT3?.current?.getDataSource();
      if(extendDataSourceT3){
        for(let i=0; i<extendDataSourceT3.length; i++){
          if(extendDataSourceT3[i].paramCode === undefined){
            MsgBox.warning({ message: "请输入数据主题T3的扩展参数的条件字段" });
            isValidate = false;
          }
          if(extendDataSourceT3[i].paramCondition === undefined){
            MsgBox.warning({ message: "请输入数据主题T3的扩展参数的条件运算" });
            isValidate = false;
          }
          if(extendDataSourceT3[i].paramValue === undefined){
            MsgBox.warning({ message: "请输入数据主题T3的扩展参数的条件值" });
            isValidate = false;
          }
        }
      }

      if(isValidate){
        setStore({
          ...store,
          topicParamterExtendT1: extendDataSourceT1,
          topicParamterExtendT2: extendDataSourceT2,
          topicParamterExtendT3: extendDataSourceT3,
        })
      }
      return isValidate;
    }
  }));


  useEffect(() => {
    // 函数下拉框内容
    async function fetchFuncVocDataList() {
      const param = [];
      param.push("DEV_INDEX_TOPIC_FUN");
      const res = await queryVocDataList(param);
      const resData = res?.data;
      setFuncVocData(resData);
      const options = [];
      for(let i=0; i< resData.length; i++){
        options.push({value: resData[i].c_DV_CODE, title: resData[i].c_DV_NAME});
      }
      setFuncOptions(options);
    }
    fetchFuncVocDataList();

    // 条件运算下拉框内容
    async function fetchCalcDataList() {
      const param = [];
      param.push("DEV_INDEX_SQLCOND");
      const res = await queryVocDataList(param);
      const resData = res?.data;
      setCalcDataList(resData);
    }
    fetchCalcDataList();

  }, []);


  useEffect(() => {
    setLocalTopicT1(store.topicT1);
    setLocalTopicT2(store.topicT2);
    setLocalTopicT3(store.topicT3);
  }, [store.topicT1, store.topicT2, store.topicT3]);


  useEffect(() => {
    setDataSourceExtendT1(store.topicParamterExtendT1);
  }, [store.topicParamterExtendT1]);

  useEffect(() => {
    setDataSourceExtendT2(store.topicParamterExtendT2);
  }, [store.topicParamterExtendT2]);

  useEffect(() => {
    setDataSourceExtendT3(store.topicParamterExtendT3);
  }, [store.topicParamterExtendT3]);


  const changeDataSourceExtendT1 = (ds) => {
    setDataSourceExtendT1(ds);
  }

  const changeDataSourceExtendT2 = (ds) => {
    setDataSourceExtendT2(ds);
  }

  const changeDataSourceExtendT3 = (ds) => {
    setDataSourceExtendT3(ds);
  }


  return (
    <div style={{ padding: '20px' }}>
      <Tabs type="card">
        <>
        {localTopicT1 && localTopicT1 !== null ? (
          <TabPane style={{ width: '100%' }} tab="数据主题T1" key="T1">
            <QuarkTable
              style={{ width: '100%' }}
              size="small"
              dataSource={topicParamterT1}
              rowSelection={false}
              columns={baseColumnsT1}
              scroll={{ x: 'max-content' }}
            />
            <FeTable ref={refT1} {...tablePanelPropsT1} updateTableData={changeDataSourceExtendT1} />
          </TabPane>
        ) : null}
        </>
        <>
        {localTopicT2 && localTopicT2 !== null ? (
          <TabPane tab="数据主题T2" key="T2">
            <QuarkTable
              style={{ width: '100%' }}
              size="small"
              dataSource={topicParamterT2}
              rowSelection={false}
              columns={baseColumnsT2}
              scroll={{ x: 'max-content' }}
            />
            <FeTable ref={refT2} {...tablePanelPropsT2} updateTableData={changeDataSourceExtendT2} />
          </TabPane>
        ) : null}
        </>
        <>
        {localTopicT3 && localTopicT3 !== null ? (
          <TabPane tab="数据主题T3" key="T3">
            <QuarkTable
                style={{ width: '100%' }}
                size="small"
                dataSource={topicParamterT3}
                rowSelection={false}
                columns={baseColumnsT3}
                scroll={{ x: 'max-content' }}
              />
            <FeTable ref={refT3} {...tablePanelPropsT3} updateTableData={changeDataSourceExtendT3} />
          </TabPane>
        ) : null}
        </>
      </Tabs>

    </div>
  );
});
export default ThemeParams;

