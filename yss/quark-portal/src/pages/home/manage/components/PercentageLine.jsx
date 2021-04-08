import styles from "@/pages/home/manage/components/style.less";
import {CaretUpOutlined} from "@ant-design/icons";
import {Progress} from "antd";

const PercentageLine=(props)=>{
  const {title='',color='',amount='',percentage='',change=''}=props
  return (
    <div className={styles.combinationProgress} style={{width:'288px'}}>
      <div>{title}</div>
      <div className={styles.amount}>{amount}</div>
      <div className={styles.percentage}>
        <div className={styles.left}>
          <span>全部组合占比</span>
          <span>{percentage}%</span>
        </div>
        <div className={styles.right}>
          <span>较昨日</span>
          <CaretUpOutlined style={{ fontSize: '18px',margin:'0 2px', color:change>0?'#ff4d4f':'#52C41A',transform:change>0?'':'rotate(180deg)'  }}/>
          <span style={{color:change>0?'#ff4d4f':'#52C41A'}}>{change?Math.abs(change):''}%</span>
        </div>
      </div>
      <Progress type="line" showInfo={false} strokeLinecap="square" strokeWidth={8} strokeColor={color} percent={percentage} className={styles.progress}/>
    </div>
  )
}
export default PercentageLine
