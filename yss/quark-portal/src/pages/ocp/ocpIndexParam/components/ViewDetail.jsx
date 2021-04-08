import React, { useState, useEffect } from 'react';
import { DownOutlined } from '@ant-design/icons';
import { Input, Row, Col, Form, Collapse, DatePicker, Drawer } from 'antd';
import { indexDetail } from '@/services/targetParams';

import CombinSubService from '../service/CombinSubService';

const service = new CombinSubService();

const { Panel } = Collapse;
const ViewDetail = (props) => {
  const { currentSelect } = props;
  const [form] = Form.useForm();
  const { indexCode } = currentSelect;

  console.log('indexCode', indexCode);

  // 触发位置
  const [triggerData, setTriggerData] = useState([]);
  useEffect(() => {
    (async () => {
      const res = await service.triggerPosition(['MONITOR_EXEC_FUNCODE']);
      // console.log(res);
      setTriggerData(res.data);
    })();
  }, []);

  console.log('triggerData', triggerData);

  // 指标类型
  const [indexTypeData, setIndexTypeData] = useState([]);
  useEffect(() => {
    (async () => {
      const res = await service.portLevel(['PORT_LEVEL']);
      // console.log(res);
      setIndexTypeData(res.data);
    })();
  }, []);

  console.log('indexTypeData', indexTypeData);

  // 查看/调整-查询指标详情
  const [detailData, setDetailData] = useState([]);
  useEffect(() => {
    async function fetchData() {
      const res = await service.detail(indexCode);
      setDetailData(res.data);
    }
    fetchData();
  }, []);

  console.log('detailData', detailData);

  const formItemLayout = {
    labelCol: { span: 6 },
    wrapperCol: { span: 18 },
  };

  const styles = {
    itemModal: {
      marginBottom: '10px',
    },
  };

  useEffect(() => {
    form.resetFields();
    console.log(detailData.executeFunCodes);

    // 触发位置
    if (detailData.executeFunCodes && !`${detailData.executeFunCodes}`.includes('|')) {
      const index = triggerData.findIndex((item) => item.c_DV_CODE === detailData.executeFunCodes);
      detailData.executeFunCodes = triggerData[index].c_DV_NAME;
    } else if (detailData.executeFunCodes && `${detailData.executeFunCodes}`.includes('|')) {
      const word = detailData.executeFunCodes.split('|');
      console.log(word);
      const wordOne = [];

      word.forEach((item) => {
        const index1 = triggerData.findIndex((item1) => item1.c_DV_CODE === item);

        wordOne.push(triggerData[index1].c_DV_NAME);
      });
      const arr = new Array(wordOne);
      const arrt = arr.join('|');
      detailData.executeFunCodes = arrt;
    }

    // 指标类型
    if (detailData.portLevel && !`${detailData.portLevel}`.includes('|')) {
      const index = indexTypeData.findIndex((item) => item.c_DV_CODE === detailData.portLevel);
      detailData.portLevel = indexTypeData[index].c_DV_NAME;
    } else if (detailData.portLevel && `${detailData.portLevel}`.includes('|')) {
      const word = detailData.portLevel.split('|');
      console.log(word);
      const wordOne = [];

      word.forEach((item) => {
        const index1 = indexTypeData.findIndex((item1) => item1.c_DV_CODE === item);

        wordOne.push(indexTypeData[index1].c_DV_NAME);
      });
      const arr = new Array(wordOne);
      const arrt = arr.join('|');
      detailData.portLevel = arrt;
    }

    // 风险级别
    if (detailData.riskLevel) {
      switch (detailData.riskLevel) {
        case 'high':
          detailData.riskLevel = '高风险';
          break;
        case 'low':
          detailData.riskLevel = '低风险';
          break;
        case 'middle':
          detailData.riskLevel = '中风险';
          break;
        default:
          break;
      }
    }

    form.setFieldsValue(detailData);
  }, [detailData]);

  return (
    <div style={{ padding: '16px' }}>
      <Form colon={false} labelCol={8} form={form}>
        <h4>基本信息</h4>
        <Row gutter={[12, 12]}>
          <Col span={12}>
            <Form.Item
              {...formItemLayout}
              rules={[{ required: true, message: '请输入指标名称' }]}
              style={styles.itemModal}
              name="indexName"
              label="指标名称"
            >
              <Input disabled />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item
              {...formItemLayout}
              rules={[{ required: true, message: '请输入指标别名' }]}
              style={styles.itemModal}
              name="indexAlias"
              label="指标别名"
            >
              <Input disabled />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item
              {...formItemLayout}
              style={styles.itemModal}
              name="indexClassify"
              label="指标分类"
            >
              <Input disabled suffix={<DownOutlined />} />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item
              {...formItemLayout}
              style={styles.itemModal}
              name="executeFunCodes"
              label="触发位置"
            >
              <Input disabled suffix={<DownOutlined />} />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item
              {...formItemLayout}
              style={styles.itemModal}
              name="portLevel"
              label="指标类型"
            >
              <Input disabled suffix={<DownOutlined />} />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item
              {...formItemLayout}
              style={styles.itemModal}
              name="dataSource"
              label="来源界面"
            >
              <Input disabled suffix={<DownOutlined />} />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item
              {...formItemLayout}
              style={styles.itemModal}
              name="indexLevel"
              label="指标级别"
            >
              <Input disabled suffix={<DownOutlined />} />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item
              {...formItemLayout}
              style={styles.itemModal}
              name="parentName"
              label="父级指标"
            >
              <Input disabled suffix={<DownOutlined />} />
            </Form.Item>
          </Col>

          <Col span={12}>
            <Form.Item
              {...formItemLayout}
              style={styles.itemModal}
              name="riskLevel"
              label="风险级别"
            >
              <Input disabled suffix={<DownOutlined />} />
            </Form.Item>
          </Col>
        </Row>
        <h4>功能描述</h4>
        <Row>
          <Col span={24}>
            <Form.Item
              labelCol={{ span: 3 }}
              // wrapperCol={21}
              rules={[{ required: true, message: '请输入功能简介' }]}
              style={styles.itemModal}
              name="indexDesc"
              label="功能简介"
            >
              <Input.TextArea autoSize={{ minRows: 3, maxRows: 5 }} />
            </Form.Item>
          </Col>
        </Row>

        <Row gutter={[12, 12]}>
          <Col span={12}>
            <Form.Item
              {...formItemLayout}
              style={styles.itemModal}
              name="applyPort"
              label="适用组合"
            >
              <Input disabled />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item
              {...formItemLayout}
              style={styles.itemModal}
              name="busiScope"
              label="业务范围"
            >
              <Input disabled />
            </Form.Item>
          </Col>
        </Row>

        <Row>
          <Col span={24}>
            <Form.Item
              labelCol={{ span: 3 }}
              rules={[{ required: true, message: '请输入取数逻辑' }]}
              style={styles.itemModal}
              name="fetchLogic"
              label="取数逻辑"
            >
              <Input.TextArea autoSize={{ minRows: 3, maxRows: 5 }} />
            </Form.Item>
          </Col>
        </Row>

        <Row>
          <Col span={24}>
            <Form.Item
              labelCol={{ span: 3 }}
              rules={[{ required: true, message: '请输入监控规则' }]}
              style={styles.itemModal}
              name="monitorRule"
              label="监控规则"
            >
              <Input.TextArea autoSize={{ minRows: 3, maxRows: 5 }} />
            </Form.Item>
          </Col>
        </Row>

        <Row>
          <Col span={24}>
            <Form.Item
              labelCol={{ span: 3 }}
              style={styles.itemModal}
              name="remark"
              label="&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;备注"
            >
              <Input.TextArea />
            </Form.Item>
          </Col>
        </Row>

        {/*  隐藏字段 */}
        <div>
          <Row gutter={[12, 12]}>
            <Col span={12}>
              <Form.Item
                {...formItemLayout}
                style={styles.itemModal}
                name="requirement"
                label="&nbsp;&nbsp;&nbsp;&nbsp;提需人"
              >
                <Input disabled />
              </Form.Item>
            </Col>

            <Col span={12}>
              <Form.Item
                {...formItemLayout}
                style={styles.itemModal}
                name="requirementDate"
                label="提需日期"
              >
                <DatePicker style={{ width: '100%' }} />
              </Form.Item>
            </Col>
          </Row>
        </div>
      </Form>
    </div>
  );
};

export default ViewDetail;
