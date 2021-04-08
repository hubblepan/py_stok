import React, {useState, useEffect} from 'react';
import {message, TreeSelect} from 'antd';
import {Row, Col, Modal, Form} from 'antd';
import request from '@/utils/request';
import MsgBox from "@/utils/MsgBox";

const commParams = {serviceId: 'osgi-fast'};
const UserPostAdd = ({handles,showAddUserPost, setShowAddUserPost}) => {
  const layout = {
    labelCol: {
      span: 8,
    },
    wrapperCol: {
      span: 16,
    },
  };
  const [form] = Form.useForm();

  //页面初始化
  useEffect(() => {
    if (showAddUserPost) {
      form.resetFields();
      getUsers()
      getPosts()
    }
  }, [showAddUserPost]);

  //下拉列表用户名称
  const [userData, setUserData] = useState([]);
  const getUsers = () =>{
    let url = '/YSSUCOBRIDGE/ws/com/yss/fast/atomicdata/support/corporg/controller/ICorpOrgServiceController/getEnabledOrgUserList';
    // let url = '/YSSUCOBRIDGE/ws/com/yss/platform/support/system/user/controller/IUserController/queryListByCondition';
    request.post(url,{data: {"dataClass":"User"}})
      .then((result) => {
        let listData = result.data;
        setUserData(listData);
      });
  };
  const dataUser = userData.filter(post => post.c_DATA_TYPE === 'USER').map(post => {
    // return {...post, title: post.c_USER_NAME, value: post.c_USER_CODE};
    return {...post, title: post.c_CORP_ORG_NAME, value: post.c_CORP_ORG_CODE};
  });

  //下拉列表岗位名称
  const [postData, setPostData] = useState([]);
  const getPosts = () =>{
    let url = '/YSSUCOBRIDGE/ws/com/yss/fast/right/support/post/controller/IPostNewServiceController/queryPosts';
    request.post(url,{data:{}})
      .then((result) => {
        let listData = result.data;
        setPostData(listData);
      });
  };
  const dataPost = postData.map(post => {
    return {...post, title: post.c_POST_NAME, value: post.c_POST_CODE}
  });

  const handleOk = () => {
    //获取表单数据
    const formValues = form.getFieldsValue();
    request
    .post('/YSSUCOBRIDGE/ws/com/yss/fast/right/support/right/controller/IUserPostServiceController/insertDatas', {
      params: commParams,
      data: {
        userCodes:formValues.userCodes.join(','),
        postCodes:formValues.postCodes.join(','),
        insertModel:"1",
      }
    })
    .then((reslut) => {
      console.log("reslut",reslut);
      if (reslut.success) {
        message.success('新增成功！');
        handles.autoQuery();
      } else {
        MsgBox.error({message: `保存失败`,});
      }
    });
    setShowAddUserPost(false);
  }
  const handleCancel = () => {
    setShowAddUserPost(false);
  }

  return (
    <Modal width={800} title="新增" visible={showAddUserPost} onOk={handleOk} onCancel={handleCancel} width="35%">
      <Form
        name="basic"
        validateTrigger="onBlur"
        form={form}
      >
        <Row gutter={16}>
          <Col span={12}>
            <Form.Item
              {...layout}
              label="用户名称"
              name="userCodes"
              rules={[{ required: true, message: '请选择用户' }]}
            >
              <TreeSelect
                label="用户名称"
                name="userCodes"
                showSearch
                treeCheckable
                treeData = {dataUser}
                treeNodeFilterProp="title"
                dropdownStyle={{ maxHeight: 400, overflow: 'auto' }}
                treeDefaultExpandAll
              />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item
              {...layout}
              label="岗位名称"
              name="postCodes"
              rules={[
                {
                  required: true,
                  message: '请输入岗位名称！',
                },
              ]}
            >
              <TreeSelect
                label="岗位名称"
                name="postCodes"
                showSearch
                treeCheckable
                treeData = {dataPost}
                dropdownStyle={{ maxHeight: 400, overflow: 'auto' }}
                treeDefaultExpandAll
              />
            </Form.Item>
          </Col>
        </Row>
      </Form>
    </Modal>
  );
};

export default UserPostAdd;
