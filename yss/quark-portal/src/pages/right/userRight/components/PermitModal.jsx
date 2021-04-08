import React, { useState, useEffect, useLayoutEffect, useCallback, useRef } from 'react';
import {
  Modal,
  Input,
  Table,
  Button,
  Select,
  Checkbox,
  Popover,
  Form,
  Row,
  Col,
  message,
} from 'antd';
import MsgBox from '@/utils/MsgBox';
import {
  SearchOutlined,
  EditOutlined,
  CopyOutlined,
  CaretDownOutlined,
  CaretRightOutlined,
  FullscreenOutlined,
  CloseOutlined,
} from '@ant-design/icons';
import SplitPane from 'react-split-pane';
import QuarkTable from '@/components/QuarkTable';
import QuarkModal from '@/components/QuarkModal';
import { saveData } from '@/services/permitConfig';

import IndexDimension from './permit/IndexDimension';
import UserDimension from './permit/UserDimension';

import styles from './style.less';

const PermitModal = (props) => {
  const { permitVisible, setPermitVisible } = props;
  const { Option } = Select;

  // 维度选择框
  const [indexHidden, setIndexHidden] = useState('block');
  const [userHidden, setUserHidden] = useState('none');
  function handleChange(value) {
    if (value === 'index') {
      setIndexHidden('block');
      setUserHidden('none');
    }
    if (value === 'user') {
      setUserHidden('block');
      setIndexHidden('none');
    }
  }

  // 保存
  const saveHandle = () => {
    saveData({ params: '' }).then((res) => {
      MsgBox.success({ message: '保存成功！' });
      setPermitVisible(false);
    });
  };

  return (
    <Modal
      title={
        <div style={{ display: 'flex' }}>
          <h6 className="h6">指标权限配置</h6>
          <Select
            defaultValue="index"
            size="small"
            style={{ paddingLeft: '10px' }}
            onChange={handleChange}
          >
            <Option value="index">指标维度</Option>
            <Option value="user">用户维度</Option>
          </Select>
        </div>
      }
      visible={permitVisible}
      onOk={() => {}}
      destroyOnClose
      onCancel={() => {
        setPermitVisible(false);
      }}
      width={900}
      bodyStyle={{ padding: 0, height: '500px', overflowY: 'auto' }}
      closeIcon={
        <div
          onClick={(e) => {
            e.preventDefault();
            return false;
          }}
        >
          <a
            href="#"
            onClick={(e) => {
              e.preventDefault();
              // 最大化
            }}
          >
            <FullscreenOutlined />
          </a>
          &nbsp;&nbsp;
          <a
            href="#"
            onClick={(e) => {
              e.preventDefault();
              setPermitVisible(false);
            }}
          >
            <CloseOutlined />
          </a>
        </div>
      }
      footer={
        <>
          <Button
            key="back"
            type="text"
            onClick={() => {
              setPermitVisible(false);
            }}
          >
            取消
          </Button>
          <Button key="submit" type="primary" onClick={saveHandle}>
            保存
          </Button>
        </>
      }
    >
      <div style={{ display: indexHidden }}>
        <IndexDimension />
      </div>

      <div style={{ display: userHidden }}>
        <UserDimension />
      </div>
    </Modal>
  );
};

export default PermitModal;
