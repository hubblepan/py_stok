export default [

  // 获取模板列表
  {
    path: '/monitor/microservice/template/list',
    method: 'get',
    handle(data) {
      return {
        code: 'SUCCESS',
        data: [
          {
            des: '模板说明1',
            id: '1',
            name: '低配模板',
            nodeNum: 1,
          },

          {
            des: '模板说明2',
            id: '2',
            name: '标准模板',
            nodeNum: 3,
          },

          {
            des: '模板说明3',
            id: '3',
            name: '高配模板',
            nodeNum: 5,
          },
        ],
        msg: '查询成功',
        success: true,
      };
    },
  },
  // 判断方案名称是否存在
  {
    path: '/monitor/microservice/scheme/exist',
    method: 'get',
    handle(data) {
      return {
        code: 'SUCCESS',
        data: false,
        msg: '查询成功',
        success: true,
      };
    },
  },

  // 添加方案
  {
    path: '/monitor/microservice/scheme/add/scheme',
    method: 'post',
    handle(data) {
      console.log(data);
      return {
        code: 'SUCCESS',
        data: '',
        msg: '查询成功！',
        success: true,
      };
    },
  },
  {
    path: '/monitor/microservice/scheme/list',
    method: 'get',
    handle(data) {
      return {
        code: 'SUCCESS',
        data: [
          {
            id: '',
            // 方案信息
            schemeId: '1',
            schemeName: '方案1',
            schemeStatus: '',
            // 微服务摘要信息
            microServiceDigestVoList: [
              // 微服务1
              {
                id: '1',
                errorCount: 1,
                microServiceStatus: '',
                normalCount: 1,
                serviceCode: '微服务1',
                instanceVoList: [
                  // 微服务1 --- 实例1
                  {
                    deployStatus: 'deployed', // deploying
                    id: '1',
                    installDir: '/home/tomcat/1',
                    ip: '192.168.4.225',
                    name: '实例1',
                    runningStatus: 'DOWN',
                    schemeId: '1',
                    schemeName: '方案1',
                    serverId: '1',
                    serviceCode: '微服务1',
                  },
                  {
                    deployStatus: 'deployed', // deploying
                    id: '2',
                    installDir: '/home/tomcat/2',
                    ip: '192.168.4.225',
                    name: '实例2',
                    runningStatus: 'DOWN',
                    schemeId: '1',
                    schemeName: '方案1',
                    serverId: '1',
                    serviceCode: '微服务1',
                  },
                ],
              },
              // 微服务2
              {
                id: '2',
                errorCount: 0,
                microServiceStatus: '',
                normalCount: 2,
                serviceCode: '微服务2',
                instanceVoList: [
                  // 微服务2 --- 实例3
                  {
                    deployStatus: 'deployed', // deploying
                    id: '3',
                    installDir: '/home/tomcat/3',
                    ip: '192.168.4.226',
                    name: '实例3',
                    runningStatus: 'DOWN',
                    schemeId: '1',
                    schemeName: '方案1',
                    serverId: '1',
                    serviceCode: '微服务2',
                  },
                  {
                    deployStatus: 'deployed', // deploying
                    id: '4',
                    installDir: '/home/tomcat/4',
                    ip: '192.168.4.226',
                    name: '实例4',
                    runningStatus: 'DOWN',
                    schemeId: '1',
                    schemeName: '方案1',
                    serverId: '1',
                    serviceCode: '微服务2',
                  },
                ],
              },
            ],
            // 服务器摘要
            serverDigestVoList: [
              // 服务器1
              {
                id: '1',
                ip: '192.168.4.225',
                // 服务器1-> 实例1
                microServInstanceList: [
                  {
                    deployStatus: 'deployed', // deploying
                    id: '1',
                    installDir: '/home/tomcat/1',
                    ip: '192.168.4.225',
                    name: '实例1',
                    runningStatus: 'DOWN',
                    schemeId: '1',
                    schemeName: '方案1',
                    serverId: '1',
                    serviceCode: '微服务1',
                  },
                  {
                    deployStatus: 'deployed', // deploying
                    id: '2',
                    installDir: '/home/tomcat/2',
                    ip: '192.168.4.225',
                    name: '实例2',
                    runningStatus: 'DOWN',
                    schemeId: '1',
                    schemeName: '方案1',
                    serverId: '1',
                    serviceCode: '微服务1',
                  },
                ],
                serverStatus: 'INIT',
              },
              {
                id: '2',
                ip: '192.168.4.225',
                microServInstanceList: [
                  {
                    deployStatus: 'deployed', // deploying
                    id: '3',
                    installDir: '/home/tomcat/3',
                    ip: '192.168.4.226',
                    name: '实例3',
                    runningStatus: 'DOWN',
                    schemeId: '1',
                    schemeName: '方案1',
                    serverId: '1',
                    serviceCode: '微服务2',
                  },
                  {
                    deployStatus: 'deployed', // deploying
                    id: '4',
                    installDir: '/home/tomcat/4',
                    ip: '192.168.4.226',
                    name: '实例4',
                    runningStatus: 'DOWN',
                    schemeId: '1',
                    schemeName: '方案1',
                    serverId: '1',
                    serviceCode: '微服务2',
                  },
                ],
                serverStatus: 'WARN',
              },
            ],
          },
        ],
        msg: '查询成功！',
        success: true,
      };
    },
  },

  // 添加微服务-上传
  {
    path: '/monitor/microservice/program/upload',
    method: 'post',
    handle: {
      code: 'SUCCESS',
      data: '',
      msg: '查询成功！',
      success: true,
    },
  },
  // 添加微服务-git
  {
    path: '/monitor/microservice/select/git/dir',
    method: 'get',
    handle() {
      return {
        code: 'SUCCESS',
        data: '',
        msg: '查询成功！',
        success: true,
      };
    },
  },
  // 微服务列表
  {
    path: '/monitor/microservice/program/list',
    method: 'get',
    handle() {
      return {
        code: 'SUCCESS',
        data: [
          {
            code: 'osgi-fast',
            id: '1',
            instanceCount: 10,
            schemeCount: 11,
          },
          {
            code: 'osgi-uco',
            id: '2',
            instanceCount: 11,
            schemeCount: 12,
          },
        ],
        msg: '查询成功！',
        success: true,
      };
    },
  },
  // 微服务详情
  {
    path: '/monitor/microservice/program/detail',
    method: 'get',
    handle() {
      return {
        code: 'SUCCESS',
        data: [
          {
            code: 'fast-osgi',
            fileSize: '19kb',
            id: '1',
            instanceCount: 5,
            schemeCount: 4,
            uploadTime: '2020-01-02 10:10:10',
            versionNo: 'V1.0.0.1',
          },
          {
            code: 'fast-osgi',
            fileSize: '19kb',
            id: '2',
            instanceCount: 5,
            schemeCount: 4,
            uploadTime: '2020-01-02 10:10:10',
            versionNo: 'V1.0.0.2',
          },
        ],
        msg: '查询成功！',
        success: true,
      };
    },
  },
  // 查询实例配置
  {
    path: '/monitor/microservice/instance/config/single',
    method: 'post',
    handle() {
      return {
        code: 'SUCCESS',
        data: [{
          id: '1',
          schemeId: '1',
          serivceCode: 'osgi-fast',
          instanceId: '1',
          programVersionId: '1',
          microserviceConfigVo: {
            eurekaAddr: '',
            id: '',
            instanceId: '',
            logPath: '',
            tomcatDir: '',
            tomcatPort: 0,
            yssAppPath: '',
          },
          osgiConfigVo: {
            dbIp: '',
            dbName: '',
            dbPort: 0,
            id: '',
            instanceId: '',
            licensePath: '',
            mqClusterId: '',
            redisClusterId: '',
            password: '',
            userName: '',
            zkClusterId: '',
          },
          advanceConfigList: [
            {
              fileContent: '',
              filePath: '',
              id: '',
              instanceId: '',
            },
          ],
        }],
        msg: '查询成功1！',
        success: true,
      };
    },
  },
  //
  // // 配置微服务
  // {
  //   path: '/monitor/microservice/instance/config',
  //   method: 'post',
  //   handle() {
  //     return {
  //       code: 'SUCCESS',
  //       data: '',
  //       msg: '查询成功！',
  //       success: true,
  //     };
  //   },
  // },
  // 得到消息总线实例列表
  {
    path: '/monitor/microservice/instance/mq/cluster',
    method: 'post',
    handle(data) {
      console.log(data);
      return {
        code: 'SUCCESS',
        data: [
          {
            deployStatus: '',
            id: '',
            installDir: '/home/test/mq1',
            ip: '',
            name: '消息总线1',
            programVersion: '',
            runningStatus: '',
            schemeId: '',
            schemeName: '',
            serverId: '',
            serviceCode: '',
            clusterName: 'c1',
          },
          {
            deployStatus: '',
            id: '',
            installDir: '/home/test/mq2',
            ip: '',
            name: '消息总线2',
            programVersion: '',
            runningStatus: '',
            schemeId: '',
            schemeName: '',
            serverId: '',
            serviceCode: '',
            clusterName: 'c2',
          },
        ],
        msg: '查询成功！',
        success: true,
      };
    },
  },

  // 得到消息总线实例列表
  {
    path: '/monitor/microservice/instance/zk/cluster',
    method: 'post',
    handle(data) {
      console.log(data);
      return {
        code: 'SUCCESS',
        data: [
          {
            deployStatus: '',
            id: '',
            installDir: '/home/test/zk1',
            ip: '',
            name: '注册中心1',
            programVersion: '',
            runningStatus: '',
            schemeId: '',
            schemeName: '',
            serverId: '',
            serviceCode: '',
            clusterName: 'c1',
          },
          {
            deployStatus: '',
            id: '',
            installDir: '/home/test/zk2',
            ip: '',
            name: '注册中心2',
            programVersion: '',
            runningStatus: '',
            schemeId: '',
            schemeName: '',
            serverId: '',
            serviceCode: '',
            clusterName: 'c2',
          },
        ],
        msg: '查询成功！',
        success: true,
      };
    },
  },

  // 获取高级配置文件列表
  {
    path: '/monitor/microservice/instance/advance/config/list',
    method: 'post',
    handle(data) {
      console.log(data);
      return {
        code: 'SUCCESS',
        data: [
          'YSS_APP/global/zoo.cfg',
        ],
        msg: '查询成功！',
        success: true,
      };
    },
  },

  // 获取高级配置的文件内容
  {
    path: '/monitor/microservice/instance/advance/config/content',
    method: 'post',
    handle(data) {
      console.log(data);
      return {
        code: 'SUCCESS',
        data: '<span>abc</span>',
        msg: '查询成功！',
        success: true,
      };
    },
  },

  // 保存高级配置
  {
    path: '/monitor/microservice/instance/save/advance/config',
    method: 'post',
    handle(data) {
      console.log(data);
      return {
        code: 'SUCCESS',
        data: '',
        msg: '查询成功！',
        success: true,
      };
    },
  },

  // 获取注册中心类型列表
  {
    path: '/monitor/microservice/instance/reg/type/list',
    method: 'post',
    handle(data) {
      console.log(data);
      return {
        code: 'SUCCESS',
        data: [
          'eureka',
        ],
        msg: '查询成功！',
        success: true,
      };
    },
  },
  // 端口是否可用
  {
    path: '/monitor/microservice/instance/check/port',
    method: 'post',
    handle(data) {
      return {
        code: 'SUCCESS',
        data: false,
        msg: '查询成功！',
        success: true,
      };
    },
  },
];
