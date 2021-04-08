import React, { useState, useEffect, createRef } from 'react';
import { Spin } from 'antd';
import css from '../index.less';
import Pie from '../../../components/Charts/Pie/index';
import ScrollList from './ScrollList';
import ScrollBar from './ScrollBar';
import DetailModal from '@/pages/largeScreen/components/DetailModal';
import AppContext from '@/utils/AppContext';
import NoData from './NoData';

const monitorStateSuccess = '正常';
const monitorStateWarning = '预警';
const monitorStateError = '异常';
const monitorStateUnexecuted = '未执行';

const pieOption = {
  graphic: [
    {
      // 环形图中间添加文字
      type: 'text', // 通过不同top值可以设置上下显示
      left: 'center',
      top: '45%',
      style: {
        text: ' ', // 填写 总数量
        textAlign: 'center',
        fill: 'white', // 文字的颜色
        width: 30,
        height: 30,
        fontSize: 26,
        color: '#4d4f5c',
        fontWeight: 'bold',
      },
    },
    {
      type: 'text',
      left: 'center',
      top: '55%',
      style: {
        text: '',
        textAlign: 'center',
        fill: 'rgba(255, 255, 255, 0.6)',
        width: 30,
        height: 30,
        fontSize: 16,
      },
    },
  ],
  series: [
    {
      name: '监控占比',
      type: 'pie',
      radius: ['42%', '60%'],
      //minAngle: 5,  //最小扇区的角度
      avoidLabelOverlap: true,
      label: {
        normal: {
          formatter: ' {b|{b}} {per|{d}%} ',
          backgroundColor: '#222744',
          borderColor: '#5074E2',
          borderWidth: 1,
          borderRadius: 4,
          rich: {
            b: {
              fontSize: 16,
              lineHeight: 26,
              fontWeight: 'bold',
            },
            per: {
              color: '#eee',
              backgroundColor: '#222744',
              padding: [2, 4],
              borderRadius: 2,
              fontSize: 16,
              fontWeight: 'bold',
            },
          },
          textStyle: {
            fontSize: 16,
            fontWeight: 'bold',
          },
        },
      },
      itemStyle: {
        show: false,
        borderColor: 'rgb(28, 31, 43)',
        borderWidth: 2,
      },
      labelLine: {
        normal: {
          show: true,
        },
      },
      data: null, // 填写
    },
  ],
};

const barOption = {
  legend: {
    data: [], // 填写
    textStyle: {
      // 图例文字的样式
      color: 'rgba(255, 255, 255, 0.6)',
    },
    itemHeight: 10,
    itemWidth: 10,
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
      data: [], // 填写  指标名称
      axisLabel: {
        textStyle: {
          color: 'rgba(255, 255, 255, 0.6)',
          lineHeight: 15,
        },
        formatter: function (params) {
          //换行显示指标名称
          var newParamsName = ''; // 最终拼接成的字符串
          var paramsNameNumber = params.length; // 实际标签的个数
          var provideNumber = 6; // 每行能显示的字的个数
          var rowNumber = Math.ceil(paramsNameNumber / provideNumber); // 换行的话，需要显示几行，向上取整
          /**
           * 判断标签的个数是否大于规定的个数， 如果大于，则进行换行处理 如果不大于，即等于或小于，就返回原标签
           */
          if (paramsNameNumber > 16) {
            params = params.substring(0, 15); // 截取前三行
          }
          // 条件等同于rowNumber>1
          if (paramsNameNumber > provideNumber) {
            /** 循环每一行,p表示行 */
            for (var p = 0; p < rowNumber; p++) {
              var tempStr = ''; // 表示每一次截取的字符串
              var start = p * provideNumber; // 开始截取的位置
              var end = start + provideNumber; // 结束截取的位置
              // 此处特殊处理最后一行的索引值
              if (p === rowNumber - 1) {
                // 最后一次不换行
                tempStr = params.substring(start, paramsNameNumber);
              } else {
                // 每一次拼接字符串并换行
                tempStr = params.substring(start, end) + '\n';
              }
              newParamsName += tempStr; // 最终拼成的字符串
            }
          } else {
            // 将旧标签的值赋给新标签
            newParamsName = params;
          }
          if (paramsNameNumber > 16) {
            newParamsName = newParamsName + '...';
          }
          //将最终的字符串返回
          return newParamsName;
        },
      },
    },
  ],
  dataZoom: [
    // 滑动条
    {
      xAxisIndex: 0, // 这里是从X轴的0刻度开始
      show: false, // 是否显示滑动条，不影响使用
      type: 'slider', // 这个 dataZoom 组件是 slider 型 dataZoom 组件
      startValue: 0, // 从0开始。
      endValue: 7, // 一次性展示8个。
    },
  ],
  series: null, // 填写
};

