import React, { useRef, Component, PureComponent } from 'react';
import { Progress, List, Badge, Spin } from 'antd';
import DetailModal from './DetailModal';
import AppContext from '@/utils/AppContext';
import NoData from './NoData';

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
    render: (monitorState) => monitorStateTrans(monitorState),
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
];

//详情界面状态的 颜色图标
const monitorStateTrans = (monitorResult) => {
  if (monitorResult === '正常') {
    return <Badge color="#4182FA" text={monitorResult} />;
  } else if (monitorResult === '异常') {
    return <Badge color="#FB6661" text={monitorResult} />;
  } else if (monitorResult === '预警') {
    return <Badge color="#F6BD16" text={monitorResult} />;
  } else if (monitorResult === '未执行') {
    return <Badge color="#5D7092" text={monitorResult} />;
  } else if (monitorResult === '程序错误') {
    return <Badge color="#945FB9" text={monitorResult} />;
  }
};


export default class ScrollList extends Component {
  constructor(props) {
    super(props);
    const { dataSource, type, fullRows, bizDate, monitorStateDict, topN, period } = this.props;
    this.state = {
      listMarginTop: '0',
      animate: false,
      orginDataSource: '{}', //原始数据
      dataSource, // 列表数据, 滚动轮播会更新这个数据
      fullRows, // 满屏显示行数
      scrollInterval: '',
      type, //详细信息类型
      bizDate, //业务日期
      parameter: {}, //详情信息查询参数
      modalTitle: '', //详情信息标题
      monitorStateDict, //状态的数据字典,详情查询用
      topN,
      period, // 周或月
      scrollMargin: 'auto', //没数据时，居中显示
      rowCount: 0,
      showModal: true,
    };
  }

  componentDidMount() {
    clearInterval(this.state.scrollInterval);
    //console.log('scrollList size ' + this.state.dataSource.length);
  }

  componentWillReceiveProps(nextProps) {
    const { dataSource, fullRows, bizDate, monitorStateDict, topN, period } = nextProps;
    if (
      JSON.stringify(dataSource) !== this.state.orginDataSource ||
      bizDate !== this.state.bizDate
    ) {
      this.setState({
        rowCount: nextProps.dataSource.length
      });
      this.endScroll();
      //console.log('componentWillReceiveProps scrollList size ' + this.state.dataSource.length);
      setTimeout(() => {
        this.setState({
          orginDataSource: JSON.stringify(nextProps.dataSource),
          dataSource,
          fullRows,
          bizDate,
          monitorStateDict,
          topN,
          period,
          scrollMargin: dataSource.length == 0 ? 'auto' : 0,  //没数据时居中显示"暂无数据"，有数据时列表置顶显示
        });
        setTimeout(() => {
          if (this.state.dataSource && this.state.dataSource.length > fullRows) {  // 数据量超过满屏数, 则滚动
            setTimeout(
              () => {
                this.startScrollUp();
              },
              AppContext.session.get('interval') ? AppContext.session.get('interval') : 30000,
            );
          }
        }, 0); // 使用setTimeout 用来获取到最新的state的值
      } , 0); // 使用setTimeout 用来获取到最新的state的值
    }
  }

  componentWillUnmount() {
    this.endScroll();
    this.setState = () => false;
  }

  scrollUp = () => {
    if (this.state.dataSource) {
      if( parseInt(this.state.rowCount) === parseInt(this.state.dataSource.length)){  //只有相等，才会增加
        this.state.dataSource.push(this.state.dataSource[0]);
      }
      //console.log('scrollUp 1 scrollList size ' + this.state.dataSource.length);
      if (
        document.getElementById('scrollList') &&
        document.getElementById('scrollList').getElementsByTagName('li')[0]
      ) {
        let height = document.getElementById('scrollList').getElementsByTagName('li')[0]
          .scrollHeight;
        this.setState({
          animate: true,
          listMarginTop: "-"+height+"px",
        });
        setTimeout(() => {
          if( parseInt (this.state.rowCount+1) === parseInt(this.state.dataSource.length)){  //只有大于1,才会减
            this.state.dataSource.shift();
          }
          //console.log('scrollUp 2 scrollList size ' + this.state.dataSource.length);
          this.setState({
            animate: false,
            listMarginTop: '0',
          });
          this.forceUpdate();
        }, 2000);
      }
    }
  };

