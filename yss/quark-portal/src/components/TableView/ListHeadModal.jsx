import React, { useState, useEffect } from 'react';
import { Modal, Form, Input, Row, Col, Select, Checkbox } from 'antd';
import MsgBox from '@/utils/MsgBox';
import QuarkModal from '@/components/QuarkModal';
import { saveBasicParams, queryBasicParams } from '@/services/basicParameter.js';
import QuarkTable from '@/components/QuarkTable';
import EditableTable from '@/components/TableView/ListHeadEditableTable';

const ListHeadModal = (props) => {
  const {
    listheadModalVisible,
    setListheadModalVisible,
    columns,
    listheadData,
    loading
  } = props;

  const { TextArea } = Input;
  const { Option } = Select;

  const layout = {
    labelCol: {
      span: 8,
    },
    wrapperCol: {
      span: 16,
    },
  };
  const tailLayout = {
    labelCol: {
      span: 4,
    },
  };

  const [data, setData] = useState([]);

  useEffect(() => {
    const newList = columns.map((item, i) =>{
      return {
        id: i+1,
        columnName: item.title,
        columnWidth: 100,
      }
    })
    setData(newList);
  }, []);


  // 修改数据
  const modifyHandle = () => {

    // let exValue = [];
    // exValue = { ...values, checkState: Math.random() > 0.5 ? 1 : 0 };
    // handles.save(exValue);

    setListheadModalVisible(false);

  };

  return (
    <>
      <Modal
        title="列头配置"
        visible={listheadModalVisible}
        bodyStyle={{
          maxHeight: '400px',
          overflowY: 'auto',
        }}
        width={800}
        onOk={modifyHandle}
        onCancel={() => {
          setListheadModalVisible(false);
          // form.resetFields();
        }}
        destroyOnClose
      >
        <EditableTable dataSource={listheadData}  loading={loading} />
      </Modal>
    </>
  );
};

export default ListHeadModal;
