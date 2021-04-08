import { Card,Select  } from 'antd';
import {MoreOutlined} from '@ant-design/icons'
import ReactEcharts from 'echarts-for-react'
import moment from 'moment';
import RankItem from "./RankItem";
import styles from './style.less'

const { Option } = Select;
const RankTop=(props)=>{
  const print=()=>{
    console.log('print');
  }

  const rankList=[{name:'指标名称指标名称指标名称指标名称指标名称指标名称指标名称指标名称',percentage:'83',color:'#69C0FF'},{name:'指标名称',percentage:'83',color:'#69C0FF'},{name:'指标名称',percentage:'83',color:'#69C0FF'},{name:'指标名称',percentage:'83',color:'#69C0FF'},{name:'指标名称',percentage:'83',color:'#69C0FF'},{name:'指标名称',percentage:'83',color:'#69C0FF'},{name:'指标名称',percentage:'83',color:'#69C0FF'},]
  const dateOptions=[
    {value:'seven',date:'近7天'},
    {value:'thirty',date:'近30天'},
  ]
  const moduleTitle='异常组合 TOP 10'
  return(
    <Card bordered={false} title={moduleTitle} className={styles.trendCard} extra={
      <>
        <Select defaultValue="seven" style={{ width: 90 }} className="mr-4">
          {
            dateOptions.map((item,index)=>{
              const {value,date}=item
              return (
                <Option key={index} value={value}>{date}</Option>
              )
            })
          }
        </Select>
        <MoreOutlined style={{fontSize:'18px',}} onClick={print}/>
      </>}>
      {
        rankList.map((item,index)=>{
          return (
            <RankItem key={index} index={index} item={item} />
          )
        })
      }
    </Card>
  )
}
export default RankTop
