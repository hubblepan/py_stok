import React, { useState } from 'react';
import { Form, Row, Col, Select, Drawer, Input } from 'antd';
import QuarkTable from '@/components/QuarkTable';
import ExtendParams from './ExtendParams';

const ParamsPreview = (props) => {
  const { visible, setParamsPreview, currentSelect } = props;

  console.log('预览currentSelect', currentSelect);

  const { parentName } = currentSelect;

  const [form] = Form.useForm();
  const [exParams, setExParams] = useState(false);
  const { Option } = Select;
  const [flag, setFlag] = useState(true);
  function isNumber(val) {
    let regPos = /^\d+(\.\d+)?$/; // 非负浮点数
    let regNeg = /^(-(([0-9]+\.[0-9]*[1-9][0-9]*)|([0-9]*[1-9][0-9]*\.[0-9]+)|([0-9]*[1-9][0-9]*)))$/; // 负浮点数
    if (regPos.test(val) || regNeg.test(val)) {
      return true;
    }
    return false;
  }

  const columns = [
    {
      title: '参数名称',
      dataIndex: 'paramsName',
      render: (value, row, index) => {
        const obj = {
          children: value,
          props: {},
        };
        if (index === 2) {
          obj.props.rowSpan = 2;
        }
        if (index === 3) {
          obj.props.rowSpan = 0;
        }

        return obj;
      },
    },
    {
      title: '适用组合',
      dataIndex: 'applyCombinate',
    },
    {
      title: '监控条件',
      dataIndex: 'monitorCondition',
    },
    {
      title: '参数值',
      dataIndex: 'paramsValue',
      render: (content, record, index) => {
        return isNumber(content) ? (
          content
        ) : (
            <div
              style={{ cursor: 'pointer', color: '#3366FF' }}
              onClick={() => {
                setFlag(false);
                setExParams(true);
              }}
            >
              {content}
            </div>
          );
      },
    },

    {
      title: '参数描述',
      dataIndex: 'paramsDesc',
    },
  ];

  const data = [
    // {
    //   id: 1,
    //   paramsName: '参数名1',
    //   applyCombinate: '群组',
    //   monitorCondition: '监控条件1',
    //   paramsValue: '扩展参数',
    //   paramsDesc: '描述1述1述1述1述1述1述1述1述1述1',
    // },
    // {
    //   id: 2,
    //   paramsName: '参数名2',
    //   applyCombinate: '群组',
    //   monitorCondition: '监控条件2',
    //   paramsValue: '34',
    //   paramsDesc: '描述1述1述1述1述1述1述1述1述1述2',
    // },
    // {
    //   id: 3,
    //   paramsName: '参数名3',
    //   applyCombinate: '群组',
    //   monitorCondition: '监控条件3',
    //   paramsValue: '54',
    //   paramsDesc: '描述1述1述1述1述1述1述1述1述1述3',
    // },
    // {
    //   id: 4,
    //   paramsName: '',
    //   applyCombinate: '群组',
    //   monitorCondition: '监控条件4',
    //   paramsValue: '扩展参数',
    //   paramsDesc: '描述1述1述1述1述1述1述1述1述1述2',
    // },
    // {
    //   id: 5,
    //   paramsName: '参数名5',
    //   applyCombinate: '群组',
    //   monitorCondition: '监控条件5',
    //   paramsValue: '扩展参数',
    //   paramsDesc: '描述1述1述1述1述1述1述1述1述1述3',
    // },
  ];
  const children = [];
  for (let i = 10; i < 36; i += 1) {
    children.push(<Option key={i.toString(36) + i}>{i.toString(36) + i}</Option>);
  }
  function handleChange(value) {
    console.log(`Selected: ${value}`);
  }
  return (
    <>
      <Drawer
        title="指标参数预览"
        placement="right"
        width={680}
        onClose={() => {
          setParamsPreview(false);
        }}
        visible={visible}
        getContainer={false}
        style={{ position: 'absolute', overflow: 'hidden' }}
      >
        <Form colon={false} labelCol={8} form={form}>
          <Row gutter={[12, 12]}>
            <Col span={12}>
              <Form.Item name="selectCombination" label="选择组合">
                <Input defaultValue={parentName} />
                {/* <Select
                  size="default"
                  allowClear
                  onChange={handleChange}
                  style={{ width: '100%' }}
                  mode="multiple"
                  maxTagCount={2}
                  maxTagTextLength={2}
                >
                  {children}
                </Select> */}
              </Form.Item>
            </Col>
          </Row>
          <h4>参数详情</h4>
          <QuarkTable columns={columns} dataSource={data} rowSelection={false} />
          {/* 扩展参数 */}
          <ExtendParams exParams={exParams} setExParams={setExParams} flag={flag} />
        </Form>
      </Drawer>
    </>
  );
};

export default ParamsPreview;
