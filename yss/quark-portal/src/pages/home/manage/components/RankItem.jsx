import {Card, Progress, Select,Badge} from 'antd';
import {MoreOutlined} from '@ant-design/icons'
import ReactEcharts from 'echarts-for-react'
import moment from 'moment';
import styles from './style.less'

const RankItem=(props)=>{
  const {index,item}=props
  return(
    <div className={styles.rankItem} style={{height:'45px',display:'flex'}}>
      <Badge count={index+1} className={index<3?styles.badgeTop:styles.badgeBottom}/>
      <div className={styles.name}>{item.name}</div>
      <Progress type="line" strokeLinecap="square" className={styles.progress} strokeWidth={8} strokeColor={item.color} percent={item.percentage} />
    </div>
  )
}
export default RankItem
