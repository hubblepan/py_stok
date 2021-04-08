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



const ModalAddUser = ({showAddUser, setShowAddUser, mode, originUser}) => {
  const [userParams, setUserParams] = useState({
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
  });
  const [orgData, setOrgData] = useState([]);
  const [jobData, setJobData] = useState([]); //  "id":"", "c_DV_CODE":"OC1", "c_DV_NAME":"职员1", "c_DV_TYPE":"JOB_TITLE", "n_ORDER":"1", "c_DESC":"职务类型", "c_AUTH_ORG_CODE":"[root]"
  const [form1] = Form.useForm();
  const [form2] = Form.useForm();
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

  const copyUserToForm = (user) => {
    form1.setFieldsValue({
      c_USER_CODE: user.c_USER_CODE,
      c_USER_NAME: user.c_USER_NAME,
      c_CORP_ORG_CODE: user.c_CORP_ORG_CODE,
      c_DV_JOB_TITLE: user.c_DV_JOB_TITLE,
      c_USER_PWD: '',
      password2: '',
      c_IP: user.c_IP,
      c_MAC: user.c_MAC,
      c_USER_JOB_NUM: user.c_USER_JOB_NUM,
      c_Sex: user.c_Sex,
      c_JOB_NUM_LOGIN: user.c_JOB_NUM_LOGIN === '1',
    });
    form2.setFieldsValue({
      c_DV_CARD_TYPE: user.c_DV_CARD_TYPE,
      c_CARD_NO: user.c_CARD_NO,
      c_OFFIC_TEL: user.c_OFFIC_TEL,
      c_MO_TEL: user.c_MO_TEL,
      c_EMAIL: user.c_EMAIL,
      c_FAX_NO: user.c_FAX_NO,
      c_ZIP_CODE: user.c_ZIP_CODE,
      c_OFFIC_ADDR: user.c_OFFIC_ADDR,
      d_EFF_ENDDATE: user.d_EFF_DATE && user.d_EFF_ENDDATE ? [moment(user.d_EFF_DATE), moment(user.d_EFF_ENDDATE)] : undefined,
      d_BIRTH: user.d_BIRTH ? moment(user.d_BIRTH) : undefined,
      d_ON_JOB: user.d_ON_JOB ? moment(user.d_ON_JOB) : undefined,
    });
    // d_EFF_ENDDATE: [],
    //   d_BIRTH: '',
    //   d_ON_JOB: '',
  }

  // 当对话框显示时： 清除表单, 获取部门数据 和 职务数据
  useEffect(() => {
    if (showAddUser) {
      console.log('xxxxxxxx',  '清除表单值');
      form1.resetFields();
      form2.resetFields();
      // 获取 部门数据
      getOrgData();
      // 获取 职务数据
      getJobData();
      // 修改模式
      if (mode === 'edit') {
        // id 不可改
        // 将 user值 复制到 form
        setUserParams({...userParams, ...originUser});
        copyUserToForm(originUser);
        return;
      }
      // 复制模式
      if (mode === 'copy') {
        // 将 user值 复制到 form
        copyUserToForm(originUser);
        return;
      }
    }
  }, [showAddUser]);



  const handleOk = () => {
    let mergeForm = {};
    // 对表单的值进行校验
    form1.validateFields()
      .then(values1 => {
        mergeForm = {...values1};
        return form2.validateFields();
      })
      .then(values2 => {
        // 校验通过后， 对时间类型的数据 和 密码数据 进行转换
        mergeForm = {...mergeForm, ...values2};
        // 职位状态 和 密码标识的数据处理
        mergeForm.c_DV_STATE = "DISB"; // 新增，修改，复制都要变为 DISB
        if (originUser && originUser.c_DV_STATE === 'ENAB') {
          mergeForm.C_PASS_MARK = "D";
        } else {
          mergeForm.C_PASS_MARK = "E";
        }
        if (mode === 'add' || mode === 'copy') {
          mergeForm.C_PASS_MARK = "S";
        }


        if (mergeForm.d_EFF_ENDDATE && mergeForm.d_EFF_ENDDATE.length > 0) {
          [mergeForm.d_EFF_DATE, mergeForm.d_EFF_ENDDATE] =  mergeForm.d_EFF_ENDDATE.map(item => item.format('YYYY-MM-DD'));
        } else {
          mergeForm.d_EFF_DATE = '';
          mergeForm.d_EFF_ENDDATE = '';
        }
        if (mergeForm.d_BIRTH) {
          mergeForm.d_BIRTH = mergeForm.d_BIRTH.format('YYYY-MM-DD');
        } else {
          mergeForm.d_BIRTH = '';
        }

        if (mergeForm.d_ON_JOB) {
          mergeForm.d_ON_JOB = mergeForm.d_ON_JOB.format('YYYY-MM-DD');
        } else {
          mergeForm.d_BIRTH = ''
        }


        console.log('日期的值', mergeForm, mergeForm.d_EFF_ENDDATE, mergeForm.d_BIRTH, mergeForm.d_ON_JOB);
        // 获取加密类型
        return request.post('/YSSUCOBRIDGE/ws/com/yss/platform/support/system/user/controller/IUserController/getEncryptType', {
          params: {'serviceId': 'osgi-fast'}
        });
      })
      .then(res => {
        const encrypt = res.data;
        if (encrypt === '1') { // sm
          mergeForm.c_ENCRYPT = 'sm';
          mergeForm.c_USER_PWD = sm3(mergeForm.c_USER_PWD).toUpperCase();
        } else if (encrypt === '2') { // sha
          mergeForm.c_ENCRYPT = 'sha';
          mergeForm.c_USER_PWD = sha256(mergeForm.c_USER_PWD).toUpperCase();
        }
        mergeForm.password2 = undefined;
        // 暂时不支持动态密码
        mergeForm.c_DYN_PSD = '0';
        mergeForm.c_USER_DYN_PWD = '';

        mergeForm.operator = AppContext.getUserCode();
        mergeForm.auditDate= moment().format('YYYY-MM-DD hh:mm:ss');
        mergeForm.modifier = AppContext.getUserCode();
        mergeForm.modifyDate = moment().format('YYYY-MM-DD hh:mm:ss');

        // 工号登录
        mergeForm.c_JOB_NUM_LOGIN = mergeForm.c_JOB_NUM_LOGIN ? '1' : '0';
        // 提交表单
        if (mode === 'edit') {
          return request.post('/YSSUCOBRIDGE/ws/com/yss/platform/support/system/user/controller/IUserController/updateById/list', {
            params: commParams,
            data: [{...userParams, ...mergeForm}],
          });
        }
        return request.post('/YSSUCOBRIDGE/ws/com/yss/platform/support/system/user/controller/IUserController/insert/list', {
          params: commParams,
          data: [{...userParams, ...mergeForm, id: ''}],
        });
      })
      .then(res => {
        MsgBox.success({message: '提交成功'});
      })
      .catch(errorInfo => {
        console.log(errorInfo);
      });

    // setShowAddUser(false);
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
      <Modal title="新增" visible={showAddUser} onOk={handleOk} onCancel={handleCancel} width="35%">
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
                  label="用户ID"
                  name="c_USER_CODE"
                  rules={[
                    { required: true, message: '请输入用户ID' },
                    {
                      validator: async (_, value) => {
                        if (mode !== 'edit') {
                          const res = await request.post('/YSSUCOBRIDGE/ws/com/yss/fast/right/support/right/authorg/controller/IAuthOrgServiceController/getCodeNum', {params: commParams, data: value})
                          if (res?.data === '1') {
                            // 用户ID 已存在
                            return Promise.reject(new Error('用户ID已存在'));
                          }
                        }
                        return Promise.resolve();
                      }
                    },
                  ]}
                >
                  <Input disabled={mode === 'edit'}/>
                </Form.Item>
              </Col>
              <Col span={12}>
                <Form.Item
                  label="用户名"
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
                  label="所属部门"
                  name="c_CORP_ORG_CODE"
                  rules={[{ required: true, message: '请选择所属部门' }]}
                >
                  <TreeSelect
                    label="部门"
                    showSearch
                    treeData={orgData}
                    dropdownStyle={{ maxHeight: 400, overflow: 'auto' }}
                    treeDefaultExpandAll/>
                </Form.Item>
              </Col>
              <Col span={12}>
                <Form.Item
                  label="职务"
                  name="c_DV_JOB_TITLE"
                  rules={[{ required: true, message: '请选择职务' }]}
                >
                  <TreeSelect
                    label="职务"
                    showSearch
                    treeData={jobData}
                    dropdownStyle={{ maxHeight: 400, overflow: 'auto' }}
                    treeDefaultExpandAll/>
                </Form.Item>
              </Col>
            </Row>

            <Row>
              <Col span={12}>
                <Form.Item
                  label="初始密码"
                  name="c_USER_PWD"
                  rules={[{ required: mode !== 'edit', message: '请输入初始密码' }]}
                >
                  <Input.Password />
                </Form.Item>
              </Col>
              <Col span={12}>
                <Form.Item
                  label="确认密码"
                  name="password2"
                  dependencies={['c_USER_PWD']}
                  rules={[
                    { required: mode !== 'edit', message: '请输入确认密码' },
                    ({ getFieldValue }) => ({
                      validator(_, value) {
                        if (!value || getFieldValue('c_USER_PWD') === value) {
                          return Promise.resolve();
                        }
                        return Promise.reject(new Error('两次密码不一致!'));
                      },
                    }),
                  ]}
                >
                  <Input.Password />
                </Form.Item>
              </Col>
            </Row>

            <Row>
              <Col span={12}>
                <Form.Item
                  label="登录IP地址"
                  name="c_IP"
                  rules={[{message: 'IP地址格式不正确', pattern: /^(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])\.(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])\.(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])\.(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])$/}]}
                >
                  <Input />
                </Form.Item>
              </Col>
              <Col span={12}>
                <Form.Item
                  label="Mac地址"
                  name="c_MAC"
                >
                  <Input />
                </Form.Item>
              </Col>
            </Row>

            <Row>
              <Col span={12}>
                <Form.Item
                  label="用户工号"
                  name="c_USER_JOB_NUM"
                  dependencies={['c_JOB_NUM_LOGIN']}
                  rules={[
                    ({ getFieldValue }) => ({
                      async validator(_, value) {
                        if (getFieldValue('c_JOB_NUM_LOGIN')) {
                          if (!value) {
                            return Promise.reject(new Error('工号登录时, 用户工号不能为空!'));
                          }

                          if (mode !== 'edit') {
                            const res = await request.post('/YSSUCOBRIDGE/ws/com/yss/fast/right/support/right/authorg/controller/IAuthOrgServiceController/getCodeNum', {params: commParams, data: `userCode=${ getFieldValue('C_USER_CODE') }&jobNum=${  value}`})
                            if (res?.data === '1') {
                              // 用户工号 已存在
                              return Promise.reject(new Error('用户工号已存在'));
                            }
                          }
                        }
                        return Promise.resolve();
                      },
                    }),
                    // ({ getFieldValue }) => ({
                    //   async validator(_, value) {
                    //     if (getFieldValue('c_JOB_NUM_LOGIN')) {
                    //       if (!value) {
                    //         return Promise.reject(new Error('请输入工号!'));
                    //       }
                    //       const res = await request.post('/YSSUCOBRIDGE/ws/com/yss/fast/right/support/right/authorg/controller/IAuthOrgServiceController/getCodeNum', {params: commParams, data: `userCode=${ getFieldValue('C_USER_CODE') }&jobNum=${  value}`})
                    //       if (res?.data === '1') {
                    //         // 用户工号 已存在
                    //         return Promise.reject(new Error('用户工号已存在'));
                    //       }
                    //       // 用户工号 不存在
                    //       return Promise.resolve();
                    //
                    //     }
                    //     return Promise.resolve();
                    //
                    //   },
                    // }),
                  ]}
                >
                  <Input />
                </Form.Item>
              </Col>
              <Col span={12}>
                <Form.Item
                  label="性别"
                  name="c_Sex"
                >
                  <Select>
                    <Select.Option value="MALE">男</Select.Option>
                    <Select.Option value="FEMALE">女</Select.Option>
                  </Select>
                </Form.Item>
              </Col>
            </Row>

            <Row>
              <Col span={12}>
                <Form.Item
                  label=" "
                  name="c_JOB_NUM_LOGIN"
                  valuePropName="checked"
                >
                  <Checkbox>支持使用工号登录</Checkbox>
                </Form.Item>
              </Col>
            </Row>
          </Form>
          <Divider style={{margin: '0 20px 20px 0px'}}/>
          <Title level={5}>个人信息</Title>
          <Form
            name="personalInfo"
            form={form2}
            {...layout}>
            <Row>
              <Col span={12}>
                <Form.Item
                  label="证件类型"
                  name="c_DV_CARD_TYPE"
                >
                  <Select defaultValue="">
                    <Select.Option value="SFZ">身份证</Select.Option>
                    <Select.Option value="JSZ">驾驶证</Select.Option>
                    <Select.Option value="SBZ">社保证</Select.Option>
                    <Select.Option value="GZZ">工作证</Select.Option>
                  </Select>
                </Form.Item>
              </Col>
              <Col span={12}>
                <Form.Item
                  label="证件号码"
                  name="c_CARD_NO"
                >
                  <Input />
                </Form.Item>
              </Col>
            </Row>

            <Row>
              <Col span={12}>
                <Form.Item
                  label="证件有效期"
                  name="d_EFF_ENDDATE"
                >
                  <DatePicker.RangePicker />
                </Form.Item>
              </Col>
              <Col span={12}>
                <Form.Item
                  label="出生日期"
                  name="d_BIRTH"
                >
                  <DatePicker style={{width: '100%'}}/>
                </Form.Item>
              </Col>
            </Row>

            <Row>
              <Col span={12}>
                <Form.Item
                  label="入职日期"
                  name="d_ON_JOB"
                >
                  <DatePicker style={{width: '100%'}}/>
                </Form.Item>
              </Col>
              <Col span={12}>
                <Form.Item
                  label="办公电话"
                  name="c_OFFIC_TEL"
                >
                  <Input />
                </Form.Item>
              </Col>
            </Row>

            <Row>
              <Col span={12}>
                <Form.Item
                  label="移动电话"
                  name="c_MO_TEL"
                >
                  <Input />
                </Form.Item>
              </Col>
              <Col span={12}>
                <Form.Item
                  label="E-MAIL"
                  name="c_EMAIL"
                  rules={[{message: '邮箱格式不正确', pattern: /^\w+([-+.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/}]}
                >
                  <Input />
                </Form.Item>
              </Col>
            </Row>

            <Row>
              <Col span={12}>
                <Form.Item
                  label="传真号码"
                  name="c_FAX_NO"
                >
                  <Input />
                </Form.Item>
              </Col>
              <Col span={12}>
                <Form.Item
                  label="邮政编码"
                  name="c_ZIP_CODE"
                >
                  <Input />
                </Form.Item>
              </Col>
            </Row>
            <Row>
              <Col span={12}>
                <Form.Item
                  label="办公地址"
                  name="c_OFFIC_ADDR"
                >
                  <Input />
                </Form.Item>
              </Col>
            </Row>
          </Form>
        </div>


      </Modal>
    );
  }, [showAddUser, orgData, jobData]);
};

export default ModalAddUser
