export default {
  color: [
    '#6DBBFF',
    '#FB6661',
    '#6DBBFF',
    '#FB6661',
  ],
  backgroundColor: 'transparent',
  tooltip: {
    trigger: 'axis'
  },
  grid: {
    left: '3%',
    right: '4%',
    bottom: '3%',
    containLabel: true
  },
  xAxis: {
    axisLine: {
      show: false,
    },
    axisTick: {
      show: false,
    },
    axisLabel: {
      textStyle: {
        fontSize: 10,
        color: '#666',
      },
    },
    type: 'category',
    boundaryGap: true,
  },
  yAxis: {
    splitNumber: 5,
    axisLine: {
      show: false,
    },
    axisTick: {
      show: false,
    },
    axisLabel: {
      textStyle: {
        fontSize: 10,
        color: 'rgba(255, 255, 255, 0.5)',
      },
      show: true,
      interval: 'auto',
      formatter: '{value}',
    },
    splitLine: {
      lineStyle: {
        color: 'rgba(168, 178, 185, .1)',
      },
    },
    type: 'value'
  },
};
