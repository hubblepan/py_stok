import React, { useState, useEffect } from 'react';
import { Input, Form, Col, Row, Divider, Tabs, Select, Spin } from 'antd';
import QuarkTable from '@/components/QuarkTable';
import QuarkModal from '@/components/QuarkModal/index';
import { queryTopicSelect, queryIndexDevTopicViewPlan, queryIndexDevORCABI, queryVocDataList } from '../../services/devConfig';
import Tipbar from '@/components/Tipbar';
import queryString from 'query-string';
import AppContext from '@/utils/AppContext';
import DropDownSelect from '../TargetSetting/AddModal/DropDownSelect';
import styles from '../style.less';


const EditModal = (props) => {
  const { fromData, onCancel, modalVisible, mode, handles } = props;
  const [form] = Form.useForm();
  const { Option } = Select;
  const { TabPane } = Tabs;
  const formItemLayout = {
    labelCol: { span: 6 },
    wrapperCol: { span: 18 },
  };
  const tailLayout = {
    labelCol: { span: 3 },
    wrapperCol: { span: 21 },
  };

  function callback(key) {
    // console.log(key);
  }

  const [selectLoading, setSelectLoading] = useState(mode!=='add');
  const [modalLoading, setModalLoading] = useState(mode!=='add');
  // 主题字段的datasource
  const [dataFiled, setDataFiled] = useState([]);
  // 手工选择的数据主题option
  const [currentOpt, setCurrentOpt] = useState([]);
  // 数据主题下拉框选项
  const [opts, setOpts] = useState([]);
  // 勾选的主题字段
  const [selectedRows, setSelectedRows] = useState([]);
  const [selectedRowKeys, setSelectedRowKeys] = useState([]);
  // 主题参数
  const [dataParams, setDataParams] = useState([]);
  // 主题参数的值的下拉框
  const [vocData, setVocData] = useState([]);

  const columnsField = [
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
  ];
  const columnsParams = [
    {
      title: '参数名',
      dataIndex: 'name',
      key: 'name',
      render: (text) => <a>{text}</a>,
    },
    {
      title: '条件',
      dataIndex: 'operator',
      key: 'operator',
    },
    {
      title: '参数值',
      dataIndex: 'defaultValue',
      key: 'defaultValue',
      render: (content, row, index) => {
        return (
          <DropDownSelect
            keyValue="c_DV_CODE" // key为jsx保留字
            keyName="c_DV_CODE"
            keyTitle="c_DV_NAME"
            defaultValue={content}
            data={vocData}
            onChange={(value, option) => {
              for(let i=0; i< dataParams.length; i++){
                if(dataParams[i].name===row.name){
                  dataParams[i].defaultValue = value;
                }
              }
              setDataParams(dataParams);
              // console.log("dataParams="+dataParams);
            }}
          />
        );
      },
    },
  ];


  // 设置主题字段和主题参数
  const setDataFieldParams = async (topicCode, version, indexDevPlanFieldList, indexDevPlanParameterList) => {
    const param = {
      code: topicCode,
      version
    };
    // 查询主题相关的字段信息
    const res = await queryIndexDevORCABI(queryString.stringify(param));
    setDataFiled(res.data.fields);
    const dataParamsResult = res.data.parameters;

    if(mode === 'edit' || mode === 'copy'){
      const rowKeys = [];
      const rows = [];
      if(indexDevPlanFieldList){
        for(let i=0; i < indexDevPlanFieldList.length; i++ ){
          rowKeys.push(indexDevPlanFieldList[i].fieldCode);
          rows.push({
            name: indexDevPlanFieldList[i].fieldCode,
            alias: indexDevPlanFieldList[i].fieldName,
            type: indexDevPlanFieldList[i].fieldType,
          });

        }
      }
      setSelectedRowKeys(rowKeys);  // 进行勾选
      setSelectedRows(rows);  // 进行勾选
      if(indexDevPlanParameterList && res.data.parameters){
        for(let i=0; i < indexDevPlanParameterList.length; i++ ){
          for(let j=0; j< dataParamsResult.length; j++){
            if(dataParamsResult[j].name === indexDevPlanParameterList[i].paramCode){
              dataParamsResult[j].defaultValue = indexDevPlanParameterList[i].paramValue;
            }
          }
        }
      }
    }
    setDataParams(dataParamsResult);
    setModalLoading(false);
  }

  useEffect(() => {
    if(mode === 'add'){
      form.resetFields();
    }

    async function fetchVocDataList() {
      const param = [];
      param.push("DEV_INDEX_TOPIC_FUN");
      const res = await queryVocDataList(param);
      setVocData(res.data);
    }
    fetchVocDataList();

    // 初始化数据主题下拉框内容
    async function fetchSelectData() {
      const param = { checkState:'1' };
      const res = await queryTopicSelect(queryString.stringify(param));
      const opts1 = res.data.map((x, i) => {
        return <Option key={`${x.code}_${x.version}`} value={x.code} name={x.name} version={x.version}>{`${x.code}_${x.name}_${x.version}`}</Option>
      })
      setOpts(opts1);
      if(mode === 'edit' || mode === 'copy') {
        fetchTopicData();
      }
    }
    fetchSelectData();

    // 修改时，查询模板信息
    async function fetchTopicData() {
      const res = await queryIndexDevTopicViewPlan(fromData.topicPlanCode);
      form.setFieldsValue({'topicCodeSel' : res.data.indexDevTopicPlanPojo.topicCode});
      setCurrentOpt({
        value: res.data.indexDevTopicPlanPojo.topicCode,
        name:res.data.indexDevTopicPlanPojo.topicName,
        version: res.data.indexDevTopicPlanPojo.topicVer,
        children: `${res.data.indexDevTopicPlanPojo.topicCode}_${res.data.indexDevTopicPlanPojo.topicName}_${res.data.indexDevTopicPlanPojo.topicVer}`
      });
      setSelectLoading(false);
      setDataFieldParams(res.data.indexDevTopicPlanPojo.topicCode, res.data.indexDevTopicPlanPojo.topicVer, res.data.indexDevPlanFieldList, res.data.indexDevPlanParameterList);
    }

  }, []);


  // 保存
  const okHandle = async () => {
    const values = await form.validateFields();
    const indexDevPlanFieldLists = [];
    const indexDevPlanParameterLists = [];
    if(selectedRows){
      for(let i=0; i< selectedRows.length; i++){
        indexDevPlanFieldLists.push({
          fieldCode: selectedRows[i].name,
          fieldName: selectedRows[i].alias,
          fieldType: selectedRows[i].type,
          topicPlanCode: values.topicPlanCode,
          id: ""
        })
      }
      for(let i=0; i< dataParams.length; i++){
        indexDevPlanParameterLists.push({
          paramCode: dataParams[i].name,
          paramCondition: dataParams[i].operator,
          paramValue: dataParams[i].defaultValue,
          topicPlanCode: values.topicPlanCode,
          id: ""
        })
      }
    }
    if(mode === 'add' || mode === 'copy'){
      const addParam = {
        indexDevTopicPlanPojo: {
          topicCode: currentOpt.value,
          topicName: currentOpt.name,
          topicVer: currentOpt.version,
          topicPlanCode: values.topicPlanCode,
          topicPlanDesc: values.topicPlanDesc,
          topicPlanName: values.topicPlanName,
          topicPlanVer: null,
          TopicDisplayText: currentOpt.children,
          PlanDisplayText: `${values.topicPlanCode}_${values.topicPlanName}`,
          auditState: 0,
          operator: "",
          auditDate: null,
          modifier: AppContext.getUserCode(),
          modifyDate: null,
          id: ""
        },
        indexDevPlanFieldList: indexDevPlanFieldLists,
        indexDevPlanParameterList: indexDevPlanParameterLists
      }
      handles.save(addParam);
    }else if(mode === 'edit'){
      const editParam = {
        indexDevTopicPlanPojo: {
          topicCode: currentOpt.value,
          topicName: currentOpt.name,
          topicVer: currentOpt.version,
          topicPlanCode: values.topicPlanCode,
          topicPlanDesc: values.topicPlanDesc,
          topicPlanName: values.topicPlanName,
          topicPlanVer: null,
          TopicDisplayText: currentOpt.children,
          PlanDisplayText: `${values.topicPlanCode}_${values.topicPlanName}`,
          auditState: 0,
          operator: "",
          auditDate: null,
          modifier: AppContext.getUserCode(),
          modifyDate: null,
          id: fromData.id
        },
        indexDevPlanFieldList: indexDevPlanFieldLists,
        indexDevPlanParameterList: indexDevPlanParameterLists
      }
      handles.update({oldPlanCode: fromData.topicPlanCode, topicPlanViewPojo: editParam});
    }
    form.resetFields();
    onCancel();
  };

  // 复制
  // const copyHandle = async () => {
    // console.log(111);
  // };

  // 编辑数据到form表单
  useEffect(() => {
    form.resetFields();
  }, [fromData]);

  // 切换主题
  const changeTopic = async (value, option) => {
    // console.log(`changeTopic ${option}`);
    setModalLoading(true);
    setDataFiled([]);
    setDataParams([]);
    setCurrentOpt(option);
    if(value){
      setDataFieldParams(value, option.version);
    }
  }

  // 主题字段表格，勾选的数据
  const rowSelection = {
    onChange: (selectedRowKeys, selectedRows) => {
      setSelectedRows(selectedRows);
      setSelectedRowKeys(selectedRowKeys);
      // console.log(selectedRows,selectedRowKeys)
    },
    selectedRowKeys,
  }


  const showContent = () => {
    let res = [];
    // if( modalLoading ){
    //   res = ( <div className={styles.loading}><Spin size="large" tip="加载中 ..." /></div>);
    // }else{
      res = (
        <Form form={form} name="basic" initialValues={fromData}>
        <h4 className="h5" style={{ lineHeight: '50px' }}>
          基本信息
        </h4>
        <Row gutter={8}>
          <Col span={12}>
            <Form.Item
              {...formItemLayout}
              rules={[{ required: true, message: '请输入模板名称' }]}
              name="topicPlanName"
              label="模板名称"
            >
              <Input />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item
              {...formItemLayout}
              rules={[{ required: true, message: '请输入模板代码' }]}
              name="topicPlanCode"
              label="模板代码"
            >
              <Input />
            </Form.Item>
          </Col>
        </Row>
        <Row gutter={8}>
          <Col span={24}>
            <Form.Item
              {...tailLayout}
              label="模板描述"
              name="topicPlanDesc"
            >
            <Input.TextArea />
            </Form.Item>
          </Col>
        </Row>
        <Row>
          <Divider style={{ margin: 0, padding: 0 }} />
          <h4 className="h5" style={{ lineHeight: '50px' }}>
            主题设置
          </h4>
        </Row>
        <Row gutter={8}>
          <Col span={12}>
            <Form.Item
              {...formItemLayout}
              rules={[{ required: true, message: '请输入数据主题' }]}
              name="topicCodeSel"
              label="数据主题"
            >
              <Select loading = {selectLoading} placeholder="请选择 " allowClear={false} onChange={changeTopic}  >
                {opts}
              </Select>
            </Form.Item>
          </Col>
        </Row>

      <Tabs onChange={callback} type="card">
        <TabPane tab="主题字段" key="topicField">
          <Tipbar
            type="info"
            content="指标信息列表中就只会展示已经勾选的字段项目，不勾选则不展示该字段。"
          />
          <QuarkTable
            rowKey="name"
            loading={modalLoading}
            columns={columnsField}
            dataSource={dataFiled}
            rowSelection={rowSelection}
            scroll={{ y: 200 }} />
        </TabPane>
        <TabPane tab="主题参数" key="topicParam">
          <Tipbar
            type="info"
            content="指标信息列表中就只会展示已经勾选的字段项目，不勾选则不展示该字段。"
          />
          <QuarkTable
            rowKey="name"
            loading={modalLoading}
            rowSelection={false}
            columns={columnsParams}
            dataSource={dataParams}
            scroll={{ y: 200 }}
          />
        </TabPane>
      </Tabs>
      </Form>
      );
    // }
    return res;
  }


  return (

    <QuarkModal
      width={800}
      bodyStyle={{ paddingTop: '0' }}
      title={mode === 'add' ? '新增模板' : mode === 'edit' ? '修改模板' : '复制模板'}
      visible={modalVisible}
      onOk={okHandle}
      onCancel={onCancel}
    >
      {showContent()}
    </QuarkModal>
  );
};

export default EditModal;
