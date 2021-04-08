import React, { useState, useEffect, createContext } from 'react';
import { Drawer, Input, Form, Col, Row, Divider, Tabs, Select, Button } from 'antd';
import { useModel } from 'umi';
import QuarkTable from '@/components/QuarkTable';
import { queryTopicSelect, queryIndexDevTopicViewPlan, queryIndexDevORCABI, queryVocDataList } from '../../services/devConfig';
import Tipbar from '@/components/Tipbar';
import queryString from 'query-string';
import AppContext from '@/utils/AppContext';
import DropDownSelect from '../TargetSetting/AddModal/DropDownSelect';
import styles from '../style.less';


const ViewDetail = (props) => {
  const { fromData, detailData, setViewDetailVisible, viewDetailVisible, formStatus } = props;
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

  const [selectLoading, setSelectLoading] = useState(true);
  const [modalLoading, setModalLoading] = useState(true);
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

    if(true){
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
      if(true) {
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


  // 编辑数据到form表单
  useEffect(() => {
    form.resetFields();
  }, [fromData]);

  // 切换主题
  const changeTopic = async (value, option) => {
    // console.log(`changeTopic ${option}`);
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
    getCheckboxProps: record => ({
      disabled: true,
    }),
  }

  return (
    <>
      <Drawer
        title="主题模板详情"
        width={700}
        placement="right"
        closable={false}
        onClose={() => {
          setViewDetailVisible(false);
        }}
        // initialValues={detailData} 暂时注释
        visible={viewDetailVisible}
        getContainer={false}
        style={{ position: 'absolute', overflow: 'hidden' }}
      >
        <Form form={form} name="basic" initialValues={detailData} >
          <h4 className="h5" style={{ lineHeight: '50px' }}>
            基本信息
          </h4>
          {/* 隐藏 */}
          <Form.Item style={{ display: 'none' }} {...formItemLayout} name="id" label="id">
            <Input disabled />
          </Form.Item>

          <Row gutter={[12, 12]}>
            <Col span={12}>
              <Form.Item
                {...formItemLayout}
                rules={[{ required: true, message: '请输入模板名称' }]}
                name="topicPlanName"
                label="模板名称"
              >
                <Input disabled={!formStatus} />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                {...formItemLayout}
                rules={[{ required: true, message: '请输入模板代码' }]}
                name="topicPlanCode"
                label="模板代码"
              >
                <Input disabled={!formStatus} />
              </Form.Item>
            </Col>
          </Row>
          <Form.Item
            {...tailLayout}
            label="模板描述"
            name="topicPlanDesc"
          >
            <Input.TextArea disabled={!formStatus} />
          </Form.Item>
          <Divider style={{ margin: 0, padding: 0 }} />
          <h4 className="h5" style={{ lineHeight: '50px' }}>
            主题设置
          </h4>
          <Row gutter={[12, 12]}>
            <Col span={12}>
              <Form.Item
                {...formItemLayout}
                rules={[{ required: true, message: '请输入数据主题' }]}
                name="topicCodeSel"
                label="数据主题"
              >
                <Select
                  placeholder=" "
                  loading = {selectLoading}
                  allowClear
                  disabled= 'false'
                  onChange={changeTopic}
                >
                  {opts}
                </Select>
              </Form.Item>
            </Col>
          </Row>
        </Form>
        <Tabs onChange={callback} type="card">
          <TabPane tab="主题字段" key="topicField">
            <Tipbar
              type="info"
              content="指标信息列表中就只会展示已经勾选的字段项目，不勾选则不展示该字段。"
            />
            <QuarkTable
              rowKey="name"
              loading={modalLoading}
              rowSelection={rowSelection}
              columns={columnsField}
              dataSource={dataFiled}
            />
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
            />
          </TabPane>
        </Tabs>
      </Drawer>
    </>
  );
};
export default ViewDetail;
