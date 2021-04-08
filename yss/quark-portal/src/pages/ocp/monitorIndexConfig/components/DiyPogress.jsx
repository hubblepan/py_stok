import styles from './style.less';
import { Tooltip } from 'antd';
export default (props) => {
  const { percent } = props;
  return (
    <div className={styles.diyProgressContainer}>
      <div style={{ width: percent + '%' }} className={styles.diyProgressProgress}></div>
      <div style={{ marginTop: 16 }}>
        <Tooltip
          title={percent + '%'}
          visible={true}
          placement="bottom"
          color={'#2c5afc'}
        ></Tooltip>
      </div>
    </div>
  );
};
