import styles from "@/pages/home/manage/components/style.less";
import ReactEcharts from "echarts-for-react";

const CombinationEcharts=(props)=>{
  const {title,amount='',percentage='',option}= props
  return (
    <div className={styles.combEcharts}>
      <div className={styles.description}>
        <div>{title}</div>
        <div className={styles.amount}>{amount}</div>
        <div className={styles.percentage}>
          <span>全部组合占比</span>
          <span style={{marginLeft:'8px'}}>{percentage}%</span>
        </div>
      </div>
      <ReactEcharts option={option} style={{width:'424px',height:'166px'}} />
    </div>
  )
}
export default CombinationEcharts
