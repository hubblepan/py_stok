/**
 * 详情修改按钮
 */
import css from './style.less';
import React, {
  useState,
  useRef,
  useEffect,
  useLayoutEffect,
  useCallback,
  createContext,
} from 'react';

import request from '@/utils/request';
import {
  PlusCircleOutlined,
  EditOutlined,
  CopyOutlined,
  CloseOutlined,
  FullscreenOutlined,
  FileDoneOutlined,
  ExceptionOutlined,
  FilterOutlined,
  MoreOutlined,
  SettingOutlined,
  SyncOutlined,
  SearchOutlined,
  CalendarOutlined,
  DownOutlined,
  ProfileOutlined,
  DoubleRightOutlined,
  DeleteOutlined,
  FileSyncOutlined,
} from '@ant-design/icons';
import {
  Button,
  Input,
  Select,
  Table,
  Pagination,
  Row,
  Col,
  Modal,
  Cascader,
  Dropdown,
  Menu,
  message,
  Tooltip,
  Form,
  Collapse,
  DatePicker,
  Drawer,
} from 'antd';
import QuarkModal from '@/components/QuarkModal';
import QuarkDrawer from '@/components/QuarkDrawer';
import TargetSubService from '../services/TargetSubService';
import QuarkTable from '@/components/QuarkTable';
import DropdownSelect from '@/components/DropDownSelect/index.js';
import { Spin } from 'antd';

const service = new TargetSubService();
const { Option } = Select;

const { Panel } = Collapse;