  startScrollUp = () => {
    //console.log("滚动间隔时间 "+AppContext.session.get('interval'))
    this.endScroll();
    //this.scrollUp();
    this.setState({
      scrollInterval: setInterval(
        this.scrollUp,
        AppContext.session.get('interval') ? AppContext.session.get('interval') : 30000,
      ), //interval 滚动频率
    });
  };

  reStartScrollUp = () => {
    if(this.state.scrollInterval && this.state.scrollInterval !==''){
      this.startScrollUp();
    }
  };

  endScroll = () => {
    if(this.state.scrollInterval && this.state.scrollInterval !==''){
      clearInterval(this.state.scrollInterval);
    }
  };

  detailRef = React.createRef();

  // 查看详情
  onclickItem = async (item, type, bizDate, monitorStateDict, topN, period) => {
    let monitorStateMap = new Map();
    monitorStateDict.forEach(function (val, index, arr) {
      monitorStateMap.set(val.name, val.code); //name code
    });

    let condition = {}; //查询条件
    let modalTitle = ''; //详情页面标题
    if (type === 'todayfailindex') {
      // 今日异常指标
      condition = {
        bizDate,
        indexCode: item.indexCode,
        monitorState: monitorStateMap.get('异常'), //转换为code
      };
      modalTitle = '异常指标详情';
    } else if (type === 'todayfailporttopn') {
      // 今日异常组合topN
      condition = {
        bizDate,
        portCode: item.portCode,
        monitorState: monitorStateMap.get('异常'),
      };
      modalTitle = '异常组合TOP' + topN + '详情';
    } else if (type === 'failindextopn') {
      // 近N日异常指标
      condition = {
        bizDate,
        dateType: period,
        indexCode: item.indexCode,
        //monitorState: monitorStateMap.get('异常'),
      };
      modalTitle = '近' + (period == 'week' ? 7 : 30) + '日异常指标TOP' + topN + '详情';
    } else if (type === 'mainindexprofiletopn') {
      // 近N日重点指标的异常组合
      condition = {
        bizDate,
        dateType: period,
        indexCode: item.indexCode,
        portCode: item.portCode,
        //monitorState: monitorStateMap.get('异常'),
      };
      modalTitle = '近' + (period == 'week' ? 7 : 30) + '日重点指标异常组合TOP' + topN + '详情';
    }
    //设置查询参数
    this.setState({
      parameter: {
        conditionParam: condition,
        url: `/ocp/largescreen/${type}`,
        columns: portColumns,
      },
      modalTitle,
    });
    this.detailRef.current.showDialog();
  };

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
      <div style={{ margin: 0 }}>
        <List
          itemLayout="horizontal"
          id="scrollList"
          style={{ marginTop: this.state.listMarginTop }}
          className={this.state.animate ? 'animate' : ''}
          dataSource={this.state.dataSource}
          renderItem={(item) => (
            <List.Item>
              <span style={{ color: '#517cff', width: 30 }}>{item.sn}</span>
              <span
                style={{
                  width: 250,
                  cursor: 'pointer',
                  overflow: 'hidden',
                  textOverflow: 'ellipsis',
                  whiteSpace: 'nowrap',
                }}
                onClick={() =>
                  this.onclickItem(
                    item,
                    this.state.type,
                    this.state.bizDate,
                    this.state.monitorStateDict,
                    this.state.topN,
                    this.state.period,
                  )
                }
                title={item.indexName ? item.indexName : item.portName}
              >
                {item.indexName ? item.indexName : item.portName}
              </span>
              <span style={{ width: 110 }}>
                <Progress
                  strokeColor={{
                    from: 'rgba(33,40,69,1)',
                    to: 'rgba(51,102,255,1)',
                  }}
                  trailColor="#212845"
                  strokeLinecap="square"
                  percent={item.ratio}
                  showInfo={false}
                  status="active"
                />
              </span>
              <span style={{ width: 60, textAlign: 'right' }}>{item.ratio}%</span>
            </List.Item>
          )}
        />
        {showDetail()}
      </div>
    );
  }
}
