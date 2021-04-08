export default [
  // 获取Tomcat列表
  {
    path: '/monitor/upgrade/assign/node/tomcat',
    method: 'get',
    handle(data) {
      return {
        code: 'SUCCESS',
        msg: 'string',
        data: [
          {
            deployStatus: 'noDeploy',
            id: 't1',
            ip: '127.0.0.1',
            isConfigIp: true,
            jdkVersionOfTomcat: 'v2.4',
            localWar: true,
            nodeId: '1',
            nodeName: '节点1',
            runningStatus: 'UP',
            tomcatDir: '/home/path/tomcat1',
            tomcatName: 'tomcat1',
            tomcatPort: 0,
            upgrade: true,
            version: 'v1',
            warDir: '/home/war/1.war',
            queryVersionDir: '/home/version/test1',
            selectVersionDir: 'v101.40010.233.3',
          },
          {
            deployStatus: 'noDeploy',
            id: 't2',
            ip: '127.0.0.2',
            isConfigIp: true,
            jdkVersionOfTomcat: 'v2.4',
            localWar: true,
            nodeId: '2',
            nodeName: '节点2',
            runningStatus: 'UP',
            tomcatDir: '/home/path/tomcat2',
            tomcatName: 'tomcat2',
            tomcatPort: 0,
            upgrade: true,
            version: 'v1',
            warDir: '/home/war/1.war',
            queryVersionDir: '/home/version/test2',
            selectVersionDir: 'v202.40000.233.3',
          },
          {
            deployStatus: 'noDeploy',
            id: 't3',
            ip: '127.0.0.2',
            isConfigIp: true,
            jdkVersionOfTomcat: 'v2.4',
            localWar: true,
            nodeId: '3',
            nodeName: '节点3',
            runningStatus: 'DOWN',
            tomcatDir: '/home/path/tomcat3',
            tomcatName: 'tomcat3',
            tomcatPort: 0,
            upgrade: false,
            version: 'v1',
            warDir: '/home/war/1.war',
            queryVersionDir: '/home/version/test3',
            selectVersionDir: 'v202.20000.222.1',
          },
        ],
        success: true,
      };
    },
  },
  {
    path: '/monitor/upgrade/version/dir/tree',
    method: 'get',
    handle(data) {
      console.log(data);
      return {
        code: 'SUCCESS',
        msg: 'string',
        data: {
          children: [
            {
              children: [
                {
                  fullPath: '/home/a/V1.300.7.020200301_200429_SP',
                  createTime: '2020-03-04 11:20:12',
                  dir: true,
                  fileName: 'V1.300.7.020200301_200429_SP',
                  type: 'PATCH',
                },

                {
                  fullPath: '/home/b/V2.400.8.020200301_600429_SP',
                  createTime: '2020-03-05 09:20:12',
                  dir: true,
                  fileName: 'V2.400.8.020200301_600429_SP',
                  type: 'PATCH',
                },
              ],
              createTime: '2020-03-05 10:20:12',
              dir: true,
              fileName: 'V1.300.7.020200301',
              fullPath: '/home/c/V1.300.7.020200301',
              type: 'VERSION',
            },

            {
              children: [
                {
                  createTime: '2020-03-04 11:20:12',
                  dir: true,
                  fileName: 'V1.5300.7.020200601_200429_SP',
                  type: 'PATCH',
                  fullPath: '/home/c/V1.300.7.02100301',
                },

                {
                  createTime: '2020-03-05 09:20:12',
                  dir: true,
                  fileName: 'V2.500.8.020200501_200429_SP',
                  type: 'PATCH',
                  fullPath: '/home/c/V1.310.7.020200302',
                },
              ],
              createTime: '2020-03-05 10:20:12',
              dir: true,
              fileName: 'V2.500.8.020500402',
              fullPath: '/home/c/V1.300.7.010200331',
              type: 'VERSION',
            },
          ],
          createTime: '',
          dir: true,
          fileName: '/home/src/version/test',
          type: '',
        },
        success: false,
      };
    },
  },
  {
    path: '/monitor/upgrade/all/node/tomcat/config',
    method: 'get',
    handle(data) {
      return {
        code: 'SUCCESS',
        msg: 'string',
        data: [
          {
            deployStatus: 'noDeploy',
            id: 't1',
            ip: '1921.68.4.225',
            isConfigIp: true,
            jdkVersionOfTomcat: '',
            localWar: true,
            nodeId: 'n1',
            nodeName: '节点1',
            queryVersionDir: '',
            runningStatus: 'UP',
            selectVersionDir: '',
            tomcatDir: '/home/tomcat/1',
            tomcatName: 'tomcat1',
            tomcatPort: 1,
            upgrade: true,
            version: '',
            warDir: '',
          },

          {
            deployStatus: 'noDeploy',
            id: 't2',
            ip: '1921.68.4.225',
            isConfigIp: true,
            jdkVersionOfTomcat: '',
            localWar: true,
            nodeId: 'n1',
            nodeName: '节点1',
            queryVersionDir: '',
            runningStatus: 'UP',
            selectVersionDir: '',
            tomcatDir: '/home/tomcat/2',
            tomcatName: 'tomcat2',
            tomcatPort: 2,
            upgrade: true,
            version: '',
            warDir: '',
          },

          {
            deployStatus: 'noDeploy',
            id: 't3',
            ip: '1921.68.4.225',
            isConfigIp: true,
            jdkVersionOfTomcat: '',
            localWar: true,
            nodeId: 'n1',
            nodeName: '节点1',
            queryVersionDir: '',
            runningStatus: 'UP',
            selectVersionDir: '',
            tomcatDir: '/home/tomcat/3',
            tomcatName: 'tomcat3',
            tomcatPort: 1,
            upgrade: true,
            version: '',
            warDir: '',
          },

          {
            deployStatus: 'noDeploy',
            id: 't4',
            ip: '1921.68.4.226',
            isConfigIp: true,
            jdkVersionOfTomcat: '',
            localWar: true,
            nodeId: 'n2',
            nodeName: '节点2',
            queryVersionDir: '',
            runningStatus: 'UP',
            selectVersionDir: '',
            tomcatDir: '/home/tomcat/4',
            tomcatName: 'tomcat4',
            tomcatPort: 4,
            upgrade: true,
            version: '',
            warDir: '',
          },

          {
            deployStatus: 'noDeploy',
            id: 't5',
            ip: '1921.68.4.226',
            isConfigIp: true,
            jdkVersionOfTomcat: '',
            localWar: true,
            nodeId: 'n2',
            nodeName: '节点2',
            queryVersionDir: '',
            runningStatus: 'UP',
            selectVersionDir: '',
            tomcatDir: '/home/tomcat/5',
            tomcatName: 'tomcat5',
            tomcatPort: 5,
            upgrade: true,
            version: '',
            warDir: '',
          },

          {
            deployStatus: 'noDeploy',
            id: 't6',
            ip: '1921.68.4.227',
            isConfigIp: true,
            jdkVersionOfTomcat: '',
            localWar: true,
            nodeId: 'n3',
            nodeName: '节点3',
            queryVersionDir: '',
            runningStatus: 'UP',
            selectVersionDir: '',
            tomcatDir: '/home/tomcat/6',
            tomcatName: 'tomcat6',
            tomcatPort: 6,
            upgrade: true,
            version: '',
            warDir: '',
          },
        ],
        success: false,
      };
    },
  },
  {
    path: '/monitor/upgrade/upload',
    method: 'post',
    handle: {
      code: 'SUCCESS',
      msg: 'string',
      data: 'abc',
      success: true,
    },
  },
  {
    path: '/monitor/upgrade/select/node/file',
    method: 'post',
    handle: {
      code: 'SUCCESS',
      msg: 'string',
      data: 'abc',
      success: true,
    },
  },
  // 获取指定节点所有zip升级包路径
  {
    path: '/monitor/upgrade/assign/node/all/upgrade/package',
    method: 'get',
    handle(data) {
      return {
        code: 'SUCCESS',
        msg: 'string',
        data: ['/home/path/1.zip', '/home/path/2.zip', '/home/path/3.zip'],
        success: true,
      };
    },
  },
  // 获取服务端节点指定目录下的zip升级包信息
  {
    path: '/monitor',
    method: 'get',
    handle(data) {
      return {
        code: 'SUCCESS',
        msg: 'string',
        data: ['/home/path/1.zip', '/home/path/2.zip', '/home/path/3.zip'],
        success: true,
      };
    },
  },
  // 获取指定节点默认升级包路径
  {
    path: '/monitor/upgrade/default/package',
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
  // 获取tomcat回退点
  {
    path: '/monitor/upgrade/backup/package',
    method: 'post',
    handle(data) {
      return {
        code: 'SUCCESS',
        msg: 'string',
        data: [
          {
            backUpTime: ['2020-11-12 09:08:02', '2020-11-12 09:08:03', '2020-11-12 09:08:01'],
          },
        ],
        success: true,
      };
    },
  },
  // 获取服务端节点默认升级包路径
  {
    path: '/monitor/upgrade/server/default/package',
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
  // 文件对比
  {
    path: '/monitor/upgrade/files/modify/compare/tree',
    method: 'post',
    handle(data) {
      return {
        code: 'SUCCESS',
        msg: 'string',
        data: [
          {
            fileName: '升级包',
            createTime: '2020.03.27 07:02:02',
            fileSize: '2000kb',
            comparedResult: 'new',
            compareDir: '',
            tomcatId: 't1',
            dir: true,
            children: [
              {
                fileName: '导入接口',
                createTime: '',
                fileSize: null,
                comparedResult: 'new',
                compareDir: '',
                tomcatId: 't1',
                children: [
                  {
                    fileName: 'INFI_GTXT_ACCBALANCE.zip',
                    createTime: '2020.03.27 07:03:02',
                    fileSize: '21110kb',
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
                compareDir: '',
                tomcatId: 't1',
                children: null,
                dir: true,
              },
            ],
          },
          {
            fileName: '升级包2',
            createTime: '2020.03.28 07:02:02',
            fileSize: '20kb',
            comparedResult: 'new',
            compareDir: '',
            tomcatId: 't2',
            dir: true,
            children: [
              {
                fileName: '导入接口2',
                createTime: '',
                fileSize: null,
                comparedResult: 'new',
                compareDir: '',
                tomcatId: 't1',
                children: [
                  {
                    fileName: 'INFI_GTXT_ACCBALANCE2.zip',
                    createTime: '2020.03.27 07:03:02',
                    fileSize: '20kb',
                    comparedResult: 'new',
                    children: null,
                    dir: false,
                  },
                  {
                    fileName: 'INFI_O32_TCHD_HT2.zip',
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
                fileName: '后台2',
                createTime: '2020.03.27 07:03:02',
                fileSize: null,
                comparedResult: 'modify',
                compareDir: '',
                tomcatId: 't1',
                children: null,
                dir: true,
              },
            ],
          },
        ],
        success: true,
      };
    },
  },
  // 执行升级
  {
    path: '/upgrade/upgrade/execute',
    method: 'post',
    handle(data) {
      return {
        code: 'SUCCESS',
        msg: 'string',
        data: 'abc',
        success: true,
      };
    },
  },
  // 执行回退
  {
    path: '/monitor/upgrade/roll/back',
    method: 'post',
    handle(data) {
      console.log(data);
      return {
        code: 'SUCCESS',
        msg: 'string',
        data: {
          failIdList: ['t2'],
        },
        success: false,
      };
    },
  },
];
