export default [
  // 新增tomcat
  {
    path: '/monitor/add/tomcat',
    method: 'post',
    handle(data) {
      console.log(data);
      return {
        code: 'SUCCESS',
        data: 'string',
        menuId: 'string',
        msg: 'string',
        success: true,
      };
    },
  },

  // 获取服务器上所有license路径
  {
    path: '/monitor/all/license/path',
    method: 'get',
    handle(data) {
      console.log(data);
      return {
        code: 'SUCCESS',
        data: ['1/1/1', '2/2/2', '3/3/3', '4/4/4'],
        menuId: 'string',
        msg: 'string',
        success: true,
      };
    },
  },

  // 获取所有的tomcat配置
  {
    path: '/monitor/all/tomcat/config',
    // path: '/setup/tomcatInfo1',
    method: 'get',
    handle(data) {
      console.log(data);
      return {
        code: 'SUCCESS',
        data: [{
          deployStatus: 'deploying',
          tomcatDir: '/usr/local/tomcat8',
          tomcatName: 'tomcat8',
          warDir: '/usr/local/tomcat8/webapp/11.war',
        },
        {
          deployStatus: 'noDeploy',
          tomcatDir: '/usr/local/tomcat6',
          tomcatName: 'tomcat6',
          warDir: '/usr/local/tomcat6/webapp/aa.war',
        },
        {
          deployStatus: 'noDeploy',
          tomcatDir: '/usr/local/tomcat10',
          tomcatName: 'tomcat10',
          warDir: '',
        },
        {
          deployStatus: 'noDeploy',
          tomcatDir: '/usr/local/tomcat11',
          tomcatName: 'tomcat11',
          warDir: '',
        },
        {
          deployStatus: 'noDeploy',
          tomcatDir: '/usr/local/tomcat12',
          tomcatName: 'tomcat12',
          warDir: '',
        },
        ],
        menuId: 'string',
        msg: 'string',
        success: true,
      };
    },
  },

  // 获取服务器所有war目录
  {
    path: '/monitor/all/wars/info',
    method: 'get',
    handle(data) {
      console.log(data);
      return {
        code: 'SUCCESS',
        data: ['/usr/local/tomcat8/webapp/11.war', 'xxx/b.war', 'xxx/c.war', 'xxx/d.war', 'xxx/e.war', 'xxx/f.war', 'xxx/g.war', 'xxx/h.war', 'xxx/i.war', 'xxx/j.war'],
        menuId: 'string',
        msg: 'string',
        success: true,
      };
    },
  },

  // 控制台日志
  {
    path: '/monitor/console/log',
    method: 'get',
    handle(data) {
      console.log(data);
      return {
        code: 'SUCCESS',
        data: 'string',
        menuId: 'string',
        msg: 'string',
        success: true,
      };
    },
  },

  // 获取数据库配置
  {
    path: '/monitor/db/config',
    method: 'get',
    handle(data) {
      console.log('获取数据库配置', data);
      return {
        code: 'SUCCESS',
        data: {
          advanceDbUrl: '1.1.1.1',
          dbIp: '1.1.1.1',
          dbName: 'dbName',
          dbPort: 1,
          description: 'desc',
          password: '123456',
          userName: 'userName',
        },
        menuId: 'string',
        msg: 'string',
        success: true,
      };
    },
  },

  // 保存数据库配置
  {
    path: '/monitor/db/info/save',
    method: 'post',
    handle(data) {
      console.log(data);
      return {
        code: 'SUCCESS',
        data: 'string',
        menuId: 'string',
        msg: '保存数据库配置成功',
        success: true,
      };
    },
  },

  // 获取当前license路径
  {
    path: '/monitor/license/info',
    method: 'get',
    handle(data) {
      console.log(data);
      return {
        code: 'SUCCESS',
        data: '/test/currentLicPath',
        menuId: 'string',
        msg: 'string',
        success: true,
      };
    },
  },

  // 获取消息总线配置
  {
    path: '/monitor/mq/config',
    method: 'get',
    handle(data) {
      console.log('获取消息总线配置', data);
      return {
        code: 'SUCCESS',
        data: {
          brokerName: '总线名称',
          brokerPort: 1,
          description: 'string',
          ip: '1.1.1.1',
          ipList: ['1.1.1.1', '1.1.1.2', '1.1.1.3'],
          messageStoreDir: 'string',
          port: 1,
        },
        menuId: 'string',
        msg: 'string',
        success: true,
      };
    },
  },

  // 保存消息总线配置
  {
    path: '/monitor/mq/info/save',
    method: 'post',
    handle(data) {
      console.log(data);
      return {
        code: 'SUCCESS',
        data: 'string',
        menuId: 'string',
        msg: '保存消息总线成功',
        success: true,
      };
    },
  },

  // 获取注册中心配置
  {
    path: '/monitor/registry/info',
    method: 'get',
    handle(data) {
      console.log(data);
      return {
        code: 'SUCCESS',
        data: {
          dataStoreDir: '/test/dataStoreDir',
          description: 'string',
          port: 1,
        },
        menuId: 'string',
        msg: 'string',
        success: true,
      };
    },
  },

  // 保存注册中心配置
  {
    path: '/monitor/registry/info/save',
    method: 'post',
    handle(data) {
      console.log(data);
      return {
        code: 'SUCCESS',
        data: 'string',
        menuId: 'string',
        msg: '保存注册中心配置成功',
        success: true,
      };
    },
  },

  // 获取当前tomcat配置
  {
    path: '/monitor/tomcat/config',
    method: 'get',
    handle(data) {
      console.log(data);
      return {
        code: 'SUCCESS',
        data: {
          appConfigDir: '/test/appConfigDir',
          appDir: '/test/appDir',
          description: 'string',
          dir: '/dir',
          ip: '192.168.2.3',
          memorySize: 4,
          port: 1,
        },
        menuId: 'string',
        msg: 'success',
        success: true,
      };
    },
  },

  // 保存当前tomcat配置
  {
    path: '/monitor/tomcat/config/save',
    method: 'post',
    handle(data) {
      console.log(data);
      return {
        code: 'SUCCESS',
        data: 'object',
        menuId: 'string',
        msg: '保存当前tomcat配置成功',
        success: true,
      };
    },
  },

  // 获取tomcat默认目录
  {
    path: '/monitor/tomcat/default/dir',
    method: 'get',
    handle(data) {
      console.log(data);
      return {
        code: 'SUCCESS',
        data: '/user',
        menuId: 'string',
        msg: 'string',
        success: true,
      };
    },
  },

  // 上传文件
  {
    path: '/monitor/upload',
    method: 'post',
    handle(data) {
      console.log(data);
      return {
        code: 'SUCCESS',
        data: 'string',
        menuId: 'string',
        msg: 'string',
        success: true,
      };
    },
  },

  // 预览所有配置
  {
    path: '/monitor/preview/all/config',
    method: 'get',
    handle(data) {
      console.log(data);
      return {
        code: 'SUCCESS',
        data: {
          dbConfigVo: {
            advanceDbUrl: 'jdbc:oracle:thin:@localhost:1521:orcl',
            dbIp: '127.0.0.1',
            dbName: 'dbName',
            dbPort: 8080,
            description: '',
            password: '1',
            userName: 'userName',
          },
          licenseDir: 'user/license.lic',
          mqConfigVo: {
            brokerName: '总线名称',
            brokerPort: 8001,
            description: '',
            ip: '127.0.0.1',
            ipList: [],
            messageStoreDir: 'user/msg',
            port: 8222,
          },
          registryCenterConfigVo: {
            dataStoreDir: 'user/registry',
            description: '',
            port: 8111,
          },
          tomcatConfigVo: {
            appConfigDir: 'user/tomcat',
            appDir: 'user/tomcat/webapp/bridge.war',
            description: '',
            dir: '/dir',
            ip: '127.0.0.1',
            memorySize: 4,
            port: 8081,
          },
          logConfigVo: {
            path: '/test/log',
          },
        },
        menuId: '',
        msg: '',
        success: true,
      };
    },
  },

  // 进行部署
  {
    path: '/monitor/execute/deploy',
    method: 'get',
    handle(data) {
      console.log(data);
      return {
        code: 'SUCCESS',
        data: 'object',
        menuId: 'string',
        msg: '部署成功',
        success: true,
      };
    },
  },
  // 下载监控信息
  {
    path: '/monitor/download/monitoringdata',
    method: 'get',
    handle(data) {
      console.log(data);
      return {
        code: 'SUCCESS',
        data: 'test.html',
        msg: '下载成功',
        success: true,
      };
    },
  },

  // 获取日志配置
  {
    path: '/monitor/log/config',
    method: 'get',
    handle(data) {
      console.log(data);
      return {
        code: 'SUCCESS',
        data: {
          path: '/test/log',
          tomcatDir: '/test/tomcatDir',
        },
        menuId: 'string',
        msg: 'string',
        success: true,
      };
    },
  },

  // 保存日志配置
  {
    path: '/monitor/log/config/path/save',
    method: 'post',
    handle(data) {
      console.log(data);
      return {
        code: 'SUCCESS',
        data: 'string',
        menuId: 'string',
        msg: '保存日志配置成功',
        success: true,
      };
    },
  },
  // 获取文件对照表
  {
    path: '/version/upgrade/files/modify/compare/tree',
    methods: 'get',
    handle(data) {
      console.log(data);
      return {
        code: 'SUCCESS',
        data:
          {
            fileName: '升级包',
            createTime: '2020.03.27 07:02:02',
            fileSize: '2000kb',
            comparedResult: 'new',
            dir: true,
            children: [
              {
                fileName: '导入接口',
                createTime: '',
                fileSize: null,
                comparedResult: 'new',
                children: [
                  {
                    fileName: 'INFI_GTXT_ACCBALANCE.zip',
                    createTime: '2020.03.27 07:03:02',
                    fileSize: '20kb',
                    comparedResult: 'new',
                    children: null,
                    dir: false,
                  },
                  {
                    fileName: 'INFI_O32_TCHD_HT.zip',
                    createTime: '2020.03.27 05:03:02',
                    fileSize: '30kb',
                    comparedResult: '',
                    children: null,
                    dir: false,
                  },
                ],
                dir: true,
              },
              {
                fileName: '后台',
                createTime: '2020.03.27 07:03:02',
                fileSize: null,
                comparedResult: 'modify',
                children: null,
                dir: true,
              },

            ],
          },

        menuId: 'string',
        msg: '获取文件对照列表成功',
        success: true,
      };
    },

  },
  // 获取tomcat运行状态
  {
    path: '/monitor/tomcat/status',
    method: 'get',
    handle(data) {
      console.log(data);
      return {
        code: 'SUCCESS',
        data: 'UP',
        menuId: 'string',
        msg: '获取tomcat运行状态成功',
        success: true,
      };
    },
  },
  // 执行升级
  {
    path: '/monitor/version/upgrade/upgrade/execute',
    method: 'post',
    handle(data) {
      console.log(data);
      return {
        code: 'SUCCESS',
        data: true,
        menuId: 'string',
        msg: '执行升级成功',
        success: true,
      };
    },
  },

  // 获取所有的可升级tomcat信息
  {
    path: '/monitor/version/upgrade/all/tomcat',
    method: 'get',
    handle(data) {
      console.log('获取所有的可升级tomcat信息', data);
      return {
        'msg': '',
        'code': '200',
        'data': [
          {
            'tomcatName': 'apache-tomcat-6.0.45',
            'tomcatDir': '/home/fomp/monitor-tool/monitor-tool-release/tomcat/apache-tomcat-6.0.45/apache-tomcat-6.0.45',
            'warDir': '/home/fomp/monitor-tool/monitor-tool-release/tomcat/apache-tomcat-6.0.45/apache-tomcat-6.0.45/webapps/YSSUCOBRIDGE.war',
            'deployStatus': 'deploying',
            'runningStatus': 'DOWN',
            'version': null,
            'upgradeStatus': null,
          },
          {
            'tomcatName': 'apache-tomcat-8.5.43',
            'tomcatDir': '/home/test/tomcat2/apache-tomcat-8.5.43',
            'warDir': '/home/test/tomcat2/apache-tomcat-8.5.43/webapps/YSSUCOBRIDGE.war',
            'deployStatus': 'noDeploy',
            'runningStatus': 'UP',
            'version': null,
            'upgradeStatus': null,
          },
        ],
        'success': true,
      };
    },
  },

  // 获取服务器所有zip升级包信息
  {
    path: '/monitor/version/upgrade/all/upgrade/package/info',
    method: 'get',
    handle(data) {
      console.log('获取服务器所有zip升级包信息', data);
      return {
        'msg': '',
        'code': '200',
        'data': [
          {
            'path': 'test/path',
            'size': 1122,
            'updateTime': '2020-1-23',
          },
        ],
        'success': true,
      };
    },
  },
  // 上传文件
  {
    path: '/monitor/version/upgrade/upload/multi/package',
    method: 'post',
    handle(data) {
      console.log('上传文件', data);
      return {
        'code': '',
        'data': '',
        'msg': '',
        'success': true
      };
    },
  }
];
