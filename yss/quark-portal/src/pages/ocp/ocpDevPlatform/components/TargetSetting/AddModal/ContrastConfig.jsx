import React, { useState, useEffect, useRef, forwardRef, useImperativeHandle } from 'react';
import { Tabs, Input } from 'antd';
import MsgBox from '@/utils/MsgBox';
import Tipbar from '@/components/Tipbar';
import DropDownSelect from './DropDownSelect';
import FeTable from './FeTable';

const { TabPane } = Tabs;

const ContrastConfig = forwardRef((props, refParam) => {
  const { store, setStore } = props;

  // 数据主题字段的下拉框内容
  const topicDataDetailT1 = store.topicT1?.topicDataDetail;
  const topicDataDetailT2 = store.topicT2?.topicDataDetail;
  const topicDataDetailT3 = store.topicT3?.topicDataDetail;

  // 选择的主题
  const {topicT1, topicT2 ,topicT3} = store;
  const [localTopicT1, setLocalTopicT1] = useState(topicT1);
  const [localTopicT2, setLocalTopicT2] = useState(topicT2);
  const [localTopicT3, setLocalTopicT3] = useState(topicT3);

  const refMatch = useRef();
  const refContrast = useRef();

  // 匹配表格的dataSource
  const [matchDataSource, setMatchDataSource] = useState([])
  // 核对表格的dataSource
  const [contrastDataSource, setContrastDataSource] = useState([])

  const [columnsMatch, setColumnsMatch] = useState([]);
  const columnsMatchRemark =
  [
    {
      title: '备注(选填)',
      width: '140px',
      dataIndex: 'remark',
      render: (content, row, index) => {
        return (
          <Input
            defaultValue={content}
            onChange={(e) => {
              const dataSource = refMatch?.current?.getDataSource();
              if(dataSource){
                dataSource[index].remark = e.target.value;
                refMatch?.current?.setDataSource(dataSource);
              }
            }}
          />
        )
      },
    },
  ]

  const [columnsContrast, setColumnsContrast] = useState([]);
  const columnsContrastRemark =
  [
    {
      title: '备注(选填)',
      width: '140px',
      dataIndex: 'remark',
      render: (content, row, index) => {
        return (
          <Input
            defaultValue={content}
            onChange={(e) => {
              const dataSource = refContrast?.current?.getDataSource();
              if(dataSource){
                dataSource[index].remark = e.target.value;
                refContrast?.current?.setDataSource(dataSource);
              }
            }}
          />
        )
      },
    },
  ];

  useEffect(() => {
    setLocalTopicT1(store.topicT1);
    setLocalTopicT2(store.topicT2);
    setLocalTopicT3(store.topicT3);

    // 动态列头
    const actionColumnsMatch = [];
    if(store.topicT1 != null){
      actionColumnsMatch.push({
        title: '数据主题T1字段',
        dataIndex: 'colCodeT1',
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
                const dataSource = refMatch?.current?.getDataSource();
                if(dataSource){
                  dataSource[index].colCodeT1 = value;
                  dataSource[index].colTypeT1 = option.colType;
                  refMatch?.current?.setDataSource(dataSource);
                }
              }}
            />
          );
        },
      });
    }
    if(store.topicT2 != null){
      actionColumnsMatch.push({
        title: '数据主题T2字段',
        dataIndex: 'colCodeT2',
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
                const dataSource = refMatch?.current?.getDataSource();
                if(dataSource){
                  dataSource[index].colCodeT2 = value;
                  dataSource[index].colTypeT2 = option.colType;
                  refMatch?.current?.setDataSource(dataSource);
                }
              }}
            />
          );
        },
      });
    }
    if(store.topicT3 != null){
      actionColumnsMatch.push({
        title: '数据主题T3字段',
        dataIndex: 'colCodeT3',
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
                const dataSource = refMatch?.current?.getDataSource();
                if(dataSource){
                  dataSource[index].colCodeT3 = value;
                  dataSource[index].colTypeT3 = option.colType;
                  refMatch?.current?.setDataSource(dataSource);
                }
              }}
            />
          );
        },
      });
    }
    const columnsAllMatch = actionColumnsMatch.concat(columnsMatchRemark);
    setColumnsMatch(columnsAllMatch);


    const actionColumnsContrast = [];
    if(store.topicT1 != null){
      actionColumnsContrast.push({
        title: '数据主题T1字段',
        dataIndex: 'colCodeT1',
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
                const dataSource = refContrast?.current?.getDataSource();
                if(dataSource){
                  dataSource[index].colCodeT1 = value;
                  dataSource[index].colTypeT1 = option.colType;
                  refContrast?.current?.setDataSource(dataSource);
                }
              }}
            />
          );
        },
      });
    }
    if(store.topicT2 != null){
      actionColumnsContrast.push({
        title: '数据主题T2字段',
        dataIndex: 'colCodeT2',
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
                const dataSource = refContrast?.current?.getDataSource();
                if(dataSource){
                  dataSource[index].colCodeT2 = value;
                  dataSource[index].colTypeT2 = option.colType;
                  refContrast?.current?.setDataSource(dataSource);
                }
              }}
            />
          );
        },
      });
    }
    if(store.topicT3 != null){
      actionColumnsContrast.push({
        title: '数据主题T3字段',
        dataIndex: 'colCodeT3',
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
                const dataSource = refContrast?.current?.getDataSource();
                if(dataSource){
                  dataSource[index].colCodeT3 = value;
                  dataSource[index].colTypeT3 = option.colType;
                  refContrast?.current?.setDataSource(dataSource);
                }
              }}
            />
          );
        },
      });
    }
    const columnsAllContrast = actionColumnsContrast.concat(columnsContrastRemark);
    setColumnsContrast(columnsAllContrast);


  }, [store.topicT1, store.topicT2, store.topicT3]);


  const changeCheckDataSouceMatch = (ds) => {
    setMatchDataSource(ds);
  }

  const changeCheckDataSouceContrast = (ds) => {
    setContrastDataSource(ds);
  }

  useImperativeHandle(refParam, () => ({
    // validate 就是暴露给父组件的方法
    validate:  async () => {
      let isValidate = true;

      // 数据核对 必填
      const contrastConfig = [];
      if(refMatch?.current?.getDataSource()){
        const dataSourceM = refMatch?.current?.getDataSource();
        if(dataSourceM){
          for(let i=0; i<dataSourceM.length; i++){
            contrastConfig.push({
              colCodeT1: dataSourceM[i].colCodeT1,
              colCodeT2: dataSourceM[i].colCodeT2,
              colCodeT3: dataSourceM[i].colCodeT3,
              colTypeT1: dataSourceM[i].colTypeT1,
              colTypeT2: dataSourceM[i].colTypeT2,
              colTypeT3: dataSourceM[i].colCodeT3,
              contrastType: "match",
              indexCode: store.indexDev.indexCode,
              remark: dataSourceM[i].remark,
              id: ""
            });
          }
        }
      }

      if(refContrast?.current?.getDataSource()){
        const dataSourceC = refContrast?.current?.getDataSource();
        if(dataSourceC){
          for(let i=0; i<dataSourceC.length; i++){
            contrastConfig.push({
              colCodeT1: dataSourceC[i].colCodeT1,
              colCodeT2: dataSourceC[i].colCodeT2,
              colCodeT3: dataSourceC[i].colCodeT3,
              colTypeT1: dataSourceC[i].colTypeT1,
              colTypeT2: dataSourceC[i].colTypeT2,
              colTypeT3: dataSourceC[i].colCodeT3,
              contrastType: "contrast",
              indexCode: store.indexDev.indexCode,
              remark: dataSourceC[i].remark,
              id: ""
            });
          }
        }
      }


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
          contrastConfig
        })
      }

      return isValidate;
    }
  }));

  useEffect(() => {
    const dataSource = store?.contrastConfig.filter(function(item){
      return item.contrastType === 'match';
    })
    setMatchDataSource(dataSource);
  }, [store.contrastConfig]);

  useEffect(() => {
    const dataSource = store?.contrastConfig.filter(function(item){
      return item.contrastType === 'contrast';
    })
    setContrastDataSource(dataSource);
  }, [store.contrastConfig]);

  const tablePanelPropsMatch = {
    title: { text: '匹配字段' },
    toolbar: {},
    tableProps: {
      dataSource: matchDataSource,
      columns: columnsMatch,
      scroll: { x: 'max-content', y: '560px' },
    },
  };

  const tablePanelPropsContrast = {
    title: { text: '核对字段' },
    toolbar: {},
    tableProps: {
      dataSource: contrastDataSource,
      columns: columnsContrast,
      scroll: { x: 'max-content', y: '560px' },
    },
  };

  return (
    <div style={{ padding: '20px' }}>
      <FeTable ref={refMatch} {...tablePanelPropsMatch} updateTableData={changeCheckDataSouceMatch} />
      <FeTable ref={refContrast} {...tablePanelPropsContrast} updateTableData={changeCheckDataSouceContrast} />
    </div>
  );
});

export default ContrastConfig;
