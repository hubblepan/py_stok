import { Tabs } from 'antd';
import React, { useEffect, useState } from 'react';
import TablePane from '@/blocks/TablePane';
import QuarkModal from '@/components/QuarkModal';
import { useModel } from 'umi';
import styles from './style.less';
import VoucherDetailHandle from '../handles/VoucherDetailHandle';

const { TabPane } = Tabs;

const VoucherModal = (props) => {
  const detailModel0 = useModel('ocp.monitorLogSummary.voucherDetail0');
  const detailModel1 = useModel('ocp.monitorLogSummary.voucherDetail1');
  const detailHandle0 = new VoucherDetailHandle({
    url: { base: '/ocp/monitor/voucher' },
    ...detailModel0,
  });
  const detailHandle1 = new VoucherDetailHandle({
    url: { base: '/ocp/monitor/voucher1' },
    ...detailModel1,
  });
  const { voucherVisible, setVoucherVisible, voucherId } = props;
  const [mode, setMode] = useState('1');
  const changeTab = (value) => {
    setMode(value);
  };
  useEffect(() => {
    if (voucherVisible) {
      console.log('modalVisible true');
      console.log(voucherId);
      detailHandle0.query({ params: { id: voucherId } });
      detailHandle1.query({ params: { id: voucherId } });
    } else {
      setMode('1');
    }
  }, [voucherVisible]);

  const createModeStatus = (mode) => {
    const modeStatus = {};
    switch (mode) {
      case '1':
        modeStatus.columns = [
          {
            title: '凭证号',
            dataIndex: 'voucherNumber',
          },
          {
            title: '科目代码',
            dataIndex: 'subjectCode',
          },
          {
            title: '科目名称',
            dataIndex: 'subjectName',
          },
          {
            title: '借贷',
            dataIndex: 'loan',
          },
          {
            title: '数量',
            dataIndex: 'amount',
          },
          {
            title: '本币金额',
            dataIndex: 'money',
          },
        ];
        break;
      case '2':
        modeStatus.columns = [
          {
            title: '证券代码',
            dataIndex: 'stockCode',
          },
          {
            title: '证券名称',
            dataIndex: 'stockName',
          },
          {
            title: '交易方式',
            dataIndex: 'trade',
          },
          {
            title: '成交数量',
            dataIndex: 'amount',
          },
          {
            title: '成交金额',
            dataIndex: 'money',
          },
          {
            title: '业务日期',
            dataIndex: 'date',
          },
        ];
        break;
    }
    return modeStatus;
  };
  const createPanelProps = (mode) => {
    const modeStatus = createModeStatus(mode);
    return {
      autoQuery: false,
      toolbar: {},
      columns: modeStatus.columns,
      page: false,
      tableProps: {
        rowSelection: false,
      },
    };
  };
  return (
    <QuarkModal
      className={styles.voucherModal}
      width={725}
      bodyStyle={{ height: '560px', padding: '0px 16px 16px' }}
      title={
        <>
          <Tabs
            defaultActiveKey="1"
            activeKey={mode}
            onChange={changeTab}
            className={styles.voucherTabs}
          >
            <TabPane tab="凭证信息" key="1" />
            <TabPane tab="业务流水信息" key="2" />
          </Tabs>
        </>
      }
      visible={voucherVisible}
      footer={null}
      onCancel={() => {
        setVoucherVisible(false);
      }}
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
    </QuarkModal>
  );
};
export default VoucherModal;
