import React, { useState } from 'react';
import { Form, Select, Checkbox, Row, Col, Radio, DatePicker } from 'antd';
import { CaretDownOutlined, CaretRightOutlined } from '@ant-design/icons';
import QuarkTable from '@/components/QuarkTable';
import styles from './style.less';

const PolicyConfig = () => {
  const { RangePicker } = DatePicker;
  const [form] = Form.useForm();
  const [value, setValue] = useState('');
  const onChangeRadio = (e) => {
    console.log('radio checked', e.target.value);
    setValue(e.target.value);
  };

  const [mode, setMode] = useState('1');
  const changeMode = (e) => {
    setMode(e.target.value);
  };
  const formItemLayout = {
    labelCol: { span: 6 },
    wrapperCol: { span: 18 },
  };

  function onChange(e) {
    console.log(`checked = ${e.target.checked}`);
  }
  const columns = [
    {
      id: '1',
      title: '风险级别',
      dataIndex: 'riskLevel',
    },
    {
      id: '2',
      title: '指标状态',
      dataIndex: 'indexState',
      render: (text, record) =>
        record.indexState.map((item) => {
          return <Checkbox>{item.text}</Checkbox>;
        }),
    },
  ];

  const tableData = [
    {
      id: '1',
      riskLevel: '高风险',
      indexState: [
        {
          id: '11',
          text: '预警',
        },
        {
          id: '12',
          text: '异常',
        },
        {
          id: '13',
          text: '正常',
        },
      ],
    },
    {
      id: '2',
      riskLevel: '低风险',
      indexState: [
        {
          id: '21',
          text: '预警',
        },
        {
          id: '22',
          text: '异常',
        },
        {
          id: '23',
          text: '正常',
        },
      ],
    },
    {
      id: '3',
      riskLevel: '低风险',
      indexState: [
        {
          id: '31',
          text: '预警',
        },
        {
          id: '32',
          text: '异常',
        },
        {
          id: '33',
          text: '正常',
        },
      ],
    },
  ];

  const indexColumns = [
    {
      id: '1',
      title: '指标名称',
      dataIndex: 'indexName',
    },
    {
      id: '2',
      title: '指标状态',
      dataIndex: 'indexState',
      render: (text, record) =>
        record.indexState.map((item) => {
          return <Checkbox>{item.text}</Checkbox>;
        }),
    },
  ];

  const indexTableData = [
    {
      id: '1',
      indexName: '高风险kk',
      indexState: [
        {
          id: '11',
          text: '预警',
        },
        {
          id: '12',
          text: '异常',
        },
        {
          id: '13',
          text: '正常',
        },
      ],
      children: [
        {
          id: '11',
          indexName: '高风险57567',
          indexState: [
            {
              id: '111',
              text: '预警',
            },
            {
              id: '112',
              text: '异常',
            },
            {
              id: '113',
              text: '正常',
            },
          ],
        },
        {
          id: '13',
          indexName: '高风险089978',
          indexState: [
            {
              id: '131',
              text: '预警',
            },
            {
              id: '132',
              text: '异常',
            },
            {
              id: '133',
              text: '正常',
            },
          ],
        },
        {
          id: '12',
          indexName: '高风险679879',
          indexState: [
            {
              id: '121',
              text: '预警',
            },
            {
              id: '122',
              text: '异常',
            },
            {
              id: '123',
              text: '正常',
            },
          ],
        },
      ],
    },
    {
      id: '2',
      indexName: '低风险k',
      indexState: [
        {
          id: '21',
          text: '预警',
        },
        {
          id: '22',
          text: '异常',
        },
        {
          id: '23',
          text: '正常',
        },
      ],
    },
    {
      id: '3',
      indexName: '低风险kkk',
      indexState: [
        {
          id: '31',
          text: '预警',
        },
        {
          id: '32',
          text: '异常',
        },
        {
          id: '33',
          text: '正常',
        },
      ],
    },
  ];

  return (
    <>
      <div className={styles.panel}>
        <Form colon={false} labelCol={8} form={form} name="basic">
          <Row>
            <Col span={18}>
              <Form.Item
                labelCol={{ span: 3 }}
                style={styles.itemModal}
                label="触发指标"
                name="triggerIndex"
                rules={[{ required: true, message: '请输入内容!' }]}
              >
                （请选择会触发该发件策略的指标范围）
              </Form.Item>
            </Col>
            <Col span={6}>
              <Radio.Group
                defaultValue="1"
                value={mode}
                // className="ml-2"
                onChange={changeMode}
                // size="small"
                style={{ margin: 'auto' }}
              >
                <Radio.Button value="1">风险级别</Radio.Button>
                <Radio.Button value="2">指标树</Radio.Button>
              </Radio.Group>
            </Col>
          </Row>
        </Form>
        {mode === '1' ? (
          <QuarkTable columns={columns} dataSource={tableData} rowSelection={false} />
        ) : null}
        {mode === '2' ? (
          <QuarkTable
            columns={indexColumns}
            dataSource={indexTableData}
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
        ) : null}

        <Form colon={false} labelCol={8} form={form} name="basic">
          <Row>
            <Col span={24}>
              <Form.Item
                // labelCol={{ span: 3 }}
                style={styles.itemModal}
                label="触发场景"
                name="triggerScene"
                rules={[{ required: true, message: '请输入内容!' }]}
              >
                <Checkbox onChange={onChange}>估值日常做账</Checkbox>
                <Checkbox onChange={onChange}>监控日志总览</Checkbox>
                <Checkbox onChange={onChange}>外部服务调用</Checkbox>
              </Form.Item>
            </Col>
          </Row>
          <Row>
            <Col span={12}>
              <Form.Item
                label="渠道类型"
                name="channelType"
                style={styles.itemModal}
                rules={[{ required: true, message: '请输入内容!' }]}
              >
                <Select label="风险级别" key="2" name="riskLevel" allowClear>
                  <Select.Option value="1">风险级别1</Select.Option>
                  <Select.Option value="0">风险级别2</Select.Option>
                </Select>
              </Form.Item>
            </Col>
          </Row>
          <Row>
            <Col span={12}>
              <Form.Item
                // {...formItemLayout}
                label="接口服务"
                name="apiService"
                style={styles.itemModal}
                rules={[{ required: true, message: '请输入内容!' }]}
              >
                <Select label="风险级别" key="2" name="riskLevel" allowClear>
                  <Select.Option value="1">风险级别1</Select.Option>
                  <Select.Option value="0">风险级别2</Select.Option>
                </Select>
              </Form.Item>
            </Col>
          </Row>
          <Row>
            <Col span={24}>
              <Form.Item
                //   {...formItemLayout}
                label="有效日期"
                name="effectDate"
                style={styles.itemModal}
                rules={[{ required: true, message: '请输入内容!' }]}
              >
                <RangePicker size="default" />
              </Form.Item>
            </Col>
          </Row>
        </Form>
      </div>
    </>
  );
};

export default PolicyConfig;
