import React from 'react';
import { MoreOutlined } from '@ant-design/icons';
import ReactEcharts from 'echarts-for-react';
import styles from './style.less';

const KeyIndicatorsMonitor = () => {
  const option = {
    tooltip: {
      trigger: 'axis',
      axisPointer: {
        // 坐标轴指示器，坐标轴触发有效
        type: 'shadow', // 默认为直线，可选为：'line' | 'shadow'
      },
    },
    legend: {
      data: ['正常组合', '预警组合', '异常组合', '报错组合', '未执行组合'],
    },
    grid: {
      left: '3%',
      right: '4%',
      bottom: '3%',
      containLabel: true,
    },
    xAxis: [
      {
        type: 'category',
        data: ['指标名称', '指标名称', '指标名称', '指标名称', '指标名称'],
        axisLine: {
          show: false,
        },
        axisTick: {
          show: false,
        },
      },
    ],
    yAxis: [
      {
        type: 'value',
        axisLabel: {
          show: true,
          interval: 'auto',
          formatter: '{value} %',
        },
        axisLine: {
          show: false,
        },
        axisTick: {
          show: false,
        },
        show: true,
      },
    ],
    series: [
      {
        name: '正常组合',
        type: 'bar',
        stack: '广告',
        barWidth: 24,
        data: [12, 13, 10, 13, 19],
      },
      {
        name: '预警组合',
        type: 'bar',
        stack: '广告',
        data: [12, 13, 10, 13, 9],
      },
      {
        name: '异常组合',
        type: 'bar',
        stack: '广告',
        data: [22, 18, 19, 23, 29],
      },
      {
        name: '报错组合',
        type: 'bar',
        stack: '广告',
        data: [15, 23, 20, 15, 19],
      },
      {
        name: '未执行组合',
        type: 'bar',
        stack: '广告',
        data: [36, 10, 26, 10, 16],
      },
    ],
    dataZoom: [
      {
        type: 'slider',
        show: true, // flase直接隐藏图形
        xAxisIndex: [0],
        left: '9%', // 滚动条靠左侧的百分比
        bottom: -1,
        height: 8,
        start: 10, // 滚动条的起始位置
        end: 90, // 滚动条的截止位置（按比例分割你的柱状图x轴长度）
      },
    ],
  };

  return (
    <div className={styles.monitorRank}>
      <div className={styles.monitorTitle}>
        <h4 className="h5">
          重点指标监控概况
          <span className={styles.today}>(今日)</span>
        </h4>
        <MoreOutlined className="h4" />
      </div>
      <ReactEcharts option={option} />
    </div>
  );
};

export default KeyIndicatorsMonitor;
