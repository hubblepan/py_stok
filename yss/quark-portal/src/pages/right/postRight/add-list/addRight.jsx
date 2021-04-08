import React, {
  createContext,
  useState,
  useCallback,
  useEffect,
  useRef,
  useLayoutEffect,
} from 'react';
import { TreeSelect } from 'antd';
import bigInt from 'big-integer';

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
import PostRightService from '../service/PostRightService';
import moment from 'moment';

const PostRightAdd = (props) => {
  const layout = {
    labelCol: {
      span: 8,
    },
    wrapperCol: {
      span: 16,
    },
  };

  //功能菜单数据
  const [funTreeData, setFunTreeData] = useState([]);
  //岗位列表数据
  const [postData, setPostData] = useState([]);
  //操作列表
  const [operData, setOperData] = useState([]);
  //当前选中岗位
  const [currPost, setCurrPost] = useState(null);
  //当前选中的功能菜单
  const [currFunCode, setCurrFunCode] = useState([]);
  const [form] = Form.useForm();

  const { formData, operate, modalVisible, onCancel,footActiveKey,handle } = props;

  const service = new PostRightService({ base: '/api/postRight' });

  // 确认提交
  const okHandle = async () => {
    console.log("operate",operate);
    const values = await form.validateFields();
    console.log("okHandle values",values);
    let selectValues = values.c_OPER_CODE;
    //获取功能及功能下的操作列表
    const funRightTable = await service.getUserFunRightTable();
    console.log("okHandle funRightTable",funRightTable);
    //MAP：操作代码--操作对象
    let operValueMap = [];
    operData.forEach(item => {
      item.n_OPER_VALUE = bigInt(item.c_OPER_VALUE);
      operValueMap[item.c_OPER_CODE] = item;
    });

    //权限列表
    let dataList = [];
    //功能模块权限值
    let defaultFunOperBigValue = bigInt("2097152");
    let bigZero = bigInt("0");//零
    //循环选中的菜单，计算菜单的权限
    currFunCode.forEach(item => {
      let n_OPER_VALUE = bigInt("0");
      //功能下所有的操作的列表
      var funRightOpers = funRightTable.data[item];
      if(funRightOpers && funRightOpers.length > 0){
        for(let i=0; i<selectValues.length; i++){
          let selectOperCode = selectValues[i];
          if (funRightOpers.indexOf(selectOperCode) > -1) {
            let operValue = operValueMap[selectOperCode];
            //操作值相加
            n_OPER_VALUE = n_OPER_VALUE.add(operValue.n_OPER_VALUE);
          }
        }
      }
      //只保存操作值大于零的功能权限
      if(n_OPER_VALUE.compareTo(bigZero) != 0){
        let funRight = n_OPER_VALUE.add(defaultFunOperBigValue);
        let postRight = {
          c_FUN_CODE : item,
          c_POST_CODE: currPost.c_POST_CODE,
          auditState:0,
          operator:"",
          modifier:AppContext.getUserCode(),
          c_OPER_VALUE:funRight.toString(),
          modifyDate : moment().format('YYYY-MM-DD hh:mm:ss'),
        };
        dataList.push(postRight);
      }
    });

    let params ={
      post:currPost,
      postRigths:dataList,
      targetFunCodes:currFunCode
    };
    console.log("okHandle params",params);
    request
      .post('/YSSUCOBRIDGE/ws/com/yss/fast/right/support/post/controller/IPostNewServiceController/updatePostAndRigths?serviceId=osgi-fast',{data:params} )
      .then((reslut) => {
        if (reslut.success) {
          message.success('新增成功！');
          handle.requery();
        } else {
          MsgBox.error({message: `保存失败:${reslut.data}`,});
        }
      });

    form.resetFields();
  };

  //获取操作列表
  const getOpers = (funCodes) =>{
    if(funCodes.length == 0){
      setOperData([]);
      return;
    }
    let funCodesStr="";
    funCodes.forEach(item => {
      if(funCodesStr == ""){
        funCodesStr = item;
      }else{
        funCodesStr = funCodesStr + "|" + item;
      }
    });
    funCodesStr = encodeURI(funCodesStr);
    let url = '/YSSUCOBRIDGE/ws/com/yss/fast/right/support/post/controller/IPostRightController/queryOperValuesByFunCodes/'+funCodesStr;
    request
    .get(url)
    .then((result) => {
      console.log("getOpers",result);
      setOperData(result.data);
    });
  }

  //获取岗位列表
  const getPosts = () =>{
    console.log("getPosts");
    let url = '/YSSUCOBRIDGE/ws/com/yss/fast/right/support/post/controller/IPostNewServiceController/queryPosts';
    request.post(url,{data:{pageFunCode:"PostManager"}})
    .then((result) => {
      var listData = result.data;
      setPostData(listData);
      //主表选中了岗位，加载岗位列表后，需要加载对应岗位的功能列表
      if(footActiveKey && footActiveKey!=""){
        listData.forEach(item => {
          if(item.c_POST_CODE === footActiveKey){
            setCurrPost(item);
            getSysFunTree(item.c_POST_CODE,item.c_AUTH_ORG_CODE);
            return;
          }
        });
      }else{
        setFunTreeData([]);
      }
    });
  }

  // 获取菜单树
  const getSysFunTree = (postCode,orgCode) =>{
    console.log("getSysFunTree",postCode,orgCode);
    let url = '/YSSUCOBRIDGE/ws/com/yss/fast/right/support/post/controller/IPostRightController/querySysFunByPostCode';
    request
    .post(url,{data:{postCode:postCode,authOrgCode:orgCode}})
    .then((result) => {
      //转换树形结构
      var listData = result.data;
      const root = [];
      const treeList = [];
      const dataMap = {};
      if (listData && listData.length > 0) {
        listData.forEach(item => {
          item.title = item.c_FUN_NAME;
          item.value = item.c_FUN_CODE;
          //全部数据去重
          if(!dataMap[item.c_FUN_CODE]){
            dataMap[item.c_FUN_CODE] = item;
            treeList.push(item);
          }
        });

        //父节点不存在，认为是根节点
        listData.forEach(item => {
          if (!dataMap[item.c_FUN_CODE_P]) {
            root.push(item);
          }
        });

        // 将各个节点放到其父节点下面
        treeList.forEach(item => {
          if(dataMap[item.c_FUN_CODE_P]){
            const parent = dataMap[item.c_FUN_CODE_P];
            if(parent != undefined){
              if (!parent.children) {
                parent.children = [];
              }
              parent.children.push(item);
            }
          }
        });
      }
      setFunTreeData(root);
    });
  };

  //当前选中岗位变化时
  useEffect(() => {
    if(null != currPost){
      getSysFunTree(currPost.c_POST_CODE,currPost.c_AUTH_ORG_CODE);
    }
  }, [currPost]);

  //当前选中的菜单变化时
  useEffect(() => {
    getOpers(currFunCode);
  }, [currFunCode]);

  //页面显示时，初始化
  useEffect(()=>{
    if(modalVisible){
      //初始化重置表格
      if(operate === "edit" || operate === "copy"){
        form.setFieldsValue(formData);
      }else{
        form.resetFields();
      }
      //初始化岗位列表
      getPosts();

      //设置默认值
      form.setFieldsValue({
        "c_POST_CODE": footActiveKey
      });
    }
  },[modalVisible]);

  //改变岗位选中事件
  const changePost = (value )=>{
    if(!value || value === ""){
      setFunTreeData([]);
      return;
    }
    console.log("改变岗位",value);
    postData.forEach(item => {
      if(item.c_POST_CODE === value){
        setCurrPost(item);
        return;
      }
    });
  }

  //改变菜单选中事件
  const changeFun = (value )=>{
    console.log("改变功能模块",value);
    setCurrFunCode(value);
  }

  return (
    <Modal
      width={800}
      title="岗位权限信息"
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
              label="岗位名称"
              name="c_POST_CODE"
              rules={[
                {
                  required: true,
                  message: '请选择岗位！',
                }
              ]}
            >
              <Select
                allowClear
                label="岗位名称"
                name="c_POST_CODE"
                onChange={changePost}
              >
                {postData.map(post => (
                    <Option key={post.c_POST_CODE}>{post.c_POST_NAME}</Option>
                  ))}
              </Select>
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item
              {...layout}
              label="功能名称"
              name="c_FUN_CODE"
              rules={[
                {
                  required: true,
                  message: '请选择功能模块！',
                }
              ]}
            >
              <TreeSelect
                showSearch
                treeNodeFilterProp='title'//输入项过滤对应的 treeNode 属性, value或者title
                treeDefaultExpandAll
                treeCheckable
                treeData={funTreeData}
                placeholder="请选择功能菜单"
                treeDefaultExpandAll
                onChange={changeFun}
                multiple
              />
            </Form.Item>
          </Col>
        </Row>
        <Row gutter={16}>
          <Col span={12}>
            <Form.Item
              {...layout}
              label="操作权限"
              name="c_OPER_CODE"
              rules={[
                {
                  required: true,
                  message: '请选择操作！',
                }
              ]}>
              <Select
                    label="操作权限"
                    name="c_OPER_CODE"
                    mode="multiple"
                    showSearch="true"
                    optionFilterProp="children"
                  >
                  {operData.map(item => (
                    <Option key={item.c_OPER_CODE}>{item.c_DV_OPER_TYPE}</Option>
                  ))}
              </Select>
            </Form.Item>
          </Col>
          <Col span={12}></Col>
        </Row>
      </Form>
    </Modal>
  );
};

export default PostRightAdd;
