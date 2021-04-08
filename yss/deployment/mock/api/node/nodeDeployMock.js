export default [
  /* 获取部署缓存 */
  {
    path: '/monitor/deployment/node/latest/tomcat/config',
    method: 'get',
    handle(data) {
      return {
        code: 'SUCCESS',
        msg: 'string',
        success: true,
        data: [
          {
            deployStatus: 'deploying',
            id: 't1',
            ip: '127.0.0.1',
            localWar: true,
            nodeId: '1',
            nodeName: '节点1',
            runningStatus: 'DOWN',
            tomcatDir: '/home/tomcat/1',
            tomcatName: 'tomcat-1',
            warDir: '/home/a.war',
          },
          {
            deployStatus: 'deploying',
            id: 't2',
            ip: '127.0.0.2',
            localWar: false,
            nodeId: '2',
            nodeName: '节点2',
            runningStatus: 'DOWN',
            tomcatDir: '/home/tomcat/2',
            tomcatName: 'tomcat-2',
            warDir: '/home/b.war',
          },
        ],
      };
    },
  },
  /* 获取节点的Tomcat列表 */
  {
    path: '/monitor/deployment/assign/node/tomcat/config',
    method: 'get',
    handle(data) {
      return {
        code: 'SUCCESS',
        msg: 'string',
        success: true,
        data: [
          {
            deployStatus: 'noDeploy',
            id: 't1',
            nodeId: '1',
            nodeName: '节点1',
            runningStatus: 'DOWN',
            tomcatDir: '/homt/test/tomcat',
            tomcatName: 'apache-tomcat-1',
            warDir: '',
          },
          {
            deployStatus: 'deploying',
            id: 't2',
            nodeId: '1',
            nodeName: '节点1',
            runningStatus: 'DOWN',
            tomcatDir: '/home/fomp/monitor-tool/monitor-tool-release/tomcat/apache-tomcat-6.0.45/apache-tomcat-6.0.45',
            tomcatName: 'apache-tomcat-6.0.45',
            warDir: '/home/fomp/monitor-tool/monitor-tool-release/tomcat/apache-tomcat-6.0.45/apache-tomcat-6.0.45/webapps/YSSUCOBRIDGE.war',
          },
          {
            deployStatus: 'deploying',
            id: 't3',
            nodeId: '1',
            nodeName: '节点1',
            runningStatus: 'UP',
            tomcatDir: '/home/test/tomcat2/apache-tomcat-8.5.43',
            tomcatName: 'apache-tomcat-8.5.43',
            warDir: '/home/test/tomcat2/apache-tomcat-8.5.43/webapps/YSSUCOBRIDGE.war',
          },
        ],
      };
    },
  },
  /* 新加tomcat */
  {
    path: '/monitor/deployment/add/tomcat',
    method: 'post',
    handle: {
      code: 'SUCCESS',
      msg: 'string',
      success: true,
    },
  },

  // 获取服务端节点指定目录下的zip升级包信息
  {
    path: '/monitor/deployment/assign/wars/info',
    method: 'get',
    handle(data) {
      return {
        code: 'SUCCESS',
        msg: 'string',
        data: ['/home/path/1.war', '/home/path/2.war', '/home/path/3.war'],
        success: true,
      };
    },
  },
  // 获取指定节点默认升级包路径
  {
    path: '/monitor/deployment/default/wars/paths',
    method: 'get',
    handle(data) {
      return {
        code: 'SUCCESS',
        msg: 'string',
        data: '/home/path',
        success: true,
      };
    },
  },

  {
    path: '/monitor/deployment/tomcat/default/dir',
    method: 'get',
    handle(data) {
      return {
        code: 'SUCCESS',
        msg: 'string',
        success: true,
        data: '/home/test/tomcat/dir',
      };
    },
  },

  /* 上传war包  和 license */
  {
    path: '/monitor/deployment/upload',
    method: 'post',
    handle: {
      code: 'SUCCESS',
      msg: 'string',
      data: 'abc',
      success: true,
    },
  },

  /* 选择或上传到指定节点上的war或license文件 */
  {
    path: '/monitor/deployment/select/node/file',
    method: 'post',
    handle: {
      code: 'SUCCESS',
      msg: 'string',
      data: 'abc',
      success: true,
    },
  },

  /* 获取指定节点的lisence列表 */
  {
    path: '/monitor/deployment/assign/license/info',
    method: 'get',
    handle(data) {
      return {
        code: 'SUCCESS',
        msg: 'string',
        success: true,
        data: [
          {
            path: '/home/test/aaa.lic',
            nodeId: '1',
          },
          {
            path: '/home/test/bbb.lic',
            nodeId: '2',
          },
          {
            path: '/home/test/ccc.lic',
            nodeId: '3',
          },
        ],
      };
    },
  },

  /* 获取节点的License配置 */
  {
    path: '/monitor/deployment/license/info',
    method: 'post',
    handle(data) {
      return {
        code: 'SUCCESS',
        msg: 'string',
        success: true,
        data: [
          {
            path: '/home/test/aaa.lic',
            tomcatId: 't1',
            nodeId: '',
          },
          {
            path: '/home/test/bbb.lic',
            tomcatId: 't2',
            nodeId: '',
          },
          {
            path: '/home/test/ccc.lic',
            tomcatId: 't3',
            nodeId: '',
          },
        ],
      };
    },
  },
  {
    path: '/monitor/deployment/assign/wars/info',
    method: 'get',
    handle(data) {
      return {
        code: 'SUCCESS',
        msg: 'string',
        success: true,
        data: [
          {
            path: '/home/test/aaa.war',
            nodeId: '1',
          },
          {
            path: '/home/test/bbb.war',
            nodeId: '2',
          },
          {
            path: '/home/test/ccc.war',
            nodeId: '3',
          },
        ],
      };
    },
  },

  /* 获取服务器的war列表 */
  {
    path: '/monitor/deployment/server/wars/info',
    method: 'get',
    handle(data) {
      return {
        code: 'SUCCESS',
        msg: 'string',
        success: true,
        data: [
          {
            path: '/home/test/aaa.war',
            nodeId: '1',
          },
          {
            path: '/home/test/bbb.war',
            nodeId: '2',
          },
          {
            path: '/home/test/ccc.war',
            nodeId: '3',
          },
        ],
      };
    },
  },

  /* 保存Tomcat配置 */
  {
    path: '/monitor/deployment/tomcat/config/save',
    method: 'post',
    handle(data) {
      return {
        code: 'SUCCESS',
        msg: 'string',
        success: true,
      };
    },
  },

  /* 保存消息总线配置 */
  {
    path: '/monitor/deployment/mq/info/save',
    method: 'post',
    handle(data) {
      return {
        code: 'SUCCESS',
        msg: 'string',
        success: true,
      };
    },
  },

  /* 保存注册中心配置 */
  {
    path: '/monitor/deployment/registry/info/save',
    method: 'post',
    handle(data) {
      return {
        code: 'SUCCESS',
        msg: 'string',
        success: true,
      };
    },
  },

  /* 保存数据库配置 */
  {
    path: '/monitor/deployment/db/info/save',
    method: 'post',
    handle(data) {
      return {
        code: 'SUCCESS',
        msg: 'string',
        success: true,
      };
    },
  },

  /* 保存日志配置 */
  {
    path: '/monitor/deployment/log/info/save',
    method: 'post',
    handle(data) {
      return {
        code: 'SUCCESS',
        msg: 'string',
        success: true,
      };
    },
  },

  /* 获取Tomcat配置 */
  {
    path: '/monitor/deployment/tomcat/config',
    method: 'post',
    handle(data) {
      return {
        code: 'SUCCESS',
        msg: 'string',
        success: true,
        data: [
          {
            appConfigDir: '',
            appDir: '',
            description: '',
            dir: '',
            ip: '192.168.4.225', // ip地址
            memorySize: 8, // 内存大小
            port: 81, // 端口号
            tomcatId: 't1', // tomcatId
          },
          {
            appConfigDir: '',
            appDir: '',
            description: '',
            dir: '',
            ip: '192.168.4.226', // ip地址
            memorySize: 10, // 内存大小
            port: 82, // 端口号
            tomcatId: 't2', // tomcatId
          },
          {
            appConfigDir: '',
            appDir: '',
            description: '',
            dir: '',
            ip: '192.168.4.227', // ip地址
            memorySize: 12, // 内存大小
            port: 83, // 端口号
            tomcatId: 't3', // tomcatId
          },
        ],
      };
    },
  },

  /* 获取消息总线配置 */
  {
    path: '/monitor/deployment/mq/config',
    method: 'post',
    handle(data) {
      return {
        code: 'SUCCESS',
        msg: 'string',
        success: true,
        data: [
          {
            brokerName: 'broker1',
            brokerPort: 111,
            description: 'broker1',
            ip: '192.168.4.225',
            ipList: [],
            messageStoreDir: '/home/mq/store/1',
            mqAddress: '',
            port: 81,
            tomcatDir: '/homt/tomcat/1',
            tomcatId: 't1',
          },
          {
            brokerName: 'broker2',
            brokerPort: 222,
            description: 'broker2',
            ip: '192.168.4.226',
            ipList: [],
            messageStoreDir: '/home/mq/store/2',
            mqAddress: '',
            port: 82,
            tomcatDir: '/homt/tomcat/2',
            tomcatId: 't2',
          },
          {
            brokerName: 'broker3',
            brokerPort: 333,
            description: 'broker3',
            ip: '192.168.4.227',
            ipList: [],
            messageStoreDir: '/home/mq/store/3',
            mqAddress: '',
            port: 83,
            tomcatDir: '/homt/tomcat/3',
            tomcatId: 't3',
          },
        ],
      };
    },
  },

  /* 获取注册中心配置 */
  {
    path: '/monitor/deployment/registry/info',
    method: 'post',
    handle(data) {
      return {
        code: 'SUCCESS',
        msg: 'string',
        success: true,
        data: [
          {
            dataStoreDir: '/home/datastore/1',
            description: '',
            port: 81,
            tomcatDir: '/home/tomcat/1',
            tomcatId: 't1',
          },
          {
            dataStoreDir: '/home/datastore/2',
            description: '',
            port: 82,
            tomcatDir: '/home/tomcat/2',
            tomcatId: 't2',
          },
          {
            dataStoreDir: '/home/datastore/3',
            description: '',
            port: 83,
            tomcatDir: '/home/tomcat/3',
            tomcatId: 't3',
          },
        ],
      };
    },
  },

  /* 获取数据库配置 */
  {
    path: '/monitor/deployment/db/config',
    method: 'post',
    handle(data) {
      return {
        code: 'SUCCESS',
        msg: 'string',
        success: true,
        data: [
          {
            advanceDbUrl: '/home/advancedburl/1',
            dbIp: '192.168.4.225',
            dbName: '数据库1',
            dbPort: 81,
            description: '',
            password: '1',
            tomcatDir: '/home/tomcat/1',
            tomcatId: 't1',
            userName: 'u1',
          },
          {
            advanceDbUrl: '/home/advancedburl/2',
            dbIp: '192.168.4.226',
            dbName: '数据库2',
            dbPort: 82,
            description: '',
            password: '2',
            tomcatDir: '/home/tomcat/2',
            tomcatId: 't2',
            userName: 'u2',
          },
          {
            advanceDbUrl: '/home/advancedburl/3',
            dbIp: '192.168.4.227',
            dbName: '数据库3',
            dbPort: 83,
            description: '',
            password: '3',
            tomcatDir: '/home/tomcat/3',
            tomcatId: 't3',
            userName: 'u3',
          },
        ],
      };
    },
  },

  /* 获取日志配置 */
  {
    path: '/monitor/deployment/log/config',
    method: 'post',
    handle(data) {
      return {
        code: 'SUCCESS',
        msg: 'string',
        success: true,
        data: [
          {
            path: '/home/log/1',
            tomcatDir: '/home/tomcat/1',
            tomcatId: 't1',
          },
          {
            path: '/home/log/2',
            tomcatDir: '/home/tomcat/2',
            tomcatId: 't2',
          },
          {
            path: '/home/log/3',
            tomcatDir: '/home/tomcat/3',
            tomcatId: 't3',
          },
        ],
      };
    },
  },
  {
    path: '/monitor/deployment/connect/info',
    method: 'post',
    handle(data) {
      return {
        code: 'SUCCESS',
        msg: 'string',
        success: true,
        data: [
          {
            tomcatId: 't1',
            socketPort: 11,
            tomcatPort: 12,
            ip: '127.0.0.1',
          },
          {
            tomcatId: 't2',
            socketPort: 13,
            tomcatPort: 13,
            ip: '127.0.0.1',
          },
          {
            tomcatId: 't3',
            socketPort: 14,
            tomcatPort: 15,
            ip: '127.0.0.1',
          },
        ],
      };
    },
  },
  // 执行部署
  {
    path: '/monitor/deployment/execute/deploy',
    method: 'post',
    handle(data) {
      return {
        code: 'SUCCESS',
        msg: 'string',
        success: true,
        data: [
          {
            dbConfigVo: {
              advanceDbUrl: 'advanceDbUrl',
              dbIp: 'dbIp',
              dbName: 'dbName',
              dbPort: 0,
              description: 'description',
              password: 'password',
              tomcatDir: 'tomcatDir',
              tomcatId: 'tomcatId',
              userName: 'userName',
            },
            expectMemory: 0,
            licenseDir: 'licenseDir',
            logConfigVo: {
              path: 'path',
              tomcatDir: 'tomcatDir',
              tomcatId: 'tomcatId',
            },
            mqConfigVo: {
              brokerName: 'brokerName',
              brokerPort: 0,
              description: 'description',
              ip: 'ip',
              ipList: [],
              messageStoreDir: 'messageStoreDir',
              mqAddress: 'mqAddress',
              port: 0,
              tomcatDir: 'tomcatDir',
              tomcatId: 'tomcatId',
            },
            registryCenterConfigVo: {
              dataStoreDir: 'dataStoreDir',
              description: 'description',
              port: 0,
              tomcatDir: 'tomcatDir',
              tomcatId: 't1',
            },
            socketPort: 0,
            tomcatConfigVo: {
              appConfigDir: 'appConfigDir',
              appDir: 'appDir',
              description: 'description',
              dir: 'dir',
              ip: 'ip',
              memorySize: 0,
              port: 0,
              tomcatId: 't1',
            },
            tomcatId: 't1',
            tomcatType: 'tomcatType1',
            wareDir: 'wareDir1',
          },
          {
            dbConfigVo: {
              advanceDbUrl: 'advanceDbUrl',
              dbIp: 'dbIp',
              dbName: 'dbName',
              dbPort: 0,
              description: 'description',
              password: 'password',
              tomcatDir: 'tomcatDir',
              tomcatId: 'tomcatId',
              userName: 'userName',
            },
            expectMemory: 0,
            licenseDir: 'licenseDir',
            logConfigVo: {
              path: 'path',
              tomcatDir: 'tomcatDir',
              tomcatId: 'tomcatId',
            },
            mqConfigVo: {
              brokerName: 'brokerName',
              brokerPort: 0,
              description: 'description',
              ip: 'ip',
              ipList: [],
              messageStoreDir: 'messageStoreDir',
              mqAddress: 'mqAddress',
              port: 0,
              tomcatDir: 'tomcatDir',
              tomcatId: 'tomcatId',
            },
            registryCenterConfigVo: {
              dataStoreDir: 'dataStoreDir',
              description: 'description',
              port: 0,
              tomcatDir: 'tomcatDir',
              tomcatId: 't1',
            },
            socketPort: 0,
            tomcatConfigVo: {
              appConfigDir: 'appConfigDir',
              appDir: 'appDir',
              description: 'description',
              dir: 'dir',
              ip: 'ip',
              memorySize: 0,
              port: 0,
              tomcatId: 't1',
            },
            tomcatId: 't2',
            tomcatType: 'tomcatType1',
            wareDir: 'wareDir1',
          },
          {
            dbConfigVo: {
              advanceDbUrl: 'advanceDbUrl',
              dbIp: 'dbIp',
              dbName: 'dbName',
              dbPort: 0,
              description: 'description',
              password: 'password',
              tomcatDir: 'tomcatDir',
              tomcatId: 'tomcatId',
              userName: 'userName',
            },
            expectMemory: 0,
            licenseDir: 'licenseDir',
            logConfigVo: {
              path: 'path',
              tomcatDir: 'tomcatDir',
              tomcatId: 'tomcatId',
            },
            mqConfigVo: {
              brokerName: 'brokerName',
              brokerPort: 0,
              description: 'description',
              ip: 'ip',
              ipList: [],
              messageStoreDir: 'messageStoreDir',
              mqAddress: 'mqAddress',
              port: 0,
              tomcatDir: 'tomcatDir',
              tomcatId: 'tomcatId',
            },
            registryCenterConfigVo: {
              dataStoreDir: 'dataStoreDir',
              description: 'description',
              port: 0,
              tomcatDir: 'tomcatDir',
              tomcatId: 't2',
            },
            socketPort: 0,
            tomcatConfigVo: {
              appConfigDir: 'appConfigDir',
              appDir: 'appDir',
              description: 'description',
              dir: 'dir',
              ip: 'ip',
              memorySize: 0,
              port: 0,
              tomcatId: 't3',
            },
            tomcatId: 't3',
            tomcatType: 'tomcatType1',
            wareDir: 'wareDir1',
          },
        ],
      };
    },
  },

  /* 获取所有预览配置 */
  {
    path: '/monitor/deployment/preview/all/config',
    method: 'post',
    handle(data) {
      return {
        code: 'SUCCESS',
        msg: 'string',
        success: true,
        data: [
          {
            dbConfigVo: {
              advanceDbUrl: 'advanceDbUrl',
              dbIp: 'dbIp',
              dbName: 'dbName',
              dbPort: 0,
              description: 'description',
              password: 'password',
              tomcatDir: 'tomcatDir',
              tomcatId: 'tomcatId',
              userName: 'userName',
            },
            expectMemory: 0,
            licenseDir: 'licenseDir',
            logConfigVo: {
              path: 'path',
              tomcatDir: 'tomcatDir',
              tomcatId: 'tomcatId',
            },
            mqConfigVo: {
              brokerName: 'brokerName',
              brokerPort: 0,
              description: 'description',
              ip: 'ip',
              ipList: [],
              messageStoreDir: 'messageStoreDir',
              mqAddress: 'mqAddress',
              port: 0,
              tomcatDir: 'tomcatDir',
              tomcatId: 'tomcatId',
            },
            registryCenterConfigVo: {
              dataStoreDir: 'dataStoreDir',
              description: 'description',
              port: 0,
              tomcatDir: 'tomcatDir',
              tomcatId: 't1',
            },
            socketPort: 0,
            tomcatConfigVo: {
              appConfigDir: 'appConfigDir',
              appDir: 'appDir',
              description: 'description',
              dir: 'dir',
              ip: 'ip',
              memorySize: 0,
              port: 0,
              tomcatId: 't1',
            },
            tomcatId: 't1',
            tomcatType: 'tomcatType1',
            wareDir: 'wareDir1',
          },
          {
            dbConfigVo: {
              advanceDbUrl: 'advanceDbUrl',
              dbIp: 'dbIp',
              dbName: 'dbName',
              dbPort: 0,
              description: 'description',
              password: 'password',
              tomcatDir: 'tomcatDir',
              tomcatId: 'tomcatId',
              userName: 'userName',
            },
            expectMemory: 0,
            licenseDir: 'licenseDir',
            logConfigVo: {
              path: 'path',
              tomcatDir: 'tomcatDir',
              tomcatId: 'tomcatId',
            },
            mqConfigVo: {
              brokerName: 'brokerName',
              brokerPort: 0,
              description: 'description',
              ip: 'ip',
              ipList: [],
              messageStoreDir: 'messageStoreDir',
              mqAddress: 'mqAddress',
              port: 0,
              tomcatDir: 'tomcatDir',
              tomcatId: 'tomcatId',
            },
            registryCenterConfigVo: {
              dataStoreDir: 'dataStoreDir',
              description: 'description',
              port: 0,
              tomcatDir: 'tomcatDir',
              tomcatId: 't1',
            },
            socketPort: 0,
            tomcatConfigVo: {
              appConfigDir: 'appConfigDir',
              appDir: 'appDir',
              description: 'description',
              dir: 'dir',
              ip: 'ip',
              memorySize: 0,
              port: 0,
              tomcatId: 't1',
            },
            tomcatId: 't2',
            tomcatType: 'tomcatType1',
            wareDir: 'wareDir1',
          },
          {
            dbConfigVo: {
              advanceDbUrl: 'advanceDbUrl',
              dbIp: 'dbIp',
              dbName: 'dbName',
              dbPort: 0,
              description: 'description',
              password: 'password',
              tomcatDir: 'tomcatDir',
              tomcatId: 'tomcatId',
              userName: 'userName',
            },
            expectMemory: 0,
            licenseDir: 'licenseDir',
            logConfigVo: {
              path: 'path',
              tomcatDir: 'tomcatDir',
              tomcatId: 'tomcatId',
            },
            mqConfigVo: {
              brokerName: 'brokerName',
              brokerPort: 0,
              description: 'description',
              ip: 'ip',
              ipList: [],
              messageStoreDir: 'messageStoreDir',
              mqAddress: 'mqAddress',
              port: 0,
              tomcatDir: 'tomcatDir',
              tomcatId: 'tomcatId',
            },
            registryCenterConfigVo: {
              dataStoreDir: 'dataStoreDir',
              description: 'description',
              port: 0,
              tomcatDir: 'tomcatDir',
              tomcatId: 't2',
            },
            socketPort: 0,
            tomcatConfigVo: {
              appConfigDir: 'appConfigDir',
              appDir: 'appDir',
              description: 'description',
              dir: 'dir',
              ip: 'ip',
              memorySize: 0,
              port: 0,
              tomcatId: 't3',
            },
            tomcatId: 't3',
            tomcatType: 'tomcatType1',
            wareDir: 'wareDir1',
          },
        ],
      };
    },
  },
];
