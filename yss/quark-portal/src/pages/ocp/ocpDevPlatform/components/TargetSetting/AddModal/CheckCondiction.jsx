import React, { useState, useEffect, useRef, forwardRef, useImperativeHandle } from 'react';
import { Row, Button, Table, Input, Tabs } from 'antd';
import MsgBox from '@/utils/MsgBox';
import { PlusCircleOutlined, CloseOutlined } from '@ant-design/icons';
import QuarkTable from '@/components/QuarkTable';
import Tipbar from '@/components/Tipbar';
import DropDownSelect from './DropDownSelect';
import { queryVocDataList } from '../../../services/devConfig';
import FeTable from './FeTable';

const { TabPane } = Tabs;

const CheckCondiction = forwardRef((props, refParam) => {
  const { store, setStore } = props;
/*   const { $Global } = store;
  const {
    condictionFunc,
    // 条件参数下拉框
    condictionParam,
    // 条件运算下拉框
    condictionCalc,
    // 参数条件
    paramCondictions,
  } = $Global; */

  // 表格的数据内容
  const [checkDataSouceT1, setCheckDataSouceT1] = useState(store.checkConditionT1);
  const [checkDataSouceT2, setCheckDataSouceT2] = useState(store.checkConditionT2);
  const [checkDataSouceT3, setCheckDataSouceT3] = useState(store.checkConditionT3);
  // 条件字段 下拉框内容
  const topicDataDetailT1 = store.topicT1?.topicDataDetail;
  const topicDataDetailT2 = store.topicT2?.topicDataDetail;
  const topicDataDetailT3 = store.topicT3?.topicDataDetail;
  // 选择的主题
  const {topicT1, topicT2 ,topicT3} = store;

  const refT1 = useRef();
  const refT2 = useRef();
  const refT3 = useRef();

  // 条件运算 下拉框内容
  const [calcDataList, setCalcDataList] = useState([]);
  // 条件关系 下拉框内容
  const [rlaTypeDataList, setRlaTypeDataList] = useState([]);

  useEffect(() => {
    // 条件运算下拉框内容
    async function fetchCalcDataList() {
      const param = [];
      param.push("DEV_INDEX_SQLCOND");
      const res = await queryVocDataList(param);
      const resData = res?.data;
      setCalcDataList(resData);
    }
    fetchCalcDataList();

    // 条件关系 下拉框内容
    async function fetchRlaTypeDataList() {
      const param = [];
      param.push("DEV_INDEX_RLA_TYPE");
      const res = await queryVocDataList(param);
      const resData = res?.data;
      setRlaTypeDataList(resData);
    }
    fetchRlaTypeDataList();

  }, []);

/*   const columns = [
    {
      title: '条件字段',
      dataIndex: 'paramCode',
    },
    {
      title: '条件运算', // 条件运算
      dataIndex: 'conditionCode',
    },
    {
      title: '条件值',
      dataIndex: 'conditionValue',
    },
    {
      title: '条件关系',
      dataIndex: 'conditionRela',
    },
  ]; */

  const [columnsT1, setColumnsT1] = useState([])
  const [columnsT2, setColumnsT2] = useState([])
  const [columnsT3, setColumnsT3] = useState([])

  const tablePanelPropsT1 = {
    title: {},
    tableProps: {
      scroll: { x: 'max-content', y: '560px' },
      dataSource: checkDataSouceT1,
      columns: columnsT1,
    },
  };

  const tablePanelPropsT2 = {
    title: {},
    tableProps: {
      scroll: { x: 'max-content', y: '560px' },
      dataSource: checkDataSouceT2,
      columns: columnsT2,
    },
  };

  const tablePanelPropsT3 = {
    title: {},
    tableProps: {
      scroll: { x: 'max-content', y: '560px' },
      dataSource: checkDataSouceT3,
      columns: columnsT3,
    },
  };


  useEffect(() => {
    if(store.topicT1 && store.topicT1 != null){
      const actionColumnsT1 = [];
      actionColumnsT1.push({
        title: '条件字段',
        dataIndex: 'paramCode',
        render : (content, record, index) => {
          return (
            <DropDownSelect
              defaultValue={content}
              keyName="name"
              keyValue="code"
              keyColType="colType"
              data={topicDataDetailT1}
              onChange={(value, option) => {
                const dataSourceT1 = refT1?.current?.getDataSource();
                if(dataSourceT1){
                  dataSourceT1[index].paramCode = value;
                  dataSourceT1[index].paramType = option.colType;
                  refT1?.current?.setDataSource(dataSourceT1);
                }
              }}
            />
          );
        },
      });
      actionColumnsT1.push({
        title: '条件运算',
        dataIndex: 'conditionCode',
        render: (content, record, index) => {
          return (
            <DropDownSelect
              defaultValue={content}
              keyName="c_DV_NAME"
              keyValue="c_DV_CODE"
              data={calcDataList}
              onChange={(value, option) => {
                const dataSourceT1 = refT1?.current?.getDataSource();
                if(dataSourceT1){
                  dataSourceT1[index].conditionCode = value;
                  refT1?.current?.setDataSource(dataSourceT1);
                }
              }}
            />
          );
        },
      });
      actionColumnsT1.push({
        title: '条件值',
        dataIndex: 'conditionValue',
        render: (content, record, index) => {
          return (
            <Input
              defaultValue={content}
              onChange={(e) => {
                const dataSourceT1 = refT1?.current?.getDataSource();
                if(dataSourceT1){
                  dataSourceT1[index].conditionValue = e.target.value;
                  refT1?.current?.setDataSource(dataSourceT1);
                }
              }}
            />
          );
        },
      });
      actionColumnsT1.push({
        title: '条件关系',
        dataIndex: 'conditionRela',
        render: (content, record, index) => {
          return (
            ( checkDataSouceT1?.length-1) !== index? (
              <DropDownSelect
                defaultValue={content}
                keyName="c_DV_NAME"
                keyValue="c_DV_CODE"
                data={rlaTypeDataList}
                onChange={(value, option) => {
                  const dataSourceT1 = refT1?.current?.getDataSource();
                  if(dataSourceT1){
                    dataSourceT1[index].conditionRela = value;
                    refT1?.current?.setDataSource(dataSourceT1);
                  }
                }}
              />
            ) : null
          );
        },
      });
      setColumnsT1(actionColumnsT1);
    }

    if(store.topicT2 && store.topicT2 != null){
      const actionColumnsT2 = [];
      actionColumnsT2.push({
        title: '条件字段',
        dataIndex: 'paramCode',
        render : (content, record, index) => {
          return (
            <DropDownSelect
              defaultValue={content}
              keyName="name"
              keyValue="code"
              keyColType="colType"
              data={topicDataDetailT2}
              onChange={(value, option) => {
                const dataSourceT2 = refT2?.current?.getDataSource();
                if(dataSourceT2){
                  dataSourceT2[index].paramCode = value;
                  dataSourceT2[index].paramType = option.colType;
                  refT2?.current?.setDataSource(dataSourceT2);
                }
              }}
            />
          );
        },
      });
      actionColumnsT2.push({
        title: '条件运算',
        dataIndex: 'conditionCode',
        render: (content, record, index) => {
          return (
            <DropDownSelect
              defaultValue={content}
              keyName="c_DV_NAME"
              keyValue="c_DV_CODE"
              data={calcDataList}
              onChange={(value, option) => {
                const dataSourceT2 = refT2?.current?.getDataSource();
                if(dataSourceT2){
                  dataSourceT2[index].conditionCode = value;
                  refT2?.current?.setDataSource(dataSourceT2);
                }
              }}
            />
          );
        },
      });
      actionColumnsT2.push({
        title: '条件值',
        dataIndex: 'conditionValue',
        render: (content, record, index) => {
          return (
            <Input
              defaultValue={content}
              onChange={(e) => {
                const dataSourceT2 = refT2?.current?.getDataSource();
                if(dataSourceT2){
                  dataSourceT2[index].conditionValue = e.target.value;
                  refT2?.current?.setDataSource(dataSourceT2);
                }
              }}
            />
          );
        },
      });
      actionColumnsT2.push({
        title: '条件关系',
        dataIndex: 'conditionRela',
        render: (content, record, index) => {
          return (
            ( checkDataSouceT2?.length-1) !== index? (
              <DropDownSelect
                defaultValue={content}
                keyName="c_DV_NAME"
                keyValue="c_DV_CODE"
                data={rlaTypeDataList}
                onChange={(value, option) => {
                  const dataSourceT2 = refT2?.current?.getDataSource();
                  if(dataSourceT2){
                    dataSourceT2[index].conditionRela = value;
                    refT2?.current?.setDataSource(dataSourceT2);
                  }
                }}
              />
            ) : null
          );
        },
      });
      setColumnsT2(actionColumnsT2);
    }

    if(store.topicT3 && store.topicT3 != null){
      const actionColumnsT3 = [];
      actionColumnsT3.push({
        title: '条件字段',
        dataIndex: 'paramCode',
        rende : (content, record, index) => {
          return (
            <DropDownSelect
              defaultValue={content}
              keyName="name"
              keyValue="code"
              keyColType="colType"
              data={topicDataDetailT3}
              onChange={(value, option) => {
                const dataSourceT3 = refT3?.current?.getDataSource();
                if(dataSourceT3){
                  dataSourceT3[index].paramCode = value;
                  dataSourceT3[index].paramType = option.colType;
                  refT3?.current?.setDataSource(dataSourceT3);
                }
              }}
            />
          );
        },
      });
      actionColumnsT3.push({
        title: '条件运算',
        dataIndex: 'conditionCode',
        render: (content, record, index) => {
          return (
            <DropDownSelect
              defaultValue={content}
              keyName="c_DV_NAME"
              keyValue="c_DV_CODE"
              data={calcDataList}
              onChange={(value, option) => {
                const dataSourceT3 = refT3?.current?.getDataSource();
                if(dataSourceT3){
                  dataSourceT3[index].conditionCode = value;
                  refT3?.current?.setDataSource(dataSourceT3);
                }
              }}
            />
          );
        },
      });
      actionColumnsT3.push({
        title: '条件值',
        dataIndex: 'conditionValue',
        render: (content, record, index) => {
          return (
            <Input
              defaultValue={content}
              onChange={(e) => {
                const dataSourceT3 = refT3?.current?.getDataSource();
                if(dataSourceT3){
                  dataSourceT3[index].conditionValue = e.target.value;
                  refT3?.current?.setDataSource(dataSourceT3);
                }
              }}
            />
          );
        },
      });
      actionColumnsT3.push({
        title: '条件关系',
        dataIndex: 'conditionRela',
        render: (content, record, index) => {
          return (
            ( checkDataSouceT3?.length-1) !== index? (
              <DropDownSelect
                defaultValue={content}
                keyName="c_DV_NAME"
                keyValue="c_DV_CODE"
                data={rlaTypeDataList}
                onChange={(value, option) => {
                  const dataSourceT3 = refT3?.current?.getDataSource();
                  if(dataSourceT3){
                    dataSourceT3[index].conditionRela = value;
                    refT3?.current?.setDataSource(dataSourceT3);
                  }
                }}
              />
            ) : null
          );
        },
      });
      setColumnsT3(actionColumnsT3);
    }

  }, [store.topicT1, store.topicT2, store.topicT3, checkDataSouceT1, checkDataSouceT2, checkDataSouceT3]);


  useEffect(() => {
    setCheckDataSouceT1(store.checkConditionT1);
  }, [store.checkConditionT1]);

  useEffect(() => {
    setCheckDataSouceT2(store.checkConditionT2);
  }, [store.checkConditionT2]);

  useEffect(() => {
    setCheckDataSouceT3(store.checkConditionT3);
  }, [store.checkConditionT3]);

  const changeCheckDataSouceT1 = (ds) => {
    setCheckDataSouceT1(ds);
  }

  const changeCheckDataSouceT2 = (ds) => {
    setCheckDataSouceT2(ds);
  }

  const changeCheckDataSouceT3 = (ds) => {
    setCheckDataSouceT3(ds);
  }

  useImperativeHandle(refParam, () => ({
    // validate 就是暴露给父组件的方法
    validate:  async () => {
      let isValidate = true;

      // 检查提醒和监控阀值 必填。 数据核对可填可不填

      const dataSourceT1 = refT1?.current?.getDataSource();
      if(dataSourceT1){
        for(let i=0; i<dataSourceT1.length; i++){
          if(dataSourceT1[i].paramCode === undefined){
            MsgBox.warning({ message: "请输入数据主题T1的条件字段" });
            isValidate = false;
          }
          if(dataSourceT1[i].conditionCode === undefined){
            MsgBox.warning({ message: "请输入数据主题T1的条件运算" });
            isValidate = false;
          }
          if(dataSourceT1[i].conditionValue === undefined || dataSourceT1[i].conditionValue === ''){
            MsgBox.warning({ message: "请输入数据主题T1的条件值" });
            isValidate = false;
          }
        }
      }
      const dataSourceT2 = refT2?.current?.getDataSource();
      if(dataSourceT2){
        for(let i=0; i<dataSourceT2.length; i++){
          if(dataSourceT2[i].paramCode === undefined){
            MsgBox.warning({ message: "请输入数据主题T2的条件字段" });
            isValidate = false;
          }
          if(dataSourceT2[i].conditionCode === undefined){
            MsgBox.warning({ message: "请输入数据主题T2的条件运算" });
            isValidate = false;
          }
          if(dataSourceT2[i].conditionValue === undefined || dataSourceT2[i].conditionValue === ''){
            MsgBox.warning({ message: "请输入数据主题T2的条件值" });
            isValidate = false;
          }
        }
      }
      const dataSourceT3 = refT3?.current?.getDataSource();
      if(dataSourceT3){
        for(let i=0; i<dataSourceT3.length; i++){
          if(dataSourceT3[i].paramCode === undefined){
            MsgBox.warning({ message: "请输入数据主题T3的条件字段" });
            isValidate = false;
          }
          if(dataSourceT3[i].conditionCode === undefined){
            MsgBox.warning({ message: "请输入数据主题T3的条件运算" });
            isValidate = false;
          }
          if(dataSourceT3[i].conditionValue === undefined || dataSourceT3[i].conditionValue === ''){
            MsgBox.warning({ message: "请输入数据主题T3的条件值" });
            isValidate = false;
          }
        }
      }

      if(isValidate){
        setStore({
          ...store,
          checkConditionT1: dataSourceT1,
          checkConditionT2: dataSourceT2,
          checkConditionT3: dataSourceT3,
        })
      }

      return isValidate;
    }
  }));


  return (
    <div style={{ padding: '20px' }}>
      <Tabs type="card">
      <>
        {topicT1 && topicT1 !== null ? (
          <TabPane style={{ width: '100%' }} tab="数据主题T1" key="T1">
            <FeTable ref={refT1} {...tablePanelPropsT1} updateTableData={changeCheckDataSouceT1} />
          </TabPane>
        ) : null}
      </>
      <>
        {topicT2 && topicT2 !== null ? (
          <TabPane style={{ width: '100%' }} tab="数据主题T2" key="T2">
            <FeTable ref={refT2} {...tablePanelPropsT2} updateTableData={changeCheckDataSouceT2} />
          </TabPane>
        ) : null}
      </>
      <>
        {topicT3 && topicT3 !== null ? (
          <TabPane style={{ width: '100%' }} tab="数据主题T3" key="T3">
            <FeTable ref={refT3} {...tablePanelPropsT3} updateTableData={changeCheckDataSouceT3} />
          </TabPane>
        ) : null}
      </>
      </Tabs>
    </div>
  );
});

export default CheckCondiction;
