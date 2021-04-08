import React, {
  createContext,
  useState,
  useCallback,
  useEffect,
  useRef,
  useLayoutEffect,
} from 'react';
import { TreeSelect } from 'antd';

import {
  Input,
  Row,
  Col,
  Modal,
  Form,
  DatePicker,
  Cascader,
  Tabs,
  message,
  Select,
  Table,
} from 'antd';
import request from '@/utils/request';
import AppContext from '@/utils/AppContext';

const ModalAdd = (props) => {
  function onChange(value) {
    console.log(value);
  }
  const layout = {
    labelCol: {
      span: 8,
    },
    wrapperCol: {
      span: 16,
    },
  };
  const tailLayout = {
    wrapperCol: {
      span: 22,
    },
  };

  const [orgTreeData, setOrgTreeData] = useState([]);
  const { formData, operate } = props;
  const [form] = Form.useForm();
  if(operate === "edit" || operate === "copy"){
    form.setFieldsValue(formData);
  }else{
    form.resetFields();
  }

  const { modalVisible, onCancel } = props;

  /**
   * 检查代码是否存在
   */
  const checkPostCodeExist = async (postCode) => {
    let url = '/YSSUCOBRIDGE/ws/com/yss/fast/right/support/post/controller/IPostNewServiceController/getExistPostCodes?serviceId=osgi-fast';
    let existCodes = await request.post(url);
    console.log("existCodes",existCodes.data);
    let isExist = false;
    existCodes.data.forEach(item => {
      if(item === postCode){
        message.warning("岗位代码已存在!");
        isExist = true;
      }
    });

    console.log("isExist",isExist);
    return isExist;
  }

  //不能输入非汉字效验
  const validateChinese = (rule, value, callback) => {
    if (value && value.match("[\u4e00-\u9fa5]")) {
      callback('岗位代码不能含有中文');
    } else {
      callback();
    }
  }

  // 确认提交
  const okHandle = async () => {
    console.log("operate",operate);
    const values = await form.validateFields();
    let post ={
      c_POST_NAME: values.c_POST_NAME,
      c_POST_CODE: values.c_POST_CODE,
      c_AUTH_ORG_CODE: values.c_AUTH_ORG_CODE,
      auditState:0,
      operator:"",
      modifier:AppContext.getUserCode()
    };
    if(operate === "add"){
      let isExistCode = await checkPostCodeExist(post.c_POST_CODE);
      if(!isExistCode){
        let params =[post];
        request
          .post('/YSSUCOBRIDGE/ws/com/yss/fast/right/support/post/controller/IPostNewServiceController/insert/list?serviceId=osgi-fast',{data:params} )
          .then(() => {
            message.success('新增数据成功！');
            form.resetFields();
            window.location.reload([true]);
          }).catch(function (error) {
            console.log(error);
            reject(error);
          });
      }
    }else if(operate === "edit"){
      post.id = formData?.id;
      post.operator = formData?.operator;
      let params =[post];
      request
        .post('/YSSUCOBRIDGE/ws/com/yss/fast/right/support/post/controller/IPostNewServiceController/updateById/list?serviceId=osgi-fast',{data:params} )
        .then(() => {
          message.success('修改数据成功！');
          form.resetFields();
          window.location.reload([true]);
        }).catch(function (error) {
          console.log(error);
          reject(error);
        });
    }else if(operate === 'copy'){
      let isExistCode = await checkPostCodeExist(post.c_POST_CODE);
      if(!isExistCode){
        let params ={newPostList:[post],fromPostCode:formData.c_POST_CODE};
        request
          .post('/YSSUCOBRIDGE/ws/com/yss/fast/right/support/post/controller/IPostNewServiceController/copyRightToNewPost?serviceId=osgi-fast',{data:params} )
          .then(() => {
            message.success('复制数据成功！');
            form.resetFields();
            window.location.reload([true]);
          }).catch(function (error) {
            console.log(error);
            reject(error);
          });
      }
    }

    onCancel();
  };

  // 获取权限机构树
  const getAuthOrgTree = () =>{
    request
    .post('/YSSUCOBRIDGE/ws/com/yss/platform/support/dataservice/controller/IAuthOrgDataTreeServiceController/getAuthOrgTree?serviceId=osgi-fast',{data:"PostManager"})
    .then((result) => {
      //转换树形结构
      var listData = result.data;
      const root = [];
      const treeList = [];
      const dataMap = {};
      if (listData && listData.length > 0) {
        listData.forEach(item => {
          item.title = item.c_AUTH_ORG_NAME;
          item.value = item.c_AUTH_ORG_CODE;
          //全部数据去重
          if(!dataMap[item.c_AUTH_ORG_CODE]){
            dataMap[item.c_AUTH_ORG_CODE] = item;
            treeList.push(item);
          }
        });

        //父节点不存在，认为是根节点
        listData.forEach(item => {
          if (!dataMap[item.c_AUTH_ORG_CODE_P]) {
            root.push(item);
          }
        });

        // 将各个节点放到其父节点下面
        treeList.forEach(item => {
          if(dataMap[item.c_AUTH_ORG_CODE_P]){
            const parent = dataMap[item.c_AUTH_ORG_CODE_P];
            if(parent != undefined){
              if (!parent.children) {
                parent.children = [];
              }
              parent.children.push(item);
            }
          }
        });
      }
      setOrgTreeData(root);
    });
  };

  useEffect(() => {
    //初始化权限机构树
    getAuthOrgTree();
  }, []);


  const changeOrg = (value )=>{
    console.log("改变权限机构",value);
  }

  return (
    <Modal
      width={700}
      title="岗位信息"
      visible={modalVisible}
      onOk={okHandle}
      onCancel={() => onCancel()}
    >
      <Form
        form={form}
        name="basic"
        initialValues={{
          remember: true,
        }}
      >
        <Row gutter={16}>
          <Col span={12}>
            <Form.Item
              {...layout}
              label="岗位代码"
              name="c_POST_CODE"
              rules={[
                {
                  required: true,
                  message: '请输入岗位代码！',
                },
                {
                  max:20,
                  message: '最大长度为20！',
                },
                {
                  validator:validateChinese,
                }
              ]}
            >
              <Input disabled={operate === "edit"}/>
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item
              {...layout}
              label="岗位名称"
              name="c_POST_NAME"
              rules={[
                {
                  required: true,
                  message: '请输入岗位名称！',
                },
                {
                  max:50,
                  message: '最大长度为50！',
                },
              ]}
            >
              <Input />
            </Form.Item>
          </Col>
        </Row>
        <Form.Item {...tailLayout} label="权限机构" name="c_AUTH_ORG_CODE" style={{ margin: '0 0 24px 26px' }}>
          <TreeSelect
            treeData={orgTreeData}
            placeholder="请选择权限机构"
            treeDefaultExpandAll
            onChange={changeOrg}
          />
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default ModalAdd;
