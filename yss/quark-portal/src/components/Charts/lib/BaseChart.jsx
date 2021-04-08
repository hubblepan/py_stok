import React, { Component, PureComponent, useRef } from 'react';
import { Tag, Badge, Spin } from 'antd';
import PropTypes from 'prop-types';
import Echarts from 'echarts-for-react';
import moment from 'moment';
import DetailModal from '@/pages/largeScreen/components/DetailModal';
import AppContext from '@/utils/AppContext';
//import monitorStateTrans from '@/utils/utils';
moment.suppressDeprecationWarnings = true;


const indexColumns = [
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
    width: 120,
  },
  {
    title: '指标名称',
    dataIndex: 'indexName',
    key: 'indexName',
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
]



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
    width: 240,
  },
  {
    title: '指标名称',
    dataIndex: 'indexName',
    key: 'indexName',
    width: 200,
  },
  {
    title: '监控状态',
    dataIndex: 'monitorState',
    key: 'monitorState',
    width: 100,
    render: monitorState => monitorStateTrans(monitorState),
  },
  {
    title: '结果描述',
    dataIndex: 'resultDesc',
    key: 'resultDesc',
    width: 200,
  },
  {
    title: '执行人',
    dataIndex: 'updateBy',
    key: 'updateBy',
    width: 120,
  },
  {
    title: '最后监控时间',
    dataIndex: 'updateTime',
    key: 'updateTime',
    width: 120,
  },
  {
    title: '确认人',
    dataIndex: 'checkBy',
    key: 'checkBy',
    width: 120,
  },
  {
    title: '确认时间',
    dataIndex: 'checkTime',
    key: 'checkTime',
    width: 120,
  },
  {
    title: '确认备注',
    dataIndex: 'comment',
    key: 'comment',
    //width: 120,
  },
]


const porttrendColumns = [
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
    width: 120,
  },
  {
    title: '组合代码',
    dataIndex: 'portCode',
    key: 'portCode',
    width: 120,
  },
  {
    title: '组合名称',
    dataIndex: 'portName',
    key: 'portName',
    width: 200,
  },
  {
    title: '监控状态',
    dataIndex: 'monitorState',
    key: 'monitorState',
    width: 100,
  },
  {
    title: '执行顺序',
    dataIndex: 'executeOrder',
    key: 'executeOrder',
    width: 100,
  },
  {
    title: '结果描述',
    dataIndex: 'resultDesc',
    key: 'resultDesc',
    //width: 120,
  },
]

//详情界面状态的 颜色图标
const monitorStateTrans = (monitorResult) => {
  if (monitorResult === '正常') {
    return (
      <Badge color="#4182FA" text={monitorResult} />
    );
  } else if (monitorResult === '异常') {
    return (
      <Badge color="#FB6661" text={monitorResult} />
    );
  } else if (monitorResult === '预警') {
    return (
      <Badge color="#F6BD16" text={monitorResult} />
    );
  } else if (monitorResult === '未执行') {
    return (
      <Badge color="#5D7092" text={monitorResult} />
    );
  } else if (monitorResult === '程序错误') {
    return (
      <Badge color="#945FB9" text={monitorResult} />
    );
  }
};

export default class BaseChart extends Component {

  constructor(props) {
    super(props);
    const { data, type, bizDate, xAxisValue, monitorStateDict, period } = this.props;
    this.state = {
      data,
      type,
      bizDate,
      parameter: {},    // 详情页面的查询参数
      xAxisValue,  //柱状图x轴 name(指标名称)对应的value数组(指标代码数组)
      monitorStateDict,  //监控状态的数据字典
      period,  //周期   周或者月
      showModal: true,
    }
  }

  componentDidMount() {
    /**
    const { runAction } = this.props;

    if (this.chartRef && runAction) {
      const chartIns = this.chartRef.getEchartsInstance();
      window.setTimeout(() => {
        runAction(chartIns);
      }, 300);
    }
    **/
  }

  componentWillReceiveProps(nextProps) {
    const { data, type, bizDate, xAxisValue, monitorStateDict , option, getOption} = nextProps;
    if (data !== this.state.data || bizDate !== this.state.bizDate) {
      this.setState({
        data,
        type,
        bizDate,
        xAxisValue,
        monitorStateDict,
      });
    }

    if(type === 'todayindex'){
      const finalOption = getOption(option, data);
      if(this.chartRef){
        this.chartRef.getEchartsInstance().setOption(finalOption)
      }
    }

  }

