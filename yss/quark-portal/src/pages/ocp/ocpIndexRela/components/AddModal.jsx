import React, { useEffect, useState } from 'react';
import { Form, Input, Modal, Transfer, Select, Row, Col } from 'antd';
import request from '@/utils/request';
import MsgBox from '@/utils/MsgBox';
import { queryGroup, queryTarget, saveRelation } from './EditService';
import styles from './style.less';

const { Option } = Select;
const AddModal = (props) => {
  const { addVisible, setAddVisible, handles } = props;
  const [confirmLoading, setConfirmLoading] = useState(false);
  const [selectedKeys, setSelectedKeys] = useState([]);
  const [options, setOptions] = useState([]);
  const [targetKeys, setTargetKeys] = useState([]);
  const [dataSource, setDataSource] = useState([]);
  const [form] = Form.useForm();
  useEffect(() => {
    if (addVisible) {
      form.resetFields();
      queryGroup()
        .then((response) => {
          setOptions(response.data.list);
        })
        .catch(() => {
          MsgBox.error({ message: '获取群组失败' });
        });
      queryTarget()
        .then((response) => {
          const transferList = response.data.list;
          const targetList = [];
          transferList.forEach((item) => {
            if (item.related) {
              targetList.push(item.key);
            }
          });
          setDataSource(transferList);
          setTargetKeys(targetList);
        })
        .catch(() => {
          MsgBox.error({ message: '获取群组失败' });
        });
    } else {
      // 清空选中
      setSelectedKeys([]);
    }
  }, [addVisible]);

  const onSave = async () => {
    try {
      const values = await form.validateFields();
      console.log(values);
      values.target = dataSource.map((item) => item.key);
      setConfirmLoading(true);
      saveRelation(values)
        .then(() => {
          console.log('then');
          setConfirmLoading(false);
          setAddVisible(false);
          MsgBox.success({ content: '新增成功' });
          // refreshRela();
          handles.query()
        })
        .catch(() => {
          console.log('catch');
          setConfirmLoading(false);
          MsgBox.error({ message: '保存失败' });
        });
    } catch (errorInfo) {}
  };
  const handleChange = (nextTargetKeys, direction, moveKeys) => {
    console.log('nextTargetKeys: ', nextTargetKeys);
    console.log('moveKeys: ', moveKeys);
    setTargetKeys(nextTargetKeys);
  };

  return (
    <>
      <Modal
        title="新增"
        visible={addVisible}
        width={600}
        bodyStyle={{ height: '460px' }}
        confirmLoading={confirmLoading}
        okText="保存"
        onCancel={() => {
          setAddVisible(false);
        }}
        onOk={() => {
          onSave();
          // setAddVisible(false);
        }}
        afterClose={() => {
          form.resetFields();
        }}
      >
        <Row>
          <Form form={form} labelCol={{ flex: '0 0 80px' }} layout="inline">
            <Col span={12}>
              <Form.Item
                name="releMode"
                label="关联模式"
                rules={[
                  {
                    required: true,
                    message: '请选择关联模式',
                  },
                ]}
                style={{ height: '56px', marginBottom: '0px' }}
              >
                <Select allowClear>
                  <Option value="1">群组模式</Option>
                  <Option value="2">资产类型</Option>
                  <Option value="3">资产类别</Option>
                  <Option value="4">自定义类别</Option>
                </Select>
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                name="group"
                label="群组名称"
                rules={[
                  {
                    required: true,
                    message: '请选择群组名称',
                  },
                ]}
                style={{ height: '56px', marginBottom: '0px', marginRight: '0px' }}
              >
                <Select allowClear>
                  {options.map((item, index) => {
                    return (
                      <Option key={index} value={item.value}>
                        {item.label}
                      </Option>
                    );
                  })}
                </Select>
              </Form.Item>
            </Col>
            <Transfer
              style={{ width: '100%', height: '360px' }}
              listStyle={{ width: '45%', height: '100%' }}
              className={styles.relaTransfer}
              dataSource={dataSource}
              titles={['未关联指标', '已关联指标']}
              targetKeys={targetKeys}
              onChange={handleChange}
              selectedKeys={selectedKeys} // 需要配合onSelectChange使用
              onSelectChange={(sourceSelectedKeys, targetSelectedKeys) => {
                setSelectedKeys(sourceSelectedKeys.concat(targetSelectedKeys));
              }}
              render={(item) => item.title}
            />
          </Form>
        </Row>
      </Modal>
    </>
  );
};
export default AddModal;
