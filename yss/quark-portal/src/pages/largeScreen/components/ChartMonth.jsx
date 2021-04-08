import React, { useEffect, useState } from 'react';
import css from '../index.less';
import { Button, Radio, DatePicker, Progress, Spin } from 'antd';
import { SettingOutlined } from '@ant-design/icons';
import { queryScreen } from '@/services/largeScreen';
import Line from '../../../components/Charts/Line/index';
import ScrollList from './ScrollList';
import AppContext from '@/utils/AppContext';
import NoData from './NoData';
import moment from 'moment';
moment.suppressDeprecationWarnings = true;

const indexTrendLineOption = {
  legend: {
    icon: 'line',
    // data: ['正常-首次', '异常-首次', '正常-最新', '异常-最新'],
    textStyle: {
      // 图例文字的样式
      color: 'rgba(255, 255, 255, 0.6)',
    },
    show: true,
    orient: 'horizontal',
    data: [
      {
        name: '正常-首次',
        textStyle: {
          // 图例文字的样式
          color: 'rgba(255, 255, 255, 0.6)',
        },
      },
      {
        name: '异常-首次',
        textStyle: {
          // 图例文字的样式
          color: 'rgba(255, 255, 255, 0.6)',
        },
      },
      {
        name: '正常-最新',
        textStyle: {
          fontSize: 12,
          fontWeight: 'bolder',
          color: 'rgba(255, 255, 255, 0.6)'
        },
        icon: 'image://../lengendLine1.svg'
      },
      {
        name: '异常-最新',
        textStyle: {
          fontSize: 12,
          fontWeight: 'bolder',
          color: 'rgba(255, 255, 255, 0.6)'
        },
        icon: 'image://../lengendLine2.svg'
      }
    ]
  },
  xAxis: {
    type: 'category',
    boundaryGap: false,
    data: [],  // 填写 x轴数据
    axisLabel: {
      textStyle: {
        color: 'rgba(255, 255, 255, 0.6)',
      },
      formatter: function (params) {
        // 只显示 月/日
        return (moment(params, "YYYY-MM-DD").month()+1) + "/" + moment(params, "YYYY-MM-DD").date();
      },
    },
  },
  series: [], // 填写 数据
};


const portTrendLineOption = {
  legend: {
    icon: 'line',
    // data: ['正常-首次', '异常-首次', '正常-最新', '异常-最新'],
    textStyle: {
      // 图例文字的样式
      color: 'rgba(255, 255, 255, 0.6)',
    },
    show: true,
    orient: 'horizontal',
    data: [
      {
        name: '正常-首次',
        textStyle: {
          // 图例文字的样式
          color: 'rgba(255, 255, 255, 0.6)',
        },
      },
      {
        name: '异常-首次',
        textStyle: {
          // 图例文字的样式
          color: 'rgba(255, 255, 255, 0.6)',
        },
      },
      {
        name: '正常-最新',
        textStyle: {
          fontSize: 12,
          fontWeight: 'bolder',
          color: 'rgba(255, 255, 255, 0.6)'
        },
        icon: 'image://../lengendLine1.svg'
      },
      {
        name: '异常-最新',
        textStyle: {
          fontSize: 12,
          fontWeight: 'bolder',
          color: 'rgba(255, 255, 255, 0.6)'
        },
        icon: 'image://../lengendLine2.svg'
      }
    ]
  },
  xAxis: {
    type: 'category',
    boundaryGap: false,
    data: [],  // 填写 x轴数据
    axisLabel: {
      textStyle: {
        color: 'rgba(255, 255, 255, 0.6)',
      },
      formatter: function (params) {
        // 只显示 月/日
        return (moment(params, "YYYY-MM-DD").month()+1) + "/" + moment(params, "YYYY-MM-DD").date();
      },
    },
  },
  series: [],  // 填写 数据
};

const itemStyle = {
  normal: {
    lineStyle: {
      type: 'dotted'  //'dotted'虚线 'solid'实线
    }
  }
};


class ChartMonth extends React.Component {
  constructor(props) {
    super(props);
    indexTrendLineOption.series = null;  //切换 日/周/月时，置空。用以显示loading
    portTrendLineOption.series = null;
    this.state = {
      failIndexTopNData: null,
      mainIndexFailTopNData: null,
      indexTrendLineOption: indexTrendLineOption,
      portTrendLineOption: portTrendLineOption,
      topN1: '10',
      topN2: '10',
      bizDate: props.bizDate,
      monitorStateDict: [],
      screenData: props.screenData,
    };
    this.failIndexTopNRef = React.createRef();
    this.mainIndexFailTopNRef = React.createRef();
  }

  componentWillUnmount() {
    this.setState = () => false;
  }

