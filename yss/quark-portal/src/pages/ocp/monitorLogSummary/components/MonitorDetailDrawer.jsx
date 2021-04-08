import React, { useEffect, useState } from 'react';
import { DatePicker, Drawer, Form, Input, Select } from 'antd';
import TablePane from '@/blocks/TablePane';
import { useModel } from 'umi';
import VoucherModal from './VoucherModal';
import MonitorDetailHandle from '../handles/MonitorDetailHandle';
import ConfirmModal from './ConfirmModal';
import moment from 'moment';

const { Option } = Select;

const MonitorDetailDrawer = (props) => {

  // 监控详情
  const detailModel0 = useModel('ocp.monitorLogSummary.monitorDetail0');
  const detailModel1 = useModel('ocp.monitorLogSummary.monitorDetail1');
  const detailModel2 = useModel('ocp.monitorLogSummary.monitorDetail2');

  // 控制弹窗
  const [confirmVisible, setConfirmVisible] = useState(false);
  const [confirmIds, setConfirmIds] = useState([]);
  const detailHandle0 = new MonitorDetailHandle({
    urlBase: '/ocp/monitor/detail',
    url: {
      base: '/ocp/monitor/detail',
      confirm: `/ocp/monitor/detail/confirm`,
      unconfirm: `/ocp/monitor/detail/unconfirm`,
    },
    ...detailModel0,
    setConfirmVisible,
    setConfirmIds,
  });
  const detailHandle1 = new MonitorDetailHandle({
    url: {
      base: '/ocp/monitor/detail1',
      confirm: `/ocp/monitor/detail1/confirm`,
      unconfirm: `/ocp/monitor/detail1/unconfirm`,
    },
    ...detailModel1,
    setConfirmVisible,
    setConfirmIds,
  });
  const detailHandle2 = new MonitorDetailHandle({
    url: {
      base: '/ocp/monitor/detail2',
      confirm: `/ocp/monitor/detail2/confirm`,
      unconfirm: `/ocp/monitor/detail2/unconfirm`,
    },
    ...detailModel2,
    setConfirmVisible,
    setConfirmIds,
  });
  const { monitorVisible, setMonitorVisible,id } = props;
  const [mode, setMode] = useState('1');
  const [voucherVisible, setVoucherVisible] = useState(false);
  const [voucherId, setVoucherId] = useState('');
  const onClose = () => {
    setMonitorVisible(false);
  };
  const changeMode = (value) => {
    setMode(value);
  };

  useEffect(() => {
    /**
     * 侧边弹出时调查询接口
     */
    if (monitorVisible) {

      detailHandle0.query({ params: { id } });
      detailHandle1.query({ params: { id } });
      detailHandle2.query({ params: { id } });
    } else {
      setMode('1');
    }
  }, [monitorVisible]);
  const DatePickerFormatter = ({ value = '', onChange, ...rest }) => {
    const changeDate = (date, dateString) => {
      if (onChange) {
        onChange(dateString);
      }
    };
    return <DatePicker {...rest} onChange={changeDate} value={value ? moment(value) : null} />;
  };
  const tablepaneHandle = {};
  const createModeStatus = (mode) => {
    const modeStatus = {};
    switch (mode) {
      case '1':
        modeStatus.columns = [
          {
            title: '序号',
            align: 'center',
            render: (text, record, index) => {
              return <span>{index + 1}</span>;
            },
          },
          {
            title: '业务日期',
            dataIndex: 'businessDate',
          },
          {
            title: '组合代码',
            dataIndex: 'combinationCode',
          },
          {
            title: '组合名称',
            dataIndex: 'combinationName',
            render: (text, record, index) => {
              if (index % 2) {
                return <span>{text}</span>;
              }
              return (
                <a
                  style={{ color: '#3366ff', textDecoration: 'underline' }}
                  onClick={(event) => {
                    event.preventDefault();
                    setVoucherId(record.id);
                    setVoucherVisible(true);
                  }}
                >
                  {text}
                </a>
              );
            },
          },
          {
            title: '证券代码',
            dataIndex: 'stockCode',
            width: 80,
          },
          {
            title: '证券名称',
            dataIndex: 'stockName',
            width: 80,
          },
          {
            title: '证券品种',
            dataIndex: 'stockType',
            width: 80,
          },
          {
            title: '确认状态',
            dataIndex: 'confirmStatus',
            width: 80,
          },
        ];
        modeStatus.url = '/ocp/monitor/detail';
        modeStatus.model = detailModel0;
        break;
      case '2':
        modeStatus.columns = [
          {
            title: '',
            width: 20,
          },
          {
            title: '序号',
            align: 'center',
            render: (text, record, index) => {
              return <span>{index + 1}</span>;
            },
          },
          {
            title: '业务日期',
            dataIndex: 'businessDate',
          },
          {
            title: '组合代码',
            dataIndex: 'combinationCode',
          },
          {
            title: '组合名称',
            dataIndex: 'combinationName',
            render: (text, record, index) => {
              if (index % 2) {
                return <span>{text}</span>;
              }
              return (
                <a
                  style={{ color: '#3366ff', textDecoration: 'underline' }}
                  onClick={(event) => {
                    event.preventDefault();
                    setVoucherVisible(true);
                  }}
                >
                  {text}
                </a>
              );
            },
          },
          {
            title: '证券代码',
            dataIndex: 'stockCode',
            width: 80,
          },
          {
            title: '证券名称',
            dataIndex: 'stockName',
          },
          {
            title: '证券品种',
            dataIndex: 'stockType',
            width: 80,
          },
          {
            title: '确认状态',
            dataIndex: 'confirmStatus',
            width: 80,
          },
        ];
        modeStatus.url = '/ocp/monitor/detail1';
        modeStatus.tableProps = {
          bordered: false,
          expandable: {
            expandIconColumnIndex: 2,
          },
        };
        modeStatus.model = detailModel1;
        break;
      case '3':
        modeStatus.columns = [
          {
            title: '序号',
            align: 'center',
            render: (text, record, index) => {
              return <span>{index + 1}</span>;
            },
          },
          {
            title: '业务日期',
            dataIndex: 'businessDate',
          },
          {
            title: '组合代码',
            dataIndex: 'combinationCode',
          },
          {
            title: '组合名称',
            dataIndex: 'combinationName',
            render: (text, record, index) => {
              if (index % 2) {
                return <span>{text}</span>;
              }
              return (
                <a
                  style={{ color: '#3366ff', textDecoration: 'underline' }}
                  onClick={(event) => {
                    event.preventDefault();
                    setVoucherVisible(true);
                  }}
                >
                  {text}
                </a>
              );
            },
          },
          {
            title: '成交金额',
            children: [
              {
                title: '估值',
                dataIndex: 'estimation',
              },
              {
                title: 'O32',
                dataIndex: 'O32',
              },
            ],
          },
          {
            title: '证券品种',
            dataIndex: 'stockType',
            width: 80,
          },
          {
            title: '确认状态',
            dataIndex: 'confirmStatus',
            width: 80,
          },
        ];
        modeStatus.url = '/ocp/monitor/detail2';
        modeStatus.model = detailModel2;
        break;
    }
    return modeStatus;
  };
  const createPanelProps = (mode) => {
    const modeStatus = createModeStatus(mode);
    // 3个handle
    tablepaneHandle[mode] = new MonitorDetailHandle({
      url: {
        base: modeStatus.url,
        confirm: `${modeStatus.url}/confirm`,
        unconfirm: `${modeStatus.url}/unconfirm`,
      },
      ...modeStatus.model,
      setConfirmVisible,
      setConfirmIds,
    });
    return {
      autoQuery: false,
      toolbar: {
        buttons: {
          confirm: {
            visible: 1,
            text: '确认',
            id: 'confirm',
            icon: 'confirm',
            disable: (rows) => {
              if (rows && rows.length) {
                return !rows.some((row) => row.confirmStatus === 0);
              }
              return true;
            },
          },
          unconfirm: {
            visible: 1,
            text: '反确认',
            id: 'unconfirm',
            icon: 'unconfirm',
            disable: (rows) => {
              if (rows && rows.length) {
                return !rows.some((row) => row.confirmStatus === 1);
              }
              return true;
            },
          },
          more: {
            visible: 1,
          },
        },
      },
      search: {
        formItems: [
          <Input.Group compact style={{ display: 'flex', flexWrap: 'nowarp' }}>
            <Form.Item name="querymethod" label="" initialValue="business">
              <Select label="" style={{ width: '100px' }}>
                <Option value="business">业务日期</Option>
                <Option value="execute">执行日期</Option>
              </Select>
            </Form.Item>
            <Form.Item name="querydate" label="" style={{ flex: '1 1 auto' }}>
              <DatePickerFormatter />
            </Form.Item>
          </Input.Group>,
          <Select label="确认状态" name="confirmStatus" allowClear>
            <Option value="1">已确认</Option>
            <Option value="2">未确认</Option>
          </Select>,
        ],
        colsNumber: 3,
      },
      columns: modeStatus.columns,
      tableProps: modeStatus.tableProps,
    };
  };

  return (
    <Drawer
      title={
        <>
          <span>监控详情</span>
          <Select defaultValue="1" value={mode} className="ml-2" onChange={changeMode}>
            <Select.Option value="1">普通模式</Select.Option>
            <Select.Option value="2">分类模式</Select.Option>
            <Select.Option value="3">对比模式</Select.Option>
          </Select>
        </>
      }
      placement="right"
      onClose={onClose}
      visible={monitorVisible}
      getContainer={false}
      width={800}
      style={{ position: 'absolute', overflow: 'hidden' }}
      bodyStyle={{ paddingTop: '0px' }}
    >
      <TablePane
        hide={mode !== '1'}
        {...createPanelProps('1')}
        {...detailModel0}
        handles={detailHandle0}
      />
      <TablePane
        hide={mode !== '2'}
        {...createPanelProps('2')}
        {...detailModel1}
        handles={detailHandle1}
      />
      <TablePane
        hide={mode !== '3'}
        {...createPanelProps('3')}
        theadHeight={80}
        {...detailModel2}
        handles={detailHandle2}
      />
      <VoucherModal
        voucherVisible={voucherVisible}
        setVoucherVisible={setVoucherVisible}
        voucherId={voucherId}
      />
      <ConfirmModal
        confirmVisible={confirmVisible}
        setConfirmVisible={setConfirmVisible}
        confirmIds={confirmIds}
        handles={tablepaneHandle[mode]}
      />
    </Drawer>
  );
};
export default MonitorDetailDrawer;
