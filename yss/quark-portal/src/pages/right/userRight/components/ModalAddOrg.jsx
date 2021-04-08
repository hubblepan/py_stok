import React, {useEffect, useMemo, useState} from 'react';
import {Modal, Form, Input, Select, Checkbox, DatePicker, Row, Col, Typography, Divider, TreeSelect} from 'antd';
import request from '@/utils/request';
import sm3 from 'sm3';
import sha256 from 'js-sha256';
import MsgBox from "@/utils/MsgBox";
import moment from 'moment';
import AppContext from "@/utils/AppContext";

const { Title } = Typography;
const commParams = {serviceId: 'osgi-fast'};

const orgParams = {
  requestId:'',
  imgCode:'',
  smsCode:'',
  c_SOURCE:'',
  c_ENCRYPT:'sm',
  c_DYN_PSD:'0',
  c_Sex:'',
  userDynamicId:'',
  c_ZIP_CODE:'',
  UPDATE_PSD:'',
  c_USER_CODE:'',
  c_USER_NAME:'',
  c_plain_pwd:'',
  c_USER_PWD:'',
  c_USER_DYN_PWD:'',
  c_PASS_MARK:"S",
  c_DV_STATE:"DISB",
  c_CORP_ORG_CODE:'',
  c_IP:'',
  c_MAC:'',
  MachineName:'',
  c_DV_JOB_TITLE:'',
  c_DV_CARD_TYPE:'',
  c_CARD_NO:'',
  d_BIRTH:'',
  d_ON_JOB:'',
  c_OFFIC_TEL:'',
  c_MO_TEL:'',
  c_FAX_NO:'',
  c_EMAIL:'',
  c_OFFIC_ADDR:'',
  d_EFF_DATE:'',
  d_EFF_ENDDATE:'',
  c_AUTH_ORG_CODE:'',
  c_CURR_VERSION:'',
  c_WIN_USER:'',
  userLoginType:'',
  c_USER_JOB_NUM:'',
  c_JOB_NUM_LOGIN:'',
  cpuId:'',
  auditState:1,
  operator:'',
  auditDate:'',
  modifier:'',
  modifyDate:'',
  id:''
}

