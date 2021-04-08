import React, { useState, createContext } from 'react';
import { Select, Modal } from 'antd';
import MsgBox from '@/utils/MsgBox';
import { extendParams } from '@/services/targetParams.js';
// import TablePane from '@/blocks/TablePane';
import TablePane from '@/blocks/TablePane';
import { useModel } from 'umi';
import QuarkModal from '@/components/QuarkModal/index';
import BaseHandle from '@/components/TableView/BaseHandle';
import BaseService from '@/handles/BaseService';
import EditDrawer from './EditDrawer';
import ExtendParamsHandle from '../handles/ExtendParamsHandle';
export const FatherContext = createContext();

const ExParams = (props) => {
  const { exParams, setExParams, flag } = props;

  const model = useModel('ocp.ocpIndexParam.extendParams');
  const {
    mode,
    editVisible,
    setEditVisible,
    loading,
    setLoading,
    formData,
    selectValues1,
    setSelectValues1,
    selectValues2,
    setSelectValues2,
  } = model;
  const handles = new ExtendParamsHandle({ ...model });

  // 搜索1
  function handleChange1(value) {
    setSelectValues1(value);
    setLoading(true);
    setTimeout(() => {
      // 根据输入框的值调接口查询表格数据
      extendParams({ params: value })
        .then((res) => {
          setLoading(false);
          MsgBox.success({ message: '搜索完毕！' });
        })
        .catch(() => {
          setLoading(false);
          MsgBox.success({ message: '搜索失败！' });
        });
    }, 1000);
  }
  // 搜索2
  function handleChange2(value) {
    setSelectValues2(value);
    setLoading(true);
    setTimeout(() => {
      // 根据输入框的值调接口查询表格数据
      extendParams({ params: value })
        .then((res) => {
          setLoading(false);
          MsgBox.success({ message: '搜索完毕！' });
        })
        .catch(() => {
          setLoading(false);
          MsgBox.success({ message: '搜索失败！' });
        });
    }, 1000);
  }

  const toolbar = {
    buttons: {
      add: {
        visible: 1,
      },
      edit: {
        visible: 1,
      },
      copy: {
        visible: 1,
      },
      deletes: {
        visible: 1,
      },
    },
    filterButton: false,
    // toolbarRender,
  };

  const okHandle = () => {
    setExParams(false);
  };

  // const handles = new SubHandle(subProps);
  const panelProps = {
    title: '扩展参数',
    ...model,
    handles,
    autoQuery: true,
    search: {},
    columns: [
      {
        title: '适用组合',
        dataIndex: 'applyCombinate',
      },
      {
        title: '证券品种',
        dataIndex: 'securyType',
      },
      {
        title: '交易市场',
        dataIndex: 'tradMarket',
      },
      {
        title: '交易证券',
        dataIndex: 'tradSecury',
      },
      {
        title: '证券名称',
        dataIndex: 'securyName',
      },
      {
        title: '监控条件',
        dataIndex: 'monitorConditions',
      },
      {
        title: '阈值',
        dataIndex: 'threshold',
      },
      {
        title: '开始日期',
        dataIndex: 'startDate',
      },
    ],
    header: {
      extra: [
        <Select
          allowClear
          style={{ width: 200 }}
          label="证券品种"
          name="securyType"
          defaultValue={selectValues1}
          onChange={handleChange1}
          key="1"
        >
          <Select.Option value="allSecuryType">全部证券品种</Select.Option>
          <Select.Option value="otherSecuryType">其他</Select.Option>
        </Select>,
        <Select
          allowClear
          style={{ width: 200, marginLeft: '10px' }}
          label="交易市场"
          name="tradMarket"
          defaultValue={selectValues2}
          onChange={handleChange2}
          key="2"
        >
          <Select.Option value="allTradMarket">全部交易市场</Select.Option>
          <Select.Option value="otherTradMarket">其他</Select.Option>
        </Select>,
      ],
    },
    toolbar: flag === false ? {} : toolbar,
    tableProps: {
      // rowSelection: false,
      loading,
    },
    page: false,
  };
  return (
    <>
      <QuarkModal
        title="扩展参数"
        width={900}
        bodyStyle={{ height: '600px', padding: 0 }}
        visible={exParams}
        onCancel={() => {
          setExParams(false);
        }}
        onOk={okHandle}
      >
        <TablePane {...panelProps} {...model} />
        {/* 新增，删除，复制 */}
        <EditDrawer
          visible={editVisible}
          setEditVisible={setEditVisible}
          mode={mode}
          formData={formData}
          handles={handles}
        />
      </QuarkModal>
    </>
  );
};

export default ExParams;
