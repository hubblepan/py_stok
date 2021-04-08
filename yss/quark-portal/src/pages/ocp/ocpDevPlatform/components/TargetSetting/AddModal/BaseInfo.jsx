import React, { useState, useEffect, forwardRef, useImperativeHandle } from 'react';
import { Form, Row, Col, Input, Select, Tabs, Divider, Tooltip } from 'antd';
import QuarkTable from '@/components/QuarkTable';
import MsgBox from '@/utils/MsgBox';
import Tipbar from '@/components/Tipbar';
// import { QuestionCircleOutlined } from '@ant-design/icons';
import { queryTopicSelect, queryIndexDevTopicViewPlan, queryIndexDevORCABI, queryIndexDevTopicPlan } from '../../../services/devConfig';
import queryString from 'query-string';


const { TabPane } = Tabs;

const styles = {
  itemModal: {
    marginBottom: '10px',
  },
  detailToolbar: {
    flex: 1,
    textAlign: 'right',
  },
};


const BaseInfo = forwardRef((props, ref) => {
  const { store, setStore } = props;
  const { changeSteps } = props;
  const { mode } = store;
  // const { $Global } = store;
  // const { themeData } = $Global;

  const [form] = Form.useForm();
  const [formT1] = Form.useForm();
  const [formT2] = Form.useForm();
  const [formT3] = Form.useForm();
  const formItemLayout = {
    labelCol: { span: 6 },
    wrapperCol: { span: 18 },
  };

  const [isCombineMode, setIsCombineMode] = useState(false);
  const [prevMonitorType, setPreMonitorType] = useState(null);

  const changeMonitorType = (value) => {
    form.setFieldsValue({ monitorType: prevMonitorType });
    // 当监控类型为检查提醒类时。STEPS

    // window.event.preventDefault();
    if (prevMonitorType === 'contrast') {  // 数据核对类
      MsgBox.confirm({
        title: '温馨提示',
        content: '修改监控类型，将清空数据主题T2和T3的相关配置，是否继续？',
        okText: '确认',
        cancelText: '取消',
        onOk: async () => {
          setIsCombineMode(prevMonitorType !== 'contrast' && value === 'contrast');
          form.setFieldsValue({ monitorType: value });
          setPreMonitorType(value);
          changeSteps(value);
        },
        onCancel: async () => {
          return false;
        },
      });
    } else {
      setIsCombineMode(prevMonitorType !== 'contrast' && value === 'contrast');
      form.setFieldsValue({ monitorType: value });
      setPreMonitorType(value);
      changeSteps(value);
    }

  };


  useImperativeHandle(ref, () => ({
    // validate 就是暴露给父组件的方法
    validate:  async () => {
      let isValidate = false;
      const values =  await form.validateFields();
      if(values){
        isValidate = true;
      }

      /**
      if(form.getFieldValue('monitorType') === 'reminder' || form.getFieldValue('monitorType') === 'threshold'){
        if(formT1.getFieldValue('topicCodeSel') === undefined){
          MsgBox.warning({ message: "必须配置数据主题T1" });
          isValidate = false;
          return isValidate;
        }
      }
      // 数据核对类，选择的核对基准必须配置，并且至少配置两项
      if(form.getFieldValue('monitorType') === 'contrast'){
         const contrastBase = form.getFieldValue('contrastBase');
         for(let i=0; i<contrastBase.length; i++){
          if(contrastBase[i] === 'T1'){
            if(formT1.getFieldValue('topicCodeSel') === undefined){
              MsgBox.warning({ message: "数据主题T1为核对基准，必须配置相关主题" });
              isValidate = false;
              return isValidate;
            }
          }
          if(contrastBase[i] === 'T2'){
            if(formT2.getFieldValue('topicCodeSel') === undefined){
              MsgBox.warning({ message: "数据主题T2为核对基准，必须配置相关主题" });
              isValidate = false;
              return isValidate;
            }
          }
          if(contrastBase[i] === 'T3'){
            if(formT3.getFieldValue('topicCodeSel') === undefined){
              MsgBox.warning({ message: "数据主题T3为核对基准，必须配置相关主题" });
              isValidate = false;
              return isValidate;
            }
          }
        }

        if(formT1.getFieldValue('topicCodeSel') === undefined && formT2.getFieldValue('topicCodeSel') === undefined){
          MsgBox.warning({ message: "数据核对类，至少必须配置两个数据主题" });
          isValidate = false;
          return isValidate;
        }

        if(formT1.getFieldValue('topicCodeSel') === undefined && formT3.getFieldValue('topicCodeSel') === undefined){
          MsgBox.warning({ message: "数据核对类，至少必须配置两个数据主题" });
          isValidate = false;
          return isValidate;
        }

        if(formT2.getFieldValue('topicCodeSel') === undefined && formT3.getFieldValue('topicCodeSel') === undefined){
          MsgBox.warning({ message: "数据核对类，至少必须配置两个数据主题" });
          isValidate = false;
          return isValidate;
        }
      }
      * */


      if(isValidate){
        // setTimeout(() => {
        setStore({
          ...store,
          indexDev: {
            ...store.indexDev,
            contrastBase: form.getFieldValue('contrastBase'),
            indexCode: form.getFieldValue('indexCode'),
            indexDesc: form.getFieldValue('indexDesc'),
            indexName: form.getFieldValue('indexName'),
            monitorType: form.getFieldValue('monitorType'),
            promptingType: form.getFieldValue('promptingType'),
          },
        });
        // }, 0);
      }

      return isValidate;
    }
  }));


  useEffect(() => {

    form.setFieldsValue({ ispublic: '0', promptingType: 'warning', monitorType: 'reminder', indexCode: 'test111', indexName: "test111" });

    if(mode === 'edit'){
      form.setFieldsValue({ ispublic: store.indexDev.ispublic,
          indexCode: store.indexDev.indexCode,
          indexName: store.indexDev.indexName,
          promptingType: store.indexDev.promptingType,
          monitorType: store.indexDev.monitorType,
          contrastBase: (store.indexDev.contrastBase && typeof store.indexDev.contrastBase==='string')?(store.indexDev.contrastBase).split('|'):store.indexDev.contrastBase,
          indexDesc: store.indexDev.indexDesc
        });

      setIsCombineMode(store.indexDev.monitorType === 'contrast');
    }

  }, [store.indexDev]);


  return (
    <div style={{ padding: '20px' }}>
      <Form colon={false} labelCol={8} form={form}>
        <Row gutter={[12, 12]}>
          <Col span={12}>
            <Form.Item
              {...formItemLayout}
              rules={[{ required: true, message: '请输入指标类型' }]}
              style={styles.itemModal}
              name="ispublic"
              label="指标类型"
            >
              <Select>
                <Select.Option value="0">组合指标</Select.Option>
                <Select.Option value="1">公共指标</Select.Option>
              </Select>
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item
              {...formItemLayout}
              rules={[{ required: true, message: '请输入指标名称' }]}
              style={styles.itemModal}
              name="indexName"
              label="指标名称"
            >
              <Input  />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item
              {...formItemLayout}
              style={styles.itemModal}
              name="promptingType"
              label="提醒类型"
              rules={[{ required: true, message: '请输入提醒类型' }]}
            >
              <Select>
                <Select.Option value="warning">预警</Select.Option>
                <Select.Option value="fail">异常</Select.Option>
              </Select>
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item
              {...formItemLayout}
              style={styles.itemModal}
              name="indexCode"
              label="指标代码"
              rules={[
                { pattern: /^[a-zA-Z_]\w+$/ , message: '可有英文、数字、下划线组合而成，且不能以数字开头' },
                { required: true, message: '请输入指标代码' }
              ]}
            >
              <Input />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item
              {...formItemLayout}
              style={styles.itemModal}
              name="monitorType"
              label="监控类型"
              rules={[{ required: true, message: '请输入监控类型' }]}
            >
              <Select onChange={(value) => changeMonitorType(value)}>
                <Select.Option value="reminder">检查提醒类</Select.Option>
                <Select.Option value="threshold">监控阈值类</Select.Option>
                <Select.Option value="contrast">数据核对类</Select.Option>
              </Select>
            </Form.Item>
          </Col>
          <Col span={12}>
            {isCombineMode ? (
              <Form.Item
                {...formItemLayout}
                style={styles.itemModal}
                name="contrastBase"
                label="核对基准"
                rules={[{ required: true, message: '请输入核对基准' }]}
              >
                <Select mode="multiple" showArrow >
                  <Select.Option value="T1">数据主题T1</Select.Option>
                  <Select.Option value="T2">数据主题T2</Select.Option>
                  <Select.Option value="T3">数据主题T3</Select.Option>
                </Select>
              </Form.Item>
            ) : null}
          </Col>

          <Col span={24}>
            <Form.Item
              labelCol={{ span: 3 }}
              // wrapperCol={21}
              style={styles.itemModal}
              name="indexDesc"
              label="指标描述"
            >
              <Input.TextArea autoSize={{ minRows: 3, maxRows: 5 }} />
            </Form.Item>
          </Col>
        </Row>
      </Form>

      {/* <Divider /> */}

      <Tabs type="card">
        <TabPane tab="数据主题T1" key="T1">
          <Tipbar type="info" content="根据需要勾选启用的数据项" />
          <BaseDataTheme  themeName="T1" form={formT1} store={store} setStore={setStore} />
        </TabPane>
        {isCombineMode ? (
          <>
            <TabPane tab="数据主题T2" key="T2">
              <Tipbar type="info" content="根据需要勾选启用的数据项" />
              <BaseDataTheme  themeName="T2" form={formT2} store={store} setStore={setStore} />
            </TabPane>
            <TabPane tab="数据主题T3" key="T3">
              <Tipbar type="info" content="根据需要勾选启用的数据项" />
              <BaseDataTheme  themeName="T3" form={formT3} store={store} setStore={setStore} />
            </TabPane>
          </>
        ) : null}
      </Tabs>
    </div>
  );
});
export default BaseInfo;



