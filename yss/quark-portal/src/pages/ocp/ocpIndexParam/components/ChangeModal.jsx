import React, { useState, useEffect } from 'react';
import { Modal, Tooltip, Table, Pagination } from 'antd';
import { changeParams } from '@/services/targetParams';
import QuarkTable from '@/components/QuarkTable';
import QuarkModal from '@/components/QuarkModal/index';
import BaseHandle from '@/components/TableView/BaseHandle';
import { useModel } from 'umi';
// import TablePane from '@/blocks/TablePane';
import TablePane from '@/blocks/TablePane';
import ChangeHandle from '../handles/ChangeModalHandle';
// import QuarkModal from '@/components/QuarkModal';

const ChangeModal = (props) => {
  const { currentSelect } = props;

  console.log(currentSelect);
  const { indexCode } = currentSelect;
  console.log(indexCode);

  const model = useModel('ocp.ocpIndexParam.change');
  const handles = new ChangeHandle({ ...model, indexCode: indexCode });

  const panelProps = {
    title: '指标变更记录',
    ...model,
    handles,
    autoQuery: true,
    search: {},
    columns: [
      {
        title: '序号',
        dataIndex: 'index',
        key: 'index',
        width: 50,
        ellipsis: true,
        render: (content, record, index) => {
          return <div style={{ textAlign: 'center' }}>{index + 1}</div>;
        },
        fixed: true,
      },
      {
        title: '需求背景',
        dataIndex: 'background',
        key: 'background',
        width: 60,
        resizable: true,
        ellipsis: true,
        // ellipsis: {
        //   showTitle: false,
        // },
        render: (content) => (
          <Tooltip placement="topLeft" title={content}>
            <div style={{ wordWrap: 'break-word', wordBreak: 'break-word' }}> {content}</div>
          </Tooltip>
        ),
      },
      {
        title: '内容',
        dataIndex: 'description',
        key: 'description',
        width: 200,
        resizable: true,
        ellipsis: true,
        onCell: () => {
          return {
            style: {
              maxWidth: 200,
              overflow: 'hidden',
              whiteSpace: 'nowrap',
              textOverflow: 'ellipsis',
              cursor: 'pointer',
            },
          };
        },
        render: (content) => (
          <Tooltip placement="topLeft" title={content}>
            <div style={{ wordWrap: 'break-word', wordBreak: 'break-word' }}> {content}</div>
          </Tooltip>
        ),
      },
      {
        title: '变更描述',
        dataIndex: 'changeDate',
        key: 'changeDate',
        width: 60,
        resizable: true,
        ellipsis: true,
        render: (content) => (
          <Tooltip placement="topLeft" title={content}>
            <div style={{ wordWrap: 'break-word', wordBreak: 'break-word' }}> {content}</div>
          </Tooltip>
        ),
      },
      {
        title: '提出人',
        dataIndex: 'submitBy',
        key: 'submitBy',
        width: 60,
        resizable: true,
        ellipsis: true,
        render: (content) => (
          <Tooltip placement="topLeft" title={content}>
            <div style={{ wordWrap: 'break-word', wordBreak: 'break-word' }}> {content}</div>
          </Tooltip>
        ),
      },
      {
        title: '提出日期',
        dataIndex: 'modifyStartTime',
        key: 'modifyStartTime',
        width: 60,
        ellipsis: true,
        resizable: true,
        render: (content) => (
          <Tooltip placement="topLeft" title={content}>
            <div style={{ wordWrap: 'break-word', wordBreak: 'break-word' }}> {content}</div>
          </Tooltip>
        ),
      },
      {
        title: '审核人',
        dataIndex: 'operator',
        key: 'operator',
        width: 60,
        resizable: true,
        ellipsis: true,
        render: (content) => (
          <Tooltip placement="topLeft" title={content}>
            <div style={{ wordWrap: 'break-word', wordBreak: 'break-word' }}> {content}</div>
          </Tooltip>
        ),
      },
    ],
    toolbar: {},
    tableProps: {
      rowSelection: false,
    },
    // page: {
    //   pageSize: 500,
    //   pageNo: 2,
    //   pageTotal: 25,
    // },
  };

  return (
    <>
      <TablePane {...panelProps} {...model} />
    </>
  );
};

export default ChangeModal;
