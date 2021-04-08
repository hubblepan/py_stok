import React, { useState, useEffect, useRef, forwardRef, useImperativeHandle } from 'react';
import { Tabs, Input } from 'antd';
import MsgBox from '@/utils/MsgBox';
import Tipbar from '@/components/Tipbar';
import DropDownSelect from './DropDownSelect';
import FeTable from './FeTable';
import { queryVocDataList, queryDevServiceDataList, queryDropDownInfos } from '../../../services/devConfig';


const ThresholdCondition = forwardRef((props, refParam) => {
  const { store, setStore } = props;

  const ref = useRef();

  // 参数条件 下拉框内容
  const [nrDataList, setNrDataList] = useState([]);
  // 条件关系 下拉框内容
  const [rlaTypeDataList, setRlaTypeDataList] = useState([]);

  const topicDataDetailT1 = store.topicT1?.topicDataDetail;

  const [thresholdDataSource, setThresholdDataSource] = useState(store.thresholdCondition)

  const columns = [
    {
      title: '关键字段',
      dataIndex: 'paramCode',
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
                dataSource[index].paramCode = value;
                dataSource[index].paramType = option.colType;
                ref?.current?.setDataSource(dataSource);
              }
            }}
          />
        );
      },
    },
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
              if(dataSource){
                dataSource[index].paramCondition = value;
                ref?.current?.setDataSource(dataSource);
              }
            }}
          />
        );
      },
    },
    {
      title: '默认参数值',
      width: '140px',
      dataIndex: 'paramValue',
      render: (content, row, index) => {
        return (
          <Input
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
          ( thresholdDataSource.length-1) !== index? (
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

  }, []);


  useEffect(() => {
    const dataSource = store?.thresholdCondition?.map((item) => (
      {
        conditionRela: item.conditionRela,
        indexCode: item.indexCode,
        paramCode: item.paramCode,
        paramCondition: (item.paramCondition && typeof item.paramCondition==='string')?(item.paramCondition).split('|'):item.paramCondition,
        paramDesc: item.paramDesc,
        paramName: item.paramName,
        paramType: item.paramType,
        paramValue: item.paramValue,
        id: ""
      }
    ));
    setThresholdDataSource(dataSource);
  }, [store.thresholdCondition]);


  const changeCheckDataSouce = (ds) => {
    setThresholdDataSource(ds);
  }

  useImperativeHandle(refParam, () => ({
    // validate 就是暴露给父组件的方法
    validate:  async () => {
      let isValidate = true;

      // 监控阀值必填
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
          thresholdCondition: dataSource,
        })
      }

      return isValidate;
    }
  }));


  const tablePanelProps = {
    title: {},
    tableProps: {
      dataSource: thresholdDataSource,
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

export default ThresholdCondition;
