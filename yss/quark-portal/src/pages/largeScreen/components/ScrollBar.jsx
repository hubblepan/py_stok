import React, { useState, useEffect, forwardRef, useRef, useImperativeHandle } from 'react';
// 引入 ECharts 主模块
import Bar from '../../../components/Charts/Bar/index';

import AppContext from '@/utils/AppContext';

let ScrollBar  = (props, ref) => {
  const [time, setTime] = useState('');
  const [barOption, setBarOption] = useState(props.data);
  const [series, setSeries] = useState(barOption.series);
  const [bizDate, setBizDate] = useState(props.bizDate);
  const [type, setType] = useState(props.type);  //请求类型, 也是url后缀
  const [xAxisValue, setXAxisValue] = useState(props.xAxisValue);
  const [monitorStateDict, setMonitorStateDict] = useState(props.monitorStateDict);

  let zoomstart;
  let zoomend;
  let totalCount;           // 总共柱子数量
  const fullColumns = 8;   // 满屏显示 8个柱子
  useEffect(() => {
    setBarOption(props.data);
    setBizDate(props.bizDate);
    setType(props.type);
    setXAxisValue(props.xAxisValue);
    setMonitorStateDict(props.monitorStateDict);
    startScroll();
    return () => {
      if(time && time !== ''){
        clearInterval(time);
      }
    };
  }, [props.data.series, props.bizDate]);

  useImperativeHandle(ref, () => ({
    // startScroll 就是暴露给父组件的方法
    startScroll,
  }));

  const startScroll = () => {
    //console.log("scrollbar  "+ AppContext.session.get('interval') );
    if (props.data.series) {
      //console.log("scrollbar start time "+ time );
      if(time && time !== ''){
        clearInterval(time);
      }
      zoomstart = 0;
      // setData(props.option.yAxis)
      // setSeriesData(props.option.series)
      if (props.data.series[0] && props.data.series[0].data) {
        totalCount = props.data.series[0].data.length;
      }

      if (props.data.xAxis[0].data.length > fullColumns) {
        zoomend = fullColumns - 1;  // 初始 从0到7
        if (props.data.xAxis[0].data && props.data.series) {
          options(props.data.state, props.data.xAxis[0].data, props.data.series);
        }
      } else {
        if (props.data.series[0] && props.data.series[0].data) {
          zoomend = props.data.series[0].data.length;
        }
      }
    }
  };

  let barHtml = "";
  if (barOption && barOption.series && barOption.series.length > 0) {
    barHtml = <Bar data={barOption} type={type} bizDate={bizDate} xAxisValue={xAxisValue} monitorStateDict={monitorStateDict}  />;
  }

  return (
    <div style={{ flex: 1}} >
      {barHtml}
    </div>
  );


  function zoomStart() {
    if (zoomend >= totalCount - 1) zoomstart = 0;
    else {
      zoomstart += 1;
    }

    return zoomstart;
  }

  function zoomEnd() {

    if (zoomend >= totalCount - 1) zoomend = 7;
    else {
      zoomend += 1;
    }

    return zoomend;
  }


  function options(legend, xData, serdata) {
    const intervalTime = setInterval(() => {
      setBarOption({
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
              str = `${str}<br/>${item.marker}${item.seriesName} : ${item.value}%`;
            });
            return str;
          },
        },
        legend: {
          data: legend,
          selected:  AppContext.session.get('legendselectchanged')?JSON.parse(AppContext.session.get('legendselectchanged')):{},
          textStyle: {
            // 图例文字的样式
            color: 'rgba(255, 255, 255, 0.6)',
          },
          itemHeight: 10,
          itemWidth: 10,
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
        xAxis: [
          {
            type: 'category',
            data: xData,
            axisLabel: {
              textStyle: {
                color: 'rgba(255, 255, 255, 0.6)',
                lineHeight: 15,
              },
              formatter: function (params) {  // x轴label换行显示
                var newParamsName = "";// 最终拼接成的字符串
                var paramsNameNumber = params.length;// 实际标签的个数
                var provideNumber = 6;// 每行能显示的字的个数
                var rowNumber = Math.ceil(paramsNameNumber / provideNumber);// 换行的话，需要显示几行，向上取整
                /**
                * 判断标签的个数是否大于规定的个数， 如果大于，则进行换行处理 如果不大于，即等于或小于，就返回原标签
                */
                // 条件等同于rowNumber>1
                if(paramsNameNumber > 16){
                  params = params.substring(0, 15);  // 截取前三行
                }
                if (paramsNameNumber > provideNumber) {
                  /** 循环每一行,p表示行 */
                  for (var p = 0; p < rowNumber; p++) {
                    var tempStr = "";// 表示每一次截取的字符串
                    var start = p * provideNumber;// 开始截取的位置
                    var end = start + provideNumber;// 结束截取的位置
                    // 此处特殊处理最后一行的索引值
                    if (p === rowNumber - 1) {
                      // 最后一次不换行
                      tempStr = params.substring(start, paramsNameNumber);
                    } else {
                      // 每一次拼接字符串并换行
                      tempStr = params.substring(start, end) + "\n";
                    }
                    newParamsName += tempStr;// 最终拼成的字符串
                  }
                } else {
                  // 将旧标签的值赋给新标签
                  newParamsName = params;
                }

                if(paramsNameNumber > 16){
                  newParamsName = newParamsName + '...';
                }
                //将最终的字符串返回
                return newParamsName;
              },
            },
          },
        ],
        series: serdata,
        dataZoom: [
          {
            xAxisIndex: 0, // 这里是从X轴的0刻度开始
            show: false, // 是否显示滑动条，不影响使用
            type: 'slider', // 这个 dataZoom 组件是 slider 型 dataZoom 组件
            startValue: zoomStart(),
            endValue: zoomEnd(), // 默认显示条柱数
          },
        ],
      });
    }, AppContext.session.get('interval') ? AppContext.session.get('interval') : 30000);  //滚动频率
    setTime(intervalTime);
  }

};
ScrollBar = forwardRef(ScrollBar);

export default ScrollBar;
