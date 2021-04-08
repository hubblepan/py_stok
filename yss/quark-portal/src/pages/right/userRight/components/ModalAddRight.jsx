import React, {useEffect, useMemo, useState} from 'react';
import {Modal, Form, Row, Col, Typography, TreeSelect} from 'antd';
import request from '@/utils/request';
import MsgBox from "@/utils/MsgBox";
import moment from 'moment';
import AppContext from "@/utils/AppContext";
import {uncheckMasterTable} from "@/pages/ocp/ocpIndexRela/components/DiyClassifyAdminModal/diyClassifyService";

const { Title } = Typography;
const commParams = {serviceId: 'osgi-fast'};



const ModalAddRight = ({showAddRight, setShowAddRight, postList, dataTree, orgUserTree, dataType, subHandles}) => {
  const [form] = Form.useForm();
  const userList = [];
  const getUserList = (treeList) => {
    treeList.forEach(item => {
      if (item.c_DATA_TYPE === 'USER') {
        userList.push({...item, title: item.c_CORP_ORG_NAME, value: item.c_CORP_ORG_CODE});
      } else if (item.children) {
        getUserList(item.children);
      }
    })
  };
  getUserList(orgUserTree);

  const postOptions = postList.map(item => {
    return {...item, title: item.c_POST_NAME, value: item.c_POST_CODE}
  });

  // 当对话框显示时： 清除表单, 获取部门数据 和 职务数据
  useEffect(() => {
    if (showAddRight) {
      console.log('xxxxxxxx',  '清除表单值');
      form.resetFields();
      // 获取 orgUserTree 的 userList 列表
    }
  }, [showAddRight]);

  const handleOk = () => {
    const formValues = form.getFieldsValue();
    request.post('/YSSUCOBRIDGE/ws/com/yss/fast/right/support/right/controller/IUserPostDataServiceController/insertDatas', {
      params: commParams,
      data: {
        ...formValues,
        dataType:dataType.c_DATA_TYPE,
        insertModel:"1",
      }
    }).then(res => {
      MsgBox.success({message: '新增成功'});
      // setShowAddRight(false);
      //刷新数据
      subHandles.autoQuery();
    }).catch(reason => {
      MsgBox.error({message: reason});
    });
    setShowAddRight(false);
  };
  const handleCancel = () => {
    setShowAddRight(false);
  };

  return useMemo(() => {
    console.log('FormAddOrg 刷新');
    const layout = {
      labelCol: {span: 6},
      wrapperCol: {span: 16, offset: 0.5},
      layout: 'horizontal',
      colon: false,
    };
    return (
      <Modal title="新增" visible={showAddRight} onOk={handleOk} onCancel={handleCancel} width="35%">
        <Form
          name="basic"
          validateTrigger="onBlur"
          form={form}
          {...layout}>
          <div>
            <Row>
              <Col span={12}>
                <Form.Item
                  label="用户"
                  name="userCodes"
                  rules={[{ required: true, message: '请选择用户' }]}
                >
                  <TreeSelect
                    label="用户"
                    showSearch
                    treeData={userList}
                    treeCheckable
                    maxTagCount={1}
                    treeNodeFilterProp="title"
                    dropdownStyle={{ maxHeight: 400, overflow: 'auto' }}
                    treeDefaultExpandAll/>
                </Form.Item>
              </Col>
              <Col span={12}>
                <Form.Item
                  label="数据"
                  name="dataCodes"
                  rules={[{ required: true, message: '请选择数据' }]}
                >
                  <TreeSelect
                    label="数据"
                    name="dataCodes"
                    showSearch
                    treeCheckable
                    maxTagCount={1}
                    treeNodeFilterProp="title"
                    treeData={dataTree}
                    dropdownStyle={{ maxHeight: 400, overflow: 'auto' }}
                    treeDefaultExpandAll/>
                </Form.Item>
              </Col>
            </Row>
            <Row>
              <Col span={12}>
                <Form.Item
                  label="岗位"
                  name="postCodes"
                  rules={[{ required: true, message: '请选择岗位' }]}
                >
                  <TreeSelect
                    label="岗位"
                    showSearch
                    treeCheckable
                    maxTagCount={1}
                    treeNodeFilterProp="title"
                    treeData={postOptions}
                    dropdownStyle={{ maxHeight: 400, overflow: 'auto' }}
                    treeDefaultExpandAll/>
                </Form.Item>
              </Col>
              <Col span={12} />
            </Row>
          </div>
        </Form>
      </Modal>
    );
  }, [showAddRight]);
};

export default ModalAddRight
