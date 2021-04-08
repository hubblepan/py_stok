import React, { useEffect, useState } from 'react';
import { Col, Collapse, DatePicker, Drawer, Form, Input, Row, Spin } from 'antd';
import { DoubleRightOutlined } from '@ant-design/icons';
import moment from 'moment';
import request from '@/utils/request';
import { useModel } from 'umi';

const { Panel } = Collapse;

const TargetDetailDrawer = (props) => {
  const { targetVisible, setTargetVisible, mode = 'detail', id, handles, model } = props;
  // const model = useModel('ocp.monitorLogSummary.sub');
  const { formData, setFormData, formLoading, setFormLoading } = handles;

  const [panelHeader, setPanelHeader] = useState('收起更多信息');
  const onClose = () => {
    setTargetVisible(false);
  };
  const [form] = Form.useForm();

  useEffect(() => {
    if (targetVisible) {
      setFormLoading(true);
      const { service } = handles;
      service
        .detail(id)
        .then((response) => {
          setFormLoading(false);
          console.log('response.data.list');
          console.log(response.data.list);
          setFormData(response.data.list);
        })
        .catch(() => {
          setFormLoading(false);
        });
    }
  }, [targetVisible]);
  useEffect(() => {
    console.log('formData');
    console.log(formData);
    // DatePicker必须接收一个moment对象
    if (formData) {
      formData.requirementDate = moment(formData.requirementDate);
      form.setFieldsValue(formData);
    }
  }, [formData]);
  // 表单域配置：详情detail全部置灰，新增add全部激活，edit写在此处下面
  const readonlyForm = {
    detail: {
      indexName: true,
      indexAlias: true,
      indexClassify: true,
      triggerPosition: true,
      indexType: true,
      dataSource: true,
      indexLevel: true,
      indexParent: true,
      riskLevel: true,
      description: true,
      applyPort: true,
      busiScope: true,
      fetchLogic: true,
      monitorRule: true,
      comment: true,
      requirement: true,
      requirementDate: true,
    },
  };
  const styles = {
    itemStyle: {
      marginBottom: '10px',
    },
    // deitalToolbarWrap: {
    //   display: mode === 'detail' ? 'block' : 'none',
    // },
    detailToolbar: {
      flex: 1,
      textAlign: 'right',
    },
  };

  return (
    <Drawer
      title="指标详情"
      placement="right"
      onClose={onClose}
      visible={targetVisible}
      getContainer={false}
      width={800}
      style={{ position: 'absolute', overflow: 'hidden' }}
      destroyOnClose
    >
      <Spin spinning={formLoading} delay={500}>
        <Form colon={false} form={form} labelCol={{ flex: '0 0 80px' }}>
          {/* <h4>基本信息</h4> */}
          <Row gutter={[12, 12]}>
            <Col span={12}>
              <Form.Item label="基本信息" style={styles.itemStyle}>
                {null}
                {/* <Button type="primary" onClick={validate}> */}
                {/*  aaa */}
                {/* </Button> */}
              </Form.Item>
            </Col>
          </Row>
          <Row gutter={[12, 12]}>
            <Col span={12}>
              <Form.Item name="indexName" label="指标名称" style={styles.itemStyle}>
                <Input disabled={readonlyForm[mode].indexName} />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item name="indexAlias" label="指标别名" style={styles.itemStyle}>
                <Input disabled={readonlyForm[mode].indexAlias} />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item name="indexClassify" label="指标分类" style={styles.itemStyle}>
                <Input disabled={readonlyForm[mode].indexClassify} />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item name="triggerPosition" label="触发位置" style={styles.itemStyle}>
                <Input disabled={readonlyForm[mode].triggerPosition} />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item name="indexType" label="指标类型" style={styles.itemStyle}>
                <Input disabled={readonlyForm[mode].indexType} />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item name="dataSource" label="来源界面" style={styles.itemStyle}>
                <Input disabled={readonlyForm[mode].dataSource} />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item name="indexLevel" label="指标级别" style={styles.itemStyle}>
                <Input disabled={readonlyForm[mode].indexLevel} />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item name="indexParent" label="父级指标" style={styles.itemStyle}>
                <Input disabled={readonlyForm[mode].indexParent} />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item name="riskLevel" label="风险级别" style={styles.itemStyle}>
                <Input disabled={readonlyForm[mode].riskLevel} />
              </Form.Item>
            </Col>
          </Row>

          <Row>
            <Col span={24}>
              <Form.Item name="description" label="功能简介" style={styles.itemStyle}>
                <Input.TextArea
                  disabled={readonlyForm[mode].description}
                  autoSize={{ minRows: 3, maxRows: 5 }}
                />
              </Form.Item>
            </Col>
          </Row>

          <Collapse
            bordered={false}
            defaultActiveKey={['1']}
            expandIcon={({ isActive }) => <DoubleRightOutlined rotate={isActive ? 90 : 0} />}
            onChange={(activeKey) => {
              setPanelHeader(activeKey.length ? '收起更多信息' : '展开更多信息');
            }}
          >
            <Panel key="1" header={panelHeader}>
              <Row gutter={[12, 12]}>
                <Col span={12}>
                  <Form.Item name="applyPort" label="适用组合" style={styles.itemStyle}>
                    <Input disabled={readonlyForm[mode].applyPort} />
                  </Form.Item>
                </Col>
                <Col span={12}>
                  <Form.Item name="busiScope" label="业务范围" style={styles.itemStyle}>
                    <Input disabled={readonlyForm[mode].busiScope} />
                  </Form.Item>
                </Col>
              </Row>
              <Row>
                <Col span={24}>
                  <Form.Item name="fetchLogic" label="取数逻辑" style={styles.itemStyle}>
                    <Input.TextArea
                      disabled={readonlyForm[mode].fetchLogic}
                      autoSize={{ minRows: 3, maxRows: 5 }}
                    />
                  </Form.Item>
                </Col>
              </Row>
              <Row>
                <Col span={24}>
                  <Form.Item name="monitorRule" label="监控规则" style={styles.itemStyle}>
                    <Input.TextArea
                      disabled={readonlyForm[mode].monitorRule}
                      autoSize={{ minRows: 3, maxRows: 5 }}
                    />
                  </Form.Item>
                </Col>
              </Row>
              <Row>
                <Col span={24}>
                  <Form.Item name="comment" label="备注" style={styles.itemStyle}>
                    <Input.TextArea disabled={readonlyForm[mode].comment} />
                  </Form.Item>
                </Col>
              </Row>
              <Row gutter={[12, 12]}>
                <Col span={12}>
                  <Form.Item name="requirement" label="提需人" style={styles.itemStyle}>
                    <Input disabled={readonlyForm[mode].requirement} />
                  </Form.Item>
                </Col>
                <Col span={12}>
                  <Form.Item name="requirementDate" label="提需日期" style={styles.itemStyle}>
                    <DatePicker
                      format="YYYY-MM-DD"
                      disabled={readonlyForm[mode].requirementDate}
                      style={{ width: '100%' }}
                    />
                  </Form.Item>
                </Col>
              </Row>
            </Panel>
          </Collapse>
        </Form>
      </Spin>
    </Drawer>
  );
};
export default TargetDetailDrawer;
