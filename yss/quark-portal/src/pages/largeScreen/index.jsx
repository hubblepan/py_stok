import { ReloadOutlined , SettingOutlined } from '@ant-design/icons';
import { Button, DatePicker, Radio, ConfigProvider } from 'antd';
import zhCN from 'antd/es/locale/zh_CN';
import React, { useRef, useState, useEffect, useCallback } from 'react';
import moment from 'moment';
import { getWebSocketUrl, queryScreen } from '@/services/largeScreen';
import ChartSetting from './components/ChartSetting';
import Content from './components/Content';
import css from './index.less';
import { query, queryPublicParam, queryIndexTree } from '@/services/chartSetting';
import AppContext from '@/utils/AppContext';

const dateFormat = 'YYYY-MM-DD';

const Index = (props) => {
  // console.log(props);
  const [bizDate, setBizDate] = useState('');  //业务日期
  const [chartType, setChartType] = useState('day'); //类型

  //窗口大小，缩放值
  const [lsdScale, setLsdScale] = useState(1);
  // 参数配置初始值
  const [initialValues, setInitialValues] = useState({});
  // 参数配置的指标树形结构数据
  const [indexTree, setIndexTree] = useState([]);

  const settingRef = useRef();
  const contentRef = useRef();

  const showDialog = async () => {
    const settingQueryResult = await query();
    setInitialValues(settingQueryResult);
    settingRef.current.showDialog();
    const settingIndexTree = await queryIndexTree();
    setIndexTree(settingIndexTree);
  };

  const onResize = useCallback(() => {
    const innerWidth = window.innerWidth;
    const innerHeight = window.innerHeight;
    let scale = Math.min(innerWidth / 1600, innerHeight / 900);
    scale = Math.floor(scale * 100) / 100;
    setLsdScale(scale);
  }, []);

  useEffect(() => {
    onResize();
    window.addEventListener('resize', onResize);
    AppContext.session.set('interval', '30000'); //滚动频率 默认值30秒
    if (props.location.query._AMS_SYS_PARAM) {
      //console.log('_AMS_SYS_PARAM:' + props.location.query._AMS_SYS_PARAM);
      let _AMS_SYS_PARAM = JSON.parse(props.location.query._AMS_SYS_PARAM);
      AppContext.session.set('userCode', _AMS_SYS_PARAM.c_USER_CODE); //用户信息
      AppContext.session.set('postCodes', _AMS_SYS_PARAM.userPostCode); //岗位代码
    }
    getBizDate(); //获取业务日期
    getInterval(); //获取滚动频率
    return () => {
      window.removeEventListener('resize', onResize);
    };
  }, []);

  //获取业务日期
  const getBizDate = async () => {
    const socketUrl = await getWebSocketUrl();
    AppContext.session.set('bizDate', socketUrl.date);
    setBizDate(socketUrl.date);
  };

  //获取topN列表滚动频率
  const getInterval = async () => {
    const settingQueryResult = await queryPublicParam();
    if (settingQueryResult && settingQueryResult.publicParams_interval) {
      AppContext.session.set('interval', settingQueryResult.publicParams_interval * 1000); //滚动频率 默认值30秒
    }
  };

  const onChangeDate = (date, dateString) => {
    AppContext.session.set('bizDate', dateString);
    setBizDate(dateString);
    contentRef.current.onChangeDate(dateString);
  };

  const onChangeChartType = (e) => {
    setChartType(e.target.value);
    contentRef.current.onChangeChartType(e.target.value);
  };

  const refresh = () => {
    getInterval();
    contentRef.current.refresh();
  };

  const resetInterval = () => {
    //console.log("重置滚动时间");
    contentRef.current.resetInterval();
  };


  return (
    <ConfigProvider locale={zhCN}>
      <div className={css.lsdContainer}>
        <div id="lsdWrapper">
          <section className={css.lsdWrapper} style={{ transform: `scale(${lsdScale})` }}>
            <header>
              <div style={{ width: 300 }}>
                <Radio.Group
                  style={{ marginRight: 16 }}
                  onChange={(e) => onChangeChartType(e)}
                  value={chartType}
                >
                  <Radio.Button value="day">日</Radio.Button>
                  <Radio.Button value="week">周</Radio.Button>
                  <Radio.Button value="month">月</Radio.Button>
                </Radio.Group>
                <DatePicker
                  onChange={onChangeDate}
                  style={{ width: 130 }}
                  value={moment(bizDate, dateFormat)}
                  format={dateFormat}
                  allowClear={false}
                  getPopupContainer={() => document.getElementById('lsdWrapper')}
                />
              </div>
              <h1 className={css.title}>管控大屏数据监控</h1>
              <nav className={css.toolbar}>
                {/* <FullScreen /> */}
                <Button type="text" icon={<ReloadOutlined />} onClick={refresh}>
                  刷新
                </Button>
                <Button type="text" icon={<SettingOutlined />} onClick={showDialog}>
                  设置
                </Button>
              </nav>
            </header>
            <div>
              <Content chartType={chartType} bizDate={bizDate} ref={contentRef} ></Content>
            </div>
          </section>
          <ChartSetting indexTree={indexTree} initialValues={initialValues} ref={settingRef} resetInterval={resetInterval} />
        </div>
      </div>
    </ConfigProvider>
  );
};

export default Index;
