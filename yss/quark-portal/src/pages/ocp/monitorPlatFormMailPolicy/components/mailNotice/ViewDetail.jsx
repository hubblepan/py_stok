import React, { useState, useEffect } from 'react';
import { Drawer, Form, Input, Row, Col } from 'antd';
import { CaretDownOutlined, CaretRightOutlined } from '@ant-design/icons';
import QuarkTable from '@/components/QuarkTable';
import { detailTableData } from '@/services/resultNotice';

const ViewDetail = (props) => {
  const { setDetailVisible, visible } = props;
  const formItemLayout = {
    labelCol: { span: 6 },
    wrapperCol: { span: 18 },
  };
  const styles = {
    itemModal: {
      marginBottom: '10px',
    },
  };
  const [form] = Form.useForm();

  const [tableData, setTableData] = useState([]);
  useEffect(() => {
    async function fetchData() {
      const result = await detailTableData();
      setTableData(result.data.list);
    }
    fetchData();
  }, []);

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

  return (
    <>
      <Drawer
        title="查看详情"
        placement="right"
        width={700}
        closable
        onClose={() => {
          setDetailVisible(false);
        }}
        visible={visible}
        getContainer={false}
        style={{ position: 'absolute', overflow: 'hidden' }}
      >
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
                  label="接口服务"
                  name="apiService"
                >
                  576657
                </Form.Item>
              </Col>
            </Row>
            <Row>
              <Col span={24}>
                <Form.Item
                  // labelCol={{ span: 3 }}
                  style={styles.itemModal}
                  label="有效日期"
                  name="effectDate"
                >
                  456
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
      </Drawer>
    </>
  );
};

export default ViewDetail;
