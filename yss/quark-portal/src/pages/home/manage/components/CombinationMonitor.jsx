import {Card, Progress} from 'antd';
import { CaretUpOutlined } from '@ant-design/icons';
import ReactEcharts from 'echarts-for-react'
import PercentageLine from "./PercentageLine";
import CombinationEcharts from "./CombinationEcharts";
import styles from "./style.less";


const CombinationMonitor = (props) => {
  const xAxisDate=['07/01', '07/02', '07/03', '07/04', '07/05', '07/06', '07/07',]
  const yAxisData=[820, 932, 901, 934, 1290, 1330, 1320]
  const option = {
    xAxis: {
      type: 'category',
      boundaryGap: false,
      data: xAxisDate,
      axisLabel : {
        color:'rgba(0, 0, 0, 0.45)'
      },
      axisTick:{
        lineStyle:{
          color:'rgba(0, 0, 0, 0.45)'
        }
      },
      axisLine :{
        lineStyle:{
          color:'rgba(0, 0, 0, 0.45)'
        }
      }
    },
    yAxis: {
      type: 'value',
      axisLine: {       // y轴不显示
        'show':false
      },
      axisLabel : {
        show:false
      },
      axisTick:{       // y轴刻度线不显示
        'show':false
      },
      splitLine :{
        show:false // 去掉网格线
      }
    },
    series: [{
      data: yAxisData,
      type: 'line',
      symbol: 'none', // 去掉折点
      areaStyle: {
        // 折线区域的背景颜色
        color: {
          type: 'linear',
          x: 0,
          y: 0,
          x2: 0,
          y2: 1,
          colorStops: [{
            offset: 0, color: 'rgba(105,192,255,0.3)' // 0% 处的颜色
          }, {
            offset: 1, color: 'rgba(105,192,255,0.01)' // 100% 处的颜色
          }],
          global: false // 缺省为 false
        }
      },
      itemStyle: {
        normal: {
          lineStyle:{
            width:2, // 折线宽度
            color:'#69C0FF' // 折线颜色
          }
        }
      },
    }]
  }
  // 格式化"千分位"
  const formatAmount=(amount)=>{
    return (`${amount}`).replace(/\d{1,3}(?=(\d{3})+$)/g,function(s){ return `${s},`})
  }
  const combAmount=[{title:'正常组合',amount:'6,875',color:'#5AD8A6',percentage:30.23,change:6.47},{title:'预警组合',amount:'6,875',color:'#F6BD16',percentage:80.23,change:-6.47},{title:'异常组合',amount:'6,875',color:'#ff4d4f',percentage:30.23,change:6.47}]
  const combPercentage=[{title:"执行报错组合",amount:"6,348",percentage:80.23,option},
    {title:"未执行组合",amount:"6,348",percentage:80.23,option},]
  const moduleTile=(
    <h5 className="font-size-h5">组合监控概况<span className="small">（今日）</span></h5>
  )
  return (
    <>
      <Card title={moduleTile}  bordered={false}>
        <div style={{display:'flex',justifyContent:'space-between',borderBottom:'1px solid #e8e8e8'}}>
          {
            combAmount.map((item,index)=>{
              const {title,amount,color,percentage,change}=item
              return (
                <PercentageLine key={index} title={title} color={color} amount={amount} percentage={percentage} change={change}/>
              )
            })
          }
        </div>
        <div className={styles.combChart}>
          {
            combPercentage.map((item,index)=>{
              const {title,amount,percentage,option}=item
              return(
                <CombinationEcharts key={index} title={title}  amount={amount} percentage={percentage} option={option} />
              )
            })
          }
        </div>
      </Card>
    </>
  );
};

export default CombinationMonitor;
