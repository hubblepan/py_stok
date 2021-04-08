export default [
  /* 创建节点 */
  {
    path: '/monitor/node/create',
    method: 'post',
    handle(data) {
      return {
        code: 'SUCCESS',
        msg: 'string',
        success: true,
      };
    },
  },
  /* 修改节点 */
  {
    path: '/monitor/node/update',
    method: 'post',
    handle(data) {
      return {
        code: 'SUCCESS',
        msg: 'string',
        success: true,
      };
    },
  },

  /* 节点列表 */
  {
    path: '/monitor/node/list',
    method: 'get',
    handle(data) {
      return {
        code: 'SUCCESS',
        msg: 'string',
        success: true,
        data: [
          {
            id: '1',
            name: '节点1',
            ip: '192.168.4.225',
            agentPort: 8080,
            sshAccount: 'root',
            sshPassword: '123456',
            sshPort: 22,
            agentStatus: 'noDeploy',
            agentDir: '/home/test/agent',
          },
          {
            id: '2',
            name: '节点2',
            ip: '192.168.4.226',
            agentPort: 8081,
            sshAccount: 'root2',
            sshPassword: '123456',
            sshPort: 22,
            agentStatus: 'down',
            agentDir: '/home/test/agent2',
          },
          {
            id: '3',
            name: '节点3',
            ip: '192.168.4.227',
            agentPort: 8082,
            sshAccount: 'root3',
            sshPassword: '123456',
            sshPort: 22,
            agentStatus: 'up',
            agentDir: '/home/test/agent3',
          },
          {
            id: '4',
            name: '节点4',
            ip: '192.168.4.228',
            agentPort: 8082,
            sshAccount: 'root3',
            sshPassword: '123456',
            sshPort: 22,
            agentStatus: 'up',
            agentDir: '/home/test/agent4',
          },

          {
            id: '5',
            name: '节点5',
            ip: '192.168.4.229',
            agentPort: 8087,
            sshAccount: 'root3',
            sshPassword: '123456',
            sshPort: 22,
            agentStatus: 'up',
            agentDir: '/home/test/agent5',
          },
        ],
      };
    },
  },

  /* 部署代理端 */
  {
    path: '/monitor/node/deploy/agent',
    method: 'get',
    handle(data) {
      return {
        code: 'SUCCESS',
        msg: 'string',
        success: true,
        data: 'up',
      };
    },
  },

  /* 启动代理端 */
  {
    path: '/monitor/node/start/agent',
    method: 'get',
    handle(data) {
      return {
        code: 'SUCCESS',
        msg: 'string',
        success: true,
        data: 'up',
      };
    },
  },

  {
    path: '/monitor/node/connect/info',
    method: 'post',
    handle(data) {
      return {
        code: 'SUCCESS',
        msg: 'string',
        success: true,
        data: {
          tomcatPort: 0,
          ip: '192.168.2.14',
          socketPort: 8066,
          tomcatId: '',
        },
      };
    },
  },
];
