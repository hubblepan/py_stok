import React, { useState, useEffect, useRef, forwardRef, useImperativeHandle } from 'react';
import { Row, Button, Table, Tabs, Input, Select } from 'antd';
import { PlusCircleOutlined, CloseOutlined } from '@ant-design/icons';
import QuarkTable from '@/components/QuarkTable';
import Tipbar from '@/components/Tipbar';
import DropDownSelect from './DropDownSelect';
import { queryVocDataList, queryDevServiceDataList, queryDropDownInfos } from '../../../services/devConfig';
import FeTable from './FeTable';
import SplitPane, { Pane } from 'react-split-pane';
import { array } from 'prop-types';

const { OptGroup, Option } = Select;


const DetailFields = forwardRef((props, refParam) => {
  const { store, setStore } = props;
  // const { $Global } = store;
  // const { dictData } = $Global;

  const ref = useRef();

  const [fieldDataSource, setFieldDataSource] = useState([])
  // 字典数据 下拉框内容
  const [vocDataList, setVocDataList] = useState([]);
  // 明细结果列 下拉框内容
  const [resultSelectOpts, setResultSelectOpts] = useState([]);

  const columns = [
    {
      title: '明细结果列',
      dataIndex: 'colCodeStr',
      render: (content, row, index) => {
        return (
          <Select
            defaultValue={content}
            placeholder="请选择"
            bordered={false}
            style={{ width: '100%', height: '100%' }}
            onChange={(value, option) => {
              const dataSource = ref?.current?.getDataSource();
              if(dataSource){
                dataSource[index].colCodeStr = value;
                dataSource[index].colType = option.colType;
                if(value){
                  const colCodeStr = value.split('.');  // T1.C_PORT_CODE
                  if(colCodeStr.length === 2){
                    dataSource[index].colCode = colCodeStr[1];
                    dataSource[index].topicAlias = colCodeStr[0];
                  }
                }
                ref?.current?.setDataSource(dataSource);
              }
            }}
          >
            {resultSelectOpts}
          </Select>
        );
      },
    },
    {
      title: '列名称',
      dataIndex: 'colName',
      render: (content, row, index) => {
        return <Input
          defaultValue={content}
          onChange={(e) => {
            const dataSource = ref?.current?.getDataSource();
              if(dataSource){
                dataSource[index].colName = e.target.value;
                ref?.current?.setDataSource(dataSource);
              }
          }}
        />;
      },
    },
    {
      title: '字典数据(选填)',
      dataIndex: 'serviceCode',
      render: (content, row, index) => {
        // console.log('caocaocao', dictData);
        return (
          <DropDownSelect
            defaultValue={content}
            keyName="serviceName"
            keyValue="serviceCode"
            data={vocDataList}
            onChange={(value, option) => {
              const dataSource = ref?.current?.getDataSource();
              if(dataSource){
                dataSource[index].serviceCode = value;
                ref?.current?.setDataSource(dataSource);
              }
            }}
          />
        );
      },
    },
    {
      title: '异常/预警标红',
      dataIndex: 'isexceptions',
      render: (content, row, index) => {
        return (
          <DropDownSelect
            defaultValue={content}
            keyName="value"
            keyValue="key"
            data={[
              { id: 1, key: '1', value: '是' },
              { id: 2, key: '0', value: '否' },
            ]}
            onChange={(value, option) => {
              const dataSource = ref?.current?.getDataSource();
              if(dataSource){
                dataSource[index].isexceptions = value;
                ref?.current?.setDataSource(dataSource);
              }
            }}
          />
        );
      },
    },
    {
      title: '千分位格式',
      dataIndex: 'isthousandth',
      render: (content, row, index) => {
        return (
          <DropDownSelect
            defaultValue={content}
            keyName="value"
            keyValue="key"
            data={[
              { id: 1, key: '1', value: '是' },
              { id: 2, key: '0', value: '否' },
            ]}
            onChange={(value, option) => {
              const dataSource = ref?.current?.getDataSource();
              if(dataSource){
                dataSource[index].isthousandth = value;
                ref?.current?.setDataSource(dataSource);
              }
            }}
          />
        );
      },
    },
  ];


  const changeFieldDataSouce = (ds) => {
    setFieldDataSource(ds);
  }

  useImperativeHandle(refParam, () => ({
    // validate 就是暴露给父组件的方法
    validate:  async () => {
      let isValidate = true;

      // 必填

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
          fieldDetail: fieldDataSource,
        })
      }

      return isValidate;
    }
  }));

  useEffect(() => {

    // 选择字典 下拉框内容
    async function fetchDevServiceDataList() {
      const res = await queryDevServiceDataList();
      const resData = res?.data;
      setVocDataList(resData);
    }
    fetchDevServiceDataList();

  }, []);


  useEffect(() => {
    const opts = [];
    if(store.topicT1 != null){
      const topicDataDetailT1 = store?.topicT1?.topicDataDetail;
      opts.push(<OptGroup label="数据主题T1" />);
      for(let i=0; i < topicDataDetailT1.length; i++){
        opts.push(<Select.Option key={`T1.${topicDataDetailT1[i].code}`} value={`T1.${topicDataDetailT1[i].code}`} colType={`${topicDataDetailT1[i].colType}`}>{`T1.${topicDataDetailT1[i].code}`}</Select.Option>);
      }
    }
    if(store.topicT2 != null){
      const topicDataDetailT2 = store?.topicT2?.topicDataDetail;
      opts.push(<OptGroup label="数据主题T2" />);
      for(let i=0; i < topicDataDetailT2.length; i++){
        opts.push(<Select.Option key={`T2.${topicDataDetailT2[i].code}`} value={`T2.${topicDataDetailT2[i].code}`} colType={`${topicDataDetailT2[i].colType}`}>{`T2.${topicDataDetailT2[i].code}`}</Select.Option>);
      }
    }
    if(store.topicT3 != null){
      const topicDataDetailT3 = store?.topicT3?.topicDataDetail;
      opts.push(<OptGroup label="数据主题T3" />);
      for(let i=0; i < topicDataDetailT3.length; i++){
        opts.push(<Select.Option key={`T3.${topicDataDetailT3[i].code}`} value={`T3.${topicDataDetailT3[i].code}`} colType={`${topicDataDetailT3[i].colType}`}>{`T3.${topicDataDetailT3[i].code}`}</Select.Option>);
      }
    }

    // 明细结果列 下拉框内容
    setResultSelectOpts(opts);

  }, [store.topicT1,store.topicT2,store.topicT3]);


  useEffect(() => {
    const dataSource = store?.fieldDetail?.map((item) => (
      {
        colCodeStr: `${item.topicAlias}.${item.colCode}`,    // 结果明细列
        colCode: item.colCode,
        colName: item.colName,
        indexCode: item.indexCode,
        isexceptions: item.isexceptions,
        isservice: item.isservice,
        isthousandth: item.isthousandth,
        serviceCode: item.serviceCode,
        colType: item.colType,
        topicAlias: item.topicAlias,
        id: item.id,
      }
    ));
    setFieldDataSource(dataSource);
  }, [store.fieldDetail]);


  const tablePanelProps = {
    title: {},
    tableProps: {
      dataSource: fieldDataSource,
      columns,
      scroll: { x: 'max-content' },
    },
  };

  return (
    <div style={{ padding: '20px' }}>
      <Tipbar
        type="info"
        content="组合类指标，默认明细中第一个字段为【组合代码】，第二个字段为组合名称无需在此配置"
      />
      <FeTable  ref={ref} {...tablePanelProps} updateTableData={changeFieldDataSouce} />
    </div>
  );
});
export default DetailFields;

