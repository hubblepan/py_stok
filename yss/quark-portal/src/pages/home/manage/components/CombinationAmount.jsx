import styles from './style.less';

const CombinationAmount = (props) => {
  const { amount = '', title = '' } = props;
  return (
    <div className={styles.statistic}>
      <div>{title}</div>
      <div className={styles.amount}>{amount}</div>
    </div>
  );
};
export default CombinationAmount;
