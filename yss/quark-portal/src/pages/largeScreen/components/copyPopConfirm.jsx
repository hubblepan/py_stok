import React, { useState, useRef } from 'react';
import { Form, Select, Popconfirm, message, Modal } from 'antd';
import { CopyOutlined, ExclamationCircleOutlined } from '@ant-design/icons';
import { visible } from 'chalk';

const { Option } = Select;
const { confirm } = Modal;

// 复制
export default (props) => {
  const { form, data, from } = props;

  // 下拉框状态
  const [value, setValue] = useState();

  const SetCopy = (props) => {
    const options = Array.isArray(props.data)
      ? props.data.map((item) => (
          <Option key={item.value} value={item.value}>
            {item.name}
          </Option>
        ))
      : [];
    return (
      <Form>
        <span style={{ color: '#fff' }}>复制当前指标至：</span>
        <Form.Item noStyle={true}>
          <Select
            mode='multiple'
            value={value}
            onChange={(e) => {
              setValue(e);
            }}
            style={{ width: 200 }}
            // size="small"
          >
            {options}
          </Select>
          <div id="tips"></div>
        </Form.Item>
      </Form>
    );
  };

  const handleConfirm = () => {
    if (from) {
      // 获取组件
      const type = from.split('_')[1];
      // 获取要复制的值
      const _value = form.getFieldValue(from);
      console.log("_value  "+_value);
      // 先判断是否为空
      if (_value === undefined || _value === '' || (value && value.length === 0)) {
        message.warn('请选择指标范围');
        return false;
      }

      if (!value) {
        message.warn('请选择要复制的指标');
        return false;
      }

      // 获取要设置的符号
      value.forEach(function (item) {
        const to = to ? to : `${item}_${type}`;
        console.log("to  "+to);

        const obj = {};
        obj[to] = _value;
        console.log('设置值', obj);
        form.setFieldsValue(obj);
      });
    }

    message.success('已复制');
    setValue();

    return true;
  };

  // 复制确认
  const confirmCopy = (from) => {
    handleConfirm();
  };

  return (
    <div>
      <Popconfirm
        icon={null}
        placement="bottom"
        title={<SetCopy data={data} />}
        onCancel={() => {
          setValue();
        }}
        okText={
          <div style={{ width: '38px', height: '22px' }}>
            <div
              onClick={(e) => {
                if (!handleConfirm()) {
                  e.stopPropagation();
                  e.preventDefault();
                  return false;
                }
              }}
              style={{
                position: 'absolute',
                paddingLeft: '4px',
                top: 0,
                bottom: 0,
                left: 0,
                right: 0,
              }}
            >
              确定
            </div>
          </div>
        }
        cancelText="取消"
        overlayStyle={{
          zIndex: 1000,
          top: '1000px',
        }}
      >
        <a className="icon-copy" href="#" onClick={(e) => e.preventDefault()}>
          <CopyOutlined />
        </a>
      </Popconfirm>
    </div>
  );
};
