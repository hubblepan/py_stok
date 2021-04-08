import React, { useState, useEffect } from 'react';
import { Drawer, Form, Input, Row, Col } from 'antd';
import { CaretDownOutlined, CaretRightOutlined } from '@ant-design/icons';
import QuarkTable from '@/components/QuarkTable';
import { mailDetailData } from '@/services/resultNotice';
import styles from './style.less';

const SchemeConfirm = () => {
  const [form] = Form.useForm();
  const formItemLayout = {
    labelCol: { span: 6 },
    wrapperCol: { span: 18 },
  };

  const columns = [
    {
      title: '指标名称',
      dataIndex: 'indexName',
    },
    {
      title: '风险级别',
      dataIndex: 'riskLevel',
    },
    {
      title: '监控状态',
      dataIndex: 'monitorState',
    },
  ];

  const [tableData, setTableData] = useState([]);
  useEffect(() => {
    async function fetchData() {
      const result = await mailDetailData();
      setTableData(result.data.list);
    }
    fetchData();
  }, []);

  return (
    <>
      <div className={styles.panel}>
        <Form colon={false} labelCol={8} form={form} name="basic">
          <Row>
            <Col span={24}>
              <Form.Item
                // labelCol={{ span: 3 }}
                style={styles.itemModal}
                label="触发场景"
                name="triggerScene"
              >
                456
              </Form.Item>
            </Col>
          </Row>
          <Row>
            <Col span={12}>
              <Form.Item
                // {...formItemLayout}
                label="渠道类型"
                name="channelType"
                style={styles.itemModal}
              >
                45667
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                // {...formItemLayout}
                style={styles.itemModal}
                label="压缩服务"
                name="zipService"
              >
                576657
              </Form.Item>
            </Col>
          </Row>
          <Row>
            <Col span={12}>
              <Form.Item
                // {...formItemLayout}
                label="附件无数据发送邮件"
                name="noDataSendMail"
                style={styles.itemModal}
              >
                45667
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                // {...formItemLayout}
                style={styles.itemModal}
                label="有效日期"
                name="effectDate"
              >
                576657
              </Form.Item>
            </Col>
          </Row>

          <h4>触发指标</h4>
          <QuarkTable
            columns={columns}
            dataSource={tableData}
            rowSelection={false}
            expandable={{
              defaultExpandAllRows: true,
              expandIcon: ({ expanded, onExpand, record }) => {
                if (record.isLeaf) {
                  return null;
                }
                return expanded ? (
                  <CaretDownOutlined
                    style={{ marginRight: '8px' }}
                    onClick={(e) => onExpand(record, e)}
                  />
                ) : (
                  <CaretRightOutlined
                    style={{ marginRight: '8px' }}
                    onClick={(e) => onExpand(record, e)}
                  />
                );
              },
            }}
          />
        </Form>
      </div>
    </>
  );
};

export default SchemeConfirm;
