import React from 'react';
import { Button } from 'antd';
import styles from './style.less';

const Deposit = () => {
  return (
    <>
      <div style={{ position: 'relative' }}>
        <div
          style={{
            width: '8px',
            height: '8px',
            border: '1px solid #3366ff',
            borderRadius: '50%',
            position: 'absolute',
            left: '-20px',
            top: '50%',
          }}
        />
        <div>
          <div className={styles.title}>
            <h4
              className="h6"
              style={{ textOverflow: 'ellipsis', overflow: 'hidden', whiteSpace: 'nowrap' }}
            >
              组合组合组合组合
            </h4>
            <Button>存款业务到期</Button>
          </div>
          <div className={styles.form}>
            <div>
              <span className={styles.formItem}>证券名称：</span>WFERGER
            </div>
            <div>
              <span className={styles.formItem}>证券代码：</span>GEFGVCH
            </div>
          </div>
          <div>
            <span className={styles.formLabel}>事件描述：</span>
            <span>事件描述事件描述事件描述事件描述事件</span>
          </div>
        </div>
      </div>
    </>
  );
};

export default Deposit;