const barItemStyle = {
  normal: {
    borderColor: '#181D2F',
    borderWidth: 2,
  },
};

const portColumns = [
  {
    title: '序号',
    dataIndex: 'sn',
    key: 'sn',
    width: 80,
  },
  {
    title: '业务日期',
    dataIndex: 'bizDate',
    key: 'bizDate',
    width: 100,
  },
  {
    title: '组合代码',
    dataIndex: 'portCode',
    key: 'portCode',
    width: 80,
  },
  {
    title: '组合名称',
    dataIndex: 'portName',
    key: 'portName',
    width: 300,
  },
  {
    title: '监控结果',
    dataIndex: 'monitorResult',
    key: 'monitorResult',
    width: 100,
  },
  {
    title: '结果描述',
    dataIndex: 'resultDesc',
    key: 'resultDesc',
    //width: 120,
  },
];



class ChartDay extends React.Component {
  constructor(props) {
    super(props);
    pieOption.series[0].data = null;  //切换 日/周/月时，置空。用以显示loading
    barOption.series = null;
    this.state = {
      failIndexData: null,
      failPortTopNData: null,
      portProfileData: null,
      pieOption: pieOption,
      barOption: barOption,
      topN: '10',
      bizDate: props.bizDate, // 业务日期
      xAxisValue: [], // 重点指标监控概况, x轴坐标指标名称对应的指标code数组 (详情查询用的参数)
      monitorStateDict: [], // 监控状态数据字典
      parameter: [], // 详情参数
      modalTitle: '', // 详情界面 标题
      screenData: props.screenData, //大屏数据
      showModal: true,
    };
    this.failIndexRef = React.createRef();
    this.failPortTopNRef = React.createRef();
    this.mainIndexProfileRef = React.createRef();
  }

  componentDidMount() {
    //this.queryLargeScreen();
  }

  componentWillUnmount() {
    this.setState = () => false;
  }

  componentWillReceiveProps(nextProps) {
    const { screenData, bizDate , isFirst} = nextProps;

    if (
      //JSON.stringify(screenData) !== JSON.stringify(this.state.screenData) &&
      screenData.type === 'day' &&
      screenData.bizDate === AppContext.session.get('bizDate')
    ) {

      const largeScreenResult = screenData;
      if (JSON.stringify(largeScreenResult) != '{}') {

        // 修改pieOption
        if (largeScreenResult.indexProfile) {
          pieOption.graphic[0].style.text = largeScreenResult.indexProfile.total;
          pieOption.graphic[1].style.text = largeScreenResult.indexProfile.title;
          pieOption.series[0].data = largeScreenResult.indexProfile.data;
          this.setState({
            pieOption,
            monitorStateDict: largeScreenResult.monitorStateDict,
            bizDate,
          });
        }

        // 修改barOption
        if (largeScreenResult.mainIndexProfile) {
          barOption.legend.data = largeScreenResult.mainIndexProfile.state;
          barOption.xAxis[0].data = largeScreenResult.mainIndexProfile.xAxis;
          const xAxisValue = largeScreenResult.mainIndexProfile.xAxisValue;
          barOption.series = largeScreenResult.mainIndexProfile.series;
          if(barOption.series){
            for (let i = 0; i < barOption.series.length; i++) {
              barOption.series[i].itemStyle = barItemStyle; // 圆柱样式
              barOption.series[i].barWidth = 32; // 柱图宽度
              //barOption.series[i].barMinHeight = 3; // 最小高度
            }
          }
          this.setState({
            barOption,
            xAxisValue,
            monitorStateDict: largeScreenResult.monitorStateDict,
            bizDate,
          });
        }

        if (largeScreenResult.failIndex ) {
          this.setState({
            failIndexData: largeScreenResult.failIndex.data,
            monitorStateDict: largeScreenResult.monitorStateDict,
            bizDate,
          });
        }

        if (largeScreenResult.failPortTopN ) {
          this.setState({
            failPortTopNData: largeScreenResult.failPortTopN.data,
            topN: largeScreenResult.failPortTopN.topN,
            monitorStateDict: largeScreenResult.monitorStateDict,
            bizDate,
          });
        }

        if (largeScreenResult.portProfile) {
          this.setState({
            portProfileData: largeScreenResult.portProfile.data,
            monitorStateDict: largeScreenResult.monitorStateDict,
            bizDate,
          });
        }

      }
    }

  }

