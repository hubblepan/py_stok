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
} from 'antd';
import QuarkModal from '@/components/QuarkModal';

const { Panel } = Collapse;

const EditDetailModal = (props) => {
  const {
    detailVisible,
    detailData,
    setDetailVisitble,
    mode,
    queryTableData,
    currentSelect,
    handles,
  } = props;
  const [form] = Form.useForm();

  const [panelText, setPanelText] = useState('收起更多信息');

  const toolBarDisabled = {
    uninstall: () => (detailData.check === '1' ? true : false),
    approve: () => (detailData.check === '1' ? true : false),
    unApprove: () => (detailData.check === '1' ? false : true),
  };

  // 表单域配置：详情detail全部置灰，新增add全部激活，edit写在此处下面
  const formFieldDisable = {
    indexCode: '指标代码',
    indexName: true,
    indexAlias: false,
    indexClassify: true,
    triggerPosition: false,
    indexType: false,
    dataSource: true,
    indexLevel: true,
    indexParent: true,
    riskLevel: true,
    description: false,
    applyPort: false,
    busiScope: false,
    fetchLogic: false,
    monitorRule: false,
    comment: false,
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

  // 校验
  const handleOk = async () => {
    const validRes = await form.validateFields();
    if (validRes) {
      setDetailVisitble(false);
      console.log('保存');
    }

    // 编辑状态
    if (mode === 'edit') {
      // queryTableData(e);
      const params = form.getFieldsValue();
      request
        .get('/ocp/monitor/index/update', { params })
        .then((res) => {
          message.success(res.msg);
          // queryTableData();
        })
        .catch((err) => {
          message.error(err);
        });
    }
  };

  const formItemLayout = {
    labelCol: { span: 6 },
    wrapperCol: { span: 18 },
  };

  return (
    <QuarkModal
      className="editDetailModal"
      forceRender={true}
      destroyOnClose={true}
      getContainer={false}
      title={mode === 'add' ? '新增指标' : mode === 'detail' ? '指标详情' : '修改指标'}
      visible={detailVisible}
      width={700}
      bodyStyle={{
        maxHeight: '600px',
        overflowY: 'auto',
      }}
      footer={
        mode === 'detail'
          ? []
          : [
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
            ]
      }
      onCancel={() => {
        setDetailVisitble(false);
      }}
      closeIcon={
        <div
          onClick={(e) => {
            e.preventDefault();
            return false;
          }}
        >
          <a
            href="#"
            onClick={(e) => {
              e.preventDefault();
              // 最大化
            }}
          >
            <FullscreenOutlined />
          </a>
          &nbsp;&nbsp;
          <a
            href="#"
            onClick={(e) => {
              e.preventDefault();
              setDetailVisitble(false);
            }}
          >
            <CloseOutlined />
          </a>
        </div>
      }
    >
      {/* 详情toolbar */}
      <div style={styles.deitalToolbarWrap}>
        <div style={styles.detailToolbar}>
          <Button
            size="small"
            type="text"
            icon={<DeleteOutlined />}
            onClick={(e) => {
              handles.uninstall(
                {
                  currentSelect,
                },
                () => {
                  setDetailVisitble(false);
                },
              );
            }}
            disabled={toolBarDisabled.uninstall()}
          >
            卸载
          </Button>
          <Button
            onClick={(e) => {
              handles.approve(
                {
                  currentSelect,
                },
                () => {
                  setDetailVisitble(false);
                },
              );
            }}
            size="small"
            icon={<FileDoneOutlined />}
            type="text"
            disabled={toolBarDisabled.approve()}
          >
            审核
          </Button>
          <Button
            onClick={(e) => {
              handles.unApprove(
                {
                  currentSelect,
                },
                () => {
                  setDetailVisitble(false);
                },
              );
            }}
            size="small"
            type="text"
            icon={<FileSyncOutlined />}
            disabled={toolBarDisabled.unApprove()}
          >
            反审核
          </Button>
        </div>
      </div>

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
              <Input disabled={formFieldDisable.indexClassify} />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item
              {...formItemLayout}
              style={styles.itemModal}
              name="triggerPosition"
              label="触发位置"
            >
              <Input disabled={formFieldDisable.triggerPosition} />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item
              {...formItemLayout}
              style={styles.itemModal}
              name="indexType"
              label="指标类型"
            >
              <Input disabled={formFieldDisable.indexType} />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item
              {...formItemLayout}
              style={styles.itemModal}
              name="dataSource"
              label="来源界面"
            >
              <Input disabled={formFieldDisable.dataSource} />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item
              {...formItemLayout}
              style={styles.itemModal}
              name="indexLevel"
              label="指标级别"
            >
              <Input disabled={formFieldDisable.indexLevel} />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item
              {...formItemLayout}
              style={styles.itemModal}
              name="indexParent"
              label="父级指标"
            >
              <Input disabled={formFieldDisable.indexParent} />
            </Form.Item>
          </Col>

          <Col span={12}>
            <Form.Item
              {...formItemLayout}
              style={styles.itemModal}
              name="riskLevel"
              label="风险级别"
            >
              <Input disabled={formFieldDisable.riskLevel} />
            </Form.Item>
          </Col>
        </Row>

        <Row>
          <Col span={24}>
            <Form.Item
              labelCol={{ span: 3 }}
              // wrapperCol={21}
              style={styles.itemModal}
              name="description"
              label="功能简介"
            >
              <Input.TextArea
                disabled={formFieldDisable.description}
                autoSize={{ minRows: 3, maxRows: 5 }}
              />
            </Form.Item>
          </Col>
        </Row>

        <Collapse
          bordered={false}
          defaultActiveKey={['1']}
          expandIcon={({ isActive }) => <DoubleRightOutlined rotate={isActive ? 90 : 0} />}
          className="site-collapse-custom-collapse"
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
                  rules={[{ required: true, message: '请输入取数逻辑' }]}
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
                  rules={[{ required: true, message: '请输入监控规则' }]}
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
                  name="comment"
                  label="&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;备注"
                >
                  <Input.TextArea disabled={formFieldDisable.comment} />
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
      </Form>
    </QuarkModal>
  );
};

export default EditDetailModal;
