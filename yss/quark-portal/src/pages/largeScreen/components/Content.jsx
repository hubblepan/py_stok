import React, { useRef, useState, useEffect, useCallback, forwardRef, useImperativeHandle } from 'react';
import { getWebSocketUrl, queryScreen } from '@/services/largeScreen';
import ChartDay from './ChartDay';
import ChartWeek from './ChartWeek';
import ChartMonth from './ChartMonth';
import AppContext from '@/utils/AppContext';

const emptyScreenData = {
  monitorStateDict: [],
  failIndex: {
    title: '异常指标',
    data: null,
  },
  indexProfile: {
    title: '指标监控概况',
    total: '',
    data: null,
  },
  portProfile: {
    title: '组合监控概况',
    data: null,
  },
  mainIndexProfile: {
    title: '重点指标监控概况',
    state: [], //状态名称
    xAxis: [], //x轴数据
    xAxisValue: [],
    series: null,
  },
  failPortTopN: {
    title: '异常组合TOP',
    topN: 10,
    data: null,
  },
  failIndexTopN: {
    title: '异常指标TOP',
    topN: 10,
    data: null,
  },
  mainIndexFailTopN: {
    title: '重点指标异常组合TOP',
    topN: 10,
    data: null,
  },
  indexTrend: {
    title: '指标监控状态走势',
    legend: {
      data: [],
    },
    xAxis: {
      data: [],
    },
    series: null,
  },
  portTrend: {
    title: '组合监控状态走势',
    legend: {
      data: [],
    },
    xAxis: {
      data: [],
    },
    series: null,
  },
};

let Content  = (props, ref) => {
  // //console.log(props);
  const [bizDate, setBizDate] = useState(props.bizDate);  //业务日期
  const [chartType, setChartType] = useState('day'); //类型
  const [screenData, setScreenData] = useState({});  //大屏数据
  const [websocket, setWebsocket] = useState();

  const chartRef = useRef();

  useEffect(() => {
    if(websocket){
      //console.log("已初始化websocket");
    }else{
      initWebSocket();
    }
    return () => {
      if (websock) {
        websock.close();
      }
    };
  }, []);

  useImperativeHandle(ref, () => ({
    // onChangeDate 就是暴露给父组件的方法
    onChangeDate: onChangeDate,
    onChangeChartType: onChangeChartType,
    refresh: refresh,
    resetInterval: resetInterval,
  }));

  let websock;
  const initWebSocket = async () => {
    const socketUrl = await getWebSocketUrl();
    //const largeScreenResult = await queryScreen();
    //console.log('socketUrl:' + JSON.stringify(socketUrl));
    //console.log(" initWebSocket bizDate: "+bizDate);
    setBizDate(socketUrl.date);
    //const wsurl = 'ws://10.10.20.29:9090/ocp/largescreen/index';
    websock = new window.WebSocket(socketUrl.url + '/ocp/largescreen/index');
    websock.onmessage = websocketonmessage;
    websock.onopen = websocketonopen;
    websock.onerror = websocketonerror;
    websock.onclose = websocketclose;
    setWebsocket(websock);
  };

  const websocketonopen = () => {
    // 连接建立之后执行send方法发送数据
    let actions = {
      dateType: chartType,
      //date: bizDate,  // 首次不传日期
      userCode: AppContext.session.get('userCode'),
      postCodes: AppContext.session.get('postCodes'),
    };
    websocketsend(JSON.stringify(actions));
  };

  const websocketonerror = () => {
    // 连接建立失败重连
    initWebSocket();
  };

  const websocketonmessage = (e) => {
    // 数据接收
    //console.log('接收数据:' + e.data);
    const screenData = JSON.parse(e.data);
    screenData.time = Date.now(); //添加时间，这样每次接收数据都会刷新页面
    setScreenData(screenData);
  };

  const websocketsend = (Data) => {
    // 数据发送
    if(websock){
      websock.send(Data);
    }
  };

  const websocketclose = (e) => {
    // 关闭
    //console.log('断开websocket连接', e);
  };


  const onChangeDate = (dateString) => {
    setBizDate(dateString);
    emptyScreenData.time = Date.now(); //添加时间，这样每次接收数据都会刷新页面
    emptyScreenData.type = chartType;
    emptyScreenData.bizDate = dateString;
    setScreenData(emptyScreenData);  //切换时，数据置空
    if(websocket){
      // 2 ：CLOSING 即将关闭  3 : CLOSED 已经关闭
      if (websocket.readyState === 2 || websocket.readyState === 3) {
        initWebSocket();
      } else {
        let actions = {
          dateType: chartType,
          date: dateString,
          userCode: AppContext.session.get('userCode'),
          postCodes: AppContext.session.get('postCodes'),
        };
        //console.log(" 切换日期 " + JSON.stringify(actions));
        websocket.send(JSON.stringify(actions));
      }
    }
  };

  const onChangeChartType = (type) => {
    setChartType(type);
    emptyScreenData.time = Date.now(); //添加时间，这样每次接收数据都会刷新页面
    emptyScreenData.type = type;
    emptyScreenData.bizDate = bizDate;
    setScreenData(emptyScreenData); //切换时，数据置空
    if(websocket){
      // 2 ：CLOSING 即将关闭  3 : CLOSED 已经关闭
      if (websocket.readyState === 2 || websocket.readyState === 3) {
        initWebSocket();
      } else {
        let actions = {
          dateType: type,
          date: bizDate,
          userCode: AppContext.session.get('userCode'),
          postCodes: AppContext.session.get('postCodes'),
        };
        //console.log(" 切换类型 " + JSON.stringify(actions));
        websocket.send(JSON.stringify(actions));
      }
    }
  };

  const refresh = () => {
    emptyScreenData.time = Date.now(); //添加时间，这样每次接收数据都会刷新页面
    emptyScreenData.type = chartType;
    emptyScreenData.bizDate = bizDate;
    setScreenData(emptyScreenData); //刷新时，数据置空
    if(websocket){
      // 2 ：CLOSING 即将关闭  3 : CLOSED 已经关闭
      if (websocket.readyState === 2 || websocket.readyState === 3) {
        initWebSocket();
      } else {
        let actions = {
          dateType: chartType,
          date: bizDate,
          userCode: AppContext.session.get('userCode'),
          postCodes: AppContext.session.get('postCodes'),
        };
        //console.log(" 刷新 " + JSON.stringify(actions));
        websocket.send(JSON.stringify(actions));
      }
    }
  };

  const resetInterval = () => {
    //console.log("重置滚动时间");
    chartRef.current.resetInterval();
  };

  const getCurrentChart = () => {
    if (chartType === 'day') {
      return <ChartDay screenData={screenData} bizDate={bizDate} ref={chartRef} ></ChartDay>;
    } else if (chartType === 'week') {
      return <ChartWeek screenData={screenData} bizDate={bizDate} ref={chartRef}></ChartWeek>;
    } else {
      return <ChartMonth screenData={screenData} bizDate={bizDate} ref={chartRef}></ChartMonth>;
    }
  };

  return (
    <div>
      {getCurrentChart()}
    </div>

  );
};
Content = forwardRef(Content);

export default Content;
