import React, {
  useState,
  useCallback,
  useRef,
  useEffect,
  useImperativeHandle,
  forwardRef,
} from 'react';
import css from '../index.less';

import { PageHeaderWrapper, ProCard } from '@ant-design/pro-layout';
import {
  Card,
  Button,
  Form,
  Input,
  Select,
  TimePicker,
  InputNumber,
  Divider,
  Layout,
  Anchor,
  Modal,
} from 'antd';
import moment from 'moment';
import TableTreeDropdown from './tableTreeDropdown';
import { submit } from '../../../services/chartSetting';
import CopyPopConfirm from './copyPopConfirm';
import AppContext from '@/utils/AppContext';

const { Sider, Content } = Layout;
const { Link } = Anchor;

const modalWidth = '710px';

const { RangePicker } = TimePicker;

const dateformat = 'HH:mm';

const { Option } = Select;

let ChartSetting = (props, ref) => {
  const [chartType, setChartType] = useState('day');

  const [visible, setVisible] = useState(false);

  const [confirmLoading, setConfirmLoading] = useState(false);
  const showDialog = useCallback(() => setVisible(true), []);
  const hiddenDialog = useCallback(() => setVisible(false), []);

  let { initialValues, indexTree } = props;

  // 锚点点击不跳转新路由
  const handleClickFun = (e, link) => {
    e.preventDefault();
  };

  useImperativeHandle(ref, () => ({
    // changeVal 就是暴露给父组件的方法
    showDialog: showDialog,
  }));

  const onFinish = (values) => {
    //console.log(values);
  };

  // 生成前端数据方法
  const dataConver = (res) => {
    Object.keys(res).forEach((prop) => {
      if (prop == 'publicParams_refreshStartTime' || prop == 'publicParams_refreshStopTime') {
        const value = moment(res[prop], dateformat);
        if (!res[`publicParams_refreshTime`]) {
          res[`publicParams_refreshTime`] = [];
        }
        if (prop == 'publicParams_refreshStartTime') {
          res[`publicParams_refreshTime`][0] = value;
        } else {
          res[`publicParams_refreshTime`][1] = value;
        }
      } else {
        if (prop.indexOf('_indexCode') > 0 && !Array.isArray(res[prop])) {
          // 需要转化为数组
          if(res[prop] != null){
            res[prop] = res[prop].split(',');
          }
        }
      }
    });
    // console.log(111, res);
    return res;
  };

  // 生成后端数据方法
  const dataReConver = (_params) => {
    const params = {};
    Object.keys(_params).forEach((prop) => {
      const value = _params[prop];
      if (prop == 'publicParams_refreshTime') {
        params.publicParams_refreshStartTime = value[0].format('HH:mm:ss');
        params.publicParams_refreshStopTime = value[1].format('HH:mm:ss');
      } else {
        const value = Array.isArray(_params[prop]) ? _params[prop].join(',') : _params[prop];
        params[prop] = value;
      }
    });
    return params;
  };

  const [form] = Form.useForm();

  initialValues = dataConver(initialValues);

  useEffect(() => {
    form.setFieldsValue(initialValues);
  }, [visible]);

  const onOk = async (e) => {
    // 校验
    try {
      const validResult = await form.validateFields();
    } catch (error) {
      return;
    }

    const _params = form.getFieldsValue();

    // 组合参数
    const params = dataReConver(_params);
    // 提交
    const res = await submit(params);

    if (res) {
      AppContext.session.set('interval', params.publicParams_interval * 1000 + ''); //滚动频率存入缓存
      props.resetInterval();   //重置滚动播放时间
      setVisible(false);
    }
  };

  // 校验规则
  const checkDiy = (rule, value, callback) => {
    if (Array.isArray(value) && value.length > 0) {
      return Promise.resolve();
    } else {
      return Promise.reject('请填写指标范围');
    }
  };

  const checkDiy15 = (rule, value, callback) => {
    if (Array.isArray(value) && value.length > 0) {
      if (value.length > 15) {
        return Promise.reject('选择个数不得超过15个');
      } else {
        return Promise.resolve();
      }
    } else {
      return Promise.reject('请填写指标范围');
    }
  };

  return (
    <Modal
      visible={visible}
      onOk={onOk}
      onCancel={hiddenDialog}
      confirmLoading={confirmLoading}
      wrapClassName={css.largeScreen}
      title="大屏参数配置"
      bodyStyle={{ padding: 0 }}
      width={modalWidth}
      // forceRender={true}
      initialValues={initialValues}
      getContainer={false}
    >
      <section className="a-card" style={{ height: '100%' }}>
        <div className="a-card-body a-card-body-aside">
          <aside className="a-card-body-sidebar p-4">
            <Anchor
              onClick={(e, link) => handleClickFun(e, link)}
              getContainer={() => document.getElementById('content')}
            >
              <Link href="#publicParams" title="公共参数" />
              <Link href="#indexProfile" title="指标监控情况统计" />
              <Link href="#portProfile" title="组合监控情况统计" />
              <Link href="#mainIndexProfile" title="重点指标监控详情" />
              <Link href="#todayFailIndexTopN" title="异常组合TOP N" />
              <Link href="#indexTrend" title="指标监控状态走势" />
              <Link href="#portTrend" title="组合监控状态走势" />
              <Link href="#failIndexTopN" title="异常指标TOP N" />
              <Link href="#mainIndexFailTopN" title="重点指标异常组合TOP N" />
            </Anchor>
          </aside>
          <div id="content" style={{ height: '450px' }} className="a-card-content">
            <div id="publicParams" />
            <Form
              form={form}
              initialValues={initialValues}
              style={{ height: '100%', padding: '0 20px' }}
              labelCol={{ span: 8 }}
              wrapperCol={{ span: 16 }}
              className={`${css.modalWrapper} p-4`}
              name="control-ref"
              onFinish={onFinish}
            >
              <Form.Item style={{ paddingLeft: '18px', marginBottom: '16px' }}>公共参数</Form.Item>

              <div className="form-line">
                每日刷新起止时间&nbsp;
                <Form.Item
                  name="publicParams_refreshTime"
                  rules={[{ required: true, message: '请输入每日起止时间' }]}
                  style={{ display: 'inline-block', width: 'calc(75% - 8px)', marginBottom: 0 }}
                >
                  <RangePicker
                    style={{
                      background: 'rgba(0, 0, 0, 0.2)',
                      border: '1px solid rgba (255, 255, 255, 0.2)',
                      color: '#fff',
                    }}
                  />
                </Form.Item>
              </div>

              <div className="form-line">
                刷新频率为每&nbsp;
                <span>
                  <Form.Item
                    name="publicParams_frequency"
                    rules={[{ required: true, message: '请输入刷新频率' }]}
                  >
                    <Select
                      placeholder=""
                      allowClear
                      style={{
                        width: '120px',
                      }}
                    >
                      <Option value="5">5</Option>
                      <Option value="10">10</Option>
                      <Option value="20">20</Option>
                      <Option value="30">30</Option>
                      <Option value="40">40</Option>
                      <Option value="50">50</Option>
                      <Option value="60">60</Option>
                    </Select>
                  </Form.Item>
                </span>
                &nbsp; 分钟刷新一次。
              </div>

              <div className="form-line">
                业务日期为T-&nbsp;
                <Form.Item
                  name="publicParams_businessDate"
                  rules={[{ required: true, message: '请输入业务日期' }]}
                >
                  <InputNumber min={0} max={5} />
                </Form.Item>
                &nbsp;日。
              </div>

              <div className="form-line">
                滚动频率&nbsp;
                <Form.Item
                  name="publicParams_interval"
                  rules={[{ required: true, message: '请输入滚动频率' }]}
                >
                  <Select
                    placeholder="请选择"
                    allowClear
                    style={{
                      width: '110px',
                    }}
                  >
                    <Option value="5">5</Option>
                    <Option value="10">10</Option>
                    <Option value="20">20</Option>
                    <Option value="30">30</Option>
                    <Option value="40">40</Option>
                    <Option value="50">50</Option>
                    <Option value="60">60</Option>
                  </Select>
                </Form.Item>
                秒
              </div>

              <Divider className="divider" />

              <Form.Item style={{ paddingLeft: '18px', marginBottom: '16px' }}>
                <div id="indexProfile" />
                指标监控情况统计
              </Form.Item>

              <div className="form-line">
                指标范围&nbsp;
                <Form.Item
                  shouldUpdate={true}
                  style={{ display: 'flex' }}
                  name="indexProfile_indexCode"
                  rules={[
                    {
                      validator: checkDiy,
                    },
                  ]}
                >
                  <TableTreeDropdown data={indexTree} />
                </Form.Item>
                &nbsp;&nbsp;
                <CopyPopConfirm
                  form={form}
                  from="indexProfile_indexCode"
                  data={[
                    {
                      name: '组合监控情况统计',
                      value: 'portProfile',
                    },
                    {
                      name: '异常组合TOP N',
                      value: 'failPortTopN',
                    },
                    {
                      name: '指标监控状态走势',
                      value: 'indexTrend',
                    },
                    {
                      name: '组合监控状态走势',
                      value: 'portTrend',
                    },
                    {
                      name: '异常指标TOP N',
                      value: 'failIndexTopN',
                    },
                    {
                      name: '重点指标异常组合TOP N',
                      value: 'mainIndexFailTopN',
                    },
                  ]}
                />
              </div>

              <Divider className="divider" />

              <Form.Item style={{ paddingLeft: '18px', marginBottom: '16px' }}>
                <div id="portProfile" />
                组合监控情况统计
              </Form.Item>

              <div className="form-line">
                指标范围&nbsp;
                <Form.Item
                  shouldUpdate={true}
                  style={{ display: 'flex' }}
                  name="portProfile_indexCode"
                  rules={[
                    {
                      validator: checkDiy,
                    },
                  ]}
                >
                  <TableTreeDropdown data={indexTree} />
                </Form.Item>
                &nbsp;&nbsp;
                <CopyPopConfirm
                  from="portProfile_indexCode"
                  form={form}
                  data={[
                    {
                      name: '指标监控情况统计',
                      value: 'indexProfile',
                    },
                    {
                      name: '异常组合TOP N',
                      value: 'failPortTopN',
                    },
                    {
                      name: '指标监控状态走势',
                      value: 'indexTrend',
                    },
                    {
                      name: '组合监控状态走势',
                      value: 'portTrend',
                    },
                    {
                      name: '异常指标TOP N',
                      value: 'failIndexTopN',
                    },
                    {
                      name: '重点指标异常组合TOP N',
                      value: 'mainIndexFailTopN',
                    },
                  ]}
                />
              </div>

              <Divider className="divider" />

              <Form.Item style={{ paddingLeft: '18px', marginBottom: '16px' }}>
                <div id="mainIndexProfile" />
                重点指标监控详情
              </Form.Item>

              <div className="form-line">
                指标范围&nbsp;
                <Form.Item
                  style={{ display: 'flex' }}
                  name="mainIndexProfile_indexCode"
                  rules={[
                    {
                      validator: checkDiy15,
                    },
                  ]}
                >
                  <TableTreeDropdown data={indexTree} />
                </Form.Item>
              </div>

              <Divider className="divider" />

              <Form.Item style={{ paddingLeft: '18px', marginBottom: '16px' }}>
                <div id="todayFailIndexTopN" />
                异常组合TOP N
              </Form.Item>

              <div className="form-line">
                指标范围&nbsp;
                <Form.Item
                  style={{ display: 'flex' }}
                  name="failPortTopN_indexCode"
                  rules={[
                    {
                      validator: checkDiy,
                    },
                  ]}
                >
                  <TableTreeDropdown data={indexTree} />
                </Form.Item>
                &nbsp;&nbsp;
                <CopyPopConfirm
                  from="failPortTopN_indexCode"
                  form={form}
                  data={[
                    {
                      name: '指标监控情况统计',
                      value: 'indexProfile',
                    },
                    {
                      name: '组合监控情况统计',
                      value: 'portProfile',
                    },
                    {
                      name: '指标监控状态走势',
                      value: 'indexTrend',
                    },
                    {
                      name: '组合监控状态走势',
                      value: 'portTrend',
                    },
                    {
                      name: '异常指标TOP N',
                      value: 'failIndexTopN',
                    },
                    {
                      name: '重点指标异常组合TOP N',
                      value: 'mainIndexFailTopN',
                    },
                  ]}
                />
              </div>

              <div className="form-line">
              展示异常组合TOP&nbsp;
                <Form.Item
                  name="failPortTopN_topN"
                  style={{ display: 'flex' }}
                  rules={[{ required: true, message: '请输入topN' }]}
                >
                  <InputNumber min={10} max={15} />
                </Form.Item>
                &nbsp;&nbsp;
                <CopyPopConfirm
                  from="failPortTopN_topN"
                  form={form}
                  data={[
                    {
                      name: '指标监控情况统计',
                      value: 'indexProfile',
                    },
                    {
                      name: '组合监控情况统计',
                      value: 'portProfile',
                    },
                    {
                      name: '指标监控状态走势',
                      value: 'indexTrend',
                    },
                    {
                      name: '组合监控状态走势',
                      value: 'portTrend',
                    },
                    {
                      name: '异常指标TOP N',
                      value: 'failIndexTopN',
                    },
                    {
                      name: '重点指标异常组合TOP N',
                      value: 'mainIndexFailTopN',
                    },
                  ]}
                />
              </div>

              <Divider className="divider" />

              <Form.Item style={{ paddingLeft: '18px', marginBottom: '16px' }}>
                <div id="indexTrend" />
                指标监控状态走势
              </Form.Item>

              <div className="form-line">
                指标范围&nbsp;
                <Form.Item
                  name="indexTrend_indexCode"
                  style={{ display: 'flex' }}
                  rules={[
                    {
                      validator: checkDiy,
                    },
                  ]}
                >
                  <TableTreeDropdown data={indexTree} />
                </Form.Item>
                &nbsp;&nbsp;
                <CopyPopConfirm
                  form={form}
                  from="indexTrend_indexCode"
                  data={[
                    {
                      name: '指标监控情况统计',
                      value: 'indexProfile',
                    },
                    {
                      name: '组合监控情况统计',
                      value: 'portProfile',
                    },
                    {
                      name: '异常组合TOP N',
                      value: 'failPortTopN',
                    },
                    {
                      name: '组合监控状态走势',
                      value: 'portTrend',
                    },
                    {
                      name: '异常指标TOP N',
                      value: 'failIndexTopN',
                    },
                    {
                      name: '重点指标异常组合TOP N',
                      value: 'mainIndexFailTopN',
                    },
                  ]}
                />
              </div>

              <Divider className="divider" />

              <Form.Item style={{ paddingLeft: '18px', marginBottom: '16px' }}>
                <div id="portTrend" />
                组合监控状态走势
              </Form.Item>

              <div className="form-line">
                指标范围&nbsp;
                <Form.Item
                  style={{ display: 'flex' }}
                  name="portTrend_indexCode"
                  rules={[
                    {
                      validator: checkDiy,
                    },
                  ]}
                >
                  <TableTreeDropdown data={indexTree} />
                </Form.Item>
                &nbsp;&nbsp;
                <CopyPopConfirm
                  from="portTrend_indexCode"
                  form={form}
                  data={[
                    {
                      name: '指标监控情况统计',
                      value: 'indexProfile',
                    },
                    {
                      name: '组合监控情况统计',
                      value: 'portProfile',
                    },
                    {
                      name: '异常组合TOP N',
                      value: 'failPortTopN',
                    },
                    {
                      name: '指标监控状态走势',
                      value: 'indexTrend',
                    },
                    {
                      name: '异常指标TOP N',
                      value: 'failIndexTopN',
                    },
                    {
                      name: '重点指标异常组合TOP N',
                      value: 'mainIndexFailTopN',
                    },
                  ]}
                />
              </div>

              <Divider className="divider" />

              <Form.Item style={{ paddingLeft: '18px', marginBottom: '16px' }}>
                <div id="failIndexTopN" />
                异常指标TOP N
              </Form.Item>

              <div className="form-line">
                指标范围&nbsp;
                <Form.Item
                  style={{ display: 'flex' }}
                  name="failIndexTopN_indexCode"
                  rules={[
                    {
                      validator: checkDiy,
                    },
                  ]}
                >
                  <TableTreeDropdown data={indexTree} />
                </Form.Item>
                &nbsp;&nbsp;
                <CopyPopConfirm
                  from="failIndexTopN_indexCode"
                  form={form}
                  data={[
                    {
                      name: '指标监控情况统计',
                      value: 'indexProfile',
                    },
                    {
                      name: '组合监控情况统计',
                      value: 'portProfile',
                    },
                    {
                      name: '异常组合TOP N',
                      value: 'failPortTopN',
                    },
                    {
                      name: '指标监控状态走势',
                      value: 'indexTrend',
                    },
                    {
                      name: '组合监控状态走势',
                      value: 'portTrend',
                    },
                    {
                      name: '重点指标异常组合TOP N',
                      value: 'mainIndexFailTopN',
                    },
                  ]}
                />
              </div>

              <div className="form-line">
              展示异常指标TOP&nbsp;
                <Form.Item
                  name="failIndexTopN_topN"
                  rules={[{ required: true, message: '请输入top10' }]}
                >
                  <InputNumber min={10} max={15} />
                </Form.Item>
                &nbsp;&nbsp;
                <CopyPopConfirm
                  from="failIndexTopN_topN"
                  form={form}
                  data={[
                    {
                      name: '指标监控情况统计',
                      value: 'indexProfile',
                    },
                    {
                      name: '组合监控情况统计',
                      value: 'portProfile',
                    },
                    {
                      name: '异常组合TOP N',
                      value: 'failPortTopN',
                    },
                    {
                      name: '指标监控状态走势',
                      value: 'indexTrend',
                    },
                    {
                      name: '组合监控状态走势',
                      value: 'portTrend',
                    },
                    {
                      name: '重点指标异常组合TOP N',
                      value: 'mainIndexFailTopN',
                    },
                  ]}
                />
              </div>

              <Divider className="divider" />

              <Form.Item style={{ paddingLeft: '18px', marginBottom: '16px' }}>
                <div id="mainIndexFailTopN" />
                重点指标异常组合TOP N &nbsp;
              </Form.Item>

              <div className="form-line">
                指标范围&nbsp;
                <Form.Item
                  style={{ display: 'flex' }}
                  name="mainIndexFailTopN_indexCode"
                  rules={[
                    {
                      validator: checkDiy,
                    },
                  ]}
                >
                  <TableTreeDropdown data={indexTree} />
                </Form.Item>
                &nbsp;&nbsp;
                <CopyPopConfirm
                  from="mainIndexFailTopN_indexCode"
                  form={form}
                  data={[
                    {
                      name: '指标监控情况统计',
                      value: 'indexProfile',
                    },
                    {
                      name: '组合监控情况统计',
                      value: 'portProfile',
                    },
                    {
                      name: '异常组合TOP N',
                      value: 'failPortTopN',
                    },
                    {
                      name: '指标监控状态走势',
                      value: 'indexTrend',
                    },
                    {
                      name: '组合监控状态走势',
                      value: 'portTrend',
                    },
                    {
                      name: '异常指标TOP N',
                      value: 'failIndexTopN',
                    },
                  ]}
                />
              </div>

              <div className="form-line">
              展示重点指标异常组合TOP&nbsp;
                <Form.Item
                  name="mainIndexFailTopN_topN"
                  rules={[{ required: true, message: '请输入top10' }]}
                >
                  <InputNumber min={10} max={15} />
                </Form.Item>
                &nbsp;&nbsp;
                <CopyPopConfirm
                  from="mainIndexFailTopN_topN"
                  form={form}
                  data={[
                    {
                      name: '指标监控情况统计',
                      value: 'indexProfile',
                    },
                    {
                      name: '组合监控情况统计',
                      value: 'portProfile',
                    },
                    {
                      name: '异常组合TOP N',
                      value: 'failPortTopN',
                    },
                    {
                      name: '指标监控状态走势',
                      value: 'indexTrend',
                    },
                    {
                      name: '组合监控状态走势',
                      value: 'portTrend',
                    },
                    {
                      name: '异常指标TOP N',
                      value: 'failIndexTopN',
                    },
                    // {
                    //   name: '重点指标异常组合topN',
                    //   value: 'mainIndexFailTopN',
                    // },
                  ]}
                />
              </div>
            </Form>
          </div>
        </div>
      </section>
    </Modal>
  );
};
ChartSetting = forwardRef(ChartSetting);

export default ChartSetting;
