export default [
  {
    path: '/inspection/report/detail',
    method: 'get',
    handle(data) {
      return {
        code: '',
        data: {
          dbConfigVo: {
            containsModule: {
              describe: '',
              isPass: true,
              remarks: '',
              value: '',
            },
            decrypt_aes: {
              describe: '',
              isPass: true,
              remarks: '',
              value: '',
            },
            enableDbupgrade: {
              describe: '',
              isPass: true,
              remarks: '',
              value: '',
            },
            encrypt_aes: {
              describe: '',
              isPass: true,
              remarks: '',
              value: '',
            },
            maxOpenPreparedStatements: {
              describe: '',
              isPass: true,
              remarks: '',
              value: '',
            },
            maxPoolSize: {
              describe: '',
              isPass: true,
              remarks: '',
              value: '',
            },
            minPoolSize: {
              describe: '',
              isPass: true,
              remarks: '',
              value: '',
            },
            poolPreparedStatements: {
              describe: '',
              isPass: true,
              remarks: '',
              value: '',
            },
            testOnBorrow: {
              describe: '',
              isPass: true,
              remarks: '',
              value: '',
            },
            testOnReturn: {
              describe: '',
              isPass: true,
              remarks: '',
              value: '',
            },
            validationQuery: {
              describe: '',
              isPass: true,
              remarks: '',
              value: '',
            },
          },
          logConfigVo: {
            asynMode: {
              describe: '',
              isPass: true,
              remarks: '',
              value: '',
            },
            automaticFileMonitoring: {
              describe: '',
              isPass: true,
              remarks: '',
              value: '',
            },
            disableConsoleOutput: {
              describe: '',
              isPass: true,
              remarks: '',
              value: '',
            },
            logOutPutDir: {
              describe: '',
              isPass: true,
              remarks: '',
              value: '',
            },
            logOutputLevel: {
              describe: '',
              isPass: true,
              remarks: '',
              value: '',
            },
            operationLog: {
              describe: '',
              isPass: true,
              remarks: '',
              value: '',
            },
          },
          middleWareVo: {
            enableLookups: {
              describe: '',
              isPass: true,
              remarks: '',
              value: '',
            },
            executor: {
              describe: '',
              isPass: true,
              remarks: '',
              value: '',
            },
            fileCode: {
              describe: '',
              isPass: true,
              remarks: '',
              value: '',
            },
            heapDumpOnOutOfMemoryError: {
              describe: '',
              isPass: true,
              remarks: '',
              value: '',
            },
            heapDumpPath: {
              describe: '',
              isPass: true,
              remarks: '',
              value: '',
            },
            heapMemory: {
              describe: '',
              isPass: true,
              remarks: '',
              value: '',
            },
            http11NioProtocol: {
              describe: '',
              isPass: true,
              remarks: '',
              value: '',
            },
            maxPermSize: {
              describe: '',
              isPass: true,
              remarks: '',
              value: '',
            },
            maxThreads: {
              describe: '',
              isPass: true,
              remarks: '',
              value: '',
            },
            threadStack: {
              describe: '',
              isPass: true,
              remarks: '',
              value: '',
            },
            uriEncoding: {
              describe: '',
              isPass: true,
              remarks: '',
              value: '',
            },
            useConcMarkSweepGC: {
              describe: '',
              isPass: true,
              remarks: '',
              value: '',
            },
          },
          mqConfigVo: {
            brokerId: {
              describe: '',
              isPass: true,
              remarks: '',
              value: '',
            },
            brokerIp: {
              describe: '',
              isPass: true,
              remarks: '',
              value: '',
            },
            listenPort: {
              describe: '',
              isPass: true,
              remarks: '',
              value: '',
            },
            mqServerAddress: {
              describe: '',
              isPass: true,
              remarks: '',
              value: '',
            },
            storePathCommitLog: {
              describe: '',
              isPass: true,
              remarks: '',
              value: '',
            },
            storePathRootDir: {
              describe: '',
              isPass: true,
              remarks: '',
              value: '',
            },
          },
          operatingSystemVo: {
            linuxSystemVo: {
              bit: {
                describe: '位数是否为64bit？',
                isPass: true,
                remarks: '推荐采用64位系统',
                value: '64位',
              },
              cache: {
                describe: 'cache？',
                isPass: true,
                remarks: 'cache',
                value: '8',
              },
              cpuCheck: {
                describe: 'CPU核数是否是8C或更高？',
                isPass: true,
                remarks: 'CPU核数是8G',
                value: '8G',
              },
              cpuCores: {
                describe: 'cpuCores ?',
                isPass: true,
                remarks: 'cpuCores',
                value: '4',
              },
              dbFile: {
                describe: 'dbFile ?',
                isPass: false,
                remarks: 'dbFile',
                value: '1',
              },
              encoding: {
                describe: 'encoding ?',
                isPass: true,
                remarks: 'encoding',
                value: '1',
              },
              freeSpace: {
                describe: 'freeSpace ?',
                isPass: true,
                remarks: 'freeSpace',
                value: '1',
              },
              handles: {
                describe: 'handles ?',
                isPass: true,
                remarks: 'handle',
                value: '1',
              },
              installJdk: {
                describe: 'installJDK ?',
                isPass: false,
                remarks: 'installJdk',
                value: '1',
              },
              jdkVersion: {
                describe: 'jdkVersion ?',
                isPass: true,
                remarks: 'jdkVersion',
                value: '1',
              },
              kernelVersion: {
                describe: 'kernelVersion ?',
                isPass: true,
                remarks: 'kernelVersion',
                value: '1',
              },
              memory: {
                describe: 'memory ?',
                isPass: false,
                remarks: 'memory',
                value: '1',
              },
              memoryCheck: {
                describe: 'memoryCheck ?',
                isPass: true,
                remarks: 'memoryCheck',
                value: '1',
              },
              processSize: {
                describe: 'processSize ?',
                isPass: false,
                remarks: 'processSize',
                value: '1',
              },
              threads: {
                describe: 'threads ?',
                isPass: true,
                remarks: 'threads',
                value: '1',
              },
            },
            windowsSystemVo: {
              bit: {
                describe: 'describev ?',
                isPass: false,
                remarks: 'describe',
                value: '1',
              },
              cpuCores: {
                describe: 'cpuCores ?',
                isPass: true,
                remarks: 'cpuCores',
                value: '1',
              },
              freeSpace: {
                describe: 'freeSpace ?',
                isPass: true,
                remarks: 'freeSpace',
                value: '1',
              },
              installJdk: {
                describe: 'installJdk ?',
                isPass: true,
                remarks: 'installJdk',
                value: '1',
              },
              jdkVersion: {
                describe: 'jdkVersion ?',
                isPass: true,
                remarks: 'jdkVersion',
                value: '1',
              },
              kernelVersion: {
                describe: 'kernelVersion ?',
                isPass: true,
                remarks: 'kernelVersion',
                value: '1',
              },
              memory: {
                describe: 'memory ?',
                isPass: true,
                remarks: 'memory',
                value: '2',
              },
            },
          },
          registryCenterConfigVo: {
            clientPort: {
              describe: '',
              isPass: true,
              remarks: '',
              value: '',
            },
            dataDir: {
              describe: '',
              isPass: true,
              remarks: '',
              value: '',
            },
            dataLogDir: {
              describe: '',
              isPass: true,
              remarks: '',
              value: '',
            },
          },
          rpcConfigVo: {
            regitryCenterAddress: {
              describe: '',
              isPass: true,
              remarks: '',
              value: '',
            },
            rpcAddress: {
              describe: '',
              isPass: true,
              remarks: '',
              value: '',
            },
          },
        },
        msg: '',
        success: true,
      };
    },
  },

  // 获取监控数据库的用户名和密码
  {
    path: '/monitor/upgrade/query/oracle/config',
    method: 'get',
    handle(data) {
      console.log(data);
      return {
        code: 'SUCCESS',
        data: {
          tomcatId: '1',
          user: 'admin',
          password: '123456',
        },
        msg: 'string',
        success: true,
      };
    },
  },

  // 获取监控数据库的用户名和密码
  {
    path: '/monitor/info/query/locktable/info',
    method: 'get',
    handle(data) {
      console.log(data);
      return {
        code: 'SUCCESS',
        data: [
          {
            cTime: '7534',
            machine: 'WORKGROUP/DESKTOP_AHHQ6H',
            nowTime: '2020-12-12 12:12:12',
            objectName: 'TESTLOCK',
            objectType: 'TABLE',
            program: 'plsqldev.exe',
            serial: '1562',
            sid: '101',
            sqlText: 'select * from table where a = 1 and b = 2',
            startLockTime: '2020-12-12 12:12:12',
            status: 'INACTIVE',
            userName: 'QS_PENGHUA',
          },

          {
            cTime: '7536',
            machine: 'WORKGROUP2/DESKTOP_AHHQ6H',
            nowTime: '2019-12-12 12:12:12',
            objectName: 'TESTLOCK2',
            objectType: 'TABLE2',
            program: 'plsqldev2.exe',
            serial: '15622',
            sid: '1012',
            sqlText: 'select * from table where a = 1 and b = 2 and select * from table where a = 1 and b = 2 and select * from table where a = 1 and b = 2and select * from table where a = 1 and b = 2',
            startLockTime: '2020-12-13 12:12:12',
            status: 'ACTIVE',
            userName: 'QS_PENGHUA2',
          },
        ],
        msg: 'string',
        success: true,
      };
    },
  },

  // 解锁
  {
    path: '/monitor/info/delete/lock',
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
];
