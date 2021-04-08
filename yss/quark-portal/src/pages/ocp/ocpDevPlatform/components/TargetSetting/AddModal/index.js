import React, { useState, useEffect, useRef } from 'react';
import { Modal, Row, Col, Steps, Button } from 'antd';
import QuarkModal from '@/components/QuarkModal';
import BaseInfo from './BaseInfo';
import ThemeParams from './ThemeParams';
import CheckCondition from './CheckCondiction';
import TargetParams from './TargetParams';
import DetailFields from './DetailFields';
import GeneralDesc from './GeneralDesc';
import DetailDesc from './DetailDesc';
import ThresholdCondition from './ThresholdCondition';
import ContrastConfig from './ContrastConfig';
import { queryIndexDevView, queryIndexDevORCABI } from '../../../services/devConfig';
import queryString from 'query-string';
import styles from './style.less';

// import { queryDictData, querySysVar, queryThemeData, queryCondictionFunc,
//   queryCondictionParam, queryCondictionCalc, queryParamCondictions } from '../../../services/addModalService'

const { Step } = Steps;

export default (props) => {
  const { visible, setVisible, mode, currentRecord } = props;

  const [currentStep, setCurrentStep] = useState('BaseInfo');
  const [currentStepIndex, setCurrentStepIndex] = useState(0);

  const refBaseInfo = useRef();
  const refThemeParams = useRef();
  const refCheckCondition = useRef();
  const refTargetParams = useRef();
  const refDetailFields = useRef();
  const refGeneralDesc = useRef();
  const refDetailDesc = useRef();
  const refThresholdCondition = useRef();
  const refContrastConfig = useRef();

  const [dataSteps, setDataSteps] = useState([
    {
      title: '基本信息',
      key: 'BaseInfo',
    },
    {
      title: '主题参数',
      key: 'ThemeParams',
    },
    {
      title: '检查条件',
      key: 'CheckCondition',
    },
    {
      title: '指标参数',
      key: 'TargetParams',
    },
    {
      title: '明细字段',
      key: 'DetailFields',
    },
    {
      title: '总览描述',
      key: 'GeneralDesc',
    },
    {
      title: '明细描述',
      key: 'DetailDesc',
    },
  ]);

  const changeSteps = ( monitorType ) =>{
    if(monitorType === 'reminder'){
      setDataSteps([
        {
          title: '基本信息',
          key: 'BaseInfo',
        },
        {
          title: '主题参数',
          key: 'ThemeParams',
        },
        {
          title: '检查条件',
          key: 'CheckCondition',
        },
        {
          title: '指标参数',
          key: 'TargetParams',
        },
        {
          title: '明细字段',
          key: 'DetailFields',
        },
        {
          title: '总览描述',
          key: 'GeneralDesc',
        },
        {
          title: '明细描述',
          key: 'DetailDesc',
        },
      ]);
    }else if(monitorType === 'threshold'){
      setDataSteps([
        {
          title: '基本信息',
          key: 'BaseInfo',
        },
        {
          title: '主题参数',
          key: 'ThemeParams',
        },
        {
          title: '检查条件',
          key: 'CheckCondition',
        },
        {
          title: '指标参数',
          key: 'TargetParams',
        },
        {
          title: '阀值条件',
          key: 'ThresholdCondition',
        },
        {
          title: '明细字段',
          key: 'DetailFields',
        },
        {
          title: '总览描述',
          key: 'GeneralDesc',
        },
        {
          title: '明细描述',
          key: 'DetailDesc',
        },
      ]);
    }else if(monitorType === 'contrast'){
        setDataSteps([
          {
            title: '基本信息',
            key: 'BaseInfo',
          },
          {
            title: '主题参数',
            key: 'ThemeParams',
          },
          {
            title: '检查条件',
            key: 'CheckCondition',
          },
          {
            title: '指标参数',
            key: 'TargetParams',
          },
          {
            title: '核对配置',
            key: 'ContrastConfig',
          },
          {
            title: '明细字段',
            key: 'DetailFields',
          },
          {
            title: '总览描述',
            key: 'GeneralDesc',
          },
          {
            title: '明细描述',
            key: 'DetailDesc',
          },
        ]);
    }
  }

  const [store, setStore] = useState({
    // 全局通用
    // $Global: {
      // dataSteps,
      // 字典数据下拉框
      // dictData: [],
      // 系统变量下拉框
      // sysVar: [],
      // 主题数据下拉框
      // themeData: [],
      // 函数下拉框
      // condictionFunc: [],
      // 条件参数下拉框
      // condictionParam: [],
      // 条件运算下拉框
      // condictionCalc: [],
      // 参数条件下拉框
      // paramCondictions: []
    // },
    mode,
    currentRecord,
    oldIndexCode: "",
    BaseInfo: {},
    ThemeParams: {},
    CheckCondition: {},
    TargetParams: {},
    DetailFields: {},
    DeployComplete: {},
    GeneralDesc: {},
    DetailDesc: {},
    indexDev: {
      /**
      contrastBase: null,
      deployTime: null,
      detailLogAbnormalDesc: "",
      fileName: null,
      indexCode: "",
      indexDesc: "",
      indexName: "",
      ispublic: "0",
      logAbnormalDesc: "",
      logNormalDesc: "",
      monitorType: "",
      promptingType: "",
      dataTopicDisplayText: "",
      auditState: 0,
      operator: "",
      auditDate: null,
      modifier: "",
      modifyDate: "",
      id: "",
      * */
    },
    topic: [
      /* {
        indexCode: "test1",
        topicAlias: "T1",
        topicCode: "ZQMMJK_210119",
        topicData: "C_IDEN|C_TD_TYPE|C_DV_TYPE_SUB",
        topicDataDetail: [{code: 'String', name:'c_port_code', colType: 'String'}]
        topicName: "ZQMMJK_210119",
        topicUrl: "http://192.168.2.104:18083/api/v1/public/data-services/ZQMMJK_210119/20210119",
        topicVer: "20210119",
        id: ""
      } */
    ],
    topicT1: null,
    topicT2: null,
    topicT3: null,
    topicParamter: [
      /**
      {
        "indexCode": "test1",
        "paramCode": "portCode",
        "paramCondition": "=",
        "paramValue": "portCode()",
        "paramType": null,
        "paramClass": "base",   // extend 扩展参数
        "topicAlias": "T1",
        "id": ""
      }
      * */
    ],
    topicParamterT1: [],
    topicParamterT2: [],
    topicParamterT3: [],
    topicParamterExtendT1: [],
    topicParamterExtendT2: [],
    topicParamterExtendT3: [],
    checkCondition:[],
    checkConditionT1: [],
    checkConditionT2: [],
    checkConditionT3: [],
    indexParamter: [],
    fieldDetail: [],
    thresholdCondition: [],
    contrastConfig: [],
  });

  // useEffect(() => {
  //   console.log(dataSteps[currentStep]);
  // }, [currentStep])


  // 初始化 主题字段和主题基础参数
  const setDataFieldParamsInit = async (themeName, topicCode, option, checkedTopicData, modifyTopicParamter, storeData) => {
    const param = {
      code: topicCode,
      version: option.version,
    };
    // 查询主题相关的字段信息
    const res = await queryIndexDevORCABI(queryString.stringify(param));
    // 虎鲸BI的主题字段
    const fields = res?.data?.fields;
    // 虎鲸BI的主题参数
    const dataParamsResult = res?.data?.parameters;
    // 编辑时，根据数据修改defaultValue
    if(mode === 'edit' || mode === 'copy'){
      if(dataParamsResult && modifyTopicParamter){
        for(let i=0; i < modifyTopicParamter.length; i++ ){
          for(let j=0; j< dataParamsResult.length; j++){
            if(dataParamsResult[j].name === modifyTopicParamter[i].paramCode){
              dataParamsResult[j].defaultValue = modifyTopicParamter[i].paramValue;
            }
          }
        }
      }
    }
    // 主题字段列表 (包含字段类型，为后续步骤的下拉框使用)
    const convertParamsResult = [];
    for(let i=0; i< dataParamsResult.length; i++){
      convertParamsResult.push({
        paramCode: dataParamsResult[i].name,
        paramCondition: dataParamsResult[i].operator,
        paramValue: dataParamsResult[i].defaultValue,
        paramType: dataParamsResult[i].type,
        id: dataParamsResult[i].id,
        paramClass: 'base',
        topicAlias: themeName,
      })
    }
    // 主题字段字符串
    let topicData = "";
    const topicDataDetail = [];
    for(let i=0; i < fields.length; i++){
      topicData = `${topicData + fields[i].name  }|`;
      topicDataDetail.push({name: fields[i].name, code: fields[i].name, colType: fields[i].type})
    }
    if(topicData !== ''){
      topicData = topicData.substring(0, topicData.lastIndexOf('|'))
    }
    if(themeName === 'T1'){
      storeData.topicParamterT1 = convertParamsResult;
      storeData.topicT1 = {
            indexCode: "",
            topicAlias: "T1",
            topicCode: option.value,
            topicData, // "C_IDEN|C_TD_TYPE|C_DV_TYPE_SUB",
            topicDataDetail,
            topicName: option.name,
            topicUrl: option.url,
            topicVer: option.version,
            id: ""
          };

    }else if(themeName === 'T2'){
      storeData.topicParamterT2 = convertParamsResult;
      storeData.topicT2 = {
          indexCode: "",
          topicAlias: "T2",
          topicCode: option.value,
          topicData,
          topicDataDetail,
          topicName: option.name,
          topicUrl: option.url,
          topicVer: option.version,
          id: ""
        };
    }else if(themeName === 'T3'){
      storeData.topicParamterT3 = convertParamsResult;
      storeData.topicT3 = {
          indexCode: "",
          topicAlias: "T3",
          topicCode: option.value,
          topicData,
          topicDataDetail,
          topicName: option.name,
          topicUrl: option.url,
          topicVer: option.version,
          id: ""
        };
    }
  }

  const fetchTopicDataInit = async (themeName, topicList, topicParamterList, storeData) => {
    const topic = topicList.filter(function(item){
      return item.topicAlias === themeName;
    })
    const topicParamter = topicParamterList.filter(function(item){
      return item.topicAlias === themeName;
    })
    if(topic && topic.length===1){
      const option = {
        value: topic[0].topicCode,
        name: topic[0].topicName,
        url: topic[0].topicUrl,
        version: topic[0].topicVer,
      }
      await setDataFieldParamsInit(themeName, topic[0].topicCode, option, topic[0].topicData, topicParamter, storeData);
    }
  }

  // 初始化检查条件
  const checkConditionInit = (checkCondition, storeData) => {
    if(checkCondition){
      const checkConditionT1 = [];
      const checkConditionT2 = [];
      const checkConditionT3 = [];
      for(let i=0; i < checkCondition.length; i++){
        if(checkCondition[i].topicAlias === 'T1'){
          checkConditionT1.push({
            conditionCode: checkCondition[i].conditionCode,
            conditionRela: checkCondition[i].conditionRela?checkCondition[i].conditionRela:undefined,
            conditionValue: checkCondition[i].conditionValue,
            indexCode: checkCondition[i].indexCode,
            paramCode: checkCondition[i].paramCode,
            paramType: checkCondition[i].paramType,
            conditionOrder: i+1,
            topicAlias: "T1",
            id: i+1
          });
        }
        if(checkCondition[i].topicAlias === 'T2'){
          checkConditionT2.push({
            conditionCode: checkCondition[i].conditionCode,
            conditionRela: checkCondition[i].conditionRela?checkCondition[i].conditionRela:"",
            conditionValue: checkCondition[i].conditionValue,
            indexCode: checkCondition[i].indexCode,
            paramCode: checkCondition[i].paramCode,
            paramType: checkCondition[i].paramType,
            conditionOrder: i+1,
            topicAlias: "T2",
            id: i+1
          });
        }
        if(checkCondition[i].topicAlias === 'T3'){
          checkConditionT3.push({
            conditionCode: checkCondition[i].conditionCode,
            conditionRela: checkCondition[i].conditionRela?checkCondition[i].conditionRela:"",
            conditionValue: checkCondition[i].conditionValue,
            indexCode: checkCondition[i].indexCode,
            paramCode: checkCondition[i].paramCode,
            paramType: checkCondition[i].paramType,
            conditionOrder: i+1,
            topicAlias: "T3",
            id: i+1
          });
        }
      }
      storeData.checkConditionT1 = checkConditionT1;
      storeData.checkConditionT2 = checkConditionT2;
      storeData.checkConditionT3 = checkConditionT3;
    }
  }

  // 初始化 扩展参数
  const topicParamterExtendInit = (topicParamter, storeData) => {
    if(topicParamter){
      const topicParamterExtendT1 = [];
      const topicParamterExtendT2 = [];
      const topicParamterExtendT3 = [];
      for(let i=0; i < topicParamter.length; i++){
        if(topicParamter[i].topicAlias === 'T1' && topicParamter[i].paramClass === 'extend'){
          topicParamterExtendT1.push({
            indexCode: topicParamter[i].indexCode,
            paramCode: topicParamter[i].paramCode,
            paramCondition: topicParamter[i].paramCondition,
            paramValue: topicParamter[i].paramValue,
            paramType: topicParamter[i].paramType,
            paramClass: "extend",
            topicAlias: "T1",
            id: i+1
          });
        }
        if(topicParamter[i].topicAlias === 'T2' && topicParamter[i].paramClass === 'extend'){
          topicParamterExtendT2.push({
            indexCode: topicParamter[i].indexCode,
            paramCode: topicParamter[i].paramCode,
            paramCondition: topicParamter[i].paramCondition,
            paramValue: topicParamter[i].paramValue,
            paramType: topicParamter[i].paramType,
            paramClass: "extend",
            topicAlias: "T2",
            id: i+1
          });
        }
        if(topicParamter[i].topicAlias === 'T3' && topicParamter[i].paramClass === 'extend'){
          topicParamterExtendT3.push({
            indexCode: topicParamter[i].indexCode,
            paramCode: topicParamter[i].paramCode,
            paramCondition: topicParamter[i].paramCondition,
            paramValue: topicParamter[i].paramValue,
            paramType: topicParamter[i].paramType,
            paramClass: "extend",
            topicAlias: "T3",
            id: i+1
          });
        }
      }
      storeData.topicParamterExtendT1 = topicParamterExtendT1;
      storeData.topicParamterExtendT2 = topicParamterExtendT2;
      storeData.topicParamterExtendT3 = topicParamterExtendT3;
    }
  }


  // 公共状态采集
  useEffect(() => {
    // async function fetchGlobalData() {
      // const dictData = []; // (await queryDictData()).data;
      // const sysVar = []; // ((await querySysVar()).data;
      // const themeData = []; // ((await queryThemeData()).data.dataList;
      // const condictionFunc = []; // ((await queryCondictionFunc()).data;
      // const condictionParam = []; // await queryCondictionParam();
      // const condictionCalc = []; // await queryCondictionCalc();
      // const paramCondictions = []; // await queryParamCondictions();
      // setStore({
      //   ...store,
        // $Global: {
        //   ...store.$Global,
          // dictData,
          // sysVar,
          // themeData,
          // condictionFunc,
          // condictionParam: condictionParam.data,
          // condictionCalc: condictionCalc.data,
          // paramCondictions: paramCondictions.data,
        // },
    //   })
    // }
    // fetchGlobalData();

    // 编辑指标时，初始化数据
    async function initData() {
      const indexCode = currentRecord?.indexCode;
      const res = await queryIndexDevView(indexCode);
      if(res.data){
        changeSteps(res.data.indexDev.monitorType);
        const storeData = {
          indexDev: res.data.indexDev,
          topic: res.data.topic,
          topicParamter: res.data.topicParamter,
          checkCondition: res.data.checkCondition,
          indexParamter: res.data.indexParamter,
          thresholdCondition: res.data.thresholdCondition,
          contrastConfig: res.data.contrastConfig,
          fieldDetail: res.data.fieldDetail,
        }
        await fetchTopicDataInit("T1", res.data?.topic, res.data?.topicParamter, storeData);
        await fetchTopicDataInit("T2", res.data?.topic, res.data?.topicParamter, storeData);
        await fetchTopicDataInit("T3", res.data?.topic, res.data?.topicParamter, storeData);
        checkConditionInit(res.data?.checkCondition, storeData);
        topicParamterExtendInit(res.data?.topicParamter, storeData);

        setStore({
          ...store,
          oldIndexCode: storeData.indexDev.indexCode,
          indexDev: storeData.indexDev,
          topic: storeData.topic,
          topicParamter: storeData.topicParamter,
          checkCondition: storeData.checkCondition,
          indexParamter: storeData.indexParamter,
          thresholdCondition: storeData.thresholdCondition,
          contrastConfig: storeData.contrastConfig,
          fieldDetail: storeData.fieldDetail,
          topicT1: storeData.topicT1,
          topicParamterT1: storeData.topicParamterT1,
          topicT2: storeData.topicT2,
          topicParamterT2: storeData.topicParamterT2,
          topicT3: storeData.topicT3,
          topicParamterT3: storeData.topicParamterT3,
          checkConditionT1: storeData.checkConditionT1,
          checkConditionT2: storeData.checkConditionT2,
          checkConditionT3: storeData.checkConditionT3,
          topicParamterExtendT1: storeData.topicParamterExtendT1,
          topicParamterExtendT2: storeData.topicParamterExtendT2,
          topicParamterExtendT3: storeData.topicParamterExtendT3,
        });

      }
    }
    if(mode === 'edit'){
      initData();
    }

  }, [])

  const onCancel = () => setVisible(false);

  const onFinish = async () => {
    // 最后提交时，检查最后一步"明细描述"的必输项
    const isValidate = await refDetailDesc.current.validate();
    if(isValidate){
      setVisible(false);
    }
  }


  const nextStep = async () => {
    let currentIndex = 0;
    for(let i=0 ; i < dataSteps.length; i++){
      if(dataSteps[i].key === currentStep){
        currentIndex = i;
        break;
      }
    }

    let isValidate = false;
    // 调用校验方法
    switch(true){
      case currentStep==='BaseInfo':
        isValidate = await refBaseInfo.current.validate();
      break;
      case currentStep==='ThemeParams':
        isValidate = await refThemeParams.current.validate();
      break;
      case currentStep==='CheckCondition':
        isValidate = await refCheckCondition.current.validate();
      break;
      case currentStep==='TargetParams':
        isValidate = await refTargetParams.current.validate();
      break;
      case currentStep==='ThresholdCondition':
        isValidate = await refThresholdCondition.current.validate();
      break;
      case currentStep==='ContrastConfig':
        isValidate = await refContrastConfig.current.validate();
      break;
      case currentStep==='DetailFields':
        isValidate = await refDetailFields.current.validate();
      break;
      case currentStep==='GeneralDesc':
        isValidate = await refGeneralDesc.current.validate();
      break;
      case currentStep==='DetailDesc':
        isValidate = await refDetailDesc.current.validate();
      break;
      default:
        break;
    }

    if(isValidate){
      setCurrentStep(dataSteps[currentIndex+1].key);
      setCurrentStepIndex(currentIndex+1);
    }

  };

  const prevStep = () => {
    let currentIndex = 0;
    for(let i=0 ; i < dataSteps.length; i++){
      if(dataSteps[i].key === currentStep){
        currentIndex = i;
        break;
      }
    }
    setCurrentStep(dataSteps[currentIndex-1].key);
    setCurrentStepIndex(currentIndex-1);
  };

  // 页脚按钮
  const DFooter = (props) => {
    return currentStep !== 'DetailDesc' ? (
      <>
        <Button type="text" onClick={onCancel}>
          取消
        </Button>

        <Button
          className={currentStep !== 'BaseInfo' ? styles.show : styles.hide}
          type="primary"
          onClick={prevStep}
          ghost
        >
          上一步
        </Button>
        <Button
          type="primary"
          onClick={nextStep}
        >
          下一步
        </Button>
      </>
    ) : (
        <>
          <Button key="1" type="text" onClick={onCancel}>
            取消
        </Button>
          <Button
            className={currentStep === 'DetailDesc' ? styles.show : styles.hide}
            type="primary"
            onClick={prevStep}
            ghost
          >
            上一步
        </Button>
          <Button
            key="2"
            type="primary"
            onClick={onFinish}
          >
            完成并关闭
        </Button>
        </>
      );
  };

  return (
    <>
      {visible ? (
      <QuarkModal
        title="新增指标配置"
        width={980}
        forceRender
        destroyOnClose
        // afterClose={onAfterClose}
        visible={visible}
        footer={<DFooter />}
        // onOk={onOk}
        // className={styles.testModal}
        onCancel={onCancel}
      >
        <Row>
          <Col span={4} style={{ padding: '24px 0px 0px 24px' }} className={styles.leftSteps}>
            <Steps
              progressDot
              direction="vertical"
              size="small"
              current={currentStepIndex}
              status="process"
            // onChange={(cur) => {
            //   console.log(cur);
            //   setCurrentStep(cur);
            // }}
            >
              {dataSteps.map(item => (
                <Step key={item.title} title={item.title} />
              ))}
            </Steps>
          </Col>
          <Col span={20}>
            {/* 基本信息 */}
            <div className={currentStep === 'BaseInfo' ? '' : styles.hide}>
              <BaseInfo store={store} setStore={setStore} ref={refBaseInfo} changeSteps={changeSteps} />
            </div>
            {/* 主题参数 */}
            <div className={currentStep === 'ThemeParams' ? '' : styles.hide}>
              <ThemeParams store={store} setStore={setStore} ref={refThemeParams} />
            </div>
            {/* 检查条件 */}
            <div className={currentStep === 'CheckCondition' ? '' : styles.hide}>
              <CheckCondition store={store} setStore={setStore} ref={refCheckCondition} />
            </div>
            {/* 指标参数 */}
            <div className={currentStep === 'TargetParams' ? '' : styles.hide}>
              <TargetParams store={store} setStore={setStore} ref={refTargetParams} />
            </div>
            {/* 阀值条件 */}
            <div className={currentStep === 'ThresholdCondition' ? '' : styles.hide}>
              <ThresholdCondition store={store} setStore={setStore} ref={refThresholdCondition} />
            </div>
            {/* 核对配置 */}
            <div className={currentStep === 'ContrastConfig' ? '' : styles.hide}>
              <ContrastConfig store={store} setStore={setStore} ref={refContrastConfig} />
            </div>
            {/* 明细字段 */}
            <div className={currentStep === 'DetailFields' ? '' : styles.hide}>
              <DetailFields store={store} setStore={setStore} ref={refDetailFields} />
            </div>
            {/* 总体概述 */}
            <div className={currentStep === 'GeneralDesc' ? '' : styles.hide}>
              <GeneralDesc store={store} setStore={setStore} ref={refGeneralDesc} />
            </div>
            {/* 明细概述 */}
            <div className={currentStep === 'DetailDesc' ? '' : styles.hide}>
              <DetailDesc store={store} setStore={setStore} ref={refDetailDesc} />
            </div>
          </Col>
        </Row>
      </QuarkModal>
    ) : null}
    </>
  );
};
