import React, { useState, useEffect, useRef, forwardRef, useImperativeHandle } from 'react';
import { Tabs, Input } from 'antd';
import MsgBox from '@/utils/MsgBox';
import Tipbar from '@/components/Tipbar';
import DropDownSelect from './DropDownSelect';
import FeTable from './FeTable';
import { queryVocDataList, queryDevServiceDataList, queryDropDownInfos } from '../../../services/devConfig';

const { TabPane } = Tabs;

const TargetParams = forwardRef((props, refParam) => {
  const { store, setStore } = props;
  // const { $Global } = store;
  // const { dictData, paramCondictions } = $Global;

  const ref = useRef();

  // 选择的主题
  const {topicT1, topicT2 ,topicT3} = store;
  // 参数条件 下拉框内容
  const [nrDataList, setNrDataList] = useState([]);
  // 条件关系 下拉框内容
  const [rlaTypeDataList, setRlaTypeDataList] = useState([]);
  // 选择字典 下拉框内容
  const [vocDataList, setVocDataList] = useState([]);
  // 选择字典后默认值的 下拉框内容
  const [defaultDataList, setDefaultDataList] = useState([]);

  const topicDataDetailT1 = store.topicT1?.topicDataDetail;
  const topicDataDetailT2 = store.topicT2?.topicDataDetail;
  const topicDataDetailT3 = store.topicT3?.topicDataDetail;

  const [paramsDataSource, setParamsDataSource] = useState(store.indexParamter)
  const [columns, setColumns] = useState([])

  // 选择字典后默认值的 下拉框内容
  const fetchDefaultDataList = async (vocCode, index, value) => {
    const newRes = [];
    if(vocCode && vocCode !== ''){
      let methodParams = "";
      for(let i=0; i<vocDataList.length; i++){
        if(vocDataList[i].serviceCode === vocCode){
          methodParams = vocDataList[i].methodParams;
        }
      }
      // 品种类型 IMonitorIndexDropDownService.getDropDownInfos
      if (vocCode === "IMONITOR_SEC_VAR_CODE") {
        const res = await queryDropDownInfos(methodParams);
        const resData = res?.data;
        for(let i=0; i<resData.length; i++){
          newRes.push({
            id: resData[i].id,
            c_DV_CODE: resData[i].code,
            c_DV_NAME: resData[i].codeName,
          })
        }
        // setDefaultDataList(newRes);
      } else { // IVocDataService.getDataListByTypes
        const param = [];
        param.push(methodParams);
        const res = await queryVocDataList(param);
        const resData = res?.data;
        for(let i=0; i<resData.length; i++){
          newRes.push({
            id: resData[i].id,
            c_DV_CODE: resData[i].c_DV_CODE,
            c_DV_NAME: resData[i].c_DV_NAME,
          })
        }
        // console.log("resData= "+resData);
        // setDefaultDataList(resData);
      }
    }else{
      // setDefaultDataList([]);
    }
    const dataSource = ref?.current?.getDataSource();
    dataSource[index].sourceServiceCode = value;
    dataSource[index].paramValue = undefined;
    dataSource[index].defaultDataList = newRes;
    ref?.current?.setDataSource(dataSource.splice(0));
  }

  const columnsFix = [
    {
      title: '参数名称',
      dataIndex: 'paramName',
      width: '140px',
      render: (content, row, index) => {
        return (
          <Input
            defaultValue={content}
            onChange={(e) => {
              const dataSource = ref?.current?.getDataSource();
              if(dataSource){
                dataSource[index].paramName = e.target.value;
                ref?.current?.setDataSource(dataSource);
              }
            }}
          />
        )
      },
    },
    {
      title: '参数条件',
      dataIndex: 'paramCondition',
      width: '140px',
      render: (content, record, index) => {
        return (
          <DropDownSelect
            defaultValue={content}
            mode="multiple"
            keyName="c_DV_NAME"
            keyValue="c_DV_CODE"
            data={nrDataList}
            onChange={(value, option) => {
              const dataSource = ref?.current?.getDataSource();
              if(dataSource && value && value.length>1){
                dataSource[index].paramCondition = value;
                ref?.current?.setDataSource(dataSource);
              }
            }}
          />
        );
      },
    },
    {
      title: '值来源',
      dataIndex: 'sourceType',
      width: '140px',
      render: (content, row, index) => {
        return (
          <DropDownSelect
            defaultValue={content}
            keyName="value"
            keyValue="key"
            data={[
              { id: 1, key: 'keyIn', value: '手工输入' },
              { id: 2, key: 'vocService', value: '数据字典' },
            ]}
            onChange={(value) => {
              const dataSource = ref.current.getDataSource();
              dataSource[index].sourceType = value;
              // 手工输入 清空 选择字典和默认值
              if(value === 'keyIn'){
                dataSource[index].sourceServiceCode = undefined;
                dataSource[index].paramValue = undefined;
              }
              ref.current.setDataSource(dataSource.splice(0));
            }}
          />
        );
      },
    },
    {
      title: '选择字典',
      dataIndex: 'sourceServiceCode',
      width: '140px',
      render: (content, row, index) => {
        return (
          paramsDataSource[index]?.sourceType === 'vocService'? (
          <DropDownSelect
            disabled={row.sourceType === undefined ? false : row.sourceType==='keyIn'}
            defaultValue={content}
            keyName="serviceName"
            keyValue="serviceCode"
            data={vocDataList}
            onChange={(value, option) => {
              const dataSource = ref?.current?.getDataSource();
              if(dataSource){
                // dataSource[index].sourceServiceCode = value;
                // dataSource[index].paramValue = undefined;
                fetchDefaultDataList(value, index, value);
                // ref?.current?.setDataSource(dataSource.splice(0));
              }
            }}
          />
          ) : null
        );
      },
    },
    {
      title: '默认值(选填)',
      width: '140px',
      dataIndex: 'paramValue',
      render: (content, row, index) => {
        return (
          paramsDataSource[index]?.sourceType === 'vocService'? (
            <DropDownSelect
              defaultValue={content}
              keyName="c_DV_NAME"
              keyValue="c_DV_CODE"
              data={paramsDataSource[index].defaultDataList}
              onChange={(value, option) => {
                const dataSource = ref?.current?.getDataSource();
                if(dataSource){
                  dataSource[index].paramValue = value;
                  ref?.current?.setDataSource(dataSource);
                }
              }}
            />
          ) : <Input
                defaultValue={content}
                onChange={(e) => {
                  const dataSource = ref?.current?.getDataSource();
                  if(dataSource){
                    dataSource[index].paramValue = e.target.value;
                    ref?.current?.setDataSource(dataSource);
                  }
                }}
              />
          );
      },
    },
    {
      title: '条件关系',
      width: '140px',
      dataIndex: 'conditionRela',
      render: (content, row, index) => {
        return (
          ( paramsDataSource.length-1) !== index? (
          <DropDownSelect
            defaultValue={content}
            keyName="c_DV_NAME"
            keyValue="c_DV_CODE"
            data={rlaTypeDataList}
            onChange={(value, option) => {
              const dataSource = ref?.current?.getDataSource();
              if(dataSource){
                dataSource[index].conditionRela = value;
                ref?.current?.setDataSource(dataSource);
              }
            }}
          />
          ) : null
        );
      },
    },
    {
      title: '参数描述',
      width: '140px',
      dataIndex: 'paramDesc',
      render: (content, row, index) => {
        return (
          <Input
            defaultValue={content}
            onChange={(e) => {
              const dataSource = ref?.current?.getDataSource();
              if(dataSource){
                dataSource[index].paramDesc = e.target.value;
                ref?.current?.setDataSource(dataSource);
              }
            }}
          />
        )
      },
    },
  ];

  useEffect(() => {
    // 动态列头
    const actionColumns = [];
    if(store.topicT1 != null){
      actionColumns.push({
        title: '数据主题T1字段',
        dataIndex: 'paramCodeT1',
        width: '140px',
        render: (content, record, index) => {
          return (
            <DropDownSelect
              defaultValue={content}
              keyName="name"
              keyValue="code"
              keyColType="colType"
              data={topicDataDetailT1}
              onChange={(value, option) => {
                const dataSource = ref?.current?.getDataSource();
                if(dataSource){
                  dataSource[index].paramCodeT1 = value;
                  dataSource[index].paramTypeT1 = option.colType;
                  ref?.current?.setDataSource(dataSource);
                }
              }}
            />
          );
        },
      });
    }
    if(store.topicT2 != null){
      actionColumns.push({
        title: '数据主题T2字段',
        dataIndex: 'paramCodeT2',
        width: '140px',
        render: (content, record, index) => {
          return (
            <DropDownSelect
              defaultValue={content}
              keyName="name"
              keyValue="code"
              keyColType="colType"
              data={topicDataDetailT2}
              onChange={(value, option) => {
                const dataSource = ref?.current?.getDataSource();
                if(dataSource){
                  dataSource[index].paramCodeT2 = value;
                  dataSource[index].paramTypeT2 = option.colType;
                  ref?.current?.setDataSource(dataSource);
                }
              }}
            />
          );
        },
      });
    }
    if(store.topicT3 != null){
      actionColumns.push({
        title: '数据主题T3字段',
        dataIndex: 'paramCodeT3',
        width: '140px',
        render: (content, record, index) => {
          return (
            <DropDownSelect
              defaultValue={content}
              keyName="name"
              keyValue="code"
              keyColType="colType"
              data={topicDataDetailT3}
              onChange={(value, option) => {
                const dataSource = ref?.current?.getDataSource();
                if(dataSource){
                  dataSource[index].paramCodeT3 = value;
                  dataSource[index].paramTypeT3 = option.colType;
                  ref?.current?.setDataSource(dataSource);
                }
              }}
            />
          );
        },
      });
    }
    const columnsAll = actionColumns.concat(columnsFix);
    setColumns(columnsAll);
  }, [store.topicT1,store.topicT2,store.topicT3, paramsDataSource, defaultDataList]);


  useEffect(() => {
    // 参数条件 下拉框内容
    async function fetchNrDataList() {
      const param = [];
      param.push("DEV_INDEX_NR");
      const res = await queryVocDataList(param);
      const resData = res?.data;
      setNrDataList(resData);
    }
    fetchNrDataList();

    // 条件关系 下拉框内容
    async function fetchRlaTypeDataList() {
      const param = [];
      param.push("DEV_INDEX_RLA_TYPE");
      const res = await queryVocDataList(param);
      const resData = res?.data;
      setRlaTypeDataList(resData);
    }
    fetchRlaTypeDataList();

    // 选择字典 下拉框内容
    async function fetchDevServiceDataList() {
      const res = await queryDevServiceDataList();
      const resData = res?.data;
      setVocDataList(resData);
    }
    fetchDevServiceDataList();

  }, []);


  useEffect(() => {
    const dataSource = store?.indexParamter?.map((item) => (
      {
        conditionRela: item.conditionRela,
        indexCode: item.indexCode,
        paramCodeT1: item.paramCodeT1,
        paramCodeT2: item.paramCodeT2,
        paramCodeT3: item.paramCodeT3,
        paramTypeT1: item.paramTypeT1,
        paramTypeT2: item.paramTypeT2,
        paramTypeT3: item.paramTypeT3,
        paramCondition: (item.paramCondition && typeof item.paramCondition==='string')?(item.paramCondition).split('|'):item.paramCondition,
        paramDesc: item.paramDesc,
        paramName: item.paramName,
        paramValue: item.paramValue,
        sourceServiceCode: item.sourceServiceCode,
        sourceType: item.sourceType,
        conditionOrder: item.conditionOrder,
        id: ""
    }
    ));
    setParamsDataSource(dataSource);
  }, [store.indexParamter]);


  const changeCheckDataSouce = (ds) => {
    setParamsDataSource(ds);
  }

  useImperativeHandle(refParam, () => ({
    // validate 就是暴露给父组件的方法
    validate:  async () => {
      let isValidate = true;

      // 可填可不填
      const dataSource = ref?.current?.getDataSource();
      /** *
      if(dataSource){
        for(let i=0; i<dataSource.length; i++){
          if(dataSource[i].paramCode === undefined){
            MsgBox.warning({ message: "请输入数据主题T1的条件字段" });
            isValidate = false;
          }
          if(dataSource[i].conditionCode === undefined){
            MsgBox.warning({ message: "请输入数据主题T1的条件运算" });
            isValidate = false;
          }
          if(dataSource[i].conditionValue === undefined || dataSource[i].conditionValue === ''){
            MsgBox.warning({ message: "请输入数据主题T1的条件值" });
            isValidate = false;
          }
        }
      }
      * */

      if(isValidate){
        setStore({
          ...store,
          indexParamter: dataSource,
        })
      }

      return isValidate;
    }
  }));


  const tablePanelProps = {
    title: {},
    tableProps: {
      dataSource: paramsDataSource,
      columns,
      scroll: { x: 'max-content', y: '560px' },
    },
  };

  return (
    <div style={{ padding: '20px' }}>
      <FeTable ref={ref} {...tablePanelProps} updateTableData={changeCheckDataSouce} />
    </div>
  );
});

export default TargetParams;