  componentWillReceiveProps(nextProps) {
    const { screenData, bizDate} = nextProps;
    if (
      //screenData !== this.state.screenData &&
      screenData.type === 'month' &&
      screenData.bizDate === AppContext.session.get('bizDate')
    ) {
      const largeScreenResult = screenData;
      //const largeScreenResult = screenData;
      if(JSON.stringify(largeScreenResult) !== "{}"){

        if(largeScreenResult.indexTrend){
          indexTrendLineOption.xAxis.data = largeScreenResult.indexTrend.xAxis.data;
          indexTrendLineOption.series = largeScreenResult.indexTrend.series;
          if(indexTrendLineOption.series){
            for (let i = 0; i < indexTrendLineOption.series.length; i++) {
              if (indexTrendLineOption.series[i].name === '正常-最新' ||
                indexTrendLineOption.series[i].name === '异常-最新') {
                indexTrendLineOption.series[i].itemStyle = itemStyle;
              }
            }
          }
          this.setState({
            indexTrendLineOption,
            monitorStateDict: largeScreenResult.monitorStateDict,
            bizDate,
          });
        }

        if(largeScreenResult.portTrend){
          portTrendLineOption.xAxis.data = largeScreenResult.portTrend.xAxis.data;
          portTrendLineOption.series = largeScreenResult.portTrend.series;
          if(portTrendLineOption.series){
            for (let i = 0; i < portTrendLineOption.series.length; i++) {
              if (portTrendLineOption.series[i].name === '正常-最新' ||
                portTrendLineOption.series[i].name === '异常-最新') {
                portTrendLineOption.series[i].itemStyle = itemStyle;
              }
            }
          }
          this.setState({
            portTrendLineOption,
            monitorStateDict: largeScreenResult.monitorStateDict,
            bizDate,
          });
        }

        if(largeScreenResult.failIndexTopN){
          this.setState({
            failIndexTopNData: largeScreenResult.failIndexTopN.data,
            topN1: largeScreenResult.failIndexTopN.topN,
            monitorStateDict: largeScreenResult.monitorStateDict,
            bizDate,
          });
        }

        if(largeScreenResult.mainIndexFailTopN){
          this.setState({
            mainIndexFailTopNData: largeScreenResult.mainIndexFailTopN.data,
            topN2: largeScreenResult.mainIndexFailTopN.topN,
            monitorStateDict: largeScreenResult.monitorStateDict,
            bizDate,
          });
        }

      }
    }
  }

  resetInterval = () => {
    //console.log("重置滚动时间");
    if(this.failIndexTopNRef.current != null){
      this.failIndexTopNRef.current.reStartScrollUp();
    }
    if(this.mainIndexFailTopNRef.current != null){
      this.mainIndexFailTopNRef.current.reStartScrollUp();
    }
  }


  render() {

    const lineChartIndex = () => {
      let res = [];
      if( this.state.indexTrendLineOption.series){
        res = (<Line data={this.state.indexTrendLineOption} style={{ height: 320, flex: 1 }}
          type='indextrend'
          bizDate={this.state.bizDate}
          monitorStateDict={this.state.monitorStateDict}
          period='month' />);
      }else{
        res = ( <div style={{ margin: 'auto' }}><Spin spinning={true} size="large" tip="加载中 ..." /></div>);
      }
      return res;
    };

    const lineChartPort = () => {
      let res = [];
      if( this.state.portTrendLineOption.series){
        res = (<Line data={this.state.portTrendLineOption} style={{ height: 320, flex: 1 }}
          type='porttrend'
          bizDate={this.state.bizDate}
          monitorStateDict={this.state.monitorStateDict}
          period='month' />);
      }else{
        res = ( <div style={{ margin: 'auto' }}><Spin spinning={true} size="large" tip="加载中 ..." /></div>);
      }
      return res;
    };

    const scrollListFailIndexTopNData = () => {
      //console.log("this.state.failIndexTopNData  "+this.state.failIndexTopNData);
      let res = [];
      if(this.state.failIndexTopNData){
        if(this.state.failIndexTopNData.length > 0){
          res = (<ScrollList dataSource={this.state.failIndexTopNData}
            type='failindextopn'
            bizDate={this.state.bizDate}
            monitorStateDict={this.state.monitorStateDict}
            period='month'
            topN={this.state.topN1}
            fullRows='10'
            ref={this.failIndexTopNRef} />);
        }else{
          res = ( <div style={{ margin: 'auto', textAlign: 'center' }}><NoData /></div>);
        }
      }else{
        res = ( <div style={{ margin: 'auto' }}><Spin spinning={true} size="large" tip="加载中 ..." /></div>);
      }
      return res;
    };

    const scrollListMainIndexFailTopNData = () => {
      let res = [];
      if(this.state.mainIndexFailTopNData){
        if(this.state.mainIndexFailTopNData.length > 0){
          res = (<ScrollList dataSource={this.state.mainIndexFailTopNData}
            type='mainindexprofiletopn'
            bizDate={this.state.bizDate}
            monitorStateDict={this.state.monitorStateDict}
            period='month'
            topN={this.state.topN2}
            fullRows='10'
            ref={this.mainIndexFailTopNRef} />);
        }else{
          res = ( <div style={{ margin: 'auto', textAlign: 'center' }}><NoData /></div>);
        }
      }else{
        res = ( <div style={{ margin: 'auto' }}><Spin spinning={true} size="large" tip="加载中 ..." /></div>);
      }
      return res;
    };

    return (
      <section className={css.lsdMain}>
        <section className={css.lsdContent}>
          <div className={css.lsdBox}>
            <h4 className={css.lsdHeader}>指标监控状态走势</h4>
            <div className={css.lsdBody}>
              {lineChartIndex()}
            </div>
          </div>
          <div className={css.lsdBox}>
            <h4 className={css.lsdHeader}>组合监控状态走势</h4>
            <div className={css.lsdBody}>
              {lineChartPort()}
            </div>
          </div>
        </section>
        <aside className={css.lsdAside}>
          <div className={css.lsdBox}>
            <h4 className={css.lsdHeader}>异常指标 TOP {this.state.topN1}</h4>
            <div className={css.lsdBody} style={{ overflow: 'hidden' }}>
              {scrollListFailIndexTopNData()}
            </div>
          </div>
          <div className={css.lsdBox}>
            <h4 className={css.lsdHeader}>重点指标异常组合 TOP {this.state.topN2}</h4>
            <div className={css.lsdBody} style={{ overflow: 'hidden' }}>
              {scrollListMainIndexFailTopNData()}
            </div>
          </div>
        </aside>
      </section>
    );
  };
};

export default ChartMonth;