  // 组合监控概况 弹出详细页面
  detailRef = React.createRef();
  onclickPort = (portProfileData) => {
    let monitorStateMap = new Map();
    this.state.monitorStateDict.forEach(function (val, index, arr) {
      monitorStateMap.set(val.name, val.code); //name code
    });
    let modalTitle = ''; //详情页面标题
    let condition = {}; //查询条件
    let parmaMonitorState = portProfileData.monitorState.replace(/指标/, '');
    condition = {
      bizDate: this.state.bizDate,
      monitorState: monitorStateMap.get(parmaMonitorState),
    };
    modalTitle = '组合监控概况详情-' + parmaMonitorState;
    this.setState({
      parameter: {
        conditionParam: condition,
        url: `/ocp/largescreen/todayport`,
        columns: portColumns,
      },
      modalTitle,
    });
    this.detailRef.current.showDialog();
  };

  resetInterval = () => {
    //console.log("重置滚动时间");
    if(this.failIndexRef.current != null){
      this.failIndexRef.current.reStartScrollUp();
    }
    if(this.failPortTopNRef.current != null){
      this.failPortTopNRef.current.reStartScrollUp();
    }
    if(this.mainIndexProfileRef.current != null){
      this.mainIndexProfileRef.current.startScroll();
    }
  }

  //销毁modal
  setModalHidden = () => {
    this.setState({
      showModal: false
    }, () => {
      this.setState({
        showModal: true,
      });
    });
  }

