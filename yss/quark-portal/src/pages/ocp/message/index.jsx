import TablePane from '@/blocks/TablePane';
import React, { useState, useMemo } from 'react';
import moment from 'moment';
import { Tooltip, Button } from 'antd';
import SvgIcon from '@/components/SvgIcon';
import { useModel } from 'umi';
import DetailModal from './components/DetailModal';
import Handle from './handles/SubHandle';

const MessageCenter = (props) => {
  const model = useModel('ocp.message.sub');
  // const [detailVisible, setDetailVisible] = useState(false);
  // const [id, setId] = useState('');
  // const [activeKey, setActiveKey] = useState(1);
  const handles = new Handle(model);
  const {
    dataSource,
    setDataSource,
    detailVisible,
    setDetailVisible,
    id,
    setId,
    activeKey,
    setActiveKey,
  } = model;
  const unreadMessage = useMemo(() => {
    return dataSource.filter((item) => !item.readState);
  }, [dataSource]);
  const markRead = () => {
    const ids = dataSource.filter((item) => !item.readState).map((item) => item.id);
    // 非空才进行下面的操作
    if (ids.length) {
      console.log(ids);
      const newDataSource = dataSource.slice(0, dataSource.length);
      newDataSource.forEach((item) => {
        if (ids.includes(item.id)) {
          item.readState = 1;
        }
      });
      setDataSource(newDataSource);
      console.log(newDataSource);
      const { service } = handles;
      service.read(ids).then().catch();
    }
  };

  const panelProps = {
    autoQuery: true,
    header: {
      extra: (
        <>
          <h5 className="h5 mx-4">消息中心</h5>
          <Button
            type="primary"
            ghost
            disabled={!unreadMessage.length}
            onClick={() => {
              markRead();
            }}
          >
            全部已读
          </Button>
        </>
      ),
    },
    columns: [
      {
        title: '消息内容',
        dataIndex: 'messageTitle',
        // width: 750, 这一列不能有宽度
      },
      {
        title: '提醒时间',
        dataIndex: 'remindTime',
        align: 'center',
        width: 150,
        filters: [
          {
            text: '今日',
            value: 1,
          },
          {
            text: '全部',
            value: 0,
          },
        ],
        filterMultiple: false,
        onFilter: (value, row) => {
          if (value === 1) {
            return moment(row.remindTime).isSame(moment(), 'day');
          }
          return true;
        },
      },
      {
        title: '消息状态',
        dataIndex: 'readState',
        align: 'center',
        // filters: [
        //   {
        //     text: '未读',
        //     value: 0,
        //   },
        //   {
        //     text: '已读',
        //     value: 1,
        //   },
        // ],
        // filterMultiple: false,
        // onFilter: (value, row) => {
        //   return row.readState === value;
        // },
        width: 100,
        render: (value, row, index) => {
          // 格式化
          if (value) {
            return <span>已读</span>;
          }
          return <span>未读</span>;
        },
      },
      {
        title: '操作',
        dataIndex: 'detail',
        width: 80,
        align: 'center',
        fixed: 'right',
        render: (value, row, index) => {
          return value ? (
            <div style={{ wordWrap: 'break-word', wordBreak: 'break-word' }}>
              <Tooltip title="消息详情">
                <a
                  href="#"
                  onClick={(event) => {
                    event.preventDefault();
                    console.log(row);
                    if (!row.readState) {
                      // 设置已读字段
                      row.readState = 1;
                      // 调已读接口
                      const { service } = handles;
                      service
                        .read([row.id])
                        .then()
                        .catch(() => {});
                    }
                    // 打开详情弹窗
                    setActiveKey(value);
                    setId(row.id);
                    setDetailVisible(true);
                  }}
                >
                  <SvgIcon icon="taskdetail" style={{ fontSize: '18px' }} />
                </a>
              </Tooltip>
            </div>
          ) : null;
        },
      },
    ],
    tableProps: {
      // bordered:false,
      rowSelection: false,
      expandable: {
        defaultExpandAllRows: false,
        expandedRowRender: (row) => (
          <div style={{ whiteSpace: 'normal', paddingLeft: '48px' }}>{row.messageContent}</div>
        ),
        onExpand: (expanded, row) => {
          if (expanded && !row.readState) {
            // 改变已读状态
            row.readState = 1;
            const { service } = handles;
            service
              .read([row.id])
              .then()
              .catch(() => {});
            console.log(row);
          }
        },
      },
    },
  };
  return (
    <>
      <TablePane {...panelProps} {...model} handles={handles} />
      {detailVisible && (
        <DetailModal
          visible={detailVisible}
          setVisible={setDetailVisible}
          id={id}
          activeKey={activeKey}
        />
      )}
    </>
  );
};
export default MessageCenter;
