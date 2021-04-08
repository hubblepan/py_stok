import React from 'react';
import { MoreOutlined } from '@ant-design/icons';
import Combintion from './Combintion.jsx';
import styles from './style.less';

const CombinationMonitor = () => {
  const listRandom = [
    {
      type: '正常组合',
      amount: '234',
      percentage: '23',
      color: '#5AD8A6',
    },
    {
      type: '预警组合',
      amount: '234',
      percentage: '23',
      color: '#F6BD16',
    },
    {
      type: '异常组合',
      amount: '112',
      percentage: '23',
      color: '#5AD8A6',
    },
    {
      type: '报错组合',
      amount: '255',
      percentage: '23',
      color: '#5AD8A6',
    },
    {
      type: '未执行组合',
      amount: '234',
      percentage: '23',
      color: '#5AD8A6',
    },
  ];

  return (
    <div className={styles.monitorRank}>
      <div className={styles.monitorTitle}>
        <h4 className="h5">
          组合监控概况
          <span className={styles.today}>(今日)</span>
        </h4>
        <MoreOutlined className="h4" />
      </div>
      <div className={styles.combintionAssembly}>
        <Combintion listRandom={listRandom} />
      </div>
    </div>
  );
};

export default CombinationMonitor;
