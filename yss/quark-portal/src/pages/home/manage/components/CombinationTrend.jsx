import { Card,Select  } from 'antd';
import {MoreOutlined} from '@ant-design/icons'
import ReactEcharts from 'echarts-for-react'
import moment from 'moment';
import styles from './style.less'

const { Option } = Select;

const CombinationTrend=(props)=>{
  const print=()=>{
    console.log('print');
  }
  const xAxisDate=['2020-07-01', '2020-07-02', '2020-07-03', '2020-07-04', '2020-07-05', '2020-07-06', '2020-07-07',]
  const yAxisData0=[120, 132, 101, 134, 90, 230, 210]
  const yAxisData1=[220, 182, 191, 234, 290, 330, 310]
  const yAxisData2=[150, 232, 201, 154, 190, 330, 410]
  const yAxisData3=[320, 332, 301, 334, 390, 330, 320]
  const yAxisName=['正常-首次','异常-首次','正常-最新','异常-最新']
  const option = {
    tooltip: {
      trigger: 'axis'
    },
    color:['#69C0FF','#FB6E69','#69C0FF','#FB6E69',], // 全局颜色
    legend: {
      left: '0',

      data: [
        {name: yAxisName[0], icon: 'line',},
        {name: yAxisName[1], icon: 'line',},
        {name: yAxisName[2], icon: 'image://../lengendLine1.svg',},
        {name: yAxisName[3], icon: 'image://../lengendLine2.svg',},
      ],
    },
    grid: {
      left: '35px',
      right: '35px',
      bottom: '35px',
    },
    // 可缩放坐标轴
    dataZoom: [
      {
        show: true,
        height: 12,
        bottom:'0',
        start: 0,
        end: 100
      },
    ],
    xAxis: {
      type: 'category',
      boundaryGap: false,
      data: xAxisDate,
      axisLabel : {
        color:'rgba(0, 0, 0, 0.45)',
        formatter (value) {
          return moment(value).format('M/D')
        }
      },
      axisTick:{
        lineStyle:{
          color:'rgba(0, 0, 0, 0.15)'
        }
      },
      axisLine :{
        lineStyle:{
          color:'rgba(0, 0, 0, 0.15)'
        }
      }
    },
    yAxis: {
      type: 'value',
      axisLine : {
        show:false
      },
      axisTick:{       // y轴刻度线不显示
        'show':false
      },
      axisLabel : {
        color:'rgba(0, 0, 0, 0.45)'
      },
      splitLine:{
        lineStyle: {
          color: ['rgba(0, 0, 0, 0.15)']
        }
      }
    },
    series: [
      {
        name: yAxisName[0],
        type: 'line',
        data: yAxisData0,
        symbol: 'emptyCircle', // 设置标记类型
        showSymbol:false, // 是否显示symbol。如果false则只有在tooltip hover的时候显示。
        itemStyle: {
          normal: {
            lineStyle:{
              width:2, // 折线宽度
              color:'#69C0FF' // 折线颜色
            }
          },
          emphasis:{
            color: '#ffffff',
            borderColor: '#69C0FF',
          },
        },
      },
      {
        name: yAxisName[1],
        type: 'line',
        data: yAxisData1,
        symbol: 'emptyCircle', // 设置标记类型
        showSymbol:false, // 是否显示symbol。如果false则只有在tooltip hover的时候显示。
        itemStyle: {
          normal: {
            lineStyle:{
              width:2, // 折线宽度
              color:'#FB6E69' // 折线颜色
            }
          },
          emphasis:{
            color: '#ffffff',
            borderColor: '#FB6E69',
          },
        },
      },
      {
        name: yAxisName[2],
        type: 'line',
        data: yAxisData2,
        symbol: 'emptyCircle', // 设置标记类型
        showSymbol:false, // 是否显示symbol。如果false则只有在tooltip hover的时候显示。
        itemStyle: {
          normal: {
            lineStyle:{
              width:2, // 折线宽度
              color:'#69C0FF', // 折线颜色
              type: 'dashed'
            }
          },
          emphasis:{
            color: '#ffffff',
            borderColor: '#69C0FF', // 设置折点样式
          },
        },
      },
      {
        name: yAxisName[3],
        type: 'line',
        data: yAxisData3,
        symbol: 'emptyCircle', // 设置标记类型
        showSymbol:false, // 是否显示symbol。如果false则只有在tooltip hover的时候显示。
        itemStyle: {
          normal: {
            lineStyle:{
              width:2, // 折线宽度
              color:'#FB6E69', // 折线颜色
              type: 'dashed'
            }
          },
          emphasis:{
            color: '#ffffff',
            borderColor: '#FB6E69',
          },
        },
      },
    ]
  };
  const dateOptions=[
    {value:'seven',date:'近7天'},
    {value:'thirty',date:'近30天'},
  ]
  const moduleTitle='组合趋势'
  return(
    <Card bordered={false} title={moduleTitle} className={styles.trendCard} extra={<>
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
      <ReactEcharts option={option} style={{width:'100%',height:'100%'}} />
    </Card>
  )
}
export default CombinationTrend
