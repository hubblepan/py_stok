import TablePane from '@/blocks/TablePane';
import React, { useEffect, useMemo, useState } from 'react';
import { SettingOutlined, SmileOutlined } from '@ant-design/icons';
import { Tooltip, notification } from 'antd';
import request from '@/utils/request';
import SvgIcon from '@/components/SvgIcon';
import { useModel } from 'umi';
import moment from 'moment';
import MsgBox from '@/utils/MsgBox';
import BaseHandle from '@/handles/BaseHandle';
import Handle from './handles/SubHandle';
import DetailModal from './components/DetailModal';

const TaskCenter = (props) => {
  const model = useModel('ocp.taskManage.sub');
  const { detailVisible, setDetailVisible, id, setId } = model;
  // const [detailVisible, setDetailVisible] = useState(false);
  // const [id, setId] = useState('');
  const handles = new BaseHandle({ ...model, url: { base: '/ocp/task/sub' } });

  const message = {
    type: 1,
    typeDesc: '提醒类型',
    title: '指标执行已完成',
    description: '143条指标数据执行已完成',
    time: moment().format('YYYY-MM-DD hh:mm:ss'),
  };
  useEffect(() => {
    MsgBox.open({
      message: (
        <>
          <span className="text-secondary" style={{ fontSize: '14px' }}>
            [{message.typeDesc}]
          </span>
          <span>{message.title}</span>
        </>
      ),
      description: (
        <>
          <div>{message.description}</div>
          <div className="text-secondary">{message.time}</div>
        </>
      ),
      icon: <SvgIcon icon="success" />,
    });
  }, []);

  const panelProps = {
    title: '任务中心',
    namespace: 'taskIndex',
    autoQuery: true,
    columns: [
      {
        title: '任务日期',
        dataIndex: 'taskDate',
        width: 150,
        filters: [
          {
            text: '全部任务',
            value: 0,
          },
          {
            text: '今日任务',
            value: 1,
          },
        ],
        filterMultiple: false,
        onFilter: (value, row) => {
          if (value === 1) {
            return moment(row.taskDate).isSame(moment(), 'day');
          }
          return true;
        },
      },
      {
        title: '任务类型',
        dataIndex: 'taskType',
        width: 150,
      },
      {
        title: '任务状态',
        dataIndex: 'taskState',
        width: 150,
      },
      {
        title: '执行结果',
        dataIndex: 'taskResult',
        width: 150,
      },
      {
        title: '开始时间',
        dataIndex: 'startDate',
        width: 150,
      },
      {
        title: '结束时间',
        dataIndex: 'endDate',
        width: 150,
      },
      {
        title: '创建人',
        dataIndex: 'createName',
        width: 100,
        align: 'center',
      },
      {
        title: '操作',
        width: 100,
        align: 'center',
        fixed: 'right',
        render: (value, row, index) => {
          return (
            <div style={{ wordWrap: 'break-word', wordBreak: 'break-word' }}>
              <Tooltip title="任务详情">
                <a
                  href="#"
                  onClick={(event) => {
                    event.preventDefault();
                    setId(row.id);
                    setDetailVisible(true);
                  }}
                >
                  <SvgIcon icon="taskdetail" style={{ fontSize: '18px' }} />
                </a>
              </Tooltip>
            </div>
          );
        },
      },
    ],
    tableProps: {
      rowSelection: false,
    },
  };
  return (
    <>
      <TablePane {...panelProps} {...model} handles={handles} />
      {detailVisible && (
        <DetailModal visible={detailVisible} setVisible={setDetailVisible} id={id} />
      )}
    </>
  );
};

export default TaskCenter;
