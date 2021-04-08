import React, { useState, useEffect, useRef, forwardRef, useImperativeHandle } from 'react';
import { Form, Row, Col, Input, Select, Table, Divider, Tabs } from 'antd';
import QuarkTable from '@/components/QuarkTable';
import Tipbar from '@/components/Tipbar';
import { queryIndexDictData } from '../../../services/addModalService'
import SplitPane, { Pane } from 'react-split-pane';

const { TabPane } = Tabs;

const GeneralDesc = forwardRef((props, refParam) => {
  const { store, setStore } = props;
  const { mode } = store;
  // const { $Global } = store;
  // const { sysVar } = $Global;
  const { fieldDetail } = store;

  const [form] = Form.useForm();
  const [sysDataList, setSysDataList] = useState([]);

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


  useImperativeHandle(refParam, () => ({
    // validate 就是暴露给父组件的方法
    validate:  async () => {
      let isValidate = true;
      const values =  await form.validateFields();
      if(values){
        isValidate = true;
      }

      if(isValidate){
        setStore({
          ...store,
          indexDev: {
            ...store.indexDev,
            logAbnormalDesc: form.getFieldValue("logAbnormalDesc") ,
            logNormalDesc: form.getFieldValue("logNormalDesc") ,
          },
        })
      }

      return isValidate;
    }
  }));

  useEffect(() => {
    if(mode === 'edit'){
      form.setFieldsValue({ logAbnormalDesc: store.indexDev.logAbnormalDesc, logNormalDesc: store.indexDev.logNormalDesc });
    }
  }, [store.indexDev]);

  return (
    <div>
      <SplitPane
        minSize={200}
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
                  name="logAbnormalDesc"
                  label="异常/预警描述"
                  rules={[{ required: true, message: '请输入异常/预警描述' }]}
                >
                  <Input.TextArea />
                </Form.Item>
              </Col>
              <Col span={24}>
                <Form.Item
                  {...formItemLayout}
                  style={styles.itemModal}
                  name="logNormalDesc"
                  label="正常描述"
                  rules={[{ required: true, message: '请输入正常描述' }]}
                >
                  <Input.TextArea />
                </Form.Item>
              </Col>
            </Row>
          </Form>
        </div>

        <Tabs type="card">
          <TabPane tab="系统变量" style={{ width: '100%' }} key="1">
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
          <TabPane tab="明细字段" style={{ width: '100%' }} key="2">
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
export default GeneralDesc