// Tab基础界面
const BaseDataTheme = (props) => {
  const { themeName, form, store, setStore } = props;
  const { mode } = store;
  const { Option } = Select;
  // 数据主题下拉框选项
  const [opts, setOpts] = useState([]);
  // 数据主题下拉框选项
  const [themeDataSelects, setThemeDataSelects] = useState([]);
  // 选择的数据主题option
  const [currentOpt, setCurrentOpt] = useState([]);
  // 字段表格 数据
  const [dataSource, setDataSource] = useState([]);
  // 勾选的主题字段
  const [selectedRows, setSelectedRows] = useState([]);
  const [selectedRowKeys, setSelectedRowKeys] = useState([]);

  // 主题下拉框 loading
  const [selectLoading, setSelectLoading] = useState(true);
  // 字段表格 loading
  const [tableLoading, setTableLoading] = useState(false);
  // 模板下拉框 loading
  const [templLoading, setTemplLoading] = useState(false);
  // 数据主题参数
  const [dataParams, setDataParams] = useState([]);

  const formItemLayout = {
    labelCol: { span: 6 },
    wrapperCol: { span: 18 },
  };




  // 设置主题字段和主题参数
  const setDataFieldParams = async (topicCode, option, checkedTopicData, modifyTopicParamter) => {
    const param = {
      code: topicCode,
      version: option.version,
    };
    // 查询主题相关的字段信息
    const res = await queryIndexDevORCABI(queryString.stringify(param));
    // 虎鲸BI的主题字段
    const fields = res?.data?.fields;
    setDataSource(fields);
    // 虎鲸BI的主题参数
    const dataParamsResult = res?.data?.parameters;
    // 编辑时，根据数据修改 defaultValue
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
    setDataParams(convertParamsResult);
    setTableLoading(false);

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
      setTimeout(() => {
        setStore({
          ...store,
          topicParamterT1: convertParamsResult,
          topicT1: {
            indexCode: "",
            topicAlias: "T1",
            topicCode: option.value,
            topicData, // "C_IDEN|C_TD_TYPE|C_DV_TYPE_SUB",
            topicDataDetail,
            topicName: option.name,
            topicUrl: option.url,
            topicVer: option.version,
            id: ""
          },
        })
      }, 0);
    }else if(themeName === 'T2'){
      setTimeout(() => {
      setStore({
        ...store,
        topicParamterT2: convertParamsResult,
        topicT2: {
          indexCode: "",
          topicAlias: "T2",
          topicCode: option.value,
          topicData,
          topicDataDetail,
          topicName: option.name,
          topicUrl: option.url,
          topicVer: option.version,
          id: ""
        },
      })
      }, 0);
    }else if(themeName === 'T3'){
      setStore({
        ...store,
        topicParamterT3: convertParamsResult,
        topicT3: {
          indexCode: "",
          topicAlias: "T3",
          topicCode: option.value,
          topicData,
          topicDataDetail,
          topicName: option.name,
          topicUrl: option.url,
          topicVer: option.version,
          id: ""
        },
      })
    }

    const topicParam = {
      dataClass: "IndexDevTopicPlanPojo",	  // 数据Pojo，写死
      N_CHECK_STATE: "SearchAudit",	  // 已审核
      C_TOPIC_CODE: topicCode,	// 主题代码
      C_TOPIC_VER: option.version	 // 主题版本
    };
    // 查询模板下拉框内容信息
    const topicPlanList = await queryIndexDevTopicPlan(topicParam);
    const topicPlanListSelects = topicPlanList?.data?.dataList.map((x) => (
      <Select.Option key={x.id} value={x.topicPlanCode}>
        {`${x.topicPlanCode}_${x.topicPlanName}`}
      </Select.Option>
    ));
    setThemeDataSelects(topicPlanListSelects);
    setTemplLoading(false);

    if(mode === 'edit' || mode === 'copy'){
      const rowKeys = [];
      const rows = [];
      if(checkedTopicData && checkedTopicData !== ''){
        const arrayCheckedTopicData = checkedTopicData.split("|");
        for(let i=0; i < fields.length; i++ ){
          for(let j=0; j< arrayCheckedTopicData.length; j++){
            if(arrayCheckedTopicData[j] === fields[i].name){
              rowKeys.push(fields[i].name);
              rows.push({
                name: fields[i].name,
                alias: fields[i].name,
                type: fields[i].name,
              });
            }
          }
        }
      }
      setSelectedRowKeys(rowKeys);  // 数据主题字段 进行勾选
      setSelectedRows(rows);  // 数据主题字段 进行勾选
    }
  }

  useEffect(() => {
    async function fetchSelectData() {
      const param = { checkState:'1' };
      const res = await queryTopicSelect(queryString.stringify(param));
      const opts1 = res.data.map((x, i) => {
        return <Option key={`${x.code}_${x.version}`} value={x.code} name={x.name} version={x.version} url={x.url}>{`${x.code}_${x.name}_${x.version}`}</Option>
      })
      // opts1.splice(0,0,<Option key='0' value='' >无</Option>)
      setOpts(opts1);
      setSelectLoading(false);
    }
    fetchSelectData();

  }, []);

  useEffect(() => {
    async function fetchTopicData() {
      const topic = store?.topic.filter(function(item){
        return item.topicAlias === themeName;
      })
      const topicParamter = store?.topicParamter.filter(function(item){
        return item.topicAlias === themeName;
      })
      if(topic && topic.length===1){
        form.setFieldsValue({'topicCodeSel' : topic[0].topicCode});
        setCurrentOpt({
          value: topic[0].topicCode,
          name: topic[0].topicName,
          version: topic[0].topicVer,
          children: `${topic[0].topicCode}_${topic[0].topicName}_${topic[0].topicVer}`
        });
        setSelectLoading(false);
        const option = {
          value: topic[0].topicCode,
          name: topic[0].topicName,
          url: topic[0].topicUrl,
          version: topic[0].topicVer,
        }
        setDataFieldParams(topic[0].topicCode, option, topic[0].topicData, topicParamter);
      }
    }
    if(mode === 'edit' || mode === 'copy') {
      fetchTopicData();
    }
  }, [store.topic]);


  // 切换主题
  const changeTopic = (value, option) => {
    if(value !== undefined){
      setTableLoading(true);
      setTemplLoading(true);
      setDataSource([]);
      // 清空 选择的模板
      form.setFieldsValue({'themeModel' : ''});
      // 清空 字段勾选
      setSelectedRowKeys([]);
      setSelectedRows([]);
      setCurrentOpt(option);
      if(value){
        setDataFieldParams(value, option);
      }
    }
  }


  // 清空主题
  const onClearTopic = (value, option) => {
    // content: '清空数据主题，将清空主题相关设置并禁用后续步骤，是否继续？',
    setTableLoading(false);
    setTemplLoading(false);
    setDataSource([]);
    // 清空 选择的模板
    form.setFieldsValue({'themeModel' : ''});
    // 清空 字段勾选
    setSelectedRowKeys([]);
    setSelectedRows([]);
    setCurrentOpt({});
    setDataParams([]);
    if(themeName === 'T1'){
      setStore({
        ...store,
        topicParamterT1: [],
        topicT1: null,
      })
    }
    if(themeName === 'T2'){
      setStore({
        ...store,
        topicParamterT2: [],
        topicT2: null,
      })
    }
    if(themeName === 'T3'){
      setStore({
        ...store,
        topicParamterT3: [],
        topicT3: null,
      })
    }
  }


  // 主题字段表格，勾选的数据
  const rowSelection = {
    onChange: (selectedRowKeys, selectedRows) => {
      setSelectedRows(selectedRows);
      setSelectedRowKeys(selectedRowKeys);

      let topicData = "";
      const topicDataDetail = [];
      for(let i=0; i < selectedRows.length; i++ ){
        topicData = `${topicData + selectedRows[i].name  }|`;
        topicDataDetail.push({name: `${selectedRows[i].name }`, code: selectedRows[i].name, colType: selectedRows[i].type})
      }
      if(topicData !== ''){
        topicData = topicData.substring(0, topicData.lastIndexOf('|'))
      }
      if(themeName === 'T1'){
        setStore({
          ...store,
          topicT1: {
            ...store.topicT1,
            topicData,
            topicDataDetail,
          },
        })
      }
      if(themeName === 'T2'){
        setStore({
          ...store,
          topicT2: {
            ...store.topicT2,
            topicData,
            topicDataDetail,
          },
        })
      }
      if(themeName === 'T3'){
        setStore({
          ...store,
          topicT3: {
            ...store.topicT3,
            topicData,
            topicDataDetail,
          },
        })
      }

    },
    selectedRowKeys,
  }


  // 切换模板
  const changeTempl = async (value, option) => {
    const res = await queryIndexDevTopicViewPlan(value);
    const indexDevPlanFieldList = res?.data?.indexDevPlanFieldList;
    const indexDevPlanParameterList = res?.data?.indexDevPlanParameterList;
    const rowKeys = [];
    const rows = [];
    let topicData = "";
    const topicDataDetail = [];
    if(indexDevPlanFieldList){
      for(let i=0; i < indexDevPlanFieldList.length; i++ ){
        rowKeys.push(indexDevPlanFieldList[i].fieldCode);
        rows.push({
          name: indexDevPlanFieldList[i].fieldCode,
          alias: indexDevPlanFieldList[i].fieldName,
          type: indexDevPlanFieldList[i].fieldType,
        });
        topicData = `${topicData + indexDevPlanFieldList[i].fieldCode  }|`;
        topicDataDetail.push({name: `${indexDevPlanFieldList[i].fieldCode}`, code: indexDevPlanFieldList[i].fieldCode, colType: indexDevPlanFieldList[i].fieldType})
      }
    }
    setSelectedRowKeys(rowKeys);  // 进行勾选
    setSelectedRows(rows);  // 进行勾选

    // 修改主题参数
    if(indexDevPlanParameterList && dataParams){
      for(let i=0; i < indexDevPlanParameterList.length; i++ ){
        for(let j=0; j< dataParams.length; j++){
          if(dataParams[j].paramCode === indexDevPlanParameterList[i].paramCode){
            dataParams[j].paramValue = indexDevPlanParameterList[i].paramValue;
          }
        }
      }
    }
    setDataParams(dataParams);

    if(topicData !== ''){
      topicData = topicData.substring(0, topicData.lastIndexOf('|'))
    }
    if(themeName === 'T1'){
      setStore({
        ...store,
        topicParamterT1: dataParams,
        topicT1: {
          ...store.topicT1,
          topicData, // "C_IDEN|C_TD_TYPE|C_DV_TYPE_SUB",
          topicDataDetail,
        },
      })
    }
    if(themeName === 'T2'){
      setStore({
        ...store,
        topicParamterT2: dataParams,
        topicT2: {
          ...store.topicT2,
          topicData,
          topicDataDetail,
        },
      })
    }
    if(themeName === 'T3'){
      setStore({
        ...store,
        topicParamterT3: dataParams,
        topicT3: {
          ...store.topicT3,
          topicData,
          topicDataDetail,
        },
      })
    }

  }

  return (
    <>
      <Form form={form} >
        <Row>
          <Col span={12}>
            <Form.Item
              {...formItemLayout}
              style={styles.itemModal}
              name="topicCodeSel"
              label="数据主题"
              // rules={[{ required: true, message: '请输入数据主题' }]}
            >
              <Select loading = {selectLoading} placeholder="请选择 " allowClear onChange={changeTopic} onClear={onClearTopic}>
                {opts}
              </Select>
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item {...formItemLayout} style={styles.itemModal} name="themeModel" label="主题模板">
              <Select loading = {templLoading} allowClear={false} onChange={changeTempl}  >
                {themeDataSelects}
              </Select>
            </Form.Item>
          </Col>
        </Row>
      </Form>
      <Row>
        <QuarkTable
          style={{ width: '100%' }}
          loading={tableLoading}
          size="small"
          rowKey="name"
          rowSelection={rowSelection}
          dataSource={dataSource}
          columns={[
            {
              title: '字段',
              dataIndex: 'name',
              key: 'name',
              render: (text) => <a>{text}</a>,
            },
            {
              title: '类型',
              dataIndex: 'type',
              key: 'type',
            },
            {
              title: '别名',
              dataIndex: 'alias',
              key: 'alias',
            },
          ]}
          scroll={{ x: 'max-content' }}
        />
      </Row>
    </>
  );
};
