import request from '@/plugin/axios';

export default [
  // 修改场景
  {
    path: '/monitor/scene/update/scene',
    method: 'post',
    handle(data) {
      console.log(data);
      return {
        code: 'SUCCESS',
        data: '',
        msg: 'string',
        success: true,
      };
    },
  },
  /* 上传场景 */
  {
    path: '/monitor/scene/upload/scene',
    method: 'post',
    handle: {
      code: 'SUCCESS',
      msg: 'string',
      success: true,
    },
  },
  {
    path: '/monitor/scene/node/application/metrics/data',
    method: 'post',
    handle(data) {
      return {
        code: 'SUCCESS',
        data: [
          {
            createTime: '2020-10-11',
            id: '111',
            metricName: 'cpu',
            tags: [],
            value: 4,
          },
          {
            createTime: '2020-10-12',
            id: '111',
            metricName: 'cpu',
            tags: [],
            value: 3,
          },
          {
            createTime: '2020-10-13',
            id: '111',
            metricName: 'cpu',
            tags: [],
            value: 7,
          },
          {
            createTime: '2020-10-14',
            id: '111',
            metricName: 'cpu',
            tags: [],
            value: 15,
          },
          {
            createTime: '2020-10-15',
            id: '111',
            metricName: 'cpu',
            tags: [],
            value: 12,
          },
          {
            createTime: '2020-10-16',
            id: '111',
            metricName: 'cpu',
            tags: [],
            value: 8,
          },
          {
            createTime: '2020-10-17',
            id: '111',
            metricName: 'cpu',
            tags: [],
            value: 3,
          },
          {
            createTime: '2020-10-18',
            id: '111',
            metricName: 'cpu',
            tags: [],
            value: 2,
          },
          {
            createTime: '2020-10-19',
            id: '111',
            metricName: 'cpu',
            tags: [],
            value: 7,
          },
          {
            createTime: '2020-10-20',
            id: '111',
            metricName: 'cpu',
            tags: [],
            value: 6,
          },
          {
            createTime: '2020-10-21',
            id: '111',
            metricName: 'cpu',
            tags: [],
            value: 3,
          },
          {
            createTime: '2020-10-22',
            id: '111',
            metricName: 'cpu',
            tags: [],
            value: 2,
          },
          {
            createTime: '2020-10-23',
            id: '111',
            metricName: 'cpu',
            tags: [],
            value: 7,
          },
          {
            createTime: '2020-10-24',
            id: '111',
            metricName: 'cpu',
            tags: [],
            value: 6,
          },
        ],
      };
    },
  },
  {
    path: '/monitor/scene/node/application/scene/data',
    method: 'post',
    handle(data) {
      return {
        code: 'SUCCESS',
        data: [
          {
            analysisMetricsDataList: [
              {
                applicationId: 't1',
                createTime: '2020-11-11',
                displayType: 'line',
                id: 'cpu',
                metricName: 'cpu',
                tableWidth: 0,
                tags: [],
                value: 0,
              },
              {
                applicationId: 't1',
                createTime: '2020-11-11',
                displayType: 'pie',
                id: 'memory',
                metricName: '内存',
                tableWidth: 0,
                tags: [],
                value: 0,
              },
              {
                applicationId: 't1',
                createTime: '2020-11-11',
                displayType: 'string',
                id: 'disk',
                metricName: '磁盘',
                tableWidth: 0,
                tags: [],
                value: 0,
              },
            ],
            analysisMetricsDataMap: {
              '方法一': [
                {
                  id: 'cpu',
                  metricName: 'cpu',
                  value: '10%',
                },
                {
                  id: 'memory',
                  metricName: '内存',
                  value: '30%',
                },
                {
                  id: 'disk',
                  metricName: '磁盘',
                  value: '40%',
                },
              ],

              '方法二': [
                {
                  id: 'cpu',
                  metricName: 'cpu',
                  value: '15%',
                },
                {
                  id: 'memory',
                  metricName: '内存',
                  value: '31%',
                },
                {
                  id: 'disk',
                  metricName: '磁盘',
                  value: '51%',
                },
              ],

            },
            analyzeTime: '2020-11-11',
            applicationId: 't1',
            sceneId: '1',
          },
          {
            analysisMetricsDataList: [
              {
                applicationId: 't2',
                createTime: '2020-11-11',
                displayType: 'line',
                id: 'cpu',
                metricName: 'cpu',
                tableWidth: 0,
                tags: [],
                value: 0,
              },
              {
                applicationId: 't2',
                createTime: '2020-11-11',
                displayType: 'pie',
                id: 'memory',
                metricName: '内存',
                tableWidth: 0,
                tags: [],
                value: 0,
              },
              {
                applicationId: 't2',
                createTime: '2020-11-11',
                displayType: 'string',
                id: 'disk',
                metricName: '磁盘',
                tableWidth: 0,
                tags: [],
                value: 0,
              },
            ],
            analysisMetricsDataMap: {
              '方法三': [
                {
                  id: 'cpu',
                  metricName: 'cpu',
                  value: '12%',
                },
                {
                  id: 'memory',
                  metricName: '内存',
                  value: '32%',
                },
                {
                  id: 'disk',
                  metricName: '磁盘',
                  value: '43%',
                },
              ],

              '方法二': [
                {
                  id: 'cpu',
                  metricName: 'cpu',
                  value: '19%',
                },
                {
                  id: 'memory',
                  metricName: '内存',
                  value: '35%',
                },
                {
                  id: 'disk',
                  metricName: '磁盘',
                  value: '61%',
                },
              ],

            },
            analyzeTime: '2020-11-11',
            applicationId: 't2',
            sceneId: '1',
          },
        ],
      };
    },
  },

  {
    path: '/monitor/scene/latest/node/application/scene/data',
    method: 'post',
    handle(data) {
      return {
        code: 'SUCCESS',
        data: [
          {
            analysisMetricsDataList: [
              {
                applicationId: 't1',
                createTime: '2020-11-11',
                displayType: 'line',
                id: 'cpu',
                metricName: 'cpu',
                tableWidth: 0,
                tags: [],
                value: 0,
              },
              {
                applicationId: 't1',
                createTime: '2020-11-11',
                displayType: 'pie',
                id: 'memory',
                metricName: '内存',
                tableWidth: 0,
                tags: [],
                value: 0,
              },
              {
                applicationId: 't1',
                createTime: '2020-11-11',
                displayType: 'string',
                id: 'disk',
                metricName: '磁盘',
                tableWidth: 0,
                tags: [],
                value: 0,
              },
            ],
            analysisMetricsDataMap: {
              '方法一': [
                {
                  id: 'cpu',
                  metricName: 'cpu',
                  value: '10%',
                },
                {
                  id: 'memory',
                  metricName: '内存',
                  value: '30%',
                },
                {
                  id: 'disk',
                  metricName: '磁盘',
                  value: '40%',
                },
              ],

              '方法二': [
                {
                  id: 'cpu',
                  metricName: 'cpu',
                  value: '15%',
                },
                {
                  id: 'memory',
                  metricName: '内存',
                  value: '31%',
                },
                {
                  id: 'disk',
                  metricName: '磁盘',
                  value: '51%',
                },
              ],

            },
            analyzeTime: '2020-11-11',
            applicationId: 't1',
            sceneId: '1',
          },
          {
            analysisMetricsDataList: [
              {
                applicationId: 't2',
                createTime: '2020-11-11',
                displayType: 'line',
                id: 'cpu',
                metricName: 'cpu',
                tableWidth: 0,
                tags: [],
                value: 0,
              },
              {
                applicationId: 't2',
                createTime: '2020-11-11',
                displayType: 'pie',
                id: 'memory',
                metricName: '内存',
                tableWidth: 0,
                tags: [],
                value: 0,
              },
              {
                applicationId: 't2',
                createTime: '2020-11-11',
                displayType: 'string',
                id: 'disk',
                metricName: '磁盘',
                tableWidth: 0,
                tags: [],
                value: 0,
              },
            ],
            analysisMetricsDataMap: {
              '方法三': [
                {
                  id: 'cpu',
                  metricName: 'cpu',
                  value: '12%',
                },
                {
                  id: 'memory',
                  metricName: '内存',
                  value: '32%',
                },
                {
                  id: 'disk',
                  metricName: '磁盘',
                  value: '43%',
                },
              ],

              '方法二': [
                {
                  id: 'cpu',
                  metricName: 'cpu',
                  value: '19%',
                },
                {
                  id: 'memory',
                  metricName: '内存',
                  value: '35%',
                },
                {
                  id: 'disk',
                  metricName: '磁盘',
                  value: '61%',
                },
              ],

            },
            analyzeTime: '2020-11-11',
            applicationId: 't2',
            sceneId: '1',
          },
        ],
      };
    },
  },

  // 场景列表
  {
    path: '/monitor/scene/get/all/scene',
    method: 'post',
    handle(data) {
      console.log(data);
      return {
        code: 'SUCCESS',
        data: [
          {
            analysisMetricsVos: [
              {
                displayType: 'string',
                hidden: false,
                id: '1',
                tableWidth: 100,
                metricsId: 'cpu',
                metricsName: 'CPU占用',
                type: '',
              },

              {
                displayType: 'string',
                hidden: false,
                id: '2',
                tableWidth: 100,
                metricsId: 'memory',
                metricsName: '内存占用',
                type: '',
              },

              {
                displayType: 'string',
                hidden: false,
                id: '3',
                tableWidth: 100,
                metricsId: 'cipan',
                metricsName: '磁盘占用',
                type: '',
              },
            ],
            applicationNodeIds: ['t1', 't2'],
            description: '场景1描述 场景1描述',
            id: 's1',
            mailConfig: {
              mailAddress: '',
            },
            name: '场景1',
            status: '',
            triggerMetricsVos: [
              {
                id: '1',
                operate: '>',
                type: '触发指标',
                value: 10,
                metricsId: 'cipan',
                metricsName: '磁盘占用',
              },

              {
                id: '1',
                operate: '<',
                type: '触发指标',
                value: 10,
                metricsId: 'memory',
                metricsName: '内存占用',
              },
            ],
            type: '',
          },

          {
            analysisMetricsVos: [
              {
                displayType: 'string',
                hidden: false,
                id: '1',
                tableWidth: 100,
                metricsId: 'cpu',
                metricsName: 'CPU占用',
                type: '',
              },

              {
                displayType: 'string',
                hidden: false,
                id: '2',
                tableWidth: 100,
                metricsId: 'memory',
                metricsName: '内存占用',
                type: '',
              },

              {
                displayType: 'string',
                hidden: false,
                id: '3',
                tableWidth: 100,
                metricsId: 'cipan',
                metricsName: '磁盘占用',
                type: '',
              },
            ],
            applicationNodeIds: ['t1', 't2'],
            description: '场景2描述 场景2描述',
            id: 's2',
            mailConfig: {
              mailAddress: '',
            },
            name: '场景2',
            status: '',
            triggerMetricsVos: [
              {
                id: '1',
                operate: '>',
                type: '触发指标',
                value: 10,
                metricsId: 'cipan',
                metricsName: '磁盘占用',
              },

              {
                id: '1',
                operate: '<',
                type: '触发指标',
                value: 10,
                metricsId: 'memory',
                metricsName: '内存占用',
              },
            ],
            type: '',
          },
        ],
        msg: 'string',
        success: true,
      };
    },
  },

  // 场景节点配置
  {
    path: '/monitor/scene/enable/application/scene',
    method: 'post',
    handle(data) {
      console.log(data);
      return {
        code: 'SUCCESS',
        data: '',
        msg: 'string',
        success: true,
      };
    },
  },
  {
    path: '/monitor/upgrade/all/node/tomcat/config',
    method: 'get',
    handle(data) {
      return {
        code: 'SUCCESS',
        data: [
          {
            deployStatus: '',
            id: 't1',
            ip: '192.168.4.225',
            isConfigIp: true,
            jdkVersionOfTomcat: '',
            localWar: true,
            nodeId: '',
            nodeName: '',
            queryVersionDir: '',
            runningStatus: '',
            selectVersionDir: '',
            tomcatDir: '/home/tomcat/1',
            tomcatName: 'tomcat1',
            tomcatPort: 0,
            upgrade: true,
            version: '',
            warDir: '',
          },

          {
            deployStatus: '',
            id: 't2',
            ip: '192.168.4.226',
            isConfigIp: true,
            jdkVersionOfTomcat: '',
            localWar: true,
            nodeId: '',
            nodeName: '',
            queryVersionDir: '',
            runningStatus: '',
            selectVersionDir: '',
            tomcatDir: '/home/tomcat/2',
            tomcatName: 'tomcat2',
            tomcatPort: 0,
            upgrade: true,
            version: '',
            warDir: '',
          },

          {
            deployStatus: '',
            id: 't3',
            ip: '192.168.4.227',
            isConfigIp: true,
            jdkVersionOfTomcat: '',
            localWar: true,
            nodeId: '',
            nodeName: '',
            queryVersionDir: '',
            runningStatus: '',
            selectVersionDir: '',
            tomcatDir: '/home/tomcat/3',
            tomcatName: 'tomcat3',
            tomcatPort: 0,
            upgrade: false,
            version: '',
            warDir: '',
          },
        ],
        msg: 'string',
        success: true,
      };
    },
  },
  // 场景指标概览数据
  {
    path: '/monitor/scene/node/application/top/metrics/data',
    method: 'post',
    handle: {
      code: 'SUCCESS',
      msg: 'string',
      data: {
        collectTimes: ['11.00', '12.00', '14.00', '15.00', '16.00'],
        analysisMetricsDataMap: {
          tag1: [
            {
              createTime: '11.00',
              value: 1,
            },
            {
              createTime: '12.00',
              value: 2,
            },
            {
              createTime: '13.00',
              value: 4,
            },
            {
              createTime: '14.00',
              value: 5,
            },
            {
              createTime: '15.00',
              value: 6,
            },
          ],
          tag2: [
            {
              createTime: '11.00',
              value: 4,
            },
            {
              createTime: '12.00',
              value: 2,
            },
            {
              createTime: '13.00',
              value: 1,
            },
            {
              createTime: '14.00',
              value: 3,
            },
            {
              createTime: '15.00',
              value: 2,
            },
          ],
          tag3: [
            {
              createTime: '11.00',
              value: 5,
            },
            {
              createTime: '12.00',
              value: 4,
            },
            {
              createTime: '13.00',
              value: 2,
            },
            {
              createTime: '14.00',
              value: 1,
            },
            {
              createTime: '15.00',
              value: 3,
            },
          ],
        },
      },
      success: true,
    }
  },
];
