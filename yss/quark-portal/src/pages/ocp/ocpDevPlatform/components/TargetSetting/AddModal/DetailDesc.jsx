import React, { useState, useEffect, useRef, forwardRef, useImperativeHandle } from 'react';
import { Form, Row, Col, Input, Select, Table, Divider, Tabs } from 'antd';
import QuarkTable from '@/components/QuarkTable';
import Tipbar from '@/components/Tipbar';
import { queryIndexDictData, saveIndexDev, updateIndexDev } from '../../../services/addModalService';
import MsgBox from '@/utils/MsgBox';
import SplitPane, { Pane } from 'react-split-pane';
import AppContext from '@/utils/AppContext';

const { TabPane } = Tabs;

const DetailDesc = forwardRef((props, refParam) => {
  const { store, setStore } = props;
  const { mode } = store;
  const { fieldDetail } = store;

  const [sysDataList, setSysDataList] = useState([]);

  const [form] = Form.useForm();

  const direction = 'horizontal';
  const paneStyle = { overflow: 'auto', padding: '20px' };

  const styles = {
    itemModal: {
      marginBottom: '10px',
    },

    detailToolbar: {
      flex: 1,
      textAlign: 'right',
    },
  };

  const formItemLayout = {
    labelCol: { span: 4 },
    wrapperCol: { span: 20 },
  };

  useEffect(() => {
    async function fetchSysDataList() {
      const res = await queryIndexDictData();  // 系统变量
      setSysDataList(res?.data);
    }
    fetchSysDataList();
  }, []);

  useEffect(() => {
    if(mode === 'edit'){
      form.setFieldsValue({ detailLogAbnormalDesc: store.indexDev.detailLogAbnormalDesc });
    }
  }, [store.indexDev]);


  useImperativeHandle(refParam, () => ({
    // validate 就是暴露给父组件的方法
    validate:  async () => {
      let isValidate = true;
      const values =  await form.validateFields();
      if(values){
        isValidate = true;
      }

      if(isValidate){

        let dataTopicDisplayText = "";
        // 主题信息
        const topic = [];
        if(store.topicT1){
          topic.push({
            indexCode: store.indexDev.indexCode,
            topicAlias: "T1",
            topicCode: store.topicT1.topicCode,
            topicData: store.topicT1.topicData,
            topicName: store.topicT1.topicName,
            topicUrl: store.topicT1.topicUrl,
            topicVer: store.topicT1.topicVer,
            id: ""
          })
          dataTopicDisplayText = `${dataTopicDisplayText  }${store.topicT1.topicCode}_${store.topicT1.topicName}_${store.topicT1.topicVer},`;
        }
        if(store.topicT2){
          topic.push({
            indexCode: store.indexDev.indexCode,
            topicAlias: "T2",
            topicCode: store.topicT2.topicCode,
            topicData: store.topicT2.topicData,
            topicName: store.topicT2.topicName,
            topicUrl: store.topicT2.topicUrl,
            topicVer: store.topicT2.topicVer,
            id: ""
          })
          dataTopicDisplayText = `${dataTopicDisplayText  }${store.topicT2.topicCode}_${store.topicT2.topicName}_${store.topicT2.topicVer},`;
        }
        if(store.topicT3){
          topic.push({
            indexCode: store.indexDev.indexCode,
            topicAlias: "T3",
            topicCode: store.topicT3.topicCode,
            topicData: store.topicT3.topicData,
            topicName: store.topicT3.topicName,
            topicUrl: store.topicT3.topicUrl,
            topicVer: store.topicT3.topicVer,
            id: ""
          })
          dataTopicDisplayText = `${dataTopicDisplayText  }${store.topicT3.topicCode}_${store.topicT3.topicName}_${store.topicT3.topicVer},`;
        }

        //  去除最后一个,逗号
        dataTopicDisplayText = dataTopicDisplayText.substr(0, dataTopicDisplayText.length-1);

        // 基本信息
        const indexDev = {
          contrastBase: store.indexDev.contrastBase?(store.indexDev.contrastBase).join('|'):null,
          deployTime: store.indexDev.deployTime,
          detailLogAbnormalDesc: form.getFieldValue("detailLogAbnormalDesc"),
          fileName: store.indexDev.fileName,
          indexCode: store.indexDev.indexCode,
          indexDesc: store.indexDev.indexDesc,
          indexName: store.indexDev.indexName,
          ispublic: store.indexDev.ispublic,
          logAbnormalDesc: store.indexDev.logAbnormalDesc,
          logNormalDesc: store.indexDev.logNormalDesc,
          monitorType: store.indexDev.monitorType,
          promptingType: store.indexDev.promptingType,
          dataTopicDisplayText,
          auditState: store.indexDev.auditState,
          operator: "",
          auditDate: null,
          modifier: AppContext.getUserCode(),
          modifyDate: "",
          id: store.indexDev.id,
      };

        // 主题参数
        const topicParamter = [];
        if(store.topicParamterT1){
          for(let i=0; i<store.topicParamterT1.length; i++){
            topicParamter.push({
              indexCode: store.indexDev.indexCode,
              paramCode: store.topicParamterT1[i].paramCode,
              paramCondition: store.topicParamterT1[i].paramCondition,
              paramValue: store.topicParamterT1[i].paramValue,
              paramType: store.topicParamterT1[i].paramType,
              paramClass: "base",
              topicAlias: "T1",
              id: ""
            });
          }
        }
        if(store.topicParamterT2){
          for(let i=0; i<store.topicParamterT2.length; i++){
            topicParamter.push({
              indexCode: store.indexDev.indexCode,
              paramCode: store.topicParamterT2[i].paramCode,
              paramCondition: store.topicParamterT2[i].paramCondition,
              paramValue: store.topicParamterT2[i].paramValue,
              paramType: store.topicParamterT2[i].paramType,
              paramClass: "base",
              topicAlias: "T2",
              id: ""
            });
          }
        }
        if(store.topicParamterT3){
          for(let i=0; i<store.topicParamterT3.length; i++){
            topicParamter.push({
              indexCode: store.indexDev.indexCode,
              paramCode: store.topicParamterT3[i].paramCode,
              paramCondition: store.topicParamterT3[i].paramCondition,
              paramValue: store.topicParamterT3[i].paramValue,
              paramType: store.topicParamterT3[i].paramType,
              paramClass: "base",
              topicAlias: "T3",
              id: ""
            });
          }
        }
        // 主题扩展参数
        if(store.topicParamterExtendT1){
          for(let i=0; i<store.topicParamterExtendT1.length; i++){
            topicParamter.push({
              indexCode: store.indexDev.indexCode,
              paramCode: store.topicParamterExtendT1[i].paramCode,
              paramCondition: store.topicParamterExtendT1[i].paramCondition,
              paramValue: store.topicParamterExtendT1[i].paramValue,
              paramType: store.topicParamterExtendT1[i].paramType,
              paramClass: "extend",
              topicAlias: "T1",
              id: ""
            });
          }
        }
        if(store.topicParamterExtendT2){
          for(let i=0; i<store.topicParamterExtendT2.length; i++){
            topicParamter.push({
              indexCode: store.indexDev.indexCode,
              paramCode: store.topicParamterExtendT2[i].paramCode,
              paramCondition: store.topicParamterExtendT2[i].paramCondition,
              paramValue: store.topicParamterExtendT2[i].paramValue,
              paramType: store.topicParamterExtendT2[i].paramType,
              paramClass: "extend",
              topicAlias: "T2",
              id: ""
            });
          }
        }
        if(store.topicParamterExtendT3){
          for(let i=0; i<store.topicParamterExtendT3.length; i++){
            topicParamter.push({
              indexCode: store.indexDev.indexCode,
              paramCode: store.topicParamterExtendT3[i].paramCode,
              paramCondition: store.topicParamterExtendT3[i].paramCondition,
              paramValue: store.topicParamterExtendT3[i].paramValue,
              paramType: store.topicParamterExtendT3[i].paramType,
              paramClass: "extend",
              topicAlias: "T3",
              id: ""
            });
          }
        }

        // 检查条件
        const checkCondition = [];
        if(store.checkConditionT1){
          for(let i=0; i<store.checkConditionT1.length; i++){
            checkCondition.push({
              conditionCode: store.checkConditionT1[i].conditionCode,
              conditionRela: store.checkConditionT1[i].conditionRela?store.checkConditionT1[i].conditionRela:"",
              conditionValue: store.checkConditionT1[i].conditionValue,
              indexCode: store.indexDev.indexCode,
              paramCode: store.checkConditionT1[i].paramCode,
              paramType: store.checkConditionT1[i].paramType,
              conditionOrder: i+1,
              topicAlias: "T1",
              id: ""
            });
          }
        }
        if(store.checkConditionT2){
          for(let i=0; i<store.checkConditionT2.length; i++){
            checkCondition.push({
              conditionCode: store.checkConditionT2[i].conditionCode,
              conditionRela: store.checkConditionT2[i].conditionRela?store.checkConditionT2[i].conditionRela:"",
              conditionValue: store.checkConditionT2[i].conditionValue,
              indexCode: store.indexDev.indexCode,
              paramCode: store.checkConditionT2[i].paramCode,
              paramType: store.checkConditionT2[i].paramType,
              conditionOrder: i+1,
              topicAlias: "T2",
              id: ""
            });
          }
        }
        if(store.checkConditionT3){
          for(let i=0; i<store.checkConditionT3.length; i++){
            checkCondition.push({
              conditionCode: store.checkConditionT3[i].conditionCode,
              conditionRela: store.checkConditionT3[i].conditionRela?store.checkConditionT3[i].conditionRela:"",
              conditionValue: store.checkConditionT3[i].conditionValue,
              indexCode: store.indexDev.indexCode,
              paramCode: store.checkConditionT3[i].paramCode,
              paramType: store.checkConditionT3[i].paramType,
              conditionOrder: i+1,
              topicAlias: "T3",
              id: ""
            });
          }
        }

        // 指标参数
        const indexParamter = [];
        if(store.indexParamter){
          for(let i=0; i<store.indexParamter.length; i++){
            indexParamter.push({
              conditionRela: store.indexParamter[i].conditionRela?store.indexParamter[i].conditionRela:"",
              indexCode: store.indexDev.indexCode,
              paramCodeT1: store.indexParamter[i].paramCodeT1,
              paramCodeT2: store.indexParamter[i].paramCodeT2,
              paramCodeT3: store.indexParamter[i].paramCodeT3,
              paramTypeT1: store.indexParamter[i].paramTypeT1,
              paramTypeT2: store.indexParamter[i].paramTypeT2,
              paramTypeT3: store.indexParamter[i].paramTypeT3,
              paramCondition: (store.indexParamter[i].paramCondition).join("|"),
              paramDesc: store.indexParamter[i].paramDesc,
              paramName: store.indexParamter[i].paramName,
              paramValue: store.indexParamter[i].paramValue,
              sourceServiceCode: store.indexParamter[i].sourceServiceCode,
              sourceType: store.indexParamter[i].sourceType,
              conditionOrder: i+1,
              id: ""
            });
          }
        }


        // 明细字段
        const fieldDetailAll = [];
        if(store.fieldDetail){
          for(let i=0; i<store.fieldDetail.length; i++){
            fieldDetailAll.push({
              colCode: store.fieldDetail[i].colCode,
              colName: store.fieldDetail[i].colName,
              indexCode: store.indexDev.indexCode,
              isexceptions: store.fieldDetail[i].isexceptions,
              isservice: "0",
              isthousandth: store.fieldDetail[i].isthousandth,
              serviceCode: store.fieldDetail[i].serviceCode,
              colType: store.fieldDetail[i].colType,
              topicAlias: store.fieldDetail[i].topicAlias,
              id: ""
            });
          }
        }

        const thresholdCondition = [];
        if(store.thresholdCondition){
          for(let i=0; i<store.thresholdCondition.length; i++){
            thresholdCondition.push({
              conditionRela: store.thresholdCondition[i].conditionRela,
              indexCode: store.indexDev.indexCode,
              paramCode: store.thresholdCondition[i].paramCode,
              paramCondition: (store.thresholdCondition[i].paramCondition).join('|'),
              paramDesc: store.thresholdCondition[i].paramDesc,
              paramName: store.thresholdCondition[i].paramName,
              paramType: store.thresholdCondition[i].paramType,
              paramValue: store.thresholdCondition[i].paramValue,
              id: ""
            });
          }
        }


        const saveData = {
          indexDev,
          topic,
          topicParamter,
          checkCondition,
          indexParamter,
          thresholdCondition,
          contrastConfig: store.contrastConfig,
          fieldDetail: fieldDetailAll,
        };


        console.log(`saveData==${JSON.stringify(saveData)}`);

        if(mode === 'add'){
          const ret = await saveIndexDev(saveData);
          if(ret.success){
            MsgBox.success({ message: '新建指标成功' });
            // this.requery({ event });
          }else{
            isValidate = false;
            MsgBox.error({ message: ret.message });
          }
        }

        if(mode === 'edit'){
          const ret = await updateIndexDev({indexDevViewPojo:saveData, oldIndexCode: store.oldIndexCode});
          if(ret.success){
            MsgBox.success({ message: '更新指标成功' });
            // this.requery({ event });
          }else{
            isValidate = false;
            MsgBox.error({ message: ret.message });
          }
        }

      }

      return isValidate;
    }
  }));

  return (
    <div>
      <SplitPane
        minSize={130}
        // maxSize={'100%'}
        split={direction}
        paneStyle={paneStyle}
        style={{ height: 550 }}
      >
        <div style={{ width: '100%' }}>
          <Tipbar type="info" content="配置描述模版时，系统变量用$（变量代码）代替" />

          <Form colon={false} labelCol={8} form={form}>
            <Row gutter={[12, 12]}>
              <Col span={24}>
                <Form.Item
                  {...formItemLayout}
                  style={styles.itemModal}
                  name="detailLogAbnormalDesc"
                  label="异常/预警描述"
                  rules={[{ required: true, message: '请输入异常/预警描述' }]}
                >
                  <Input.TextArea />
                </Form.Item>
              </Col>
            </Row>
          </Form>
        </div>

        <Tabs type="card">
          <TabPane style={{ width: '100%' }} tab="系统变量" key="1">
            <QuarkTable
              style={{ width: '100%' }}
              // loading={true}
              rowSelection={false}
              dataSource={sysDataList}
              columns={[
                {
                  title: '变量代码',
                  dataIndex: 'varCode',
                },
                {
                  title: '变量名称',
                  dataIndex: 'varName',
                },
                {
                  title: '数据类型',
                  dataIndex: 'varDataType',
                },
              ]}
              scroll={{ x: 'max-content' }}
            />
          </TabPane>
          <TabPane style={{ width: '100%' }}  tab="明细字段" key="2">
            <QuarkTable
              style={{ width: '100%' }}
              // loading={true}
              rowSelection={false}
              dataSource={fieldDetail}
              columns={[
                {
                  title: '字段代码',
                  dataIndex: 'colCode',
                },
                {
                  title: '字段名称',
                  dataIndex: 'colName',
                },
                {
                  title: '数据类型',
                  dataIndex: 'colType',
                },
              ]}
              scroll={{ x: 'max-content' }}
            />
          </TabPane>
        </Tabs>
      </SplitPane>
    </div>
  );
});
export default DetailDesc;
