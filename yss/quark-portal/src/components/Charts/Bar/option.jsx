export default {
  color: [
    '#4182FA',
    '#FB6661',
    '#F6BD16',
    '#5D7092',
    '#945FB9',
  ],
  backgroundColor: 'rgb(28, 33, 52)',
  textStyle: {
    color: 'rgba(255, 255, 255, 0.6)',
  },
  tooltip: {
    trigger: 'axis',
    axisPointer: {
      // 坐标轴指示器，坐标轴触发有效
      type: 'shadow', // 默认为直线，可选为：'line' | 'shadow'
    },
    label: {
      precision: 2,
    },
    formatter: (params) => {
      let str = params[0].name;
      params.forEach((item) => {
        str = `${str  }<br/>${  item.marker  }${item.seriesName  } : ${  item.value  }%`;
      });
      return str;
    },
  },
  grid: {
    top: '40px',
    left: '10px',
    right: '10px',
    bottom: '10px',
    containLabel: true,
  },
  yAxis: {
    inverse: false,
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
      formatter: '{value}%',
    },
    splitLine: {
      lineStyle: {
        color: 'rgba(168, 178, 185, .1)',
      },
    },
    type: 'value',
  },
};