  render() {
    const listPortProfile = () => {
      let res = [];
      let textClass = '';
      if(this.state.portProfileData){
        for (let i = 0; i < this.state.portProfileData.length; i++) {
          if (this.state.portProfileData[i].monitorState === monitorStateSuccess) {
            textClass = `${css.lsdSuccess}`;
          } else if (this.state.portProfileData[i].monitorState === monitorStateWarning) {
            textClass = `${css.lsdWarning}`;
          } else if (this.state.portProfileData[i].monitorState === monitorStateError) {
            textClass = `${css.lsdException}`;
          } else if (this.state.portProfileData[i].monitorState === monitorStateUnexecuted) {
            textClass = `${css.lsdUnexecuted}`;
          } else {
            textClass = `${css.lsdError}`;
          }
          res.push(
            <div key={this.state.portProfileData[i].monitorState} className={css.infoBox}>
              <div
                className={css.infoBoxContent}
                style={{ cursor: 'pointer' }}
                onClick={() => this.onclickPort(this.state.portProfileData[i])}
              >
                <span className={css.infoBoxText}>
                  {this.state.portProfileData[i].monitorState}组合
                </span>
                <span className={css.infoBoxNumber}>{this.state.portProfileData[i].value}</span>
                <span className={css.progressDescription}>
                  组合占比<em className={textClass}>{this.state.portProfileData[i].ratio}%</em>
                </span>
              </div>
            </div>,
          );
        }
      }else{
        res = (<Spin spinning={true} size="large" tip="加载中 ..." />);
      }
      return res;
    };

    const pieChart = () => {
      let res = [];
      if( this.state.pieOption.series && this.state.pieOption.series[0].data){
        res = (<Pie
                data={this.state.pieOption}
                style={{ height: 380, flex: 1 }}
                type="todayindex"
                bizDate={this.state.bizDate}
                monitorStateDict={this.state.monitorStateDict}
              />);
      }else{
        res = ( <div style={{ margin: 'auto' }}><Spin spinning={true} size="large" tip="加载中 ..." /></div>);
      }
      return res;
    }

    const scrollListFailIndexData = () => {
      //console.log("this.state.failIndexData  "+this.state.failIndexData);
      let res = [];
      if(this.state.failIndexData){
        if(this.state.failIndexData.length > 0){
          res = (<ScrollList
                dataSource={this.state.failIndexData}
                type="todayfailindex"
                bizDate={this.state.bizDate}
                monitorStateDict={this.state.monitorStateDict}
                fullRows="10"
                ref={this.failIndexRef}
              />);
        }else{
          res = ( <div style={{ margin: 'auto', textAlign: 'center' }}><NoData /></div>);
        }
      }else{
        res = ( <div style={{ margin: 'auto' }}><Spin spinning={true} size="large" tip="加载中 ..." /></div>);
      }
      return res;
    }

    const scrollListFailPortTopNData = () => {
      let res = [];
      if(this.state.failPortTopNData){
        if(this.state.failPortTopNData.length > 0){
          res = (<ScrollList
                dataSource={this.state.failPortTopNData}
                type="todayfailporttopn"
                bizDate={this.state.bizDate}
                monitorStateDict={this.state.monitorStateDict}
                fullRows="12"
                topN={this.state.topN}
                ref={this.failPortTopNRef}
              />);
        }else{
          res = ( <div style={{ margin: 'auto', textAlign: 'center'  }}><NoData /></div>);
        }
      }else{
        res = ( <div style={{ margin: 'auto' }}><Spin spinning={true} size="large" tip="加载中 ..." /></div>);
      }
      return res;
    }

    const scrollBarChart = () => {
      let res = [];
      if( this.state.barOption.series){
        res = (<ScrollBar
                data={this.state.barOption}
                type="mainindexprofile"
                bizDate={this.state.bizDate}
                xAxisValue={this.state.xAxisValue}
                monitorStateDict={this.state.monitorStateDict}
                ref={this.mainIndexProfileRef}
              />);
      }else{
        res = ( <div style={{ margin: 'auto' }}><Spin spinning={true} size="large" tip="加载中 ..." /></div>);
      }
      return res;
    }

    const showDetail = () => {
      let res = '';
      if( this.state.showModal){
        res = (<DetailModal
          parameter={this.state.parameter}
          ref={this.detailRef}
          title={this.state.modalTitle}
          setModalHidden={this.setModalHidden}
        />);
      }
      return res;
    }

    return (
      <section className={css.lsdMain}>
        <section className={css.lsdContent}>
          <section className={css.lsdContentWrapper}>
            <div className={css.lsdBox} style={{ width: 476 }}>
              <h4 className={css.lsdHeader}>异常指标</h4>
              <div className={css.lsdBody} style={{ overflow: 'hidden' }}>
                {scrollListFailIndexData()}
              </div>
            </div>
            <div className={`${css.lsdMainChart} ${css.lsdRight}`}>
              {pieChart()}
            </div>
          </section>
          <div className={css.lsdBox}>
            <h4 className={css.lsdHeader}>重点指标监控概况</h4>
            <div className={css.lsdBody}>
              {scrollBarChart()}
            </div>
          </div>
        </section>
        <aside className={css.lsdAside}>
          <div className={css.lsdBox} style={{ height: 300 }}>
            <h4 className={css.lsdHeader}>组合监控概况</h4>
            <div style={{ margin: 'auto' }}>
              <div className={css.lsdBody}>
                {listPortProfile()}
              </div>
            </div>
          </div>
          <div className={css.lsdBox} style={{ height: 460, paddingBottom: 16 }}>
            <h4 className={css.lsdHeader}>异常组合 TOP {this.state.topN}</h4>
            <div className={css.lsdBody} style={{ overflow: 'hidden' }}>
              {scrollListFailPortTopNData()}
            </div>
          </div>
        </aside>
        {showDetail()}
      </section>
    );
  }
}

export default ChartDay;
