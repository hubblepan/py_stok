/**
 * 变更记录
 */
import css from './style.less';
import React, { useState, useCallback, useEffect } from 'react';

import request from '@/utils/request';

import { Button, Input, Select, message, Tooltip, Form, DatePicker, Drawer } from 'antd';
import moment from 'moment';
import BaseHandle from '@/components/TableView/BaseHandle';
import ButtonState from '@/components/TableView/ButtonState';
import TablePane from '@/blocks/TablePane';
import QuarkModal from '@/components/QuarkModal';
import { connect } from 'dva';
import BeanUtil from '@/utils/BeanUtil';
import TargetChangeModalHandle from '../handles/ChangeModalHandle';
import { useModel } from 'umi';

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
    dataIndex: 'modifyStoryBack',
    key: 'modifyStoryBack',
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
    dataIndex: 'modifyDesc',
    key: 'modifyDesc',
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
    dataIndex: 'modifyEndTime',
    key: 'modifyEndTime',
    width: 60,
    resizable: true,
    render: (content) => (
      <Tooltip placement="topLeft" title={content}>
        {content}
      </Tooltip>
    ),
  },
  {
    title: '制作人',
    dataIndex: 'modifier',
    key: 'modifier',
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
    dataIndex: 'modifyStartTime',
    key: 'modifyStartTime',
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
    dataIndex: 'operUser',
    key: 'operUser',
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
  props = { ...useModel('ocp.monitorIndexConfig.targetChangeModal'), ...props };
  const { changeVisible, setChangeVisible, primaryKey } = props;

  const { formVisible, setFormVisible, form, operType, formData, setFormData, users } = props;
  const [_form] = Form.useForm();

  const handles = new TargetChangeModalHandle({ ...props, params: { indexCode: primaryKey } });

  useEffect(() => {
    (async () => {
      const users = await handles.service.getUsers();
      handles.changeState({
        form: _form,
        users: users.data,
      });
    })();
  }, []);

  const closeDrawer = handles.closeDrawer.bind(handles);

  const panelProps = {
    title: '',
    search: {
      searchRender: () => null,
    },
    tableProps: {
      rowClassName: (record, index) => {
        if (record.auditState === 0) {
          return 'text-warning';
        }
      },
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
          disable(rows) {
            return rows.length !== 1;
          },
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
    page: {},
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
      <TablePane {...panelProps} {...props} handles={handles} />

      {/* 新增修改抽屉 */}
      <Drawer
        title={
          operType === 'add'
            ? '新增变更记录'
            : operType === 'update'
            ? '修改变更记录'
            : '复制变更记录'
        }
        width="500"
        placement="right"
        closable={false}
        getContainer={false}
        style={{ position: 'absolute' }}
        onClose={closeDrawer}
        visible={formVisible}
        footer={
          <div
            style={{
              textAlign: 'right',
            }}
          >
            <Button style={{ marginRight: 8 }} onClick={closeDrawer}>
              取消
            </Button>
            <Button
              onClick={() => {
                console.log(3333, operType);
                return handles.save.call(handles, { type: operType });
              }}
              type="primary"
            >
              保存
            </Button>
          </div>
        }
      >
        <Form colon={false} labelCol={{ span: 4 }} form={_form}>
          {/* 把所有数据托管到表单视图实在不是很好的实践。但在此处可以减少一些硬编码,日后加需求也会轻松一点 */}
          {/* 隐藏域开始 */}
          <Form.Item style={{ display: 'none' }} name="id">
            <Input />
          </Form.Item>
          <Form.Item style={{ display: 'none' }} name="indexCode">
            <Input />
          </Form.Item>
          <Form.Item style={{ display: 'none' }} name="indexName">
            <Input />
          </Form.Item>
          <Form.Item style={{ display: 'none' }} name="modifyDesc">
            <Input />
          </Form.Item>
          <Form.Item style={{ display: 'none' }} name="auditState">
            <Input />
          </Form.Item>
          <Form.Item style={{ display: 'none' }} name="operator">
            <Input />
          </Form.Item>
          <Form.Item style={{ display: 'none' }} name="auditDate">
            <Input />
          </Form.Item>
          <Form.Item style={{ display: 'none' }} name="modifyDate">
            <Input />
          </Form.Item>
          <Form.Item style={{ display: 'none' }} name="modifier">
            <Input />
          </Form.Item>
          {/* 隐藏域结束 */}

          <Form.Item
            rules={[{ required: true, message: '请输入提需日期' }]}
            name="modifyStartTime"
            label="提需日期"
          >
            <DatePicker style={{ width: '200px' }} />
          </Form.Item>
          <Form.Item
            rules={[{ required: true, message: '请输入提出人' }]}
            name="modifyBy"
            label="提出人"
          >
            <Select>
              {users.map((x) => {
                return (
                  <Select.Option key={x['c_USER_CODE']} value={x['c_USER_CODE']}>
                    {x['c_USER_NAME']}
                  </Select.Option>
                );
              })}
            </Select>
          </Form.Item>
          <Form.Item
            rules={[{ required: true, message: '请输入需求背景' }]}
            name="modifyStoryBack"
            label="需求背景"
          >
            <TextArea style={{ width: '100%' }} />
          </Form.Item>
          <Form.Item
            rules={[{ required: true, message: '请输入变更日期日期' }]}
            name="modifyEndTime"
            label="变更日期"
          >
            <DatePicker style={{ width: '200px' }} />
          </Form.Item>
          <Form.Item name="desc" label="备注">
            <TextArea style={{ width: '100%' }} />
          </Form.Item>
        </Form>
      </Drawer>
    </QuarkModal>
  );
};

export default ChangeModal;
