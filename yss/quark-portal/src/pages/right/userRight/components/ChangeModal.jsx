/**
 * 变更记录
 */
import css from './style.less';
import React, { useState } from 'react';

import request from '@/utils/request';

import { Button, Input, Select, message, Tooltip, Form, DatePicker, Drawer } from 'antd';
import moment from 'moment';
import BaseHandle from '@/components/TableView/BaseHandle';
import ButtonState from '@/components/TableView/ButtonState';
import TablePane from '@/blocks/TablePane';
import QuarkModal from '@/components/QuarkModal';

const { TextArea } = Input;

const columns = [
  {
    title: '序号',
    dataIndex: 'index',
    key: 'index',
    width: 30,
    render: (content, record, index) => {
      return <div style={{ textAlign: 'center' }}>{index + 1}</div>;
    },
    fixed: true,
  },
  {
    title: '需求背景',
    dataIndex: 'background',
    key: 'background',
    width: 140,
    resizable: true,
    ellipsis: {
      showTitle: false,
    },
    render: (content) => (
      <Tooltip placement="topLeft" title={content}>
        {content}
      </Tooltip>
    ),
  },
  {
    title: '变更描述',
    dataIndex: 'description',
    key: 'description',
    width: 200,
    resizable: true,
    ellipsis: true,
    render: (content) => (
      <Tooltip placement="topLeft" title={content}>
        {content}
      </Tooltip>
    ),
  },
  {
    title: '变更日期',
    dataIndex: 'changeDate',
    key: 'changeDate',
    width: 60,
    resizable: true,
    render: (content) => (
      <Tooltip placement="topLeft" title={content}>
        {content}
      </Tooltip>
    ),
  },
  {
    title: '提出人',
    dataIndex: 'submitBy',
    key: 'submitBy',
    width: 40,
    resizable: true,
    render: (content) => (
      <Tooltip placement="topLeft" title={content}>
        {content}
      </Tooltip>
    ),
  },
  {
    title: '提出日期',
    dataIndex: 'submitDate',
    key: 'submitDate',
    width: 60,
    resizable: true,
    render: (content) => (
      <Tooltip placement="topLeft" title={content}>
        {content}
      </Tooltip>
    ),
  },
  {
    title: '审核人',
    dataIndex: 'checkBy',
    key: 'checkBy',
    width: 40,
    resizable: true,
    render: (content) => (
      <Tooltip placement="topLeft" title={content}>
        {content}
      </Tooltip>
    ),
  },
];

