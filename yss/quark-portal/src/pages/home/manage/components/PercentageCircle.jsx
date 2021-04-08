import styles from "@/pages/home/manage/components/style.less";
import {Progress} from "antd";

const PercentageCircle=(props)=>{
  const {title='',amount='',percentage=0,color=''}= props
  return (
    <div className={styles.combination}>
      <Progress type="circle" showInfo={false} strokeLinecap="square" width={64} strokeWidth={12} strokeColor={color} percent={percentage} />
      <div className={styles.description}>
        <div>{title}</div>
        <div className={styles.amount}>{amount}</div>
        <div className={styles.percentage}>占比{percentage}%</div>
      </div>
    </div>
  )
}
export default PercentageCircle