const ModalAddOrg = ({showAddOrg, setShowAddUser}) => {
  const [orgData, setOrgData] = useState([]);
  const [jobData, setJobData] = useState([]); //  "id":"", "c_DV_CODE":"OC1", "c_DV_NAME":"职员1", "c_DV_TYPE":"JOB_TITLE", "n_ORDER":"1", "c_DESC":"职务类型", "c_AUTH_ORG_CODE":"[root]"
  const [form1] = Form.useForm();
  // 获取部门数据
  const getOrgData =  async () => {
    function convertListToTree(listData) {
      const treeList = [];
      const dataMap = {};
      if (listData && listData.length > 0) {
        // 将根节点塞进列表
        listData.forEach(item => {
          if (item.c_CORP_ORG_CODE_P === '0') {
            treeList.push(item);
          }
          dataMap[item.c_CORP_ORG_CODE] = item;
        });

        // 将各个节点放到其父节点下面
        listData.forEach(item => {
          if (item.c_CORP_ORG_CODE_P !== '0') {
            const parent = dataMap[item.c_CORP_ORG_CODE_P];
            if (!parent.children) {
              parent.children = [];
            }
            parent.children.push(item);
          }
        });
      }
      console.log('xxxxxxxxx', treeList);
      return treeList;
    }
    async function getAuthAndCorpOrgTreeViewData() {
      // console.log('用户权限子表查询岗位接口调用: params = ', this.selectedRowKeys);
      const url = '/YSSUCOBRIDGE/ws/com/yss/fast/atomicdata/support/corporg/controller/ICorpOrgServiceController/getAuthAndCorpOrgTreeViewData';
      const params = {
        serviceId: 'osgi-fast',
      };
      const res = await request.post(url, {
        params,
      });
      return res;
    }
    const res = await getAuthAndCorpOrgTreeViewData();
    res.data.dataList = res.data.dataList.map(item => {
      return {
        ...item,
        title: item.c_CORP_ORG_NAME,
        value: item.c_CORP_ORG_CODE,
        disabled: item.c_ORG_TYPE === '1',
        key: item.c_CORP_ORG_CODE,
      }
    });
    // 将返回数据的列表结构，转换成树形结构
    res.data = {list: convertListToTree(res.data.dataList)};
    setOrgData(res.data.list);
  };

  // 获取职务数据
  const getJobData = async () => {
    const res = await request.post('/YSSUCOBRIDGE/ws/com/yss/platform/support/dataservice/controller/IVocDataServiceController/getDataListByTypes',
      {
        params: {serviceId: 'osgi-fast'},
        data: ["JOB_TITLE",""],
      })
    res.data = res.data.map(item => {
      return {
        ...item,
        title: item.c_DV_NAME,
        value: item.c_DV_CODE,
      }
    });
    setJobData(res.data);
  };

  // 当对话框显示时： 清除表单, 获取部门数据 和 用户数据 和 数据
  useEffect(() => {
    if (showAddOrg) {
      console.log('xxxxxxxx',  '清除表单值');
      form1.resetFields();
      // 获取 部门数据
      getOrgData();
      // 获取 职务数据
      getJobData();
    }
  }, [showAddOrg]);




  const handleOk = () => {
    let mergeForm = {};
    // 对表单的值进行校验
    form1.validateFields()
      .then(values1 => {
        mergeForm = {...values1};
        // 提交表单
        return request.post('/YSSUCOBRIDGE/ws/com/yss/platform/support/system/user/controller/IUserController/insert/list', {
          params: commParams,
          data: [{...orgParams, ...mergeForm}],
        });
      })
      .then(res => {
        MsgBox.success({message: '提交成功'});
      })
      .catch(errorInfo => {
        console.log(errorInfo);
      });

  };

  const handleCancel = () => {
    setShowAddUser(false);
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
      <Modal title="新增" visible={showAddOrg} onOk={handleOk} onCancel={handleCancel} width="35%">
        <div style={{height: '420px', overflow:'scroll', overflowX: 'hidden'}}>
          <Title level={5}>基本信息</Title>
          <Form
            name="basic"
            validateTrigger="onBlur"
            form={form1}
            {...layout}>
            <Row>
              <Col span={12}>
                <Form.Item
                  label="用户"
                  name="c_USER_CODE"
                  rules={[
                    { required: true, message: '请输入用户ID' },
                    {
                      validator: async (_, value) => {
                        const res = await request.post('/YSSUCOBRIDGE/ws/com/yss/fast/right/support/right/authorg/controller/IAuthOrgServiceController/getCodeNum', {params: commParams, data: value})
                        if (res?.data === '1') {
                          // 用户ID 已存在
                          return Promise.reject(new Error('用户ID已存在'));
                        }
                         // 用户ID 不存在
                        return Promise.resolve();

                      }
                    },
                  ]}
                >
                  <Input />
                </Form.Item>
              </Col>
              <Col span={12}>
                <Form.Item
                  label="数据"
                  name="c_USER_NAME"
                  rules={[{ required: true, message: '请输入用户名' }]}
                >
                  <Input />
                </Form.Item>
              </Col>
            </Row>

            <Row>
              <Col span={12}>
                <Form.Item
                  label="岗位"
                  name="c_USER_CODE"
                  rules={[
                    { required: true, message: '请输入用户ID' },
                    {
                      validator: async (_, value) => {
                        const res = await request.post('/YSSUCOBRIDGE/ws/com/yss/fast/right/support/right/authorg/controller/IAuthOrgServiceController/getCodeNum', {params: commParams, data: value})
                        if (res?.data === '1') {
                          // 用户ID 已存在
                          return Promise.reject(new Error('用户ID已存在'));
                        }
                        // 用户ID 不存在
                        return Promise.resolve();

                      }
                    },
                  ]}
                >
                  <TreeSelect
                    maxTagCount={1}
                    label="岗位"
                    name="ARRAY_C_POST_CODE"
                    showSearch
                    treeCheckable
                    treeNodeFilterProp="title"
                    treeData={postOptions}
                    dropdownStyle={{ maxHeight: 400, overflow: 'auto' }}
                    treeDefaultExpandAll/>
                </Form.Item>
              </Col>
              <Col span={12} />
            </Row>
          </Form>
        </div>


      </Modal>
    );
  }, [showAddOrg, orgData, jobData]);
};

export default ModalAddOrg