const ChangeModal = (props) => {
  const { changeVisible, setChangeVisible, primaryKey } = props;
  const [changeTableSelections, setChangeTableSelections] = useState([]);
  const [drawerVisible, setDrawerVisible] = useState(false);
  const [drawerTitle, setDrawerTitle] = useState('新增变更记录');
  const [form] = Form.useForm();

  // 关闭抽屉
  const closeDrawer = () => {
    setDrawerVisible(false);
    form.resetFields();
  };

  // 刷新抽屉
  // const refreshTable = (params) => {
  //   request
  //     .get('/ocp/indexinfo/changerecord/query', {
  //       params,
  //     })
  //     .then((res) => {
  //       setChangeDetailData(res.data.list);
  //       setChangeTableSelections([]);
  //     });
  // };

  // 保存抽屉
  const save = async () => {
    const validRes = await form.validateFields();
    if (validRes) {
      const params = form.getFieldsValue();
      // if(drawerTitle!=='dra')
      console.log(params);
      request
        .post('/ocp/indexinfo/changerecord/save', {
          params,
        })
        .then((res) => {
          if (res.success) {
            message.success(res.msg);
            closeDrawer();
            // refreshTable();
          }
        });
    } else {
      return false;
    }
  };
  // 获取详情
  const getDetail = (primaryKey, callback) => {
    const params = { id: primaryKey };
    request
      .get('/ocp/indexinfo/changerecord/detail', {
        params,
      })
      .then((res) => {
        callback && callback(res);
      });
  };

  class SubButtonState extends ButtonState {
    constructor(props) {
      super(props);
    }

    copy(rows) {
      return rows.length !== 1;
    }

    deletes(rows) {
      if (rows.length < 1) {
        return true;
      }
      // 选中操作逻辑以卸载为例，如果选中的指标全等于已审核，按钮为不可操作状态。但选中指标包含但不全等于已审核，按钮提交则过滤已审核的选中数据，仅提交未审核的选中数据。
      return rows.every((row) => row.checkState == 1);
    }

    check(rows) {
      if (rows.length < 1) {
        return true;
      }
      return rows.every((row) => row.check == 1);
    }

    uncheck(rows) {
      if (rows.length < 1) {
        return true;
      }
      // 如果包含已审核（check为1）的数据，则禁用
      return rows.every((row) => row.check !== 1);
    }
  }

  const subProps = {
    url: {
      base: '/ocp/indexinfo/changerecord',
      params: primaryKey,
    },
    formVisible: setDrawerVisible,
    buttonState: new SubButtonState(),
  };

  class SubHandle extends BaseHandle {
    constructor(props) {
      super(props);
    }
    add() {
      form.setFieldsValue({});
      setDrawerVisible(true);
    }
    edit() {
      const primaryKey = this.selectedRowKeys.join();
      getDetail(primaryKey, (res) => {
        res.data.submitDate = moment(res.data.submitDate, 'YYYY-MM-DD');
        res.data.changeDate = moment(res.data.changeDate, 'YYYY-MM-DD');
        form.setFieldsValue(res.data);
        setDrawerTitle('修改变更记录');
        setDrawerVisible(true);
      });
    }
    copy() {
      const primaryKey = this.selectedRowKeys.join();
      getDetail(primaryKey, (res) => {
        res.data.submitDate = moment(res.data.submitDate, 'YYYY-MM-DD');
        res.data.changeDate = moment(res.data.changeDate, 'YYYY-MM-DD');
        delete res.data.id;
        form.setFieldsValue(res.data);
        setDrawerTitle('复制变更记录');
        setDrawerVisible(true);
      });
    }
  }
  const handles = new SubHandle(subProps);

  const setApproveRowClass = (record, index) => {
    if (record.check == 0) {
      return 'text-warning';
    }
  };

  const panelProps = {
    title: '',
    handles: handles,
    search: false,
    tableProps: {
      rowClassName: setApproveRowClass,
    },
    columns,
    toolbar: {
      buttons: {
        add: {
          text: '新增',
          method: 'add',
          visible: 1,
          order: 100,
        },
        edit: {
          id: 'edit',
          text: '修改',
          method: 'edit',
          visible: 1,
          order: 200,
        },
        copy: {
          id: 'copy',
          text: '复制',
          method: 'copy',
          visible: 1,
          order: 300,
        },
        deletes: {
          text: '删除',
          visible: 1,
          order: 400,
        },
        check: {
          id: 'check',
          text: '审核',
          visible: 1,
          order: 500,
        },
        uncheck: {
          id: 'uncheck',
          text: '反审核',
          visible: 1,
          order: 600,
        },
      },
      filterButton: false,
    },
    page: true,
    autoQuery: true,
  };

  return (
    <QuarkModal
      forceRender={true}
      destroyOnClose={true}
      getContainer={false}
      title="指标变更记录"
      visible={changeVisible}
      width={900}
      style={{
        overflow: 'hidden',
      }}
      bodyStyle={{
        height: '600px',
        overflowY: 'auto',
        padding: '10px',
      }}
      footer={[]}
      onCancel={() => {
        setChangeVisible(false);
      }}
    >
      <TablePane {...panelProps} />

      {/* 新增修改抽屉 */}
      <Drawer
        title={drawerTitle}
        width="500"
        placement="right"
        closable={false}
        getContainer={false}
        style={{ position: 'absolute' }}
        onClose={closeDrawer}
        visible={drawerVisible}
        footer={
          <div
            style={{
              textAlign: 'right',
            }}
          >
            <Button style={{ marginRight: 8 }} onClick={closeDrawer}>
              取消
            </Button>
            <Button onClick={save} type="primary">
              保存
            </Button>
          </div>
        }
      >
        <Form colon={false} labelCol={{ span: 4 }} form={form}>
          {/* id隐藏域 */}
          <Form.Item style={{ display: 'none' }} name="id">
            <Input />
          </Form.Item>

          <Form.Item
            rules={[{ required: true, message: '请输入提需日期' }]}
            name="submitDate"
            label="提需日期"
          >
            <DatePicker style={{ width: '200px' }} />
          </Form.Item>
          <Form.Item
            rules={[{ required: true, message: '请输入提出人' }]}
            name="submitBy"
            label="提出人"
          >
            <Select>
              <Select.Option value="DangBillion">党十亿</Select.Option>
              <Select.Option value="bbb">bbb</Select.Option>
            </Select>
          </Form.Item>
          <Form.Item
            rules={[{ required: true, message: '请输入需求背景' }]}
            name="background"
            label="需求背景"
          >
            <TextArea style={{ width: '100%' }} />
          </Form.Item>
          <Form.Item
            rules={[{ required: true, message: '请输入变更日期日期' }]}
            name="changeDate"
            label="变更日期"
          >
            <DatePicker style={{ width: '200px' }} />
          </Form.Item>
          <Form.Item name="remark" label="备注">
            <TextArea style={{ width: '100%' }} />
          </Form.Item>
        </Form>
      </Drawer>
    </QuarkModal>
  );
};

export default ChangeModal;