const EditDetailModal = (props) => {
  const {
    detailVisible,
    detailData,
    setDetailVisitble,
    mode,
    currentSelect,
    handles,
    refresh,
  } = props;

  // console.log('选中行', currentSelect);

  const [form] = Form.useForm();
  const [triggerData, setTriggerData] = useState([]);

  const [indexTypesFlag, setIndexTypesFlag] = useState(false);
  const [indexTypes, setindexTypes] = useState([]);

  const [loading, setLoading] = useState(true);

  // 选中的行数据填充表单
  useEffect(() => {
    setLoading(true);
    if (detailVisible) {
      // 请求触发位置
      (async () => {
        const res = await service.triggerPosition(['MONITOR_EXEC_FUNCODE']);
        setTriggerData(res.data);

        // 请求指标分类-前置请求
        const indexTypesFlag = await service.getIndexTypeFlag();
        if (indexTypesFlag.data === 'true') {
          setIndexTypesFlag(true);
          // 继续请求下拉框
          const indexTypes = (await service.getIndexType({})).data;
          setindexTypes(indexTypes);
        } else {
          setIndexTypesFlag(false);
          // 如果上一个请求返回false，则不执行此请求，指标类型是文本框，值根据isPublic来显示，0显示组合指标，1显示公共指标，且不可编辑
        }

        window.setTimeout(() => {
          if (mode === 'edit') {
            // 设置数据
            form.setFieldsValue({
              ...currentSelect,
              indexType: indexTypesFlag
                ? currentSelect.indexType
                : currentSelect.isPublic == 0
                ? '组合指标'
                : '公共指标',
            });
          }
          if (mode == 'detail') {
            let executeFunCodes = [];
            const _executeFunCodes = currentSelect.executeFunCodes
              ? currentSelect.executeFunCodes.split('|')
              : [];

            res.data.forEach((x) => {
              _executeFunCodes.forEach((y) => {
                // console.log(123, x, y);
                if (x['c_DV_CODE'] === y) {
                  executeFunCodes.push(x['c_DV_NAME']);
                }
              });
            });
            console.log(123, res.data);
            executeFunCodes = executeFunCodes.join(',')
              ? executeFunCodes.join(',')
              : currentSelect.executeFunCodes;

            window.setTimeout(() => {
              form.setFieldsValue({
                ...currentSelect,
                indexType: indexTypesFlag
                  ? currentSelect.indexType
                  : currentSelect.isPublic == 0
                  ? '组合指标'
                  : '公共指标',
                executeFunCodes,
              });
            });
          }
          setLoading(false);
        });
      })();
    } else {
      // 清空表单
      form.resetFields();
    }
  }, [detailVisible]);

  const [panelText, setPanelText] = useState('收起更多信息');

  const toolBarDisabled = {
    unload: () => (detailData?.check === '1' ? true : false),
    check: () => (detailData?.check === '1' ? true : false),
    unCheck: () => (detailData?.check === '1' ? false : true),
  };

  // 表单域配置：详情detail全部置灰，新增add全部激活，edit写在此处下面
  const formFieldDisable = {
    indexCode: '指标代码',
    indexName: true,
    indexAlias: false,
    indexClassify: true,
    executeFunCodes: false,
    indexType: false,
    dataSource: true,
    indexLevel: true,
    indexParent: true,
    riskLevel: true,
    indexDesc: true,
    applyPort: false,
    busiScope: false,
    fetchLogic: false,
    monitorRule: false,
    remark: false,
  };

  const styles = {
    itemModal: {
      marginBottom: '10px',
    },
    deitalToolbarWrap: {
      display: mode === 'detail' ? 'block' : 'none',
    },
    detailToolbar: {
      flex: 1,
      textAlign: 'right',
    },
  };

  if (mode === 'add') {
    let obj = {};
    Object.keys(formFieldDisable).forEach((prop) => {
      formFieldDisable[prop] = false;
      obj[prop] = '';
      form.setFieldsValue(obj);
    });
  } else if (mode === 'detail') {
    Object.keys(formFieldDisable).forEach((prop) => {
      formFieldDisable[prop] = true;
    });
    form.setFieldsValue(detailData);
  } else {
    // 详情
    form.setFieldsValue(detailData);
  }

  // 校验并保存
  const handleOk = async () => {
    // 编辑状态
    if (mode === 'edit') {
      try {
        const fields = await form.validateFields();
        const params = {
          ...currentSelect,
          ...fields,
          indexType: Array.isArray(fields.indexType)
            ? fields.indexType.join(',')
            : fields.indexType,
        };
        const saveRes = await service.edit(params);
        setDetailVisitble(false);
        refresh();
      } catch (err) {
        console.log('捕捉错误', err);
      }
    }
  };

  const formItemLayout = {
    labelCol: { span: 6 },
    wrapperCol: { span: 18 },
  };

  // function handleChange(value) {
  //   console.log(`selected ${value}`);
  // }

  const [nameList, setNameList] = useState([]);

  // console.log(nameList);

  const [selected, setSelected] = useState([]);

  const content = (
    <>
      {/* 详情toolbar */}
      {/* <div style={styles.deitalToolbarWrap}>
        <div style={styles.detailToolbar}>
          <Button
            size="small"
            type="text"
            icon={<DeleteOutlined />}
            onClick={(e) => {
              handles.unload(currentSelect, () => {
                setDetailVisitble(false);
              });
            }}
            disabled={toolBarDisabled.unload()}
          >
            卸载
          </Button>
          <Button
            onClick={(e) => {
              handles.check(currentSelect, () => {
                setDetailVisitble(false);
              });
            }}
            size="small"
            icon={<FileDoneOutlined />}
            type="text"
            disabled={toolBarDisabled.check()}
          >
            审核
          </Button>
          <Button
            onClick={(e) => {
              handles.unCheck(currentSelect, () => {
                setDetailVisitble(false);
              });
            }}
            size="small"
            type="text"
            icon={<FileSyncOutlined />}
            disabled={toolBarDisabled.unCheck()}
          >
            反审核
          </Button>
        </div>
      </div> */}

      <Spin spinning={loading}>
        {' '}
        <Form colon={false} labelCol={8} form={form}>
          <h4>基本信息</h4>
          <Row gutter={[12, 12]}>
            <Col span={12}>
              <Form.Item
                {...formItemLayout}
                rules={[{ required: true, message: '请输入指标名称' }]}
                style={styles.itemModal}
                name="indexName"
                label="指标名称"
              >
                <Input disabled={formFieldDisable.indexName} />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                {...formItemLayout}
                rules={[{ required: true, message: '请输入指标别名' }]}
                style={styles.itemModal}
                name="indexAlias"
                label="指标别名"
              >
                <Input disabled={formFieldDisable.indexAlias} />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                {...formItemLayout}
                style={styles.itemModal}
                name="indexClassify"
                label="指标分类"
              >
                <Select disabled={formFieldDisable.indexClassify} />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                {...formItemLayout}
                style={styles.itemModal}
                name="executeFunCodes"
                label="触发位置"
              >
                {mode === 'detail' ? (
                  <Input disabled />
                ) : (
                  <DropdownSelect
                    maxHeight={170}
                    rowKey="c_DV_CODE"
                    name="c_DV_NAME" // 搜索词字段
                    bordered={true}
                    search={false}
                    value={content}
                    data={triggerData}
                    // footer={true}
                    columns={[{ dataIndex: 'c_DV_NAME', key: 'c_DV_NAME' }]}
                    onChange={(keys, rows) => {
                      const executeFunCodes = rows.map((x) => x['c_DV_CODE']).join('|');
                      form.setFieldsValue({ executeFunCodes });
                    }}
                    value={currentSelect ? currentSelect.executeFunCodes : null}
                  />
                )}
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                {...formItemLayout}
                style={styles.itemModal}
                name="indexType"
                label="指标类型"
              >
                {indexTypesFlag ? (
                  <Select
                    // mode="multiple"
                    allowClear
                    disabled={formFieldDisable.indexType}
                  >
                    {indexTypes.map((x) => {
                      return (
                        <Select.Option key={x['c_DV_CODE']} value={x['c_DV_CODE']}>
                          {x['c_DV_NAME']}
                        </Select.Option>
                      );
                    })}
                  </Select>
                ) : (
                  <Input disabled={true} />
                )}
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                {...formItemLayout}
                style={styles.itemModal}
                name="dataSource"
                label="来源界面"
              >
                <Select disabled={formFieldDisable.dataSource} />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                {...formItemLayout}
                style={styles.itemModal}
                name="indexLevel"
                label="指标级别"
              >
                <Select disabled={formFieldDisable.indexLevel} />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                {...formItemLayout}
                style={styles.itemModal}
                name="indexParent"
                label="父级指标"
              >
                <Select disabled={formFieldDisable.indexParent} />
              </Form.Item>
            </Col>

            <Col span={12}>
              <Form.Item
                {...formItemLayout}
                style={styles.itemModal}
                name="riskLevel"
                label="风险级别"
              >
                <Select disabled={formFieldDisable.riskLevel} />
              </Form.Item>
            </Col>
          </Row>

          <Row>
            <Col span={24}>
              <Form.Item
                labelCol={{ span: 3 }}
                // wrapperCol={21}
                style={styles.itemModal}
                name="indexDesc"
                label="功能简介"
              >
                <Input.TextArea
                  disabled={formFieldDisable.indexDesc}
                  autoSize={{ minRows: 3, maxRows: 5 }}
                />
              </Form.Item>
            </Col>
          </Row>

          <div style={styles.deitalToolbarWrap}>
            <Collapse
              ghost
              bordered={false}
              defaultActiveKey={['1']}
              expandIcon={({ isActive }) => <DoubleRightOutlined rotate={isActive ? 90 : 0} />}
              // className="site-collapse-custom-collapse"
              onChange={(e) => {
                setPanelText(e.length ? '收起更多信息' : '展开更多信息');
              }}
            >
              <Panel header={panelText} key="1" className="site-collapse-custom-panel">
                <Row gutter={[12, 12]}>
                  <Col span={12}>
                    <Form.Item
                      {...formItemLayout}
                      style={styles.itemModal}
                      name="applyPort"
                      label="适用组合"
                    >
                      <Input disabled={formFieldDisable.applyPort} />
                    </Form.Item>
                  </Col>
                  <Col span={12}>
                    <Form.Item
                      {...formItemLayout}
                      style={styles.itemModal}
                      name="busiScope"
                      label="业务范围"
                    >
                      <Input disabled={formFieldDisable.busiScope} />
                    </Form.Item>
                  </Col>
                </Row>

                <Row>
                  <Col span={24}>
                    <Form.Item
                      labelCol={{ span: 3 }}
                      // rules={[{ required: true, message: '请输入取数逻辑' }]}
                      style={styles.itemModal}
                      name="fetchLogic"
                      label="取数逻辑"
                    >
                      <Input.TextArea
                        disabled={formFieldDisable.fetchLogic}
                        autoSize={{ minRows: 3, maxRows: 5 }}
                      />
                    </Form.Item>
                  </Col>
                </Row>

                <Row>
                  <Col span={24}>
                    <Form.Item
                      labelCol={{ span: 3 }}
                      // rules={[{ required: true, message: '请输入监控规则' }]}
                      style={styles.itemModal}
                      name="monitorRule"
                      label="监控规则"
                    >
                      <Input.TextArea
                        disabled={formFieldDisable.monitorRule}
                        autoSize={{ minRows: 3, maxRows: 5 }}
                      />
                    </Form.Item>
                  </Col>
                </Row>

                <Row>
                  <Col span={24}>
                    <Form.Item
                      labelCol={{ span: 3 }}
                      style={styles.itemModal}
                      name="remark"
                      label="&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;备注"
                    >
                      <Input.TextArea disabled={formFieldDisable.remark} />
                    </Form.Item>
                  </Col>
                </Row>

                {/*  隐藏字段 */}
                <div
                  style={{
                    display: mode === 'detail' ? 'none' : 'block',
                  }}
                >
                  <Row gutter={[12, 12]}>
                    <Col span={12}>
                      <Form.Item
                        {...formItemLayout}
                        style={styles.itemModal}
                        name="requirement"
                        label="&nbsp;&nbsp;&nbsp;&nbsp;提需人"
                      >
                        <Input />
                      </Form.Item>
                    </Col>

                    <Col span={12}>
                      <Form.Item
                        {...formItemLayout}
                        style={styles.itemModal}
                        name="requirementDate"
                        label="提需日期"
                      >
                        <DatePicker style={{ width: '100%' }} />
                      </Form.Item>
                    </Col>
                  </Row>
                </div>
              </Panel>
            </Collapse>
          </div>
        </Form>
      </Spin>
    </>
  );

  const title = mode === 'add' ? '新增指标' : mode === 'detail' ? '指标详情' : '修改指标';

  return mode === 'detail' ? (
    <QuarkDrawer
      title={title}
      visible={detailVisible}
      onClose={() => {
        setDetailVisitble(false);
      }}
      footer={null}
      onCancel={() => {
        setDetailVisitble(false);
      }}
    >
      {content}
    </QuarkDrawer>
  ) : (
    <QuarkModal
      className="editDetailModal"
      forceRender={true}
      destroyOnClose={true}
      getContainer={false}
      title={title}
      visible={detailVisible}
      width={700}
      bodyStyle={{
        maxHeight: '600px',
        overflowY: 'auto',
      }}
      footer={[
        <Button
          key="back"
          onClick={() => {
            setDetailVisitble(false);
          }}
        >
          取消
        </Button>,
        <Button key="submit" type="primary" onClick={handleOk}>
          保存
        </Button>,
      ]}
      onCancel={() => {
        setDetailVisitble(false);
      }}
    >
      {content}
    </QuarkModal>
  );
};

export default EditDetailModal;
