import React, { useEffect, useState } from 'react';
import { Form, Input, Modal, TreeSelect } from 'antd';
import request from '@/utils/request';
import styles from '../style.less';
import TargetMasterService from '../services/TargetMasterService';
import MsgBox from '@/utils/MsgBox';

const service = new TargetMasterService();

const MasterAddModal = (props) => {
  const { title, addVisible, setAddVisible, classifyNode, handle } = props;
  const [confirmLoading, setConfirmLoading] = useState(false);
  const [parentCode, setParentCode] = useState('');

  // const [loading, setLoading] = useState(true);
  const [treeData, setTreeData] = useState([]);
  const [form] = Form.useForm();
  useEffect(() => {
    if (addVisible) {
      form.resetFields();
      (async () => {
        const res = await service.getTreeSelect();
        setTreeData(res.data);
        setParentCode(classifyNode.typeP);
      })();
    }
  }, [addVisible]);

  const onCheck = async () => {
    try {
      const values = await form.validateFields();
      // 添加id属性
      values.id = classifyNode.id || '';
      setConfirmLoading(true);
      let res = null;
      if (title == '新增指标分类') {
        res = await service.add([values]);
      } else {
        // 修改
        console.log(123, service.update);
        res = await service.update([values]);
      }

      if (res.success) {
        MsgBox.success({
          message: '保存成功！',
        });
        handle.requery();
      } else {
        MsgBox.error({
          message: `保存失败:${res.data}`,
        });
      }

      // 保存接口
      // await request.post('/ocp/indexinfo/indextype/save', { params: values });
      setConfirmLoading(false);
      setAddVisible(false);
      // 刷新主表
    } catch (errorInfo) {}
  };
  const onChange = (parentCode) => {
    setParentCode(parentCode);
  };
  return (
    <>
      <Modal
        title={title}
        visible={addVisible}
        confirmLoading={confirmLoading}
        onCancel={() => {
          setAddVisible(false);
        }}
        onOk={onCheck}
        width={600}
      >
        <Form form={form} labelCol={{ flex: '0 0 80px' }} initialValues={classifyNode}>
          <Form.Item
            style={{ display: 'none' }}
            name="id"
            label="隐藏id"
            rules={[
              {
                required: true,
                message: '请输入id',
              },
            ]}
          >
            <Input placeholder="" />
          </Form.Item>

          <Form.Item
            name="typeCode"
            label="分类代码"
            rules={[
              {
                required: true,
                message: '请输入分类代码',
              },
            ]}
          >
            <Input placeholder="" />
          </Form.Item>
          <Form.Item
            name="typeName"
            label="分类名称"
            rules={[
              {
                required: true,
                message: '请输入分类名称',
              },
            ]}
          >
            <Input placeholder="" />
          </Form.Item>
          <Form.Item name="typeP" label="父级分类">
            <TreeSelect
              allowClear
              value={parentCode}
              onChange={onChange}
              treeData={treeData}
              placeholder=""
              treeDefaultExpandAll
            />
          </Form.Item>
        </Form>
      </Modal>
    </>
  );
};
export default MasterAddModal;
