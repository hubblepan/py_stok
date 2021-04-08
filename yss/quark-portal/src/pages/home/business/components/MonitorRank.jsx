import React from 'react';
import { MoreOutlined } from '@ant-design/icons';
import { List, Typography } from 'antd';
import ReactEcharts from 'echarts-for-react';
import styles from './style.less';

const MonitorRank = () => {
  const data = [
    '指标名称指标名称指标名称',
    '指标名称指标名称指标名称',
    '指标名称指标名称指标名称',
    '指标名称指标名称指标名称',
    '指标名称指标名称指标名称',
    '指标名称指标名称指标名称',
    '指标名称指标名称指标名称',
    '指标名称指标名称指标名称',
    '指标名称指标名称指标名称',
    '指标名称指标名称指标名称',
  ];
  const abnormalData = [
    '指标名称指标名称指标名称',
    '指标名称指标名称指标名称',
    '指标名称指标名称指标名称',
    '指标名称指标名称指标名称',
    '指标名称指标名称指标名称',
  ];

  const option = {
    tooltip: {
      trigger: 'item',
      formatter: '{a} <br/>{b}: {c} ({d}%)',
    },
    legend: {
      orient: 'vertical',
      left: 10,
      data: ['正常组合', '预警组合', '异常组合', '未执行组合', '执行异常组合'],
    },
    series: [
      {
        name: '访问来源',
        type: 'pie',
        radius: ['50%', '70%'],
        avoidLabelOverlap: false,
        label: {
          show: false,
          position: 'center',
        },
        emphasis: {
          label: {
            show: true,
            fontSize: '30',
            fontWeight: 'bold',
          },
        },
        labelLine: {
          show: false,
        },
        data: [
          { value: 335, name: '正常组合' },
          { value: 310, name: '预警组合' },
          { value: 234, name: '异常组合' },
          { value: 135, name: '未执行组合' },
          { value: 1548, name: '执行异常组合' },
        ],
      },
    ],
  };

  return (
    <div className={styles.monitorRank}>
      <div className={styles.title}>
        <h4 className="h5">
          重点指标监控概况
          <span className={styles.today}>(今日)</span>
        </h4>
        <MoreOutlined className="h4" />
      </div>
      <section style={{ display: 'flex' }}>
        <aside className="a-card" style={{ width: '30%' }}>
          <List
            className={styles.listHeader}
            size="small"
            header={<div>指标名称</div>}
            bordered
            dataSource={data}
            renderItem={(item) => <List.Item>{item}</List.Item>}
          />
        </aside>
        <section
          className="a-card"
          style={{
            flex: '1',
            display: 'flex',
            flexDirection: 'column',
          }}
        >
          <div className={styles.echartsPie}>
            <ReactEcharts option={option} style={{ height: '200px' }} />
          </div>
          <div className={styles.listRight}>
            <List
              className={styles.listHeader}
              size="small"
              header={<div>该异常指标组合TOP5</div>}
              bordered
              dataSource={abnormalData}
              renderItem={(item) => (
                <List.Item>
                  <Typography.Text>1</Typography.Text> {item}
                </List.Item>
              )}
            />
          </div>
        </section>
      </section>
    </div>
  );
};

export default MonitorRank;