  detailRef = React.createRef();
  onEvents = {
    'click': (params) => {
      let monitorStateMap = new Map();
      this.state.monitorStateDict.forEach(function (val, index, arr) {
        monitorStateMap.set(val.name, val.code);  //name code
      });

      let condition = {};   //查询条件
      let modalTitle = '';   //详情页面标题
      let columns = [];   //详情页面标题
      if (this.state.type === 'todayindex') {  //今日指标监控概况
        if(params.name === '') return;
        let parmaMonitorState = params.name.replace(/指标/, '');
        condition = {
          bizDate: this.state.bizDate,
          monitorState: monitorStateMap.get(parmaMonitorState),
        };
        modalTitle = '指标监控概况详情-' + parmaMonitorState;
        columns = indexColumns;
      } else if (this.state.type === 'mainindexprofile') { //重点指标监控概况
        let parmaMonitorState = params.seriesName;
        let indexCode = '';
        //console.log(this.state.xAxisValue);
        if (this.state.xAxisValue) indexCode = this.state.xAxisValue[params.dataIndex];
        condition = {
          bizDate: this.state.bizDate,
          indexCode: indexCode,
          monitorState: monitorStateMap.get(parmaMonitorState),
        };
        modalTitle = '重点指标监控概况详情-' + params.seriesName;
        columns = portColumns;
      } else if (this.state.type === 'indextrend') {  //近N日指标监控状态走势
        //const paramBizDate = moment(moment(this.state.bizDate, "YYYY-MM-DD").year() + "-" + params.name).format('YYYY-MM-DD');
        let seriesName = params.seriesName.split('-');  // first首次 ; newest最新
        let parmaMonitorState = seriesName[0];
        let triggerMode = seriesName[1];
        if (triggerMode === '首次') {
          triggerMode = 'first';
        }
        if (triggerMode === '最新') {
          triggerMode = 'newest';
        }
        condition = {
          bizDate: params.name,
          monitorState: monitorStateMap.get(parmaMonitorState),
          triggerMode: triggerMode,         //触发方式 首次/最新
        };
        modalTitle = '近' + (this.state.period == 'week' ? 7 : 30) + '日指标监控状态走势详情';
        columns = indexColumns;
      } else if (this.state.type === 'porttrend') {  //近N日组合监控状态走势
        //const paramBizDate = moment(moment(this.state.bizDate, "YYYY-MM-DD").year() + "-" + params.name).format('YYYY-MM-DD');
        let seriesName = params.seriesName.split('-');  // first首次 ; newest最新
        let parmaMonitorState = seriesName[0];
        let triggerMode = seriesName[1];
        if (triggerMode === '首次') {
          triggerMode = 'first';
        }
        if (triggerMode === '最新') {
          triggerMode = 'newest';
        }
        condition = {
          bizDate: params.name,
          monitorState: monitorStateMap.get(parmaMonitorState),
          triggerMode: triggerMode,         //触发方式 首次/最新
        };
        modalTitle = '近' + (this.state.period == 'week' ? 7 : 30) + '日组合监控状态走势详情';
        columns = porttrendColumns;
      }
      this.setState({
        parameter: {
          conditionParam: condition,
          url: `/ocp/largescreen/${this.state.type}`,
          columns,
        },
        modalTitle
      })
      this.detailRef.current.showDialog();
    },
    'legendselectchanged': (params) => {
      //console.log("legendselectchanged== "+JSON.stringify(params));
      if(params.selected){
        AppContext.session.set('legendselectchanged', JSON.stringify(params.selected));
      }
    },
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
    const { option, data, getOption, style } = this.props;
    const finalOption = getOption(option, data);
    const finalStyle = getStyle(style);

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
    };

    return (
      <div style={{ flex: 1 }}>
        <Echarts
          ref={ref => {
            this.chartRef = ref;
          }}
          style={finalStyle}
          option={finalOption}
          notMerge
          lazyUpdate
          onEvents={this.onEvents}
        />
        {showDetail()}
      </div>
    );
  }
}

function getStyle(style) {
  return {
    position: 'relative',
    // width: '100%',
    // height: '100%',
    // tranform: 'translate3d(0, 0, 0)',

    ...style
  };
}
